import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { unionArray } from '@utils/utilsfunc';
import { flatten } from 'lodash';

@Component({
    selector: 'app-interfaces-links',
    templateUrl: './interfaces-links.component.html',
    styleUrls: [
        '../combine-elements/combine-elements.component.scss',
        './interfaces-links.component.sass'
    ],
})
export class InterfacesLinksComponent {
    public activeInterface: any[] = [];
    constructor(
        public dialogRef: MatDialogRef<InterfacesLinksComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    public onNoClick(value: boolean): void {
        this.dialogRef.close(value);
    }

    public handleActiveLinks(data: any[]): void {
        if (!data || data.length === 0) {
            this.activeInterface = [];
            return;
        }

        // TODO: refactor with array utils
        const newData = data.reduce((dataAcc, dataItem) => {
            return [...dataAcc, ...dataItem.intLinks.reduce((acc, { intId, intStepIds }) => {
                const element = this.data.interfaces.find(item => item.intId === intId);
                if (element) {
                    return [acc, ...intStepIds.reduce((accStep, item) => {
                        const step = element.steps.find(items => items.intStepId === item);
                        if (step) {
                            return [...accStep, `${element.int} : ${step.intStep}`];
                        }
                        return accStep;
                    }, [])];
                }
                return acc;
            }, [])];
        }, [])
            .map(item => (item && Array.isArray(item)) ? flatten(item) : item)
            .filter(item => item.length > 0);

        this.activeInterface = unionArray(flatten(newData));
    }
}
