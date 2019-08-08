import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { exhaustMap, catchError, map, withLatestFrom } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { EffectError } from './user-factors.effects';
import {
    UserConnectionsActionTypes,
    GetUserFactorSuccess,
    GetConnectedComponentSeriesSuccess,
    GetComponentSeriesDimImplSuccess,
    GetConnectedFormulasSuccess,
    UpdateUserFactorImplSuccess,
    GetConnectedComponentSeries,
    GetNetworkData,
    getUserFactorsDepth,
    GetNetworkDataSuccess,
    getUserFactorsConnections,
    SetUserFactorsImplSuccess,
    GetCombinedComponent,
    SetCombinedComponentSeriesSuccess,
    getActiveConnectedUserFactor,
    getActiveSeriesList,
    GetComponentSeriesDimImpl,
    GetConnectedFormulas,
    GetConnectedUserFactor,
    DownloadComponentConnectionsSuccess,
    GetUserFactorsListSuccess,
    GetComponentSeriesImplSuccess,
    GetConnectedUserFactorSuccess
} from '../store/user-connections';
import { UserFactorsService } from '../services/userfactors.service';
import { UniterState } from '@core/store/reducers';
import { omit } from '@utils/utilsfunc';
import { CommonApiService } from '@core/services/common-api.service';
import { ComponentService } from '@core/services/component.service';

@Injectable()
export class UserFactorConnectionsEffects {
    constructor(
        public actions$: Actions,
        private userFactorsService: UserFactorsService,
        private store$: Store<UniterState>,
        private commonApiService: CommonApiService,
        private componentService: ComponentService
    ) {
    }

