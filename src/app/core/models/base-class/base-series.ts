import {
    OnInit,
    NgZone,
    Renderer2,
    Inject,
    OnDestroy,
    ChangeDetectorRef
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
import {
    deleteGroupDialog,
    warningGroupDialog,
    DeleteGroupComponent,
    WarningDragModalComponent,
    ImportModalComponent,
    importModalDialog
} from '@core/components/dialogs';
import { UniterState } from '@core/store/reducers';
import { Store, select, Selector } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Levels, LevelRemove } from '@core/models/generic';
import { DOCUMENT } from '@angular/platform-browser';
import * as AppLayout from '@core/store/app-layout';
import { flattenDepth } from 'lodash';
import { untilDestroyed } from '@core/decorators/unsubscribe';

export abstract class SeriesComponent implements OnInit, OnDestroy {
    public searchControl: FormControl;
    public downloadLevel = Levels;
    public keyCode: string;
    public groups: any[] = [];
    public seriesSelection: any[] = [];
    public groupSelection: any[] = [];
    public searchControlValue$: Observable<any>;
    public directions$ = this.store.pipe(select(this.getDirectionsSelector()));
    public collapse$ = this.store.pipe(
        select(this.getCollapseSelector()),
        map(item => item ? 'Expand all' : 'Collapse all')
    );
    private listenerFn: any;
    public get isEditActive(): boolean {
        return this.groupSelection.length === 1 && this.groupSelection.every(item => item.isSerieSelected);
    }

    constructor(
        public dialog: MatDialog,
        protected readonly store: Store<UniterState>,
        protected readonly zone: NgZone,
        protected readonly renderer: Renderer2,
        protected readonly cd: ChangeDetectorRef,
        @Inject(DOCUMENT) protected readonly document: any
    ) { }

    public abstract createNew(): void;

    public abstract edit(): void;

    public abstract dispatchRemoveGroup(data: any): void;

    public abstract dispatchSeriesGet(): void;

    public abstract dispatchClearSelectStep(): void;

    public abstract dispatchDropSteps(data: any): void;

    public abstract dispatchApplyStepsImport(keys: number[]): void;

    public abstract getSeriesSelectionSelector(): Selector<UniterState, any[]>;

    public abstract getGroupsSelectionSelector(): Selector<UniterState, any[]>;

    public abstract getCollapseSelector(): Selector<UniterState, boolean>;

    public abstract getGroupsSelector(): Selector<UniterState, any[]>;

    public abstract getGroupListSelector(): Selector<UniterState, any[]>;

    public abstract getDirectionsSelector(): Selector<UniterState, boolean>;

    public abstract getImportConflict(): Selector<UniterState, SeriesImportModel>;

    public deleteGroups(event: MouseEvent): void {
        event.stopPropagation();
        const dialogRef = this.dialog.open(DeleteGroupComponent, deleteGroupDialog);
        dialogRef.afterClosed()
            .pipe(
                filter(item => item)
            )
            .subscribe(() => {
                const dataGroups = this.groupSelection
                    .filter(item => item.isMainGroup)
                    .map(item => item.factors.groupId);

                const dataSeries = this.groupSelection
                    .filter(item => item.isSerieSelected)
                    .map(item => item.serieId);

                const dataSteps = this.seriesSelection.map(item => item.stepId);

                const data = [];

                if (dataGroups.length > 0) {
                    data.push({ids: dataGroups, level: LevelRemove.Group});
                }

                if (dataSeries.length > 0) {
                    data.push({ids: dataSeries, level: LevelRemove.Serie});
                }

                if (dataSteps.length > 0) {
                    data.push({ids: dataSteps, level: LevelRemove.Step});
                }

                this.dispatchRemoveGroup(data);
            });
    }

    public deleteSteps(): Observable<boolean> {
        const dialogRef = this.dialog.open(DeleteGroupComponent, deleteGroupDialog);
        return dialogRef.afterClosed()
            .pipe(
                filter(Boolean)
            );
    }

