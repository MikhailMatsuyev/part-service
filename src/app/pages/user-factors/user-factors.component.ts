import {
    Component,
    ChangeDetectionStrategy,
    OnInit,
    NgZone,
    Renderer2,
    Inject,
    OnDestroy,
    ChangeDetectorRef,
    ViewChild,
    ElementRef
} from '@angular/core';
import { MatDialog } from '@angular/material';
import {
    editGroupDialog,
    newGroupDialog,
    additionalInformationDialog,
    NewGroupComponent,
    AdditionalInformationComponent,
} from '@core/components/dialogs';
import { UniterState } from '@core/store/reducers';
import { Store } from '@ngrx/store';
import * as UserFactors from '@core/store/user-factors';
import { Levels, LevelRemove, PageTypes, LevelTypes } from '@core/models/generic';
import { DOCUMENT } from '@angular/platform-browser';
import { Unsubscribe } from '@core/decorators/unsubscribe';
import { flattenDepth } from 'lodash';
import { SeriesComponent } from '@core/models/base-class/base-series';
import { OutputSelector } from 'reselect';

@Component({
    selector: 'app-user-factors',
    templateUrl: './user-factors.component.html',
    styleUrls: ['./user-factors.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@Unsubscribe()
export class UserFactorsComponent extends SeriesComponent implements OnInit, OnDestroy {
    @ViewChild('fileRef') public fileRef: ElementRef;

    constructor(
        public dialog: MatDialog,
        public store: Store<UniterState>,
        public zone: NgZone,
        public renderer: Renderer2,
        public cd: ChangeDetectorRef,
        @Inject(DOCUMENT) public document: any
    ) {
        super(dialog, store, zone, renderer, cd, document);
     }

    public dispatchRemoveGroup(data: any) {
        this.store.dispatch(new UserFactors.RemoveGroup(data));
    }

    public dispatchSeriesGet() {
        this.store.dispatch(new UserFactors.UserFactorsGet());
    }

    public dispatchClearSelectStep() {
        this.store.dispatch(new UserFactors.ClearSelectStep());
    }

    public dispatchDropSteps(data: any) {
        this.store.dispatch(new UserFactors.DropSteps(data));
    }

    public dispatchApplyStepsImport(keys: number[]): void {
        this.store.dispatch(new UserFactors.ApplyStepsImport({
            keys,
            type: PageTypes.UserFactors
        }));
    }

    public getSeriesSelectionSelector(): OutputSelector<UniterState, any[], (res: SerieState) => any[]> {
        return UserFactors.getUserSelection;
    }

    public getGroupsSelectionSelector(): OutputSelector<UniterState, any[], (res: SerieState) => any[]> {
        return UserFactors.getUserGroupSelection;
    }

    public getCollapseSelector(): OutputSelector<UniterState, boolean, (res: SerieState) => boolean> {
        return UserFactors.getCollapse;
    }

    public getGroupsSelector(): OutputSelector<UniterState, UsersFactors[], (res: SerieState) => UsersFactors[]> {
        return UserFactors.getUserFactorsGroups;
    }

    public getGroupListSelector(): OutputSelector<UniterState, any[], (res: SerieState) => any[]> {
        return UserFactors.getUsetGroupList;
    }

    public getDirectionsSelector(): OutputSelector<UniterState, boolean, (res: SerieState) => boolean> {
        return UserFactors.getDirections;
    }

    public getImportConflict(): OutputSelector<UniterState, SeriesImportModel, (res: SerieState) => SeriesImportModel> {
        return UserFactors.getImportConflict;
    }

    public createNew(): void {
        this.dialog.open(NewGroupComponent, newGroupDialog);
    }

    public edit(): void {
        const [data] = this.groupSelection;
        this.dialog.open(NewGroupComponent, {
            ...editGroupDialog,
            data: {
                ...editGroupDialog.data,
                serie: data.serie,
                serieId: data.serieId || null,
                groupId: data.factors.groupId || null,
                UFData: {
                    description: data.description || null,
                    orderPriority: data.order || 0,
                    serie: data.serie || null,
                    group: data.factors.group || null,
                    groupOrderPriority: data.factors.order || 0
                }
            }
        });
    }

    public handleOnFileSelected(dataFile: FileList): void {
        const fileUpload = dataFile.item(0);

        const formData: FormData = new FormData();
        formData.append('file', fileUpload, fileUpload.name);
        formData.append('type', `${PageTypes.UserFactors}`);

        this.store.dispatch(new UserFactors.ImportStep(formData));

        this.fileRef.nativeElement.value = '';
    }

    public handleSortGroup(): void {
        this.store.dispatch(new UserFactors.SortUserFactorsGroup());
    }

    public handleHeaderSort(nameField: string[], { groupId }: UsersFactors): void {
        this.store.dispatch(new UserFactors.SortUserFactors({nameField, groupId}));
    }

    public handleActiveGroup(item: any, { groupId }: UsersFactors): void {
        this.store.dispatch(new UserFactors.ShowUserFactorsGroups({...item, groupId}));
    }

    public handleNewStep(item: any, { groupId }: UsersFactors): void {
        this.store.dispatch(new UserFactors.AddUsersGroupStep({ ...item, groupId }));
    }

    public handleRemoveStep(item: any, { groupId }: UsersFactors): void {
        this.store.dispatch(new UserFactors.RemoveUsersGroupStep({ ...item, groupId }));
    }

    public handleSaveStep({ data: { step, text }, serieId }: any, { groupId }: UsersFactors): void {
        if (!step.stepId) {
            this.store.dispatch(new UserFactors.SaveUsersGroupStep({text, order: step.order, serieId}));
        } else {
            this.store.dispatch(new UserFactors.EditUsersGroupStep({text, order: step.order, serieId, id: step.stepId}));
        }
    }

    public handleGroupInfo({order, description, serieId, serie: serieName}: any, { groupId }: UsersFactors): void {
        const serie = {
            order: parseFloat(order) || 0,
            description,
            id: serieId,
            name: serieName,
            idGroup: groupId
        };

        this.store.dispatch(new UserFactors.ChangeGroupInfo({serie}));
    }

    public collapse(): void {
        this.store.dispatch(new UserFactors.CollapseUserFactorsGroups());
    }

    public handleDragGroupStart(): void {
        this.store.dispatch(new UserFactors.CollapseUserFactorsGroups(true));
    }

    public downloadHandle(levelType: Levels): void {
        this.store.dispatch(new UserFactors.DownloadExcel(levelType));
    }

    public handleSwapLeft(data: any, { groupId }: UsersFactors): void {
        this.store.dispatch(new UserFactors.SwapStepLeft({data, groupId}));
    }

    public handleSwapRight(data: any, { groupId }: UsersFactors): void {
        this.store.dispatch(new UserFactors.SwapStepRight({data, groupId}));
    }

    public handleSelectStep(data: any, { groupId }: UsersFactors): void {
        this.store.dispatch(new UserFactors.SelectStep({ ...data, groupId }));
    }

    public handleInsertStep(data: any): void {
        this.store.dispatch(new UserFactors.InsertStep(data));
    }

    public handleDropSerie(serieId: number, { groupId }: UsersFactors): void {
        this.store.dispatch(new UserFactors.ChangeGroupPlace({ serieId, groupId }));
    }

    public additionalInformation(data: any): void {
        const levelMode = data.levelType === LevelTypes.Serie ? 'User Factor' : 'Step';
        const level = data.levelType === LevelTypes.Serie ? Levels.UserFactors : Levels.UserFactorStep;
        this.dialog.open(AdditionalInformationComponent, {
            ...additionalInformationDialog,
            data: {
                ...data,
                level,
                name: `Additional information for ${levelMode}: ${data.name}`
            }
        }).afterClosed().subscribe(() => {
            this.handleSaveInfo(data);
        });
    }

    public handleSaveInfo({ id, levelType }: any): void {
        if (levelType === LevelTypes.Step) {
            this.store.dispatch(new UserFactors.GetStep(id));
        }
    }

    public handleRemoveGroupStep(data: any): void {
        this.deleteSteps()
            .subscribe(() => {
                this.store.dispatch(new UserFactors.RemoveUsersGroupStepsCell([{...data, level: LevelRemove.Step}]));
            });
    }

    public handleChangeCollapseGroup(value: boolean, data: any): void {
        this.store.dispatch(new UserFactors.CollapseGroup({ isCreateGroup: false, isCollapsed: value, ...data }));
    }

    public handleCardHeader(data: UsersFactors): void {
        this.handleHeaderCheck({ type: 'mainGroup' }, data);
    }

    public handleHeaderCheck(obj: any, factors: UsersFactors): void {
        switch (obj.type) {
            case 'group': {
                this.store.dispatch(new UserFactors.SelectedGroup({factors, isSerieSelected: false, isMainGroup: false}));
                return;
            }

            case 'mainGroup': {
                this.store.dispatch(new UserFactors.SelectedGroup({factors, isSerieSelected: false, isMainGroup: true}));
                return;
            }

            case 'subgroup': {
                this.store.dispatch(new UserFactors.SelectedGroup({...obj, factors, isSerieSelected: true, isMainGroup: false}));
                return;
            }
        }
    }

    public handleHeaderGroup(value: string, factors: UsersFactors): void {
        const group = {
            group: {
                id: factors.groupId,
                name: value,
                priority: factors.order
            }
        };
        this.store.dispatch(new UserFactors.ChangeGroupInfo(group));
    }

    public handlePriorityChange(value: number, factors: UsersFactors): void {
        const group = {
            group: {
                id: factors.groupId,
                name: factors.group,
                priority: value
            }
        };
        this.store.dispatch(new UserFactors.ChangeGroupInfo(group));
    }

    public isSelectedStep({ groupId }: UsersFactors): any[] {
        return this.seriesSelection.filter(item => item.groupId === groupId);
    }

    public validateDepend(data: any[]): string[] {
        return data ? data.map(({ group }) => group) : [];
    }

    public validateSeriesDepend(data: any[]): string[] {
        return data ? flattenDepth(data.map(({ series }) => series.map(({ serie }) => serie)), 1) : [];
    }

    public trackByFn(index: number, item: UsersFactors): any {
        return item.groupId;
    }
}
