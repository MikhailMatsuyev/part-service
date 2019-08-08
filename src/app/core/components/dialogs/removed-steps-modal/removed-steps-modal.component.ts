import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { groupBy } from 'lodash';

@Component({
    selector: 'app-removed-steps-modal',
    templateUrl: './removed-steps-modal.component.html',
    styleUrls: [
        '../combine-elements/combine-elements.component.scss',
        './removed-steps-modal.component.sass'
    ],
})
export class RemovedStepsModalComponent implements OnInit {
    public dataElements: any[];
    private specTypes = [{ type: 0, name: 'User Factor' }, { type: 1, name: 'Components' }];

    constructor(
        public dialogRef: MatDialogRef<RemovedStepsModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    public ngOnInit(): void {
        const data = groupBy(this.data.removedSteps, 'specType');
        this.dataElements = Object.keys(data).map(key => {
            const element = this.specTypes.find(({ type }) => type === Number(key));

            if (element) {
                const activeElements = data[key].filter(({ step }) => step);
                return {
                    name: element.name,
                    data: data[key],
                    totalItems: activeElements.length || 0,
                    notFoundItems: data[key].length - activeElements.length
                };
            }

            return data[key];
        });
    }

    public onNoClick(value: boolean): void {
        this.dialogRef.close(value);
    }
}
