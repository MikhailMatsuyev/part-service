import { flattenDeep } from 'lodash';
import { AppTreeAnalyzeComponent } from './tree-analyze-elements/tree-analyze-elements.component';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UniterState } from '@core/store/reducers';
import { Store, select } from '@ngrx/store';
import * as Selections from '@store/selection';
import { combineLatest } from 'rxjs';
import { untilDestroyed, Unsubscribe, OnDestroy } from '@core/decorators/unsubscribe';

@Component({
    selector: 'app-analyze-elements',
    templateUrl: './analyze-elements.component.html',
    styleUrls: [
        '../combine-elements/combine-elements.component.scss',
        './analyze-elements.component.sass'
    ],
})
@Unsubscribe()
export class AnalyzeElementsComponent implements OnInit, OnDestroy {
    public dataTree: any;
    public activeName: string;

    @ViewChild(AppTreeAnalyzeComponent) public treeAnalyze: AppTreeAnalyzeComponent;

    constructor(
        public dialogRef: MatDialogRef<AnalyzeElementsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private store: Store<UniterState>
    ) { }

    public ngOnInit(): void {
        combineLatest(
            this.store.pipe(
                select(Selections.getImposibleComponent)
            ),
            this.store.pipe(
                select(Selections.getAvailableUF)
            )
        ).pipe(
            untilDestroyed(this),
        ).subscribe(([{ data, name }, { data: analyzeData}]) => {
            this.activeName = name;
            this.dataTree = {
                analyzeData,
                ...data,
            };
        });
    }

    public ngOnDestroy(): void {
    }

    public handleStatusChange(data: any): void {
        if (data.checked) {
            this.store.dispatch(new Selections.GetAvailableUFValues({ data: [data.id], isActiveModal: false }));
        } else {
            this.store.dispatch(new Selections.ChangeStatusAnalyzeStep(data));
        }
    }

    public handleChangeStatusNodeUF({ id, checked, ...allData }: any): void {
        const csvIds = this.dataTree.cs.map(item => item.steps.find(({ active }) => active) || []).map(({ stepId }) => stepId);
        const data = { csvIds, ufvIds: [] };
        this.store.dispatch(new Selections.SetAnalyzeElementsUf({ ...allData, id, checked }));

        if (checked) {
            this.store.dispatch(new Selections.GetComponentsState({
                data,
                isActiveModal: false
            }));
        }

        this.store.dispatch(new Selections.UncompatableUserFactorValues(data));
    }

    public onNoClick(value: boolean): void {
        this.dialogRef.close(value);
    }

    public confirm(): void {
        let data = this.treeAnalyze.treeData
            .filter(({ name }) => name === 'User Factors')
            .map(({ children }) => children.map(({ children: childrenStep }) => childrenStep.filter(({ selected }) => selected)));
        data = flattenDeep(data).map(({ id }) => id);
        this.dialogRef.close(data);
    }
}
