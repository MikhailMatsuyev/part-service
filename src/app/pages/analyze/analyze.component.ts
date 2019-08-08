import { Component, ChangeDetectionStrategy, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UniterState } from '@core/store/reducers';
import * as Analyze from '@store/analyze';
import { map } from 'rxjs/operators';
import { ResizeEvent } from 'angular-resizable-element';
import { MatCheckboxChange, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'app-analyze',
    templateUrl: './analyze.component.html',
    styleUrls: ['./analyze.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AnalyzeComponent implements OnInit {
    @Input() public maxHeightGroup = 350;
    public componentSeries$ = this.store.pipe(select(Analyze.getComponentSeries));
    public defaulItemSeries$ = this.store.pipe(
        select(Analyze.getActiveSeries),
        map((item: any) => item && item.Id)
    );
    public componentModes = ['Deselect Mode', 'Select Mode'];

    public combinedUser = [{
        name: 'Combined User Factor Dependent',
        value: true
    }, {
        name: 'Combined User Factor Independent',
        value: false
    }];
    public defaultDependMode$ = this.store.pipe(select(Analyze.getDependetMode));
    public listSeries$ = this.store.pipe(select(Analyze.getComponentStepSeries));
    public dataSource$ = this.store.pipe(select(Analyze.getForTable));
    public columnsName$ = this.store.pipe(select(Analyze.getColumnsName));
    public displayedColumns$ = this.store.pipe(select(Analyze.getDisplayedColumns));
    public arrayForTableTopRow$ = this.store.pipe(select(Analyze.getArrayForTableTopRow));
    public isTablePositionHorizontal$ = this.store.pipe(select(Analyze.getShowingTablePosition));
    public userFactorStep$ = this.store.pipe(select(Analyze.getUserFactorStep));
    public style: any;
    public colums: any;

    constructor(private readonly store: Store<UniterState>) { }

    public ngOnInit(): void {
        this.store.dispatch(new Analyze.GetComponentSeries());
    }

    public handleChangeSeries(value: number): void {
        this.store.dispatch(new Analyze.SetComponentSeries(value));
        this.store.dispatch(new Analyze.GetComponentSteps(value));
    }

    public handleChangeMode(value: string): void {
        this.store.dispatch(new Analyze.SetMode(value === 'Deselect Mode'));
        this.store.dispatch(new Analyze.GetValueCounts());
    }

    public handleChangeDependent(value: boolean): void {
        this.store.dispatch(new Analyze.SetDependGroupMode(value));
        this.store.dispatch(new Analyze.GetValueCounts());
    }

    public onResizeEnd({ rectangle: { height } }: ResizeEvent): void {
        const maxHeight = height <= this.maxHeightGroup ? this.maxHeightGroup : height;
        this.style = {
            height: `${height}px`,
            'max-height': `${maxHeight}px`
        };
    }

    public validate = ({ rectangle: { height } }: ResizeEvent): boolean => {
        return height && height > 30 && height <= this.maxHeightGroup;
    }

    public handleClickComponentStepChB({ checked }: MatCheckboxChange, id: number): void {
        this.store.dispatch(new Analyze.SetOneStepChoosed({ checked, id }));
        this.store.dispatch(new Analyze.GetValueCounts());
    }

    public switchHeadersTable(): void {
        this.store.dispatch(new Analyze.SetCanChangePositionTable(true));
        this.store.dispatch(new Analyze.SetShowingTableHorizontal());
    }

    public trackByFn(index: number, item: any): number {
        return item;
    }

    public getStyle(st) {
        if (st && st > 5) return "#14386A" ; 
        if (st && st === 5) return "#2E6CC0"; 
        if (st && st === 4) return "#6B9FE7";
        if (st && st <= 3 && st >= 1) return "#A9C1E1";
    } 
}
