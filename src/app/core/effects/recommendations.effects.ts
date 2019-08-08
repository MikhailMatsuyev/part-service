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
    RecommendationsActionTypes,
    GetComponentSeriesSuccess,
    GetItemDependencies,
    GetUserFactorSuccess,
    GetItemDependenciesSeries,
    GetLastChangesSuccess,
    SetActiveUf,
    GetItemDependenciesSuccess,
    GetValuesWithStatus,
    SetActiveCs,
    GetValuesWithStatusSuccess,
    getActiveComponentStep,
    getActiveUserFactorStep,
    GetDimensionsSuccess,
    GetRecommendationView,
    getDimensionsRecommendation,
    getTableCount,
    GetRecommendationViewSuccess,
    SetCalculateTableModel,
    AutoGenerateSuccess,
    CancelUpdateSuccess,
    ExportCalculateTableSuccess,
    GetUpdateStatusSuccess,
    GetDefaultRecommendationTypeSuccess,
    UpdateDefaultRecommendationTypeSuccess,
    getRecommendationTypes,
    GetSeriesPerformancesSuccess,
    DownloadUserFactorSuccess,
    SaveRowTableSuccess,
    GetCellCommentSuccess,
    SetCellCommentSuccess,
    GetCellComment,
    SetRowStatusSuccess,
    getRecommendationView,
    DownloadStepsSuccess,
    GetDimensions
} from '@store/recommendations';
import * as AppLayout from '@store/app-layout';
import { omit, unionArray } from '@utils/utilsfunc';
import { ComponentService } from '../services/component.service';
import { CreateLocalNotificaitonAction } from '@core/store/app-layout';

const colsTable = 11;

@Injectable()
export class RecommendationsEffects {
    constructor(
        public actions$: Actions,
        private readonly store$: Store<UniterState>,
        private readonly recommendationsService: RecommendationsService,
        private readonly componentService: ComponentService
    ) {
    }

