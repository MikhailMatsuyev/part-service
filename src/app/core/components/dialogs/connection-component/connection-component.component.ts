import { Component, ChangeDetectionStrategy, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatCheckboxChange } from '@angular/material';
import { UniterState } from '../../../store/reducers';
import { Store } from '@ngrx/store';
import {
    getComponentValue,
    PerformanceComponentGet,
    getPerformance,
    PerformanceGet
} from '../../../store/component-values';
import * as _ from 'lodash';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-connection-component',
    templateUrl: './connection-component.component.html',
    styleUrls: [
        './connection-component.component.sass'
    ]
})
export class ConnectionComponent implements OnInit {
    public componentGroup: string;
    public dataArray = [];
    public componentValues$ = this.store.select(getComponentValue);
    public performance = [];
    public removeAll = [];
    public componentsGroup = [];

    public get checkedAllSteps(): boolean {
        const data = this.dataArray.filter(item => item.id === this.componentGroup);

        return data.length === 0
            ? false
            : data.every(item => item.serieActive);
    }

    constructor(
        public dialogRef: MatDialogRef<ConnectionComponent>,
        private readonly store: Store<UniterState>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    public ngOnInit(): void {
        this.store.select(getPerformance)
            .pipe(
                filter(item => item && item.length > 0 && !item.some(items => items.isChecked === undefined))
            )
            .subscribe(item => {
                this.performance = item;

                if (this.dataArray.length === 0 || !this.dataArray.find(items => items.id === this.componentGroup)) {
                    this.performance.forEach(({ isChecked, id }) => this.handleStepChange((<any>{ checked: isChecked }), id));
                }
            });

        this.store.dispatch(new PerformanceGet());

        if (this.data && this.data.groupId) {
            this.componentGroup = this.data.groupId;
            this.store.dispatch(new PerformanceComponentGet(this.data.groupId));
        }
    }

    public onNoClick(value: boolean): void {
        this.dialogRef.close(value);
    }

    public confirm(): void {
        // TODO: refactor this method
        const dataArray = this.dataArray.filter(item => item.serieActive).map(({ id, values }) => ({ id: Number(id), values }));
        const data = _.chain(dataArray)
            .groupBy('id')
            .toPairs()
            .map(item => _.zipObject(['id', 'values'], item))
            .map(item => ({...item, values: item.values.map(({values}) => values)}))
            .value();

        let dataSend = (this.dataArray.length > 0 && dataArray.length === 0)
            ? [{ id: this.componentGroup, values: [] }]
            : data;

        if (this.removeAll.length > 0) {
            dataSend = [...dataSend, ...this.removeAll.map(item => ({ id: item.id, values: [] }))];
        }

        const elements = this.componentsGroup
            .filter(item => !dataSend.find(dataItem => Number(dataItem.id) === item))
            .map(item => ({ id: item, values: [] }));
        this.dialogRef.close([...dataSend, ...elements]);
    }

    public changeValues(value): void {
        this.componentsGroup = Array.from(new Set([...this.componentsGroup, value]));
        this.store.dispatch(new PerformanceComponentGet(value));
    }

    public handleStepChange({ checked }: MatCheckboxChange, values: number): void {
        const element = this.dataArray.find(item => item.id === this.componentGroup && item.values === values);

        if (element) {
            this.dataArray = this.dataArray.map(item => {
                if (item.id === this.componentGroup && item.values === values) {
                    return {
                        ...item,
                        serieActive: checked
                    };
                }

                return item;
            });
        } else {
            this.dataArray = [...this.dataArray, { id: this.componentGroup, values, serieActive: checked }];
        }
    }

    public checkedSteps(id: number, status: boolean): boolean {
        return !!this.dataArray.find(item => item.id === this.componentGroup && item.serieActive && item.values === id);
    }

    public handleSelectAllChange({ checked }: MatCheckboxChange): void {
        if (!checked) {
            this.removeAll = [...this.removeAll, { id: this.componentGroup }];
        }
        this.performance.forEach(({ id }) => this.handleStepChange((<any>{ checked }), id));
    }

    public trackByFn(index, item): number {
        return item.id;
    }
}
