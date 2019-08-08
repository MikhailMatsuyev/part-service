import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UniterState } from '@store/reducers';
import * as AppLayout from '@store/app-layout';
import {
    SetStepsScopesRoleValues,
    SetStepsScopesRoleTable,
    SetStepsScopesComponentSeriesTableChoosed,
    SetStepsScopesActiveAllComponentSteps,
    SetStepsScopesActiveOneComponentSteps,
    SetStepsScopesActiveAllStepsAllSeries,
    getComponentSeriesValuesSelector,
    getRoleValuesSelector,
    getComponentSeriesValuesChoosedSelector,
    getRoleValueChoosed,
    getScopesComponentStepsValues,
    getComponentStepsCheckBoxesAllSelector,
    SetDefaultState
} from '@store/steps-scopes';
import { MatRadioChange, MatCheckboxChange } from '@angular/material';

@Component({
    selector: 'app-steps-scopes',
    templateUrl: './steps-scopes.component.html',
    styleUrls: ['./steps-scopes.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepsScopesComponent implements OnInit, OnDestroy {
    public roleValues$ = this.store$.pipe(select(getRoleValuesSelector));
    public componentSeriesValue$ = this.store$.pipe(select(getComponentSeriesValuesSelector));
    public roleValueChoosed$ = this.store$.pipe(select(getRoleValueChoosed));
    public componentSeriesValueChoosed$ = this.store$.pipe(select(getComponentSeriesValuesChoosedSelector));
    public componentStepsValues$ = this.store$.pipe(select(getScopesComponentStepsValues));
    public checkBoxesAllSelector$ = this.store$.pipe(select(getComponentStepsCheckBoxesAllSelector));
    public roleValue = '';
    public componentSeriesValue = '';
    public componentSeriesId = '';

    constructor(
        private readonly store$: Store<UniterState>
    ) {   }

    public ngOnInit(): void {
        this.store$.dispatch(new SetStepsScopesRoleValues());
    }

    public ngOnDestroy(): void {
        this.store$.dispatch(new SetDefaultState());
    }

    public handleClickItemRole({ value }: MatRadioChange): void {
        this.store$.dispatch(new SetStepsScopesRoleTable(value));
    }

    public handleClickItemComponentSeries({ value }: MatRadioChange): void {
        this.store$.dispatch(new SetStepsScopesComponentSeriesTableChoosed(value));
    }

    public changeHeader({ checked }: MatCheckboxChange): void {
        this.store$.dispatch(new SetStepsScopesActiveAllComponentSteps({ checked, type : StepsScopesRequestTypes.allsteps }));
    }

    public handleChangeStepOneItem({ checked }: MatCheckboxChange, id: number): void {
        this.store$.dispatch(new SetStepsScopesActiveOneComponentSteps({ checked, id, type : StepsScopesRequestTypes.onestep }));
    }

    public trackByFn(index: number, item: any): number {
        return item.id;
    }

    public handleClickCheckAll( checked: boolean): void {
        this.store$.dispatch(new SetStepsScopesActiveAllStepsAllSeries({ checked, type : StepsScopesRequestTypes.allseries }));
    }
}
