import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, AbstractControl } from '@angular/forms';
import { SqlApiService } from '../../../services/sql-api.service';
import { map, catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
    selector: 'app-new-username-modal',
    templateUrl: './new-username-modal.component.html',
    styleUrls: [
        './new-username-modal.component.sass',
        '../combine-elements/combine-elements.component.scss',
    ]
})
export class NewUsernameModalComponent implements OnInit {
    public nameControl: FormControl;
    constructor(
        public dialogRef: MatDialogRef<NewUsernameModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private sqlApiService: SqlApiService
    ) { }

    public ngOnInit(): void {
        this.nameControl = new FormControl('', [Validators.required], this.validateNameTaken.bind(this));
    }

    public confirm(): void {
        this.dialogRef.close(this.nameControl.value);
    }

    public onNoClick(value: boolean): void {
        this.dialogRef.close(value);
    }

    private validateNameTaken(control: AbstractControl) {
        return this.sqlApiService.сheckUserName(control.value)
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                map(res => res ? null : { useNameTaken: true }),
                catchError(err => of({ useNameTakenError: true }))
            );
    }
}
