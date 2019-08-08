import { UniterState } from './../store/reducers';
import { Store } from '@ngrx/store';
import { EffectError } from './user-factors.effects';
import { exhaustMap, catchError, map, withLatestFrom } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { InterfaceService } from '../services/interface.service';
import {
    InterfaceConnectionsActionTypes,
    GetInterfacesSuccess,
    GetConnectedComponents,
    GetConnectedComponentsSuccess,
    GetInterfaceNetwork,
    GetInterfaceNetworkSuccess,
    GetConnectionElements,
    GetConnectionElementsSuccess,
    getConnectionElements,
    GetConnectionInfo,
    DownloadInterfaceConnectionsSuccess
} from '../store/interfaces-connections';
import { of, from } from 'rxjs';

@Injectable()
export class InterfaceConnectionsEffects {
    constructor(
        public actions$: Actions,
        private interfaceService: InterfaceService,
        private store$: Store<UniterState>,
    ) {
    }

    @Effect()
    public getInterfaces$ = this.actions$
        .pipe(
            ofType(InterfaceConnectionsActionTypes.GET_INTERFACES),
            exhaustMap(() =>
                this.interfaceService.getStdInterFaces()
                    .pipe(
                        map((item) => new GetInterfacesSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
        )
    );

    @Effect()
    public getConnectionsInfo$ = this.actions$
        .pipe(
            ofType(InterfaceConnectionsActionTypes.GET_CONNECTIONS_INFO),
            exhaustMap(({ payload }: IUnsafeAction) => {
                return from([
                    new GetConnectedComponents(payload),
                    new GetInterfaceNetwork(payload)
                ]);
            })
    );

    @Effect()
    public getConnectedComponents$ = this.actions$
        .pipe(
            ofType(InterfaceConnectionsActionTypes.GET_CONNECTED_COMPONENTS),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.interfaceService.getConnectedComponents(payload)
                    .pipe(
                        map((item) => new GetConnectedComponentsSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
        )
    );

    @Effect()
    public getInterfaceNetwork$ = this.actions$
        .pipe(
            ofType(InterfaceConnectionsActionTypes.GET_INTERFACE_NETWORK),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.interfaceService.getInterfaceNetwotk(payload)
                    .pipe(
                        map((item) => new GetInterfaceNetworkSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
        )
    );

    @Effect()
    public getConnectionElements$ = this.actions$
        .pipe(
            ofType(InterfaceConnectionsActionTypes.GET_CONNECTION_ELEMENTS),
            exhaustMap(() =>
                this.interfaceService.getConnectionElements()
                    .pipe(
                        map((elements) => new GetConnectionElementsSuccess(elements)),
                        catchError(() => of(new EffectError()))
                    )
        )
    );

    @Effect()
    public downloadInterfaceConnections$ = this.actions$
        .pipe(
            ofType(InterfaceConnectionsActionTypes.DOWNLOAD_INTERFACE_CONNECTIONS),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.interfaceService.downloadInterfaceConnections(payload)
                    .pipe(
                        map(() => new DownloadInterfaceConnectionsSuccess()),
                        catchError(() => of(new EffectError()))
                    )
        )
    );

    @Effect()
    public saveConnectionElements$ = this.actions$
        .pipe(
            ofType(InterfaceConnectionsActionTypes.SAVE_INTERFACE_CONNECTIONS),
            withLatestFrom(this.store$.select(getConnectionElements)),
            map(([action, item]) => {
                const { payload } = action as IUnsafeAction;
                return {
                    id: payload,
                    values: item.filter((items: any) => items.isChecked).map(items => items.id),
                };
            }),
            exhaustMap(({ id , values }: any) =>
                this.interfaceService.saveConnectionElemenst(id, values)
                    .pipe(
                        map(() => new GetConnectionInfo(id)),
                        catchError(() => of(new EffectError()))
                    )
        )
    );
}
