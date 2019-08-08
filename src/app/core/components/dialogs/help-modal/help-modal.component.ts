import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-help-modal',
    templateUrl: './help-modal.component.html',
    styleUrls: [
        './help-modal.component.sass',
        '../combine-elements/combine-elements.component.scss',
    ]
})
export class HelpModalComponent {
    constructor(
        public dialogRef: MatDialogRef<HelpModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    public onNoClick(value: boolean): void {
        this.dialogRef.close(value);
    }
}
