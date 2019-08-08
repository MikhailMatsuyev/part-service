import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UserFactorsService } from '../services/userfactors.service';
import { exhaustMap, catchError, map, withLatestFrom } from 'rxjs/operators';
import {
    UserValuesGetSuccess,
    UserValuesActionTypes,
    UserValuesGetTableSuccess,
    SaveUserValueTableSuccess,
    getActiveUserValue,
    UserValuesGetTable
} from '../store/user-values';
import { of, from } from 'rxjs';
import { EffectError } from './user-factors.effects';
import { UniterState } from '@core/store/reducers';


@Injectable()
export class UserValuesEffects {
    constructor(
        public actions$: Actions,
        private userFactorsService: UserFactorsService,
        private store$: Store<UniterState>,
    ) { }

    @Effect()
    public getUserValues$ = this.actions$
        .pipe(
            ofType(UserValuesActionTypes.GET_USER_VALUES),
            exhaustMap(() =>
                this.userFactorsService.getUserFactorsIMPL()
                .pipe(
                    exhaustMap((item) => from([new UserValuesGetSuccess(item), new UserValuesGetTable()])),
                    catchError(() => of(new EffectError()))
                )
            )
        );

    @Effect()
    public getUserTableValues$ = this.actions$
        .pipe(
            ofType(UserValuesActionTypes.GET_USER_VALUES_TABLE),
            withLatestFrom(this.store$.select(getActiveUserValue)),
            map(([action, item]) => item ? item.id : (action as IUnsafeAction).payload),
            exhaustMap(items =>
                this.userFactorsService.getUserFactorValues(items)
                .pipe(
                    map((item) => new UserValuesGetTableSuccess({data: item, payload: items})),
                    catchError(() => of(new EffectError()))
                )
            )
        );

    @Effect()
    public saveUserValueTable$ = this.actions$
        .pipe(
            ofType(UserValuesActionTypes.SAVE_USER_VALUES_TABLE),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.userFactorsService.saveUserFactorValue(payload)
                .pipe(
                    map((item) => new SaveUserValueTableSuccess(item)),
                    catchError(() => of(new EffectError()))
                )
            )
        );
}