    @Effect()
    public getUserData$ = this.actions$
        .pipe(
            ofType(UserConnectionsActionTypes.GET_USER_FACTOR),
            exhaustMap(({payload}: IUnsafeAction) =>
                this.userFactorsService.getUserFactorsIMPL(payload)
                    .pipe(
                        map(item => new GetUserFactorSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
    );

    @Effect()
    public getConnectedUF$ = this.actions$
        .pipe(
            ofType(UserConnectionsActionTypes.GET_CONNECTED_USER_FACTORS),
            exhaustMap(({payload}: IUnsafeAction) =>
                this.userFactorsService.getConnectedUserFactors(payload)
                    .pipe(
                        map(item => new GetConnectedUserFactorSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public getConnectedComponent$ = this.actions$
        .pipe(
            ofType(UserConnectionsActionTypes.GET_CONNECTED_COMPONENT_SERIES),
            exhaustMap(({payload}: IUnsafeAction) =>
                this.userFactorsService.getConnectedComponentSeries(payload)
                    .pipe(
                        map(item => new GetConnectedComponentSeriesSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public getComponentSeries$ = this.actions$
        .pipe(
            ofType(UserConnectionsActionTypes.GET_COMPONENT_SERIES_DIMIMPL),
            exhaustMap(({payload}: IUnsafeAction) =>
                this.userFactorsService.getComponentSeriesDimImpl(payload)
                    .pipe(
                        map(item => new GetComponentSeriesDimImplSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public getConnectedFormules$ = this.actions$
        .pipe(
            ofType(UserConnectionsActionTypes.GET_CONNECTED_FORMULAS),
            exhaustMap(({payload}: IUnsafeAction) =>
                this.userFactorsService.getConnectedFormulas(payload)
                    .pipe(
                        map(item => new GetConnectedFormulasSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public getNetworkData$ = this.actions$
        .pipe(
            ofType(UserConnectionsActionTypes.GET_NETWORK_DATA),
            exhaustMap(({payload}: IUnsafeAction) =>
                this.userFactorsService.getNetworkData(payload)
                    .pipe(
                        map(item => new GetNetworkDataSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public editUserFactorImpl$ = this.actions$
        .pipe(
            ofType(UserConnectionsActionTypes.UPDATE_USER_FACTOR_IMPL),
            exhaustMap(({ payload }: IUnsafeAction) => {
                const { isNeedUpdate } = payload;
                let data = omit(payload, ['isNeedUpdate', 'isChecked']);

                if (!isNeedUpdate && data.maxDim <= 0) {
                    data = { ...data, dimEnabled: false };
                }

                return this.userFactorsService.editUserFactorImpl(data)
                    .pipe(
                        map(item => new UpdateUserFactorImplSuccess({ ...item, isNeedUpdate })),
                        catchError(() => of(new EffectError()))
                    );
            })
        );

    @Effect()
    public getCombineComponents$ = this.actions$
        .pipe(
            ofType(UserConnectionsActionTypes.GET_COMBINED_COMPONENT),
            withLatestFrom(this.store$.select(getUserFactorsDepth)),
            exhaustMap(([action, depth]) => {
                const { payload } = action as IUnsafeAction;
                return from([
                    new GetConnectedFormulas(payload),
                    new GetConnectedComponentSeries(payload),
                    new GetConnectedUserFactor(payload),
                    new GetNetworkData({ id: payload, depth }),
                    new GetComponentSeriesDimImpl(payload)
                ]);
            })
    );

    @Effect()
    public downloadComponentConnections$ = this.actions$
        .pipe(
            ofType(UserConnectionsActionTypes.DOWNLOAD_COMPONENT_CONNECTIONS),
            withLatestFrom(this.store$.select(getUserFactorsConnections)),
            map(([action, item]) => {
                const { payload } = action as IUnsafeAction;
                return {
                    ...omit(payload, ['isSelected']),
                    serieIds: payload.isSelected ? item.filter((items: any) => items.isChecked).map(items => items.id) : [],
                };
            }),
            exhaustMap((data: any) =>
                this.commonApiService.downloadConnections(data)
                    .pipe(
                        map(() => new DownloadComponentConnectionsSuccess()),
                        catchError(() => of(new EffectError()))
                    )
        )
    );

    @Effect()
    public getUserFactorsList$ = this.actions$
        .pipe(
            ofType(UserConnectionsActionTypes.GET_USER_FACTORS_LIST),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.userFactorsService.getUserFactorsList(payload)
                    .pipe(
                        map((item) => new GetUserFactorsListSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
        )
    );

    @Effect()
    public getComponentSeriesImpl$ = this.actions$
        .pipe(
            ofType(UserConnectionsActionTypes.GET_COMPONENT_SERIES_IMPL),
            exhaustMap(() =>
                this.componentService.getComponentIMPL()
                    .pipe(
                        map((item) => new GetComponentSeriesImplSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
        )
    );

    @Effect()
    public saveUserFactorsImpl$ = this.actions$
        .pipe(
            ofType(UserConnectionsActionTypes.SET_USER_FACTORS_IMPL),
            withLatestFrom(this.store$.select(getActiveConnectedUserFactor)),
            map(([action, item]) => {
                const { payload } = action as IUnsafeAction;
                return {
                    ...payload,
                    values: item.filter((items: any) => items.isChecked).map(items => items.id),
                };
            }),
            exhaustMap((data: any) =>
                this.userFactorsService.saveConnectedUserFactors(data)
                    .pipe(
                        exhaustMap((item) => from([new SetUserFactorsImplSuccess(item), new GetCombinedComponent(data.id)])),
                        catchError(() => of(new EffectError()))
                    )
        )
    );

    @Effect()
    public saveCombinedComponentSeries$ = this.actions$
        .pipe(
            ofType(UserConnectionsActionTypes.SET_COMBINED_COMPONENT_SERIES),
            withLatestFrom(this.store$.select(getActiveSeriesList)),
            map(([action, item]) => {
                const { payload } = action as IUnsafeAction;
                return {
                    ...payload,
                    values: item.filter((items: any) => items.isChecked).map(items => items.id),
                };
            }),
            exhaustMap((data: any) =>
                this.userFactorsService.saveComponentSeriesDimImpl(data)
                    .pipe(
                        exhaustMap((item) => from([new SetCombinedComponentSeriesSuccess(item), new GetCombinedComponent(data.id)])),
                        catchError(() => of(new EffectError()))
                    )
        )
    );
}
