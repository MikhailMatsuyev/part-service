import { Store, select } from '@ngrx/store';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatCheckboxChange } from '@angular/material';
import { UniterState } from '../../../store/reducers';
import { getActiveConnectedUserFactor, SetCombinedComponent } from './../../../store/user-connections';

@Component({
    selector: 'app-userfactor-combine-connected',
    templateUrl: './userfactor-combine-connected.component.html',
    styleUrls: [
        './userfactor-combine-connected.component.scss'
    ]
})
export class UserFactorCombineConnectedComponent {
    public isActiveHint = true;
    public headerTitle = 'User Factors';
    public activeList$ = this.store.pipe(
        select(getActiveConnectedUserFactor)
    );
    private combineElements = [];

    constructor(
        public dialogRef: MatDialogRef<UserFactorCombineConnectedComponent>,
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
