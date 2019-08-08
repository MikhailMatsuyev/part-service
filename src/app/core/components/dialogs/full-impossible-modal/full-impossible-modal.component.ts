import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-full-impossible-modal',
    templateUrl: './full-impossible-modal.component.html',
    styleUrls: [
        '../combine-elements/combine-elements.component.scss',
        './full-impossible-modal.component.sass'
    ],
})
export class FullImpossibleModalComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<FullImpossibleModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    public ngOnInit(): void {
    }

    public onNoClick(value: boolean): void {
        this.dialogRef.close(value);
    }
}
