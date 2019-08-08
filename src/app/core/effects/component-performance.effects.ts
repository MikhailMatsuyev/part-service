import { UniterState } from './../store/reducers';
import { Store } from '@ngrx/store';
import { EffectError } from './user-factors.effects';
import { exhaustMap, catchError, map, withLatestFrom } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { ComponentService } from '../services/component.service';
import { of, from } from 'rxjs';
import * as AppLayout from '@store/app-layout';
import {
    ComponentPerformanceActionTypes,
    GetPerformanceSuccess,
    CreatePerformanceSuccess,
    DeletePerformanceSuccess,
    EditPerformanceSuccess,
    GetFunctionsSettingsSuccess,
    GetFunctionsSettings,
    SetFunctionsSettingsSuccess,
    GetUnitPricingConnectedSuccess,
    SetUnitPricingConnectedSuccess
} from '../store/component-performance';
import { DownloadPerformancesSuccess } from '../store/component-values';
import { SettingsService } from '../services/settings.service';

@Injectable()
export class ComponentPerformanceEffects {
    constructor(
        public actions$: Actions,
        private store$: Store<UniterState>,
        private readonly сomponentService: ComponentService,
        private readonly settingsService: SettingsService
    ) {
    }

    @Effect()
    public getPerformances$ = this.actions$
        .pipe(
            ofType(ComponentPerformanceActionTypes.GET_PERFORMANCE),
            exhaustMap(() =>
                this.сomponentService.getPerformances()
                    .pipe(
                        map((item) => new GetPerformanceSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public createPerformances$ = this.actions$
        .pipe(
            ofType(ComponentPerformanceActionTypes.CREATE_PERFORMANCE),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.сomponentService.createPerformances({...payload, id: -1})
                    .pipe(
                        map((item) => new CreatePerformanceSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public deletePerformances$ = this.actions$
        .pipe(
            ofType(ComponentPerformanceActionTypes.DELETE_PERFORMANCE),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.сomponentService.deletePerformances(payload)
                    .pipe(
                        map((item) => new DeletePerformanceSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public downloadPerformances$ = this.actions$
        .pipe(
            ofType(ComponentPerformanceActionTypes.DOWNLOAD_PERFORMANCE),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.сomponentService.downloadPerformances(payload)
                    .pipe(
                        map((item) => new DownloadPerformancesSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public editPerformances$ = this.actions$
        .pipe(
            ofType(ComponentPerformanceActionTypes.EDIT_PERFORMANCE),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.сomponentService.createPerformances(payload.performance)
                    .pipe(
                        exhaustMap((item) => {
                            const editPerfSuccess = new EditPerformanceSuccess(item);
                            const { fieldsChange, selectedPerf } = payload;
                            const { id } = item;

                            if (fieldsChange
                                && fieldsChange.some(field => field === 'calculate'
                                && selectedPerf === id
                            )) {
                                return from([editPerfSuccess, new GetFunctionsSettings(id)]);
                            }

                            return of(editPerfSuccess);
                        }),
                        catchError(() => of(new EffectError()))
                    )
            )
    )   ;

    @Effect()
    public functionsSettings$ = this.actions$
        .pipe(
            ofType(ComponentPerformanceActionTypes.GET_FUNCTIONS_SETTINGS),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.settingsService.getFunctionsSettings(payload)
                    .pipe(
                        map((item) => new GetFunctionsSettingsSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public getFunctionsSettings$ = this.actions$
        .pipe(
            ofType(ComponentPerformanceActionTypes.SET_PERFORMANCE),
            exhaustMap(({ payload }: IUnsafeAction) =>
                of(new GetFunctionsSettings(payload.id))
            )
    );

    @Effect()
    public setFunctionsSettings$ = this.actions$
        .pipe(
            ofType(ComponentPerformanceActionTypes.SET_FUNCTIONS_SETTINGS),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.settingsService.saveFunctionsSettings(payload)
                    .pipe(
                        map((item) => new SetFunctionsSettingsSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect({dispatch: false})
    public setFunctionsDisplay$ = this.actions$
        .pipe(
            ofType(ComponentPerformanceActionTypes.SET_FUNCTIONS_DISPLAY),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.settingsService.showHideFunctionValuesField(payload)
                    .pipe(
                        map(() => of(new EffectError())),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public getUnitPricingConnected$ = this.actions$
        .pipe(
            ofType(ComponentPerformanceActionTypes.GET_UNIT_PRICING_CONNECTED),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.settingsService.getUnitPricingConnectedComponents(payload)
                    .pipe(
                        map(item => new GetUnitPricingConnectedSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public setUnitPricingConnected$ = this.actions$
        .pipe(
            ofType(ComponentPerformanceActionTypes.SET_UNIT_PRICING_CONNECTED),
            withLatestFrom(this.store$.select(state => state.componentPerformance.unitPricing)),
            map(([action, item]) => {
                const { payload } = action as IUnsafeAction;
                return {
                    ...payload,
                    csIds: item.filter(({ enabled }: UnitPricing) => !enabled).map(items => items.id),
                };
            }),
            exhaustMap((payload: UnitPricingConnectedModel) =>
                this.settingsService.setUnitPricingConnectedComponents(payload)
                    .pipe(
                        exhaustMap(item => {
                            const data: any[] = [new SetUnitPricingConnectedSuccess(payload)];
                            if (data) {
                                data.push(new AppLayout.CreateLocalNotificaitonAction({
                                    type: 'success',
                                    text: 'Successfully saved!'
                                }));
                            }

                            return from(data);
                        }),
                        catchError(() => of(new EffectError()))
                    )
                )
        );
}
