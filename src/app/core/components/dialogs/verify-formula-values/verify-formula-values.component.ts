import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { UniterState } from '@core/store/reducers';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Unsubscribe, untilDestroyed } from '@core/decorators/unsubscribe';
import {
    getRecomentadionsFormulasValuesForValidateUF,
    getRecomentadionsFormulasValuesForValidateCS,
    VerifyFormulaValueUF,
    VerifyFormulaValueCS,
    ResetVerifyFormulas
} from '@core/store/recommendations-formulas';
import { parseComponentFormulaRegExp } from '@const/app';
import { TableDataSource } from '@core/models/base-class/table-data-source';

@Component({
    selector: 'app-verify-formula-values',
    templateUrl: 'verify-formula-values.component.html',
    styleUrls: [
        'verify-formula-values.component.sass',
        '../new-entry/new-entry.component.sass',
        '../combine-elements/combine-elements.component.scss'
    ]
})
@Unsubscribe()
export class VerifyFormulaValuesComponent implements OnInit, OnDestroy {

    public headerTitle = 'Veryfing formula values';

    public componentTable: TableDataSource<any>;
    public userFactorTable: TableDataSource<any>[] = [];

    public noDataForShowingCS = false;
    public noDataForShowingUF = false;

    constructor(
        private store: Store<UniterState>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<VerifyFormulaValuesComponent>
    ) { }

    public ngOnInit(): void {
        this.store.dispatch(new VerifyFormulaValueUF(this.data.ufId));
        this.store.dispatch(new VerifyFormulaValueCS({ csId: this.data.csId, ufId: this.data.ufId }));

        this.initListeners();
    }

    public ngOnDestroy(): void {
        this.store.dispatch(new ResetVerifyFormulas());
    }

    public onClose(): void {
        this.dialogRef.close();
    }

    public getFormulas(fielName: string): string[] {
        return this.data[fielName]
            ? this.data[fielName].match(parseComponentFormulaRegExp).map(item => item.substring(1, item.length - 1))
            : [];
    }
    private initListeners(): void {
        this.store
            .pipe(
                select(getRecomentadionsFormulasValuesForValidateUF),
                untilDestroyed(this),
                map(data => this.mapperUser(data))
            )
            .subscribe(data => {
                this.noDataForShowingUF = !data.length;
                data.forEach(item =>
                    this.userFactorTable.push(new TableDataSource<any>(
                        item.data,
                        item.title,
                        ['dynamic', 'value']
                    ))
                );
            });

        this.store
            .pipe(
                select(getRecomentadionsFormulasValuesForValidateCS),
                untilDestroyed(this)
            )
            .subscribe(data => {
                this.noDataForShowingCS = !data.length;
                this.componentTable = new TableDataSource<any>(
                    data,
                    this.getFormulas('formulaComponent')[0],
                    ['step', 'value']
                );
            });
    }

    private mapperUser(arr: any): any {
        return arr.map(obj => {
            return {
                title: obj && obj.Uf,
                data: obj && obj.steps.map(item => ({ dynamic: item.ufv, value: item.val }))
            };
        });
    }
}
