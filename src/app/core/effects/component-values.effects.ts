import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { exhaustMap, catchError, map, filter } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { EffectError } from './user-factors.effects';
import { ComponentService } from '../services/component.service';
import {
    ComponentValuesActionTypes,
    ComponentValuesGetSuccess,
    ComponentValuesGetTableSuccess,
    ComponentStepsGetSuccess,
    CollapseValues,
    PerformanceGetSuccess,
    ComponentValuesGetTable,
    PerformanceComponentGetSuccess,
    SaveUserFactorValueSuccess,
    DownloadPerformancesSuccess,
    SetActiveComponentStep
} from '../store/component-values';


@Injectable()
export class ComponentValuesEffects {
    constructor(
        public actions$: Actions,
        private сomponentService: ComponentService,
    ) {
    }

    @Effect()
    public getComponentValues$ = this.actions$
        .pipe(
            ofType(ComponentValuesActionTypes.GET_COMPONENT_VALUES),
            exhaustMap(() =>
                this.сomponentService.getComponentIMPL()
                    .pipe(
                        map((item) => new ComponentValuesGetSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public getComponentTableValues$ = this.actions$
        .pipe(
            ofType(ComponentValuesActionTypes.GET_COMPONENT_VALUES_TABLE),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.сomponentService.getPerformancesComponentImpl(payload)
                    .pipe(
                        map((item) => new ComponentValuesGetTableSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public getComponentStep$ = this.actions$
        .pipe(
            ofType(ComponentValuesActionTypes.GET_COMPONENT_STEPS),
            exhaustMap(({ payload }: IUnsafeAction) => {
                const { collapse, serieId, withActiveMode } = payload;

                if (collapse.isCollapse && withActiveMode && collapse.isNeedCollapse) {
                    return of(new CollapseValues(collapse));
                }

                if (collapse.isCollapse && collapse.isNeedCollapse) {
                    return from([new CollapseValues(collapse), new SetActiveComponentStep(null)]);
                }

                return this.сomponentService.getComponentStepsImpl(serieId)
                    .pipe(
                        exhaustMap((item) =>
                            from([
                                new ComponentStepsGetSuccess({ steps: item, id: serieId, withActiveMode }),
                                new CollapseValues(collapse)
                            ])
                        ),
                        catchError(() => of(new SetActiveComponentStep(null)))
                    );
            })
        );

    @Effect()
    public getPerfomanceList$ = this.actions$
        .pipe(
            ofType(ComponentValuesActionTypes.GET_PERFORMANCE),
            exhaustMap(() =>
                this.сomponentService.getPerformancesImpl()
                    .pipe(
                        map((item) => new PerformanceGetSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public getPerfomanceComponent$ = this.actions$
        .pipe(
            ofType(ComponentValuesActionTypes.GET_PERFORMANCE_COMPONENT),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.сomponentService.getPerformancesSeriesImpl(payload)
                    .pipe(
                        map((item) => new PerformanceComponentGetSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public savePerformance$ = this.actions$
        .pipe(
            ofType(ComponentValuesActionTypes.SAVE_PERFORMANCE),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.сomponentService.savePerformancesSeriesImpl(payload.data)
                    .pipe(
                        filter(() => payload.stepId),
                        map(() => new ComponentValuesGetTable(payload.stepId)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );


    @Effect()
    public saveUserFactorValue$ = this.actions$
        .pipe(
            ofType(ComponentValuesActionTypes.SAVE_USER_FACTOR_VALUE),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.сomponentService.savePerformancesComponentImpl(payload)
                    .pipe(
                        map(item => new SaveUserFactorValueSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public downloadPerformances$ = this.actions$
        .pipe(
            ofType(ComponentValuesActionTypes.DOWNLOAD_PERFORMANCES),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.сomponentService.downloadPerformancesForComponents(payload)
                    .pipe(
                        map(item => new DownloadPerformancesSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );
}
