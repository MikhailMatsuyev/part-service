import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatRadioChange } from '@angular/material';

@Component({
    selector: 'app-connections-downloaded-modal',
    templateUrl: './connections-downloaded-modal.component.html',
    styleUrls: [
        './connections-downloaded-modal.component.sass',
        '../combine-elements/combine-elements.component.scss',
    ]
})
export class ConnectionsDownloadedModalComponent {
    public includeSteps = false;
    public dataSorting = [
        {
            name: 'Groups',
            labelName: 'Name',
            labelPriority: 'Priority',
            sorting: 'name',
            componentOrder: ComponentOrder.groups
        },
        {
            name: 'Series',
            labelName: 'Name',
            labelPriority: 'Priority',
            sorting: 'name',
            componentOrder: ComponentOrder.series
        },
        {
            name: 'Steps',
            labelName: 'Name',
            labelPriority: 'Priority',
            sorting: 'name',
            componentOrder: ComponentOrder.steps
        }
    ];
    public userFactorDataSorting = [{
        name: 'userFactorGroups',
        text: 'Groups',
        labelName: 'Name',
        labelPriority: 'Priority',
        sorting: 'name',
        componentOrder: ComponentOrder.groups
    },
    {
        name: 'userFactorSeries',
        text: 'Series',
        labelName: 'Name',
        labelPriority: 'Priority',
        sorting: 'name',
        componentOrder: ComponentOrder.series
    },
    {
        name: 'userFactorSteps',
        text: 'Steps',
        labelName: 'Name',
        labelPriority: 'Priority',
        sorting: 'name',
        componentOrder: ComponentOrder.steps
    }];
    constructor(
        public dialogRef: MatDialogRef<ConnectionsDownloadedModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    public onNoClick(value: boolean): void {
        this.dialogRef.close(value);
    }

    public setValue(obj: any, nameField: string): boolean {
        return obj.sorting === nameField;
    }

    public handleSortingUp(obj: any, index: number, nameArray: string): void {
        // TODO: REMOVE THIS. only for demo
        const tmp = this[nameArray][index - 1];
        this[nameArray][index] = tmp;
        this[nameArray][index - 1] = obj;
    }

    public handleSortingDown(obj: any, index: number, nameArray: string): void {
        // TODO: REMOVE THIS. only for demo
        const tmp = this[nameArray][index + 1];
        this[nameArray][index] = tmp;
        this[nameArray][index + 1] = obj;
    }

    public handleChangeValue({ value }: MatRadioChange, obj: any, nameArray: string): void {
        this[nameArray] = this[nameArray].map(item => {
            if (item.name === obj.name) {
                return {
                    ...item,
                    sorting: value
                };
            }

            return item;
        });
    }

    public handleAll(): void {
        this.dialogRef.close({
            ...this.getDataSorting(),
            isSelected: false
        });
    }

    public handleSelected(): void {
        this.dialogRef.close({
            ...this.getDataSorting(),
            isSelected: true
        });
    }

    private getDataSorting(): any {
        return {
            componentsSort: this.dataSorting.map(({ componentOrder, sorting }) => ({ componentOrder, sortBy: sorting })),
            // tslint:disable-next-line:max-line-length
            userFactorSort: this.userFactorDataSorting.map(({ componentOrder, sorting }) => ({ userFactorOrder: componentOrder, sortBy: sorting })),
            includeSteps: this.includeSteps,
            type: 1,
        };
    }
}
