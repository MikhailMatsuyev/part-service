import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-user-settings-create-user',
    templateUrl: 'user-settings-create-user.component.html',
    styleUrls: [
        'user-settings-create-user.component.sass',
        '../combine-elements/combine-elements.component.scss'
]
})

export class UserSettingsCreateUserComponent implements OnInit {

    public formGroup: FormGroup;

    private isCreate = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<UserSettingsCreateUserComponent>,
        private fb: FormBuilder
    ) {}

    public ngOnInit(): void {
        this.isCreate = this.data.isCreate;

        this.setupForm();
    }

    public onClose(): void {
        this.dialogRef.close();
    }

    public onConfirm(): void {
    }

    private setupForm(): void {
        this.formGroup = this.fb.group({
            name: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

}
