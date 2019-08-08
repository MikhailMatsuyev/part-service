import { Store, select } from '@ngrx/store';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatCheckboxChange } from '@angular/material';
import { UniterState } from '../../../store/reducers';
import { GetUserFactorsList, getActiveConnectedUserFactor, SetUserFactorComponent } from '../../../store/component-connections';

@Component({
    selector: 'app-userfactor-combine',
    templateUrl: './userfactor-combine.component.html',
    styleUrls: [
        '../combine-elements/combine-elements.component.scss',
        './userfactor-combine.component.sass'
    ]
})
export class UserFactorCombineComponent implements OnInit {
    public headerTitle = 'Connect Component to User Factor';
    public activeList$ = this.store.pipe(
        select(getActiveConnectedUserFactor)
    );

    constructor(
        public dialogRef: MatDialogRef<UserFactorCombineComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private readonly store: Store<UniterState>
    ) { }

    public ngOnInit(): void {
        this.store.dispatch(new GetUserFactorsList(this.data.seriesId));
    }

    public confirm(): void {
        this.dialogRef.close(true);
    }

    public onNoClick(value: boolean): void {
        this.dialogRef.close(value);
    }

    public handleSelectChange({ checked }: MatCheckboxChange, { id }: any): void {
        this.store.dispatch(new SetUserFactorComponent({ id, checked }));
    }
}
