import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
    selector: 'app-warning-drag-modal',
    templateUrl: './warning-drag-modal.component.html',
    styleUrls: [
        '../delete-group/delete-group.component.scss',
        '../new-group/new-group.component.sass',
        './warning-drag-modal.component.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WarningDragModalComponent {
    constructor(
        public dialogRef: MatDialogRef<WarningDragModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    public onNoClick(event: MouseEvent, value: boolean): void {
        event.stopPropagation();
        this.dialogRef.close(value);
    }
}
