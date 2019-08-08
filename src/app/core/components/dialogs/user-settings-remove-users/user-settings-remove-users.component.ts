import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-user-settings-remove-users',
    templateUrl: 'user-settings-remove-users.component.html',
    styleUrls: [
        'user-settings-remove-users.component.sass',
        '../combine-elements/combine-elements.component.scss'
    ]
})
export class UserSettingsRemoveUsersComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<UserSettingsRemoveUsersComponent>
    ) {}

    public onClose(): void {
        this.dialogRef.close();
    }

    public onYes(): void {
    }
}
