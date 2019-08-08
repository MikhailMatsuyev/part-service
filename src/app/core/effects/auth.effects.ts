import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { CommonApiService } from '../services/common-api.service';
import { Observable } from 'rxjs/Observable';
import { exhaustMap, map, catchError, tap, filter } from 'rxjs/operators';
import { of, from } from 'rxjs';
import {
    LoginSuccess,
    LoginFailure,
    AuthActionTypes,
    CheckLoginGuestSuccess,
    SetGuestSuccess,
} from '../store/auth';
import { Router } from '@angular/router';
import { WebStorage, StorageType } from '../decorators/webstorage';
import { UsersService } from '../services/users.service';
import { EffectError } from '@core/effects/user-factors.effects';
import { omit } from '@utils/utilsfunc';
import * as Applayout from '@store/app-layout';


@Injectable()
export class AuthEffects {
    @WebStorage(StorageType.localStorage) public token: string;
    @WebStorage(StorageType.localStorage) public user: string;

    constructor(
        public actions$: Actions,
        private commonApiService: CommonApiService,
        private usersService: UsersService,
        private router: Router
    ) {
    }

    @Effect()
    public authenticate: Observable<any> = this.actions$
        .pipe(
            ofType(AuthActionTypes.Login),
            map(({payload}: IUnsafeAction) => payload),
            exhaustMap(payload =>
                this.commonApiService.login(payload)
                    .pipe(
                        exhaustMap(({error, message, data}) => {
                            if (error) {
                                return of(new LoginFailure({ error: message }));
                            }
                            const user = {username: payload.userName, ...(omit(data, ['pages']))};
                            this.user = user;
                            return from([new LoginSuccess(user), new Applayout.SetPagesAccess(data.pages)]);
                        }),
                        catchError(error => of(new LoginFailure({ error })))
                    )
            )
        );

    @Effect()
    public isActiveGuest$ = this.actions$.pipe(
            ofType(AuthActionTypes.CHECK_LOGIN_GUEST),
            exhaustMap(() =>
                this.usersService.checkGuest()
                    .pipe(
                        map((item) => new CheckLoginGuestSuccess(item)),
                        catchError(error => of(new LoginFailure({ error })))
                    )
            )
        );

    @Effect()
    public setGuest$ = this.actions$
        .pipe(
            ofType(AuthActionTypes.SET_GUEST),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.usersService.setGuest(payload)
                    .pipe(
                        map(item => new SetGuestSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect({ dispatch: false })
    public loginSuccess$ = this.actions$.pipe(
            ofType(AuthActionTypes.LoginSuccess),
            tap((user: IUnsafeAction) => {
                this.token = user.payload.token;
                this.router.navigate(['home']);
            })
        );

    @Effect({ dispatch: false })
    public loginRedirect$ = this.actions$.pipe(
            ofType(AuthActionTypes.LoginRedirect, AuthActionTypes.Logout),
            tap(() => {
                this.router.navigate(['/login']);
                this.token = null;
                this.user = null;
            })
        );
}
