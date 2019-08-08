import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { exhaustMap, catchError, map, withLatestFrom } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { EffectError } from './user-factors.effects';
import * as Analyze from '@store/analyze';
import { AnalyzeService } from '../services/analyze.service';
import { Store } from '@ngrx/store';
import { UniterState } from '@core/store/reducers';
import { debug } from 'util';


@Injectable()
export class AnalyzeEffects {
    constructor(
        public actions$: Actions,
        private readonly analyze: AnalyzeService,
        private readonly store$: Store<UniterState>,
    ) {
    }

    @Effect()
    public getComponentSeries$ = this.actions$
        .pipe(
            ofType(Analyze.AnalyzeActionTypes.GET_COMPONENT_SERIES),
            exhaustMap(() =>
                this.analyze.getComponentSeries()
                    .pipe(
                        exhaustMap((item) => from([
                            new Analyze.GetComponentSeriesSuccess(item),
                            new Analyze.GetComponentSteps()
                        ])),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public getComponentSteps$ = this.actions$
        .pipe(
            ofType(Analyze.AnalyzeActionTypes.GET_COMPONENT_STEPS),
            withLatestFrom(this.store$.select(Analyze.getActiveSeries)),
            map(([action, item]) => (action && (<IUnsafeAction>action).payload) || (<any>item).Id),
            exhaustMap(data =>
                this.analyze.getComponentsSteps(data)
                    .pipe(
                        exhaustMap((item) => from([
                            new Analyze.GetComponentStepsSuccess(item),
                            new Analyze.GetStepsAnalyze(data),
                            new Analyze.GetValueCounts(data)
                        ])),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public getStepsAnalyze$ = this.actions$
        .pipe(
            ofType(Analyze.AnalyzeActionTypes.GET_STEPS_ANALYZE),
            withLatestFrom(this.store$.select(Analyze.getActiveSeries)),
            map(([action, item]) => (action && (<IUnsafeAction>action).payload) || (<any>item).Id),
            exhaustMap(payload =>
                this.analyze.getCsUfStepsAnalyze(payload)
                    .pipe(
                        map((item) => new Analyze.GetStepsAnalyzeSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public getValuesCount$ = this.actions$
        .pipe(
            ofType(Analyze.AnalyzeActionTypes.GET_VALUE_COUNT),
            withLatestFrom(
                this.store$.select(Analyze.getActiveSeries),
                this.store$.select(Analyze.getAllInvalid),
                this.store$.select(Analyze.getDependetMode),
                this.store$.select(Analyze.getComponentStep),
                this.store$.select(Analyze.getShowingTablePosition)
            ),
            map(([action, item, allInvalid, dependGroupMode, componentStep, isTablePositionHorizontal]) => {
                const { steps } = componentStep.series[0];
                console.log("---", steps);
                //let steps = [];

                //if (componentStep && componentStep.series && componentStep.series.length > 0) {
                //    steps = componentStep.series[0].steps;
                //}

                const items = steps.filter(i => !i.checked).map(i => i.compId);

                return {
                    id: (action && (<IUnsafeAction>action).payload) || (<any>item).Id,
                    allInvalid,
                    dependGroupMode,
                    steps: items
                };
            }),
            exhaustMap(data =>
                this.analyze.getValueCounts(data)
                    .pipe(
                        exhaustMap((item) => from([
                            new Analyze.GetValueCountsSuccess(item),
                            new Analyze.SetShowingTableHorizontal()
                        ])),
                        catchError(() => of(new EffectError()))
                    )
            )
        );
}
