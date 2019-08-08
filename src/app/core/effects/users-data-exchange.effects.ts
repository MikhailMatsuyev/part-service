import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { exhaustMap, catchError, map, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { EffectError } from './user-factors.effects';
import { SqlApiService } from '../services/sql-api.service';
import {
    UsersDataExchangeActionTypes,
    ExportUserDataSuccess,
    ImportUserDataSuccess,
    ApplyImportUsersSuccess,
    getDataExchange
} from '../store/users-data-exchange';
import { UniterState } from '../store/reducers';

@Injectable()
export class UsersDataExchangeEffects {
    constructor(
        public actions$: Actions,
        private sqlApiService: SqlApiService,
        private store$: Store<UniterState>,
    ) {
    }

    @Effect()
    public exportUserData$ = this.actions$
        .pipe(
            ofType(UsersDataExchangeActionTypes.EXPORT_USER_DATA),
            exhaustMap(() =>
                this.sqlApiService.exportUsersData()
                    .pipe(
                        map(() => new ExportUserDataSuccess()),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public importUserData$ = this.actions$
        .pipe(
            ofType(UsersDataExchangeActionTypes.IMPORT_USER_DATA),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.sqlApiService.importUsersData(payload)
                    .pipe(
                        map((item) => new ImportUserDataSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public applyImportUsers$ = this.actions$
        .pipe(
            ofType(UsersDataExchangeActionTypes.APPLY_IMPORT_USERS),
            withLatestFrom(this.store$.select(getDataExchange)),
            map(([action, dataExchange]) => dataExchange),
            exhaustMap(item =>
                this.sqlApiService.applyImportUsersData(item)
                    .pipe(
                        map(() => new ApplyImportUsersSuccess()),
                        catchError(() => of(new EffectError()))
                    )
            )
        );
}
