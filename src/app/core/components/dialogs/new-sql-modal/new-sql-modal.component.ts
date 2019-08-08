import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-new-sql',
    templateUrl: './new-sql-modal.component.html',
    styleUrls: [
        './new-sql-modal.component.sass',
        '../combine-elements/combine-elements.component.scss',
    ]
})
export class NewSqlModalComponent implements OnInit {
    public name: FormControl;
    constructor(
        public dialogRef: MatDialogRef<NewSqlModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    public ngOnInit(): void {
        this.name = new FormControl('', [Validators.required]);
    }

    public confirm(): void {
        this.dialogRef.close(this.name.value);
    }

    public onNoClick(value: boolean): void {
        this.dialogRef.close(value);
    }
}
