import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-delete-group',
    templateUrl: './delete-group.component.html',
    styleUrls: ['./delete-group.component.scss', '../new-group/new-group.component.sass']
})
export class DeleteGroupComponent {
    constructor(
        public dialogRef: MatDialogRef<DeleteGroupComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    public onNoClick(event: MouseEvent, value: boolean): void {
        event.stopPropagation();
        this.dialogRef.close(value);
    }
}
