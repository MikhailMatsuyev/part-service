import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { exhaustMap, catchError, map, withLatestFrom } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { EffectError } from './user-factors.effects';
import { RecommendationsService } from '../services/recommendations.service';
import { UniterState } from '@store/reducers';
import {
    getActiveComponentSeries,
    getActiveUserFactor,
    getActiveComponentStep,
    getActiveUserFactorStep,
    RecommendationsCalculationsActionTypes,
    GetComponentSeriesSuccess,
    GetUserFactorSuccess,
    GetItemDependenciesSuccess,
    GetValuesWithStatusSuccess,
    GetDimensionsSuccess,
    GetRecommendationViewSuccess,
    GetItemDependencies,
    GetValuesWithStatus,
    GetLastChangesSuccess,
    AutoGenerateSuccess,
    CancelUpdateSuccess,
    GetRecommendationView,
    getDimensionsRecommendation,
    getTableCount,
    SetActiveCs,
    SetActiveUf,
    ExportCalculateTableSuccess,
    SetCalculateTableModel,
    GetUpdateStatusSuccess,
    GetItemDependenciesSeries
} from '@store/recommendations-calculations';
import { omit } from '@utils/utilsfunc';

const colsTable = 11;

@Injectable()
export class RecommendationsCalculationsEffects {
    constructor(
        public actions$: Actions,
        private store$: Store<UniterState>,
        private recommendationsService: RecommendationsService
    ) {
    }

