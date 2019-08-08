import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-formulas-preview',
    templateUrl: './formulas-preview-modal.component.html',
    styleUrls: [
        '../combine-elements/combine-elements.component.scss',
        './formulas-preview-modal.component.sass'
    ]
})
export class FormulasPreviewModalComponent {
    constructor(
        public dialogRef: MatDialogRef<FormulasPreviewModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

    public onNoClick(value: boolean): void {
        this.dialogRef.close(value);
    }
}
