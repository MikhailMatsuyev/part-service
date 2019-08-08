import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { EffectError } from './user-factors.effects';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {
    AppSettingsService
} from '../services/app-settings.service';
import {
    AppSettingsActionTypes,
    GetAppSettingsSuccess,
    SetNumbersTypeSuccess,
    SetAnalyzeButtonVisibilitySuccess,
    SetAnalyzeTimeoutSuccess
} from '../store/app-settings';

@Injectable()

export class AppSettingsEffects {
    constructor(
        private actions$: Actions,
        private appSettingsService: AppSettingsService
    ) { }

    @Effect()
    public getAppSettings$ = this.actions$
        .pipe(
        ofType(AppSettingsActionTypes.GET_APP_SETTINGS),
            exhaustMap(() =>
                this.appSettingsService.getAppSettings()
                    .pipe(
                    map((item) => new GetAppSettingsSuccess(item)),
                    catchError(() => of(new EffectError()))
                )
            )
        );

    @Effect()
    public setNumberDisplayType$ = this.actions$
        .pipe(
        ofType(AppSettingsActionTypes.SET_NUMS_TYPE),
        exhaustMap(({ payload }: IUnsafeAction) =>
                this.appSettingsService.setNumberType(payload)
                    .pipe(
                    map((item) => new SetNumbersTypeSuccess(item)),
                    catchError(() => of(new EffectError()))
                )
            )
        );

    @Effect()
    public setVisibilityAnalyzeButtons$ = this.actions$
        .pipe(
        ofType(AppSettingsActionTypes.SET_ANALYZE_BUTTON_VISIBILITY),
        exhaustMap(({ payload }: IUnsafeAction) =>
                this.appSettingsService.setVisibilityAnalyzeButtons(payload)
                    .pipe(
                    map((item) => new SetAnalyzeButtonVisibilitySuccess(item)),
                    catchError(() => of(new EffectError()))
                )
            )
        );

    @Effect()
    public setAnalyzeTimeout$ = this.actions$
        .pipe(
        ofType(AppSettingsActionTypes.SET_ANALYZE_TIMEOUT),
        exhaustMap(({ payload }: IUnsafeAction) =>
                this.appSettingsService.setAnalyzeTimeout(payload)
                    .pipe(
                    map((item) => new SetAnalyzeTimeoutSuccess(item)),
                    catchError(() => of(new EffectError()))
                )
            )
        );
}

