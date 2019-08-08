import {
    Component,
    ChangeDetectionStrategy,
    OnInit,
    NgZone,
    Renderer2,
    Inject,
    OnDestroy,
    ChangeDetectorRef
} from '@angular/core';
import { MatDialog } from '@angular/material';
import {
    editComponentDialog,
    newComponentDialog,
    additionalInformationDialog,
    NewComponentElemComponent,
    AdditionalInformationComponent
} from '@core/components/dialogs';
import { UniterState } from '@core/store/reducers';
import { Store } from '@ngrx/store';
import * as Components from '@core/store/component-elems';
import { Levels, LevelRemove, PageTypes, LevelTypes } from '@core/models/generic';
import { DOCUMENT } from '@angular/platform-browser';
import { Unsubscribe } from '@core/decorators/unsubscribe';
import { SeriesComponent } from '@core/models/base-class/base-series';

@Component({
    selector: 'app-element',
    templateUrl: './element.component.html',
    styleUrls: ['./element.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@Unsubscribe()
export class ElementComponent extends SeriesComponent implements OnInit, OnDestroy  {
    public pageType = PageTypes.ComponentSeries;

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
         this.store.dispatch(new Components.RemoveGroup(data));
     }

     public dispatchSeriesGet() {
         this.store.dispatch(new Components.GetComponents());
     }

     public dispatchClearSelectStep() {
         this.store.dispatch(new Components.ClearSelectStep());
     }

     public dispatchDropSteps(data: any) {
         this.store.dispatch(new Components.DropSteps(data));
     }

     public dispatchApplyStepsImport() {}

     public getSeriesSelectionSelector() {
         return Components.getComponentSelection;
     }

     public getGroupsSelectionSelector() {
         return Components.getComponentGroupSelection;
     }

     public getCollapseSelector() {
         return Components.getCollapse;
     }

     public getGroupsSelector() {
         return Components.getComponentsGroups;
     }

     public getGroupListSelector() {
         return Components.getComponentGroupList;
     }

     public getDirectionsSelector() {
         return Components.getDirections;
     }

     public getImportConflict() {
         return Components.getImportConflict;
     }

     public createNew(): void {
         this.dialog.open(NewComponentElemComponent, newComponentDialog);
     }

    public edit(): void {
        const [data] = this.groupSelection;
        this.dialog.open(NewComponentElemComponent, {
            ...editComponentDialog,
            data: {
                ...editComponentDialog.data,
                serie: data.serie,
                serieId: data.serieId || null,
                groupId: data.factors.groupId || null,
                UFData: {
                    description: data.description || null,
                    serie: data.serie || null,
                    group: data.factors.group || null,
                    active: data.active,
                    display: data.display
                }
            }
        });
    }

    public handleOnFileSelected(dataFile: FileList): void {
        const fileUpload = dataFile.item(0);
        const formData: FormData = new FormData();
        formData.append('file', fileUpload, fileUpload.name);
        formData.append('type', `${PageTypes.UserFactors}`);
        this.store.dispatch(new Components.ImportStep(formData));
    }

    public handleSortGroup(): void {
        this.store.dispatch(new Components.SortComponentsGroup());
    }

    public handleHeaderSort(nameField: string[], { groupId }: UsersFactors): void {
        this.store.dispatch(new Components.SortComponents({nameField, groupId}));
    }

    public handleActiveGroup(item: any, { groupId }: UsersFactors): void {
        this.store.dispatch(new Components.ShowComponentsGroups({...item, groupId}));
    }

    public handleNewStep(item: any, { groupId }: UsersFactors): void {
        this.store.dispatch(new Components.AddComponentsStep({ ...item, groupId }));
    }

    public handleRemoveStep(item: any, { groupId }: UsersFactors): void {
        this.store.dispatch(new Components.RemoveComponentsStep({...item, groupId}));
    }

    public handleSaveStep({ data: { step, text }, serieId }: any, { groupId }: UsersFactors): void {
        if (!step.stepId) {
            this.store.dispatch(new Components.SaveComponentsStep({text, order: step.order, serieId}));
        } else {
            this.store.dispatch(new Components.EditComponentsStep({text, order: step.order, serieId, id: step.stepId}));
        }
    }

    public handleGroupInfo({order, description, serieId, active, display, serie: serieName}: any, { groupId }: UsersFactors): void {
        const serie = {
            order: parseFloat(order) || 0,
            description,
            id: serieId,
            active,
            display,
            name: serieName,
            idGroup: groupId
        };

        this.store.dispatch(new Components.ChangeGroupInfo({serie}));
    }

    public collapse(): void {
        this.store.dispatch(new Components.CollapseComponentsGroups());
    }

    public handleDragGroupStart(): void {
        this.store.dispatch(new Components.CollapseComponentsGroups(true));
    }

    public downloadHandle(levelType: Levels): void {
        this.store.dispatch(new Components.DownloadExcel(levelType));
    }

    public handleSwapLeft(data: any, { groupId }: UsersFactors): void {
        this.store.dispatch(new Components.SwapStepLeft({data, groupId}));
    }

    public handleSwapRight(data: any, { groupId }: UsersFactors): void {
        this.store.dispatch(new Components.SwapStepRight({data, groupId}));
    }

    public handleSelectStep(data: any, { groupId }: UsersFactors): void {
        this.store.dispatch(new Components.SelectStep({ ...data, groupId }));
    }

    public handleInsertStep(data: any): void {
        this.store.dispatch(new Components.InsertStep(data));
    }

    public handleDropSerie(serieId: number, { groupId }: UsersFactors): void {
        this.store.dispatch(new Components.ChangeGroupPlace({ serieId, groupId }));
    }

    public additionalInformation(data: any): void {
        const levelMode = data.levelType === LevelTypes.Serie ? 'Component Serie' : 'Step';
        const level = data.levelType === LevelTypes.Serie ? Levels.ComponentSeries : Levels.ComponentStep;
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

    public handleSaveInfo({ id, levelType }: any) {
        if (levelType === LevelTypes.Step) {
            this.store.dispatch(new Components.GetStep(id));
        }
    }

    public handleRemoveGroupStep(data: any): void {
        this.deleteSteps()
            .subscribe(() => {
                this.store.dispatch(new Components.RemoveComponentstepsCell([{...data, level: LevelRemove.Step}]));
            });
    }

    public handleChangeCollapseGroup(value: boolean, data: any): void {
        this.store.dispatch(new Components.CollapseGroup({ isCreateGroup: false, isCollapsed: value, ...data }));
    }

    public handleHeaderCheck(obj: any, factors: UsersFactors): void {
        switch (obj.type) {
            case 'group': {
                this.store.dispatch(new Components.SelectedGroup({factors, isSerieSelected: false, isMainGroup: false}));
                return;
            }

            case 'mainGroup': {
                this.store.dispatch(new Components.SelectedGroup({factors, isSerieSelected: false, isMainGroup: true}));
                return;
            }

            case 'subgroup': {
                this.store.dispatch(new Components.SelectedGroup({...obj, factors, isSerieSelected: true, isMainGroup: false}));
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
        this.store.dispatch(new Components.ChangeGroupInfo(group));
    }

    public handlePriorityChange(value: number, factors: UsersFactors): void {
        const group = {
            group: {
                id: factors.groupId,
                name: factors.group,
                priority: value
            }
        };
        this.store.dispatch(new Components.ChangeGroupInfo(group));
    }

    public trackByFn(index: number, item: UsersFactors): any {
        return item.groupId;
    }

    public onClickDocument = (): void => {
        if (!this.keyCode && this.seriesSelection.length > 0) {
            this.store.dispatch(new Components.ClearSelectStep());
        }
    }
}
