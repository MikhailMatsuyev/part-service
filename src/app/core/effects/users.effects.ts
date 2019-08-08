import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { exhaustMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { EffectError } from './user-factors.effects';
import { UsersService } from '../services/users.service';
import {
    UsersActionTypes,
    GetUsersOnlineSuccess,
    ChangeUsersPasswordSuccess,
    ChangeUsersPasswordFailure
} from '../store/users';


@Injectable()
export class UsersEffects {
    constructor(
        public actions$: Actions,
        private usersService: UsersService
    ) {
    }

    @Effect()
    public getUserOnline$ = this.actions$
        .pipe(
            ofType(UsersActionTypes.GET_USERS_ONLINE),
            exhaustMap(() =>
                this.usersService.getOnline()
                .pipe(
                    map((item) => new GetUsersOnlineSuccess(item)),
                    catchError(() => of(new EffectError()))
                )
            )
        );

    @Effect()
    public changePassword$ = this.actions$
        .pipe(
            ofType(UsersActionTypes.CHANGE_USERS_PASSWORD),
            exhaustMap(({payload}: IUnsafeAction) =>
                this.usersService.changePassword(payload)
                    .pipe(
                        map(item => new ChangeUsersPasswordSuccess(item)),
                        catchError(({error}) => of(new ChangeUsersPasswordFailure(error)))
                    )
            )
        );
}