    @Effect()
    public getComponentSeries$ = this.actions$
        .pipe(
            ofType(RecommendationsCalculationsActionTypes.GET_COMPONENT_SERIES),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.recommendationsService.getCsMainDropDown(payload)
                    .pipe(
                        exhaustMap((item) => from([
                            new GetComponentSeriesSuccess(item),
                            new GetItemDependencies({ type: 0 })
                        ])),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public getUserFactor$ = this.actions$
        .pipe(
            ofType(RecommendationsCalculationsActionTypes.GET_USER_FACTOR),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.recommendationsService.getUfMainDropDown(payload)
                    .pipe(
                        exhaustMap((item) => from([
                            new GetUserFactorSuccess(item),
                            new GetItemDependenciesSeries({ type: 1 })
                        ])),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public getItemDependenciesUserFactor$ = this.actions$
        .pipe(
            ofType(RecommendationsCalculationsActionTypes.GET_ITEM_DEPENDENCIES_SERIES),
            withLatestFrom(this.store$.select(getActiveUserFactor)),
            map(([action, item]) => {
                const { payload } = action as IUnsafeAction;
                return {
                    ...payload,
                    id: payload.id || item.id
                };
            }),
            exhaustMap(items =>
                this.recommendationsService.getItemDependencies(items)
                    .pipe(
                        exhaustMap((item) => from([
                            new SetActiveUf(items.id),
                            new GetItemDependenciesSuccess({ data: item, type: items.type }),
                            new GetValuesWithStatus({ type: items.type, ufId: items.id })])
                        ),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public getItemDependencies$ = this.actions$
        .pipe(
            ofType(RecommendationsCalculationsActionTypes.GET_ITEM_DEPENDENCIES),
            withLatestFrom(this.store$.select(getActiveComponentSeries)),
            map(([action, item]) => {
                const { payload } = action as IUnsafeAction;
                return {
                    ...payload,
                    id: payload.id || item.id
                };
            }),
            exhaustMap(items =>
                this.recommendationsService.getItemDependencies(items)
                    .pipe(
                        exhaustMap((item) => from([
                            new SetActiveCs(items.id),
                            new GetItemDependenciesSuccess({ data: item, type: items.type }),
                            new GetValuesWithStatus({ type: items.type, csId: items.id })
                        ])),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public getValuesWithStatus$ = this.actions$
        .pipe(
            ofType(RecommendationsCalculationsActionTypes.GET_VALUES_WITH_STATUS),
            withLatestFrom(
                // tslint:disable-next-line:max-line-length
                this.store$.select(({ recommendationsCalculations: { isActiveComponentSeries, isActiveUserFactor } }) => ({ csItem: isActiveComponentSeries, ufItem: isActiveUserFactor }))
            ),
            map(([action, { csItem, ufItem }]) => {
                const { payload } = action as IUnsafeAction;

                return {
                    ufId: (payload && payload.type === 1 && payload.ufId) ? payload.ufId : (ufItem ? ufItem.id : -1),
                    csId: (payload && payload.type === 0 && payload.csId) ? payload.csId : (csItem ? csItem.id : -1)
                };
            }),
            exhaustMap(data =>
                this.recommendationsService.getValuesWithStatus(data)
                    .pipe(
                        exhaustMap((item) => from([
                            new SetActiveCs(data.csId),
                            new SetActiveUf(data.ufId),
                            new GetValuesWithStatusSuccess(item)
                        ])),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public getDimensions$ = this.actions$
        .pipe(
            ofType(RecommendationsCalculationsActionTypes.GET_DIMENSIONS),
            withLatestFrom(
                this.store$.select(getActiveComponentSeries),
                this.store$.select(getActiveUserFactor),
                this.store$.select(getActiveComponentStep),
                this.store$.select(getActiveUserFactorStep)
            ),
            map(([action, { id: csId }, { id: ufId }, cs, uf]) => {
                const { payload } = action as IUnsafeAction;

                return {
                    payload,
                    ufId,
                    csId,
                    steps: {
                        cs,
                        uf
                    }
                };
            }),
            exhaustMap((data) =>
                this.recommendationsService.getDimensionsRecommendation(omit(data, ['payload']))
                .pipe(
                    exhaustMap((item) => from([
                        new GetDimensionsSuccess(item),
                        new GetRecommendationView({ ...omit(data, ['payload']), ...data.payload })
                    ])),
                    catchError(() => of(new EffectError()))
                )
            )
        );

    @Effect()
    public getRecommendationView$ = this.actions$
        .pipe(
            ofType(RecommendationsCalculationsActionTypes.GET_RECOMMENDATION_VIEW),
            withLatestFrom(
                this.store$.select(getDimensionsRecommendation),
                this.store$.select(getTableCount),
            ),
            map(([action, item, {rowFirst, colFirst}]) => {
                const { payload } = action as IUnsafeAction;
                const totalItem = item.Components * item.Values;

                return {
                    ...payload,
                    colFirst,
                    colsTotal: colsTable,
                    colsToLoad: colsTable,
                    rowFirst,
                    rowsTotal: totalItem,
                    rowsToLoad: totalItem
                };
            }),
            exhaustMap((data) =>
                this.recommendationsService.getRecommendationView(data)
                .pipe(
                    exhaustMap((item) => from([new GetRecommendationViewSuccess(item), new SetCalculateTableModel(data)])),
                    catchError(() => of(new EffectError()))
                )
            )
        );

    @Effect()
    public getLastChanges$ = this.actions$
        .pipe(
            ofType(RecommendationsCalculationsActionTypes.GET_LAST_CHANGES),
            exhaustMap(({payload}: IUnsafeAction) =>
                this.recommendationsService.lastChanges(payload)
                .pipe(
                    map((item) => new GetLastChangesSuccess(item)),
                    catchError(() => of(new EffectError()))
                )
            )
        );

    @Effect()
    public autoGenerate$ = this.actions$
        .pipe(
            ofType(RecommendationsCalculationsActionTypes.AUTO_GENERATE),
            exhaustMap(() =>
                this.recommendationsService.autoGenerate()
                .pipe(
                    map(() => new AutoGenerateSuccess()),
                    catchError(() => of(new EffectError()))
                )
            )
        );

    @Effect()
    public cancelUpdate$ = this.actions$
        .pipe(
            ofType(RecommendationsCalculationsActionTypes.CANCEL_UPDATE),
            exhaustMap(() =>
                this.recommendationsService.killUpdates(1)
                .pipe(
                    map(() => new CancelUpdateSuccess()),
                    catchError(() => of(new EffectError()))
                )
            )
        );

    @Effect()
    public exportCalculateTable$ = this.actions$
        .pipe(
            ofType(RecommendationsCalculationsActionTypes.EXPORT_CALCULATE_TABLE),
            withLatestFrom(
                this.store$.select(state => state.recommendationsCalculations.exportTableModel),
                this.store$.select(getActiveComponentSeries),
                this.store$.select(getActiveUserFactor),
                this.store$.select(getActiveComponentStep),
                this.store$.select(getActiveUserFactorStep)
            ),
            map(([actions, item, { id: csId }, { id: ufId }, cs, uf]) => {
                const { payload } = actions as IUnsafeAction;
                return {
                    ...item,
                    viewType: payload,
                    ufId,
                    csId,
                    steps: {
                        cs,
                        uf
                    }
                };
            }),
            exhaustMap((data: any) =>
                this.recommendationsService.exportCalculationsTable(data)
                    .pipe(
                        map(() => new ExportCalculateTableSuccess()),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public getUpdateStatus$ = this.actions$
        .pipe(
            ofType(RecommendationsCalculationsActionTypes.GET_UPDATE_STATUS),
            exhaustMap(() =>
                this.recommendationsService.getUpdateStatus()
                .pipe(
                    map((item) => new GetUpdateStatusSuccess(item)),
                    catchError(() => of(new EffectError()))
                )
            )
        );
}
