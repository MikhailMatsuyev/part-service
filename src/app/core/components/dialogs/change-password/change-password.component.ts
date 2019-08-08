import { Store, select } from '@ngrx/store';
import { omit } from './../../../../utils/utilsfunc';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { matchPassword } from '../../../../utils/validatorBuilder';
import { UniterState } from '../../../store/reducers';
import { getChangePasswordMessage, ChangeUsersPassword } from '../../../store/users';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: [
        './change-password.component.sass',
        '../combine-elements/combine-elements.component.scss',
    ]
})
export class ChangePasswordComponent implements OnInit {
    public forms: FormGroup;
    public message$ = this.store.pipe(
        select(getChangePasswordMessage)
    );
    constructor(
        public dialogRef: MatDialogRef<ChangePasswordComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private readonly fb: FormBuilder,
        private readonly store: Store<UniterState>
    ) { }

    public ngOnInit(): void {
        this.forms = this.fb.group({
            oldPassword: ['', Validators.required],
            newPassword: ['', [Validators.required, Validators.minLength(8)]],
            retypePassword: ['', Validators.required],
        }, { validator: matchPassword('newPassword', 'retypePassword') });
    }

    public confirm(): void {
        this.store.dispatch(new ChangeUsersPassword({ ...omit(this.forms.value, ['retypePassword']) }));
    }

    public onNoClick(value: boolean): void {
        this.dialogRef.close(value);
    }
}
