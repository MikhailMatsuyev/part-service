import { Store, select } from '@ngrx/store';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatCheckboxChange } from '@angular/material';
import { UniterState } from '../../../store/reducers';
import { getActiveSeriesList, SetComponentDimensioning } from '../../../store/user-connections';

@Component({
    selector: 'app-component-dimensioning-modal',
    templateUrl: './component-dimensioning-modal.component.html',
    styleUrls: [
        '../combine-elements/combine-elements.component.scss',
        './component-dimensioning-modal.component.sass'
    ]
})
export class ComponentDimensioningModalComponent {
    public headerTitle = 'Add Component For Dimensioning';
    public activeList$ = this.store.pipe(
        select(getActiveSeriesList)
    );
    private combineElements = [];

    constructor(
        public dialogRef: MatDialogRef<ComponentDimensioningModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private readonly store: Store<UniterState>
    ) { }

    public confirm(): void {
        this.dialogRef.close(true);
    }

    public onNoClick(value: boolean): void {
        if (!value) {
            this.combineElements.forEach(({ id, checked }) => {
                this.store.dispatch(new SetComponentDimensioning({ id, checked: !checked }));
            });
        }

        this.dialogRef.close(value);
    }

    public handleSelectChange({ checked }: MatCheckboxChange, { id }: any): void {
        this.combineElements.push({ id, checked });
        this.store.dispatch(new SetComponentDimensioning({ id, checked }));
    }
}
