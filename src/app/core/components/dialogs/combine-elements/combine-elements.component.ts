import { Store, select } from '@ngrx/store';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatCheckboxChange } from '@angular/material';
import { UniterState } from '../../../store/reducers';
import { getActiveSeriesList, SetCombinedComponent } from '../../../store/component-connections';

@Component({
    selector: 'app-combine-elements',
    templateUrl: './combine-elements.component.html',
    styleUrls: [
        './combine-elements.component.scss'
    ]
})
export class CombineElementsComponent {
    public isActiveHint = true;
    public headerTitle = 'Combine Components';
    public activeList$ = this.store.pipe(
        select(getActiveSeriesList)
    );
    private combineElements = [];

    constructor(
        public dialogRef: MatDialogRef<CombineElementsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private readonly store: Store<UniterState>
    ) { }

    public confirm(): void {
        this.dialogRef.close(true);
    }

    public onNoClick(value: boolean): void {
        if (!value) {
            this.combineElements.forEach(({ id, checked }) => {
                this.store.dispatch(new SetCombinedComponent({ id, checked: !checked }));
            });
        }

        this.dialogRef.close(value);
    }

    public handleSelectChange({ checked }: MatCheckboxChange, { id }: any): void {
        this.combineElements.push({ id, checked });
        this.store.dispatch(new SetCombinedComponent({ id, checked }));
    }
}
