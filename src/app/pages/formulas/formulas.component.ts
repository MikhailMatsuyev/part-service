import { UniterState } from '@store/reducers';
import { switchMap, map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Sort, MatTableDataSource, MatDialog } from '@angular/material';
import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
    GetFormulas,
    SetFormulasSort,
    getRecomentadionsFormulasDropdownCS,
    getRecomentadionsFormulasDropdownUF,
    EnableFormulas,
    DownloadFormulas,
    SetFormula,
    getRecomentadionsFormulasTableData,
    getRecomentadionsFormulasSelections,
    getRecomentadionsFormulasSort,
    GetDropdownCS,
    GetDropdownUF,
    SetFormulasSelections
} from '@core/store/recommendations-formulas';
import { SelectionModel } from '@angular/cdk/collections';
import { NewEntryComponent } from '@core/components/dialogs/new-entry/new-entry.component';
import { DeleteFormulasComponent } from '@core/components/dialogs/delete-formulas/delete-formulas.component';
import { VerifyFormulaValuesComponent } from '@core/components/dialogs/verify-formula-values/verify-formula-values.component';
import { operands, userSpans } from '@const/app';
import { Unsubscribe, OnDestroy, untilDestroyed } from '@core/decorators/unsubscribe';

@Component({
    selector: 'app-formulas',
    templateUrl: './formulas.component.html',
    styleUrls: ['./formulas.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@Unsubscribe()
export class FormulasComponent implements OnInit, OnDestroy {

    public dataSource = new MatTableDataSource<FormulaResponseModel>();
    public selection = new SelectionModel<FormulaResponseModel>(true, []);
    public activeSort: Sort;
    public displayedColumns = [
        'checkbox',
        'enabled',
        'csName',
        'csFormula',
        'csSpan',
        'operand',
        'ufName',
        'ufFormula',
        'ufSpan',
        'unit',
        'generalFormula',
        'generalized',
        'visible',
        'valFormat',
        'order'
    ];

    public dropdownCS = null;
    public dropdownUF = null;
    public dropdownOperand = operands;
    public dropdownUserSpans = userSpans;

    public get isEditAndVerifyEnable(): boolean {
        return this.selection.selected.length === 1;
    }

    public get isDeleteAndDownloadEnable(): boolean {
        return this.selection.selected.length > 0;
    }

    private dataSourceConnection: BehaviorSubject<FormulaResponseModel[]>;

    constructor(
        private store: Store<UniterState>,
        private cd: ChangeDetectorRef,
        public dialog: MatDialog
    ) {}

    public ngOnInit(): void {
        this.storeDispatching();
        this.dataSourceConnection = this.dataSource.connect();
        this.dropdownCS = this.store.pipe(select(getRecomentadionsFormulasDropdownCS));
        this.dropdownUF = this.store.pipe(select(getRecomentadionsFormulasDropdownUF));

        this.initialListeners();
    }

    public ngOnDestroy(): void {}

    public sortData(sort: Sort) {
        this.activeSort = sort;
        this.store.dispatch(new SetFormulasSort(sort));
    }

    public setFilterClass(nameField: string): string {
        if (!this.activeSort || !this.activeSort.active || this.activeSort.active !== nameField || !this.activeSort.direction) {
            return '';
        }
        const { direction } = this.activeSort;

        return direction === 'asc' ? 'filter-icon-left' : 'filter-icon-right';
    }

    public isDisabledCell({ disabled }): string {
        return disabled ? 'disabled-cell' : '';
    }

    public setDisabledCell(row: any): void {
        row.disabled = !row.disabled;
        row.generalized = !row.generalized;
    }

    public isAllSelected(): boolean {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSourceConnection.getValue().length;
        return numSelected === numRows;
    }

    public masterToggle(): void {
        if (this.isAllSelected()) {
            this.selection.clear();
        } else {
            this.dataSourceConnection.getValue().forEach(row => this.selection.select(row));
        }
    }

    public enableToggle(): void {
        const value = this.dataSourceConnection.getValue();
        const checkValues = this.isAllEnableSelected();
        this.store.dispatch(new EnableFormulas({ enable: !checkValues }));
        value.forEach(row =>  row.enabled = !checkValues );
    }

    public checkEnableValues(): boolean {
        return this.dataSourceConnection.getValue().some(item => item.enabled);
    }

    public isAllEnableSelected(): boolean {
        const value = this.dataSourceConnection.getValue();
        const numSelected = value.filter(item => item.enabled).length;
        const numRows = value.length;

        return numSelected === numRows;
    }

    public createNew(): void {
        this.dialog.open(NewEntryComponent, {
            data: {
                dropdownCS: this.dropdownCS,
                dropdownUF: this.dropdownUF,
                dropdownOperand: this.dropdownOperand,
                dropdownUserSpans: this.dropdownUserSpans
            }
        });
    }

    public downloadExcel(): void {
        this.store.dispatch(new DownloadFormulas());
    }

    public edit(): void {
        this.dialog.open(NewEntryComponent, {
            data: {
                dropdownCS: this.dropdownCS,
                dropdownUF: this.dropdownUF,
                dropdownOperand: this.dropdownOperand,
                dropdownUserSpans: this.dropdownUserSpans,
                form: this.selection.selected[0]
            }
        });
    }

    public delete(): void {
        this.dialog.open(DeleteFormulasComponent, {
            data: {
                title: 'Delete',
                items: this.selection.selected
            }
        });
    }

    public veryfing(): void {
        const data = this.selection.selected[0];
        this.dialog.open(VerifyFormulaValuesComponent, {
            data: {
                formulaComponent: data.csFormula,
                formulaUser: data.ufFormula,
                csId: data.csId,
                ufId: data.ufId
            }
        });
    }

    public saveFormula(formulaRow: any): void {
        this.store.dispatch(new SetFormula(this.mapperForBackend(formulaRow)));
    }

    public saveEnabled({ enabled, csId, ufId }): void {
        this.store.dispatch(new EnableFormulas({ enable: enabled, csId, ufId }));
    }

    private initialListeners(): void {
        this.store
            .pipe(
                select(getRecomentadionsFormulasTableData),
                map((data: FormulaResponseModel[]) => this.dataSourceConnection.next(this.mapper(data))),
                tap(() => this.store.dispatch(new SetFormulasSelections(this.selection.selected))),
                switchMap(() => this.store.pipe(select(getRecomentadionsFormulasSelections))),
                untilDestroyed(this)
            )
            .subscribe(list => {
                this.selection.clear();
                list.forEach(item =>
                    this.selection.toggle(
                        this.dataSourceConnection.getValue()
                            .find(tableValue => tableValue && tableValue.csId === item.csId && tableValue.ufId === item.ufId)
                    )
                );
                this.cd.markForCheck();
            });

        this.store
            .pipe(
                select(getRecomentadionsFormulasSort),
                untilDestroyed(this)
            )
            .subscribe(sort => this.activeSort = sort);
    }

    private storeDispatching(): void {
        this.store.dispatch(new GetFormulas());
        this.store.dispatch(new GetDropdownCS());
        this.store.dispatch(new GetDropdownUF());
    }

    private mapper(arr: FormulaResponseModel[]): any {
        return arr.reduce((acc, val) => [ ...acc, { ...val, disabled: val.generalized } ], []);
    }

    private mapperForBackend(obj: any): FormulaEditModel {
        return {
            formula: {
                create: obj && obj.create,
                enabled: obj && obj.enabled,
                generalized: obj && obj.generalized,
                generalFormula: obj && obj.generalFormula,
                csId: obj && obj.csId,
                csName: obj && obj.csName,
                ufId: obj && obj.ufId,
                ufName: obj && obj.ufName,
                operand: obj && obj.operand,
                valFormat: obj && obj.valFormat,
                csFormula: obj && obj.csFormula,
                ufFormula: obj && obj.ufFormula,
                csSpan: obj && obj.csSpan,
                ufSpan: obj && obj.ufSpan,
                visible: obj && obj.visible,
                unit: obj && obj.unit,
                order: obj && obj.order
            },
            csId: obj && obj.oldCsId,
            ufId: obj && obj.oldUfId
        };
    }
}
