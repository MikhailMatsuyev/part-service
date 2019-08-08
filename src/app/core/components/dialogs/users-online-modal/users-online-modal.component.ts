import { Store, select } from '@ngrx/store';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UniterState } from '../../../store/reducers';
import { getOnlineStatusCount, getOnlineStatus } from '../../../store/users';

@Component({
    selector: 'app-users-online-modal',
    templateUrl: './users-online-modal.component.html',
    styleUrls: [
        './users-online-modal.component.sass',
        '../combine-elements/combine-elements.component.scss',
    ]
})
export class UsersOnlineModalComponent {
    public onlineStatus$ = this.store.pipe(select(getOnlineStatusCount));
    public usersOnline$ = this.store.pipe(select(getOnlineStatus));

    constructor(
        public dialogRef: MatDialogRef<UsersOnlineModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private readonly store: Store<UniterState>
    ) { }

    public onNoClick(value: boolean): void {
        this.dialogRef.close(value);
    }
}
