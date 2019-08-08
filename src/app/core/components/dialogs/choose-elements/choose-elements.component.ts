import { Store, select } from '@ngrx/store';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatCheckboxChange } from '@angular/material';
import { UniterState } from '../../../store/reducers';
import { getUnitPricing, SetUnitPricing } from '../../../store/component-performance';

@Component({
    selector: 'app-userfactor-combine',
    templateUrl: './choose-elements.component.html',
    styleUrls: [
        '../combine-elements/combine-elements.component.scss',
        './choose-elements.component.sass'
    ]
})
export class ChooseElementsComponent {
    public activeList$ = this.store.pipe(
        select(getUnitPricing)
    );

    constructor(
        public dialogRef: MatDialogRef<ChooseElementsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private readonly store: Store<UniterState>
    ) { }

    public confirm(): void {
        this.dialogRef.close(true);
    }

    public onNoClick(value: boolean): void {
        this.dialogRef.close(value);
    }

    public handleSelectChange({ checked }: MatCheckboxChange, { id }: any): void {
        this.store.dispatch(new SetUnitPricing({ id, enabled: checked }));
    }
}
