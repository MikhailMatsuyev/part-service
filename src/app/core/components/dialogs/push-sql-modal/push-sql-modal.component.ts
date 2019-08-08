import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-push-sql',
    templateUrl: './push-sql-modal.component.html',
    styleUrls: [
        './push-sql-modal.component.sass',
        '../combine-elements/combine-elements.component.scss',
    ]
})
export class PushSqlModalComponent {
    constructor(
        public dialogRef: MatDialogRef<PushSqlModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    public onNoClick(value: boolean): void {
        this.dialogRef.close(value);
    }
}
