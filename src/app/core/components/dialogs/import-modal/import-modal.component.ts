import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatCheckboxChange } from '@angular/material';

@Component({
    selector: 'app-import-modal',
    templateUrl: './import-modal.component.html',
    styleUrls: [
        '../combine-elements/combine-elements.component.scss',
        './import-modal.component.sass'
    ]
})

export class ImportModalComponent implements OnInit {
    public aproved: number[];
    constructor(
        public dialogRef: MatDialogRef<ImportModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: SeriesImportModel
    ) { }

    public ngOnInit(): void {
        this.aproved = Array.from(Array(this.data.numberOfKeys).keys());
    }

    public onNoClick(value: boolean): void {
        this.dialogRef.close(value ? this.aproved : []);
    }

    public handleSelectChange({ checked }: MatCheckboxChange, key: number): void {
        this.aproved = checked ? [ ...this.aproved, key ] : this.aproved.filter(item => item !== key);
    }

    public getOrdinalNumber(val: number): string {
        return val + this.getOrdinalSuffix(val);
    }

    public getOrdinalSuffix(val: number): string {
        switch (val % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    }
}
