import { UniterState } from './../store/reducers';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { exhaustMap, catchError, map, withLatestFrom } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { EffectError } from './user-factors.effects';
import { TypeKeySettingsService } from '../services/type-key-settings.service';
import {
    TypeKeySettingsActionTypes,
    GetTypeKeySettingsSuccess,
    GetVariantCodeSettingsSuccess,
    UpdateFreeTextList,
    getSelectedPerfId,
    GetVariantCodeSettings,
    ShowErrorMessage} from '../store/type-key-settings';

@Injectable()
export class TypeKeySettingsEffects {
    constructor(
        public actions$: Actions,
        private typeKeySettingsService: TypeKeySettingsService,
        private store$: Store<UniterState>,
    ) { }

    @Effect()
    public getTypeKeySettings$ = this.actions$
        .pipe(
            ofType(TypeKeySettingsActionTypes.GET_TYPE_KEY_SETTINGS),
            exhaustMap(() =>
                this.typeKeySettingsService.getTypeKeySettings()
                    .pipe(
                        exhaustMap((item) => from([
                            new GetTypeKeySettingsSuccess(item),
                            new GetVariantCodeSettings(item.perfId)])),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public getVariantCodeSettings$ = this.actions$
        .pipe(
            ofType(TypeKeySettingsActionTypes.GET_VARIANT_CODE_SETTINGS),
            exhaustMap(({payload}: IUnsafeAction) =>
                this.typeKeySettingsService.getTypeKeyGeneration(payload)
                    .pipe(
                        map((tableData) => new GetVariantCodeSettingsSuccess(tableData)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public saveTypeKeySettings$ = this.actions$
        .pipe(
            ofType(TypeKeySettingsActionTypes.SAVE_TYPE_KEY_SETTINGS),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.typeKeySettingsService.saveTypeKeySettings(payload)
                    .pipe(
                        map((errorMessage) => new ShowErrorMessage(errorMessage)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public saveTypeKeyRow$ = this.actions$
        .pipe(
            ofType(TypeKeySettingsActionTypes.SAVE_TYPE_KEY_ROW),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.typeKeySettingsService.saveTypeKeyRow(payload)
                    .pipe(
                        map((errorMessage) => new ShowErrorMessage(errorMessage)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public editUfTypeKey$ = this.actions$
        .pipe(
            ofType(TypeKeySettingsActionTypes.EDIT_USER_FACTOR_TYPE_KEY),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.typeKeySettingsService.editUfTypeKey(payload)
                    .pipe(
                        withLatestFrom(this.store$.select(getSelectedPerfId)),
                        map(([ufList, perfId]) => new GetVariantCodeSettings(perfId)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public addFreeText$ = this.actions$
        .pipe(
            ofType(TypeKeySettingsActionTypes.ADD_FREE_TEXT_TO_TYPE_KEY),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.typeKeySettingsService.addFreeTextToTypeKey(payload)
                    .pipe(
                        withLatestFrom(this.store$.select(getSelectedPerfId)),
                        exhaustMap(([freeTextList, perfId]) => from([
                            new UpdateFreeTextList(freeTextList),
                            new GetVariantCodeSettings(perfId)])),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public removeFreeText$ = this.actions$
        .pipe(
            ofType(TypeKeySettingsActionTypes.REMOVE_FREE_TEXT_FROM_TYPE_KEY),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.typeKeySettingsService.removeFreeTextFromTypeKey(payload)
                    .pipe(
                        withLatestFrom(this.store$.select(getSelectedPerfId)),
                        exhaustMap(([freeTextList, perfId]) => from([
                            new UpdateFreeTextList(freeTextList),
                            new GetVariantCodeSettings(perfId)])),
                        catchError(() => of(new EffectError()))
                    )
            )
        );
    }
