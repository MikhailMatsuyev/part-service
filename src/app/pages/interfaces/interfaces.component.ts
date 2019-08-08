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
    editInterfaceDialog,
    newInterfaceDialog,
    NewInterfaceComponent,
} from '@core/components/dialogs';
import { UniterState } from '@core/store/reducers';
import { Store } from '@ngrx/store';
import * as Interfaces from '@core/store/interfaces';
import { Levels, LevelRemove, PageTypes } from '@core/models/generic';
import { DOCUMENT } from '@angular/platform-browser';
import { Unsubscribe } from '@core/decorators/unsubscribe';
import { SeriesComponent } from '@core/models/base-class/base-series';

@Component({
    selector: 'app-interfaces',
    templateUrl: './interfaces.component.html',
    styleUrls: ['./interfaces.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@Unsubscribe()
export class InterfacesComponent extends SeriesComponent implements OnInit, OnDestroy  {
    public pageType = PageTypes.Interfaces;

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
         this.store.dispatch(new Interfaces.RemoveGroup(data));
     }

     public dispatchSeriesGet() {
         this.store.dispatch(new Interfaces.GetInterfaces());
     }

     public dispatchClearSelectStep() {
         this.store.dispatch(new Interfaces.ClearSelectStep());
     }

     public dispatchApplyStepsImport() {}

     public dispatchDropSteps(data: any) {
         this.store.dispatch(new Interfaces.DropSteps(data));
     }

     public getSeriesSelectionSelector() {
         return Interfaces.getInterfaceSelection;
     }

     public getGroupsSelectionSelector() {
         return Interfaces.getInterfaceGroupSelection;
     }

     public getCollapseSelector() {
         return Interfaces.getCollapse;
     }

     public getGroupsSelector() {
         return Interfaces.getInterfacesGroups;
     }

     public getGroupListSelector() {
         return Interfaces.getInterfaceGroupList;
     }

     public getDirectionsSelector() {
         return Interfaces.getDirections;
     }

     public getImportConflict() {
        return Interfaces.getImportConflict;
     }

     public createNew(): void {
         this.dialog.open(NewInterfaceComponent, newInterfaceDialog);
     }

    public edit(): void {
        const [data] = this.groupSelection;
        this.dialog.open(NewInterfaceComponent, {
            ...editInterfaceDialog,
            data: {
                ...editInterfaceDialog.data,
                serie: data.serie,
                serieId: data.serieId || null,
                groupId: data.factors.groupId || null,
                UFData: {
                    description: data.description || null,
                    serie: data.serie || null,
                    group: data.factors.group || null,
                    interfaceAction: data.hide || false
                }
            }
        });
    }

    public handleOnFileSelected(dataFile: FileList): void {
        const fileUpload = dataFile.item(0);
        const formData: FormData = new FormData();
        formData.append('file', fileUpload, fileUpload.name);
        formData.append('type', `${PageTypes.UserFactors}`);
        this.store.dispatch(new Interfaces.ImportStep(formData));
    }

    public handleSortGroup(): void {
        this.store.dispatch(new Interfaces.SortInterfacesGroup());
    }

    public handleHeaderSort(nameField: string[], { groupId }: UsersFactors): void {
        this.store.dispatch(new Interfaces.SortInterfaces({nameField, groupId}));
    }

    public handleActiveGroup(item: any, { groupId }: UsersFactors): void {
        this.store.dispatch(new Interfaces.ShowInterfacesGroups({...item, groupId}));
    }

    public handleNewStep(item: any, { groupId }: UsersFactors): void {
        this.store.dispatch(new Interfaces.AddInterfacesStep({ ...item, groupId }));
    }

    public handleRemoveStep(item: any, { groupId }: UsersFactors): void {
        this.store.dispatch(new Interfaces.RemoveInterfacesStep({...item, groupId}));
    }

    public handleSaveStep({ data: { step, text }, serieId }: any, { groupId }: UsersFactors): void {
        if (!step.stepId) {
            this.store.dispatch(new Interfaces.SaveInterfacesStep({text, order: step.order, serieId}));
        } else {
            this.store.dispatch(new Interfaces.EditInterfacesStep({text, order: step.order, serieId, id: step.stepId}));
        }
    }

    public handleGroupInfo({order, description, hide, serieId, serie: serieName}: any, { groupId }: UsersFactors): void {
        const serie = {
            hide: hide,
            description,
            id: serieId,
            name: serieName,
            idGroup: groupId
        };

        this.store.dispatch(new Interfaces.ChangeGroupInfo({serie}));
    }

    public collapse(): void {
        this.store.dispatch(new Interfaces.CollapseInterfacesGroups());
    }

    public handleDragGroupStart(): void {
        this.store.dispatch(new Interfaces.CollapseInterfacesGroups(true));
    }

    public downloadHandle(levelType: Levels): void {
        this.store.dispatch(new Interfaces.DownloadExcel(levelType));
    }

    public handleSwapLeft(data: any, { groupId }: UsersFactors): void {
        this.store.dispatch(new Interfaces.SwapStepLeft({data, groupId}));
    }

    public handleSwapRight(data: any, { groupId }: UsersFactors): void {
        this.store.dispatch(new Interfaces.SwapStepRight({data, groupId}));
    }

    public handleSelectStep(data: any, { groupId }: UsersFactors): void {
        this.store.dispatch(new Interfaces.SelectStep({ ...data, groupId }));
    }

    public handleInsertStep(data: any): void {
        this.store.dispatch(new Interfaces.InsertStep(data));
    }

    public handleDropSerie(serieId: number, { groupId }: UsersFactors): void {
        this.store.dispatch(new Interfaces.ChangeGroupPlace({ serieId, groupId }));
    }

    public additionalInformation(data: any): void {
    }

    public handleSaveInfo({ id, level }: any) {
        if (level === Levels.UserFactorStep) {
            this.store.dispatch(new Interfaces.GetStep(id));
        }
    }

    public handleRemoveGroupStep(data: any): void {
        this.deleteSteps()
            .subscribe(() => {
                this.store.dispatch(new Interfaces.RemoveInterfaceStepsCell([{...data, level: LevelRemove.Step}]));
            });
    }

    public handleChangeCollapseGroup(value: boolean, data: any): void {
        this.store.dispatch(new Interfaces.CollapseGroup({ isCreateGroup: false, isCollapsed: value, ...data }));
    }

    public handleHeaderCheck(obj: any, factors: UsersFactors): void {
        switch (obj.type) {
            case 'group': {
                this.store.dispatch(new Interfaces.SelectedGroup({factors, isSerieSelected: false, isMainGroup: false}));
                return;
            }

            case 'mainGroup': {
                this.store.dispatch(new Interfaces.SelectedGroup({factors, isSerieSelected: false, isMainGroup: true}));
                return;
            }

            case 'subgroup': {
                this.store.dispatch(new Interfaces.SelectedGroup({...obj, factors, isSerieSelected: true, isMainGroup: false}));
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
        this.store.dispatch(new Interfaces.ChangeGroupInfo(group));
    }

    public handlePriorityChange(value: number, factors: UsersFactors): void {
        const group = {
            group: {
                id: factors.groupId,
                name: factors.group,
                priority: value
            }
        };
        this.store.dispatch(new Interfaces.ChangeGroupInfo(group));
    }

    public trackByFn(index: number, item: UsersFactors): any {
        return item.groupId;
    }

    public onClickDocument = (): void => {
        if (!this.keyCode && this.seriesSelection.length > 0) {
            this.store.dispatch(new Interfaces.ClearSelectStep());
        }
    }
}
