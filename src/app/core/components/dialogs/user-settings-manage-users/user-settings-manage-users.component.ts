import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-user-settings-manage-users',
    templateUrl: 'user-settings-manage-users.component.html',
    styleUrls: [
        'user-settings-manage-users.component.sass',
        '../combine-elements/combine-elements.component.scss'
    ]
})
export class UserSettingsManageUsersComponent implements OnInit {

    public selection: SelectionModel<any>;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<UserSettingsManageUsersComponent>
    ) {}

    public ngOnInit(): void {
        this.selection = new SelectionModel<any>(true, []);
    }

    public onClose(): void {
        this.dialogRef.close();
    }

    public onSave(): void {
    }
}
