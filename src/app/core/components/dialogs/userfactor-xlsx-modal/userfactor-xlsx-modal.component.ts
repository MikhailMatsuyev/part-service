import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatRadioChange } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { UniterState } from '@core/store/reducers';
import * as Recommendations from '@store/recommendations';

@Component({
    selector: 'app-userfactor-xlsx',
    templateUrl: './userfactor-xlsx-modal.component.html',
    styleUrls: [
        './userfactor-xlsx-modal.component.sass',
        '../combine-elements/combine-elements.component.scss',
    ]
})
export class UserFactorXlsxModalComponent implements OnInit {
    public performanceList$ = this.store.pipe(select(Recommendations.getPerformanceList));
    public userFactorSelected$ = this.store.pipe(select(Recommendations.getUserFactorSelected));
    public form: FormGroup;
    public perfFormulas = ['max', 'min'];
    public ufRows = [];
    public ufCols = [];

    constructor(
        public dialogRef: MatDialogRef<UserFactorXlsxModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private readonly store: Store<UniterState>,
        private readonly fb: FormBuilder
    ) { }

    public ngOnInit(): void {
        this.form = this.fb.group({
            perfId: null,
            perfFormula: 'max',
            calcPos: false
        });
        this.store.dispatch(new Recommendations.GetSeriesPerformances());
    }

    public confirm(): void {
        this.store.dispatch(new Recommendations.DownloadUserFactor({ ...this.form.value, ufRows: this.ufRows, ufCols: this.ufCols }));
        this.dialogRef.close();
    }

    public onNoClick(value: boolean): void {
        this.dialogRef.close(value);
    }

    public changeTypeFactor({ value }: MatRadioChange, nameArray: string, nameArrayFilter: string): void {
        this[nameArray] = Array.from(new Set([...this[nameArray], value]));
        this[nameArrayFilter] = this[nameArrayFilter].filter(item => item !== value);
    }

    public isChecked(value: number, nameArray: string): boolean {
        return this[nameArray].some(item => item === value);
    }

    public trackByFn(index: number, item: any): number {
        return item.id;
    }
}