    public ngOnInit(): void {
        this.searchControl = new FormControl('');
        this.dispatchSeriesGet();
        this.searchControlValue$ = this.searchControl.valueChanges
            .pipe(
                untilDestroyed(this),
                debounceTime(125),
                distinctUntilChanged(),
                map(item => item.trim()),
                distinctUntilChanged()
            );

        this.store
            .pipe(
                select(AppLayout.getKeyCodeActive),
                untilDestroyed(this)
            )
            .subscribe(item => {
                this.keyCode = item;
                this.cd.detectChanges();
            });

        this.store
            .pipe(
                select(this.getSeriesSelectionSelector()),
                untilDestroyed(this)
            )
            .subscribe(item => {
                this.seriesSelection = item;
                // TODO: trick for rerender.
                this.cd.detectChanges();
            });

        this.store
            .pipe(
                select(this.getGroupsSelector()),
                untilDestroyed(this)
            )
            .subscribe(item => {
                this.groups = item;
                this.cd.detectChanges();
            });

        this.store
            .pipe(
                select(this.getGroupsSelectionSelector()),
                untilDestroyed(this)
            )
            .subscribe(item => {
                this.groupSelection = item;
                this.cd.markForCheck();
            });

        this.store
            .pipe(
                select(this.getImportConflict()),
                untilDestroyed(this),
                filter(series => series && series.numberOfKeys > 0)
            )
            .subscribe(data => {
                this.dialog.open(ImportModalComponent, {
                    ...importModalDialog,
                    data
                })
                .afterClosed()
                .pipe(
                    filter(keys => keys && keys.length > 0)
                ).subscribe((keys) =>
                    this.dispatchApplyStepsImport(keys)
                );
            });

        this.zone.runOutsideAngular(() => {
            this.listenerFn = this.renderer.listen(this.document, 'click', this.onClickDocument);
        });
    }

    public ngOnDestroy(): void {
        this.listenerFn();
    }

    public abstract handleOnFileSelected(dataFile: FileList): void;

    public abstract handleSortGroup(): void;

    public abstract handleHeaderSort(nameField: string[], { groupId }: UsersFactors): void;

    public abstract handleActiveGroup(item: any, { groupId }: UsersFactors): void;

    public abstract handleNewStep(item: any, { groupId }: UsersFactors): void;

    public abstract handleRemoveStep(item: any, { groupId }: UsersFactors): void;

    public abstract handleSaveStep({ data: { step, text }, serieId }: any, { groupId }: UsersFactors): void;

    public abstract handleGroupInfo({order, description, serieId, serie: serieName}: any, { groupId }: UsersFactors): void;

    public abstract collapse(): void;

    public abstract handleDragGroupStart(): void;

    public abstract downloadHandle(levelType: Levels): void;

    public abstract handleSwapLeft(data: any, { groupId }: UsersFactors): void;

    public abstract handleSwapRight(data: any, { groupId }: UsersFactors): void;

    public abstract handleSelectStep(data: any, { groupId }: UsersFactors): void;

    public abstract handleInsertStep(data: any): void;

    public handleDropStep(data: any, { groupId }: UsersFactors): void {
        const dialogRef = this.dialog.open(WarningDragModalComponent, warningGroupDialog);
        dialogRef.afterClosed()
            .subscribe((item) => {
                if (!item) {
                    this.dispatchClearSelectStep();
                    return;
                }

                this.dispatchDropSteps({
                    ...data,
                    groupId
                });
            });
    }

    public abstract handleDropSerie(serieId: number, { groupId }: UsersFactors): void;

    public abstract additionalInformation(data: any): void;

    public handleInfoClick(data: { id: number, level: number, name: string }): void {
        this.additionalInformation(data);
    }

    public abstract handleSaveInfo({ id, level }: any): void;

    public abstract handleRemoveGroupStep(data: any): void;

    public abstract handleChangeCollapseGroup(value: boolean, data: any): void;

    public handleCardHeader(data: UsersFactors): void {
        this.handleHeaderCheck({ type: 'mainGroup' }, data);
    }

    public abstract handleHeaderCheck(obj: any, factors: UsersFactors): void;

    public abstract handleHeaderGroup(value: string, factors: UsersFactors): void;

    public abstract handlePriorityChange(value: number, factors: UsersFactors): void;

    public isSelectedStep({ groupId }: UsersFactors): any[] {
        return this.seriesSelection.filter(item => item.groupId === groupId);
    }

    public handleChangeValidateStatus(message: string): void {
        this.store.dispatch(new AppLayout.CreateLocalNotificaitonAction({
            type: 'danger',
            text: message || 'The Group with the same name already exists'
        }));
    }

    public handleChangeSubGroupStatus(message: string): void {
        this.store.dispatch(new AppLayout.CreateLocalNotificaitonAction({
            type: 'danger',
            text: message || 'The Serie with the same name already exists'
        }));
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

    public onClickDocument = (): void => {
        if (!this.keyCode && this.seriesSelection.length > 0) {
            this.dispatchClearSelectStep();
        }
    }
}
