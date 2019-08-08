import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-specification-info',
    templateUrl: './specification-info-modal.component.html',
    styleUrls: [
        './specification-info-modal.component.sass',
        '../combine-elements/combine-elements.component.scss',
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpecificationInformaionComponent {
    constructor(
        public dialogRef: MatDialogRef<SpecificationInformaionComponent>
    ) { }

    public onNoClick(value: boolean): void {
        this.dialogRef.close(value);
    }
}
