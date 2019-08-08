import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-warning-import-modal',
    templateUrl: './warning-import-modal.component.html',
    styleUrls: [
        './warning-import-modal.component.sass',
        '../combine-elements/combine-elements.component.scss',
    ]
})
export class WarningImportModalComponent implements OnInit {
    public buttonConfirmText = 'Ok';

    constructor(
        public dialogRef: MatDialogRef<WarningImportModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    public ngOnInit(): void {
        if (this.data && this.data.buttonConfirmText) {
            this.buttonConfirmText = this.data.buttonConfirmText;
        }
    }

    public onNoClick(value: boolean): void {
        this.dialogRef.close(value);
    }
}
