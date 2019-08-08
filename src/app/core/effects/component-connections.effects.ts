import { UniterState } from './../store/reducers';
import { Store } from '@ngrx/store';
import { EffectError } from './user-factors.effects';
import { exhaustMap, catchError, map, withLatestFrom } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { ComponentService } from '../services/component.service';
import {
    ComponentConnectionsActionTypes,
    GetComponentSeriesSuccess,
    GetComponentCombinedSeriesSuccess,
    GetConnectedUserFactorSuccess,
    GetNetworkDataSuccess,
    SetFictiveUserFactorSuccess,
    SetCombinedComponentSeriesSuccess,
    GetUserFactorsListSuccess,
    SetUserFactorsImplSuccess,
    GetComponentCombinedSeries,
    GetConnectedUserFactor,
    GetNetworkData,
    GetConnectedFormulSuccess,
    GetConnectedFormul,
    GetCombinedComponent,
    DownloadComponentConnectionsSuccess,
    getComponentSeries,
    getActiveConnectedUserFactor,
    getActiveSeriesList
} from '../store/component-connections';
import { of, from } from 'rxjs';
import { CommonApiService } from '../services/common-api.service';
import { omit } from '../../utils/utilsfunc';


@Injectable()
export class ComponentConnectionsEffects {
    constructor(
        public actions$: Actions,
        private сomponentService: ComponentService,
        private commonApiService: CommonApiService,
        private store$: Store<UniterState>,
    ) {
    }

    @Effect()
    public getComponentSeries$ = this.actions$
        .pipe(
            ofType(ComponentConnectionsActionTypes.GET_COMPONENT_SERIES),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.сomponentService.getComponentIMPL(payload)
                    .pipe(
                        map((item) => new GetComponentSeriesSuccess({data: item, connection: payload})),
                        catchError(() => of(new EffectError()))
                    )
        )
    );

    @Effect()
    public getCombinedComponentSeries$ = this.actions$
        .pipe(
            ofType(ComponentConnectionsActionTypes.GET_COMBINED_SERIES),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.сomponentService.getCombinedComponentSeriesImpl(payload)
                    .pipe(
                        map((item) => new GetComponentCombinedSeriesSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
        )
    );

    @Effect()
    public getConnectedUserFactor$ = this.actions$
        .pipe(
            ofType(ComponentConnectionsActionTypes.GET_CONNECTED_USER_FACTOR),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.сomponentService.getConnectedUfImpl(payload)
                    .pipe(
                        map((item) => new GetConnectedUserFactorSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
        )
    );

    @Effect()
    public getConnectedFormulas$ = this.actions$
        .pipe(
            ofType(ComponentConnectionsActionTypes.GET_CONNECTED_FORMUL),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.сomponentService.getConnectedFormulas(payload)
                    .pipe(
                        map((item) => new GetConnectedFormulSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
        )
    );

    @Effect()
    public getNetworkData$ = this.actions$
        .pipe(
            ofType(ComponentConnectionsActionTypes.GET_NETWORK_DATA),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.сomponentService.getNetworkData(payload)
                    .pipe(
                        map((item) => new GetNetworkDataSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
        )
    );

    @Effect()
    public setFictiveUserFactor$ = this.actions$
        .pipe(
            ofType(ComponentConnectionsActionTypes.SET_FICTIVE_USER_FACTOR),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.сomponentService.setFictiveUserFactor(payload)
                    .pipe(
                        exhaustMap((item) => from([new SetFictiveUserFactorSuccess(item), new GetCombinedComponent(payload.serieId)])),
                        catchError(() => of(new EffectError()))
                    )
        )
    );

    @Effect()
    public saveCombinedComponentSeries$ = this.actions$
        .pipe(
            ofType(ComponentConnectionsActionTypes.SET_COMBINED_COMPONENT_SERIES),
            withLatestFrom(this.store$.select(getActiveSeriesList)),
            map(([action, item]) => {
                const { payload } = action as IUnsafeAction;
                return {
                    ...payload,
                    values: item.filter((items: any) => items.isChecked).map(items => items.id),
                };
            }),
            exhaustMap((data: any) =>
                this.сomponentService.saveCombinedComponentSeriesImpl(data)
                    .pipe(
                        exhaustMap((item) => from([new SetCombinedComponentSeriesSuccess(item), new GetCombinedComponent(data.id)])),
                        catchError(() => of(new EffectError()))
                    )
        )
    );

    @Effect()
    public getUserFactorsList$ = this.actions$
        .pipe(
            ofType(ComponentConnectionsActionTypes.GET_USER_FACTORS_LIST),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.сomponentService.getUserFactorsList(payload)
                    .pipe(
                        map((item) => new GetUserFactorsListSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
        )
    );

    @Effect()
    public saveUserFactorsImpl$ = this.actions$
        .pipe(
            ofType(ComponentConnectionsActionTypes.SET_USER_FACTORS_IMPL),
            withLatestFrom(this.store$.select(getActiveConnectedUserFactor)),
            map(([action, item]) => {
                const { payload } = action as IUnsafeAction;
                return {
                    ...payload,
                    values: item.filter((items: any) => items.isChecked).map(items => items.id),
                };
            }),
            exhaustMap((data: any) =>
                this.сomponentService.saveUserFactorsImpl(data)
                    .pipe(
                        exhaustMap((item) => from([new SetUserFactorsImplSuccess(item), new GetCombinedComponent(data.id)])),
                        catchError(() => of(new EffectError()))
                    )
        )
    );

    @Effect()
    public getCombineComponents$ = this.actions$
        .pipe(
            ofType(ComponentConnectionsActionTypes.GET_COMBINED_COMPONENT),
            withLatestFrom(this.store$.select(state => state.componentConnections.depth)),
            exhaustMap(([action, depth]) => {
                const { payload } = action as IUnsafeAction;
                return from([
                    new GetComponentCombinedSeries(payload),
                    new GetConnectedUserFactor(payload),
                    new GetNetworkData({ id: payload, depth }),
                    new GetConnectedFormul(payload)
                ]);
            })
        );

    @Effect()
    public downloadComponentConnections$ = this.actions$
        .pipe(
            ofType(ComponentConnectionsActionTypes.DOWNLOAD_COMPONENT_CONNECTIONS),
            withLatestFrom(this.store$.select(getComponentSeries)),
            map(([action, item]) => {
                const { payload } = action as IUnsafeAction;
                return {
                    ...omit(payload, ['isSelected']),
                    serieIds: payload.isSelected ? item.filter((items: any) => items.checked).map(items => items.id) : [],
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
}