    @Effect()
    public getComponentSeries$ = this.actions$
        .pipe(
            ofType(RecommendationsActionTypes.GET_COMPONENT_SERIES),
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
            ofType(RecommendationsActionTypes.GET_USER_FACTOR),
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
            ofType(RecommendationsActionTypes.GET_ITEM_DEPENDENCIES_SERIES),
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
            ofType(RecommendationsActionTypes.GET_ITEM_DEPENDENCIES),
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
            ofType(RecommendationsActionTypes.GET_VALUES_WITH_STATUS),
            withLatestFrom(
                // tslint:disable-next-line:max-line-length
                this.store$.select(getActiveUserFactor),
                this.store$.select(getActiveComponentSeries)
            ),
            map(([action, ufItem, csItem]) => {
                const { payload } = action as IUnsafeAction;

                return {
                    ufId: (payload && payload.type === 1 && payload.ufId) ? payload.ufId : (ufItem ? ufItem.id : -1),
                    csId: (payload && payload.type === 0 && payload.csId) ? payload.csId : (csItem ? csItem.id : -1),
                    viewType: payload.viewType
                };
            }),
            exhaustMap(data =>
                this.recommendationsService.getValuesWithStatus(omit(data, ['viewType']))
                    .pipe(
                    exhaustMap((item) => {
                            const dataFrom: any[] = [
                                new SetActiveCs(data.csId),
                                new SetActiveUf(data.ufId),
                                new GetValuesWithStatusSuccess(item)
                            ];

                            if (data.viewType) {
                                dataFrom.push(new GetDimensions(data.viewType));
                            }

                            return from(dataFrom);
                        }),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public getDimensions$ = this.actions$
        .pipe(
            ofType(RecommendationsActionTypes.GET_DIMENSIONS),
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
            ofType(RecommendationsActionTypes.GET_RECOMMENDATION_VIEW),
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
                this.recommendationsService.getRecommendationViewMain(data)
                .pipe(
                    exhaustMap((item) => {
                        const dataForm: any[] = [new GetRecommendationViewSuccess(item), new SetCalculateTableModel(data)];
                        if (item === null) {
                            dataForm.push(new AppLayout.CreateLocalNotificaitonAction({
                                type: 'danger',
                                text: 'No data to load'
                            }));
                        }
                        return from(dataForm);
                    }),
                    catchError(() => of(new EffectError()))
                )
            )
        );

    @Effect()
    public getLastChanges$ = this.actions$
        .pipe(
            ofType(RecommendationsActionTypes.GET_LAST_CHANGES),
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
            ofType(RecommendationsActionTypes.AUTO_GENERATE),
            exhaustMap(() =>
                this.recommendationsService.updateRecommendationsTable()
                .pipe(
                    map(() => new AutoGenerateSuccess()),
                    catchError(() => of(new EffectError()))
                )
            )
        );

    @Effect()
    public cancelUpdate$ = this.actions$
        .pipe(
            ofType(RecommendationsActionTypes.CANCEL_UPDATE),
            exhaustMap(() =>
                this.recommendationsService.killUpdates(0)
                .pipe(
                    map(() => new CancelUpdateSuccess()),
                    catchError(() => of(new EffectError()))
                )
            )
        );

    @Effect()
    public exportCalculateTable$ = this.actions$
        .pipe(
            ofType(RecommendationsActionTypes.EXPORT_CALCULATE_TABLE),
            withLatestFrom(
                this.store$.select(state => state.recommendations.exportTableModel),
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
            ofType(RecommendationsActionTypes.GET_UPDATE_STATUS),
            exhaustMap(() =>
                this.recommendationsService.getUpdateStatus()
                .pipe(
                    map((item) => new GetUpdateStatusSuccess(item)),
                    catchError(() => of(new EffectError()))
                )
            )
        );

    @Effect()
    public getRecommendationsType$ = this.actions$
        .pipe(
            ofType(RecommendationsActionTypes.GET_DEFAULT_RECOMMENDATION_TYPE),
            exhaustMap(() =>
                this.recommendationsService.getDefaultRecommendation()
                    .pipe(
                        map((item) => new GetDefaultRecommendationTypeSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public setRecommendationsType$ = this.actions$
        .pipe(
            ofType(RecommendationsActionTypes.UPDATE_DEFAULT_RECOMMENDATION_TYPE),
            withLatestFrom(
                this.store$.select(getRecommendationTypes),
            ),
            map(([, item]) => item.find(types => types.isActive).type),
            exhaustMap((item: RecommendationsType) =>
                this.recommendationsService.setDefaultRecommendation(item)
                    .pipe(
                        map(() => new UpdateDefaultRecommendationTypeSuccess()),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public getSeriesPerformances$ = this.actions$
        .pipe(
            ofType(RecommendationsActionTypes.GET_SERIES_PERFORMANCES),
            withLatestFrom(
                this.store$.select(getActiveComponentSeries),
            ),
            map(([, item]) => item.id),
            exhaustMap(data =>
                this.componentService.componentSeriesPerformances(data)
                    .pipe(
                        map((item) => new GetSeriesPerformancesSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public downloadUserFactor$ = this.actions$
        .pipe(
            ofType(RecommendationsActionTypes.DOWNLOAD_USER_FACTOR),
            withLatestFrom(
                this.store$.select(getActiveComponentSeries),
            ),
            map(([action, item]) => ({
                csId: item.id,
                ...(action as IUnsafeAction).payload
            })),
            exhaustMap(data =>
                this.recommendationsService.downloadUserFactors(data)
                    .pipe(
                        map(() => new DownloadUserFactorSuccess()),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public saveRowTable$ = this.actions$
        .pipe(
            ofType(RecommendationsActionTypes.SAVE_ROW_TABLE),
            exhaustMap(({payload}: IUnsafeAction) =>
                this.recommendationsService.saveRecommendationRow(payload.data)
                    .pipe(
                        map(() => new SaveRowTableSuccess({ ...payload, data: { ...payload.data, hasChanges: true }})),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public getCellComment$ = this.actions$
        .pipe(
            ofType(RecommendationsActionTypes.GET_CELL_COMMENT),
            exhaustMap(({payload}: IUnsafeAction) =>
                this.recommendationsService.getCommentOfCell(payload)
                    .pipe(
                        map(item => new GetCellCommentSuccess(item)),
                        catchError(() => of (new CreateLocalNotificaitonAction({type: 'danger', text: 'Sorry, something is wrong'})))
                    )
            )
        );

    @Effect()
    public setCellComment$ = this.actions$
        .pipe(
            ofType(RecommendationsActionTypes.SET_CELL_COMMENT),
            withLatestFrom(
                this.store$.select(getActiveComponentSeries),
                this.store$.select(getActiveUserFactor)
            ),
            map(([action, { id: csId }, { id: ufId }]) => ({
                ...(action as IUnsafeAction).payload,
                csId,
                ufId
            })),
            exhaustMap(data =>
                this.recommendationsService.setCommentToCell(data)
                    .pipe(
                        exhaustMap(() => from([
                            new SetCellCommentSuccess(data),
                            new GetCellComment({ csvId: data.csvId, ufvId: data.ufvId })
                        ])),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public setRowStatus$ = this.actions$
        .pipe(
            ofType(RecommendationsActionTypes.SET_ROW_STATUS),
            withLatestFrom(
                this.store$.select(getActiveComponentSeries),
                this.store$.select(getActiveUserFactor),
                this.store$.select(getActiveComponentStep),
                this.store$.select(getActiveUserFactorStep),
                this.store$.select(getRecommendationView)
            ),
            map(([action, { id: csId }, { id: ufId }, cs, uf, tableView]) => {
                let data = tableView.rows.filter(item => item.isActiveRow);
                data = data.reduce((acc, item) => [
                    ...acc,
                    ...(Object.keys(item)
                        .filter(key => key.slice(0, 3) === 'col')
                        .map(key => item[key].ufvId))
                ], []);
                const ufvIds = unionArray(data);
                return {
                    ...(action as IUnsafeAction).payload,
                    csId,
                    ufId,
                    ufvIds,
                    selectedSteps: {
                        cs,
                        uf
                    }
                };
            }),
            exhaustMap(data =>
                this.recommendationsService.setAllStepStatus(data)
                    .pipe(
                        map(() => new SetRowStatusSuccess(data)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public downloadSteps$ = this.actions$
        .pipe(
            ofType(RecommendationsActionTypes.DOWNLOAD_STEPS),
            withLatestFrom(
                this.store$.select(getActiveComponentSeries),
                this.store$.select(getActiveUserFactor),
            ),
            map(([, { id: csId }, { id: ufId }]) => ({
                csId,
                ufId
            })),
            exhaustMap(data =>
                this.recommendationsService.downloadStepsCsUf(data)
                    .pipe(
                        map(() => new DownloadStepsSuccess()),
                        catchError(() => of(new EffectError()))
                    )
            )
        );
}
