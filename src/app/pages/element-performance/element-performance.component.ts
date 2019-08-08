import { Store, select } from '@ngrx/store';
import { MatDialog, MatTableDataSource, MatCheckboxChange, MatSort } from '@angular/material';
import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, ViewChild, OnDestroy } from '@angular/core';
import { filter, first } from 'rxjs/operators';
import { UniterState } from '@store/reducers';
import * as ComponentPerformance from '@store/component-performance';
import * as AppLayout from '@store/app-layout';
import {
    ChooseElementsComponent,
    DeleteGroupComponent,
    NewPerfomanceComponent,
    newPerfomanceDialog,
    deleteGroupDialog,
    combineUFDialog
} from '@core/components/dialogs';
import { Unsubscribe, untilDestroyed } from '@core/decorators/unsubscribe';

@Component({
    selector: 'app-element-performance',
    templateUrl: './element-performance.component.html',
    styleUrls: ['./element-performance.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@Unsubscribe()
export class ElementPerformanceComponent implements OnInit, OnDestroy {
    public performances: MatTableDataSource<Performance> = new MatTableDataSource();
    public displayedColumns = [
        'id',
        'isChecked',
        'name',
        'unit',
        'description',
        'calculate',
        'display',
        'displayText',
        'highlight',
        'order'
    ];
    public componentGroup: number;
    public activeSort: MultipleSort;
    public functionsSettings$ = this.store.pipe(select(ComponentPerformance.getFunctionsSettings));
    public validateName: string[] = [];

    @ViewChild(MatSort) public sort: MatSort;

    public get checkedAllSteps(): boolean {
        return this.performances.data.every((item: any) => item.isChecked);
    }

    public get checkedSteps(): boolean {
        return this.performances.data.some((item: any) => item.isChecked);
    }

    public get activeStepsId(): any[] {
        return this.performances.data.filter((item: any) => item.isChecked).map(item => item.id);
    }

    constructor(
        public dialog: MatDialog,
        private readonly store: Store<UniterState>,
        private readonly cd: ChangeDetectorRef
    ) { }

    public ngOnInit(): void {
        this.store.pipe(
            select(ComponentPerformance.getPerformances),
            untilDestroyed(this)
        ).subscribe(item => {
            this.performances.data = item;
            this.validateName = item.map(({ name }) => name);
            if (!this.activeSort) {
                this.activeSort = {active: ['name'], direction: true};
            }

            this.cd.markForCheck();
        });

        this.store.pipe(
            select(ComponentPerformance.getPerformancesSelected),
            filter(item => !!item),
            first()
        ).subscribe(({id}) => {
            this.componentGroup = id;
            this.store.dispatch(new ComponentPerformance.GetFunctionsSettings(id));
            this.cd.markForCheck();
        });

        this.store.dispatch(new ComponentPerformance.GetPerformance());
    }

    public ngOnDestroy(): void {
        this.store.dispatch(new ComponentPerformance.SetDefaultState());
    }

    public setFilterClass(nameField: string): string {
        if (!this.activeSort || this.activeSort.active[0] !== nameField) {
            return '';
        }

        return this.activeSort.direction ? 'filter-icon-left' : 'filter-icon-right';
    }

    public createNew(): void {
        const dialogRef = this.dialog.open(NewPerfomanceComponent, {
            ...newPerfomanceDialog,
            data: {
                validateName: this.validateName
            }
        });
        dialogRef.afterClosed()
            .pipe(
                filter(item => item)
            )
            .subscribe(result => {
                this.store.dispatch(new ComponentPerformance.CreatePerformance(result));
            });
    }

    public filterChange(changeDirection: boolean, active: string[]): void {
        if (this.activeSort && active[0] === this.activeSort.active[0] && changeDirection) {
            this.activeSort.direction = !this.activeSort.direction;
        } else {
            this.activeSort.active = active;
            this.activeSort.direction = true;
        }

        this.store.dispatch(new ComponentPerformance.AddSortPerformance(this.activeSort));
    }

    public handleCheck({ checked }: MatCheckboxChange, { id }: Performance): void {
        this.store.dispatch(new ComponentPerformance.CheckPerformance({ id, status: checked }));
    }

    public handleChangeValue(value: string | number, element: Performance, fieldName: string): void {
        const oldName = this.performances.data.find(item => item.name === value);

        if (fieldName === 'name' && oldName) {
            this.store.dispatch(new AppLayout.CreateLocalNotificaitonAction({
                type: 'danger',
                text: 'This name is already exist. Please enter another name!'
            }));

            this.store.dispatch(new ComponentPerformance.ResetPerformance({ ...element, [fieldName]: element.name }));
        } else {
            this.store.dispatch(new ComponentPerformance.EditPerformance({ performance: {...element, [fieldName]: value }}));
        }
    }

    public handleCheckTable({ checked }: MatCheckboxChange, element: Performance, fieldChange: string): void {
        this.store.dispatch(new ComponentPerformance.EditPerformance({
            performance: { ...element, [fieldChange]: checked },
            fieldsChange: [fieldChange],
            selectedPerf: this.componentGroup
        }));
    }

    public handleSelectAllChange({ checked }: MatCheckboxChange): void {
        this.store.dispatch(new ComponentPerformance.CheckAllPerformance(checked));
    }

    public changeValues(value: number, element: Performance): void {
        this.store.dispatch(new ComponentPerformance.SetPerformance(element));
    }

    public delete(): void {
        const dialogRef = this.dialog.open(DeleteGroupComponent, deleteGroupDialog);
        dialogRef.afterClosed()
            .pipe(
                filter(Boolean)
            )
            .subscribe(() => {
                this.store.dispatch(new ComponentPerformance.DeletePerformance(this.activeStepsId));
            });
    }

    public downloadExcel(): void {
        this.store.dispatch(new ComponentPerformance.DownloadPerformance(this.activeStepsId));
    }

    public handleSaveForm(obj: FunctionsSettingsModel): void {
        this.store.dispatch(new ComponentPerformance.SetFunctionsSettings(obj));
    }

    public handleDisplayChange(value: boolean): void {
        this.store.dispatch(new ComponentPerformance.SetFunctionDisplay(value));
    }

    public handleControlPerformance(value: string): void {
        const message = value === 'validateRequired'
            ? 'Perfomance can\'t be empty'
            : 'Performance name should be unique';
        this.store.dispatch(new AppLayout.CreateLocalNotificaitonAction({
            type: 'danger',
            text: message
        }));
    }

    public handleChooseComponent(value: number): void {
        this.store.dispatch(new ComponentPerformance.GetUnitPricingConnected(value));
        const dialogRef = this.dialog.open(ChooseElementsComponent, combineUFDialog);
        dialogRef.afterClosed()
            .pipe(
                filter(Boolean)
            )
            .subscribe(() => {
                this.store.dispatch(new ComponentPerformance.SetUnitPricingConnected({ perfId: value }));
            });
    }
}
