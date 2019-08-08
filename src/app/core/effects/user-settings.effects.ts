import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { UsersService } from '@core/services/users.service';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { EffectError } from '@core/effects/user-factors.effects';
import {
    UsersSettingsActionTypes,
    GetRolesSuccess,
    GetUsersSuccess,
    EditRoleSuccess,
    DeleteRoleSuccess,
    GetRolesTreeSuccess
} from '@core/store/users-settings';

@Injectable()
export class UserSettingsEffects {
    constructor(
        public actions$: Actions,
        private usersService: UsersService,
    ) {
    }

    @Effect()
    public getRoles$ = this.actions$
        .pipe(
            ofType(UsersSettingsActionTypes.GET_ROLES),
            exhaustMap(() =>
                this.usersService.getRoles()
                    .pipe(
                        map(item => new GetRolesSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public getUsers$ = this.actions$
        .pipe(
            ofType(UsersSettingsActionTypes.GET_USERS),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.usersService.getUsers(payload)
                    .pipe(
                        map(item => new GetUsersSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public editRole$ = this.actions$
        .pipe(
            ofType(UsersSettingsActionTypes.EDIT_ROLE),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.usersService.editRole(payload)
                    .pipe(
                        map(item => new EditRoleSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public deleteRole$ = this.actions$
        .pipe(
            ofType(UsersSettingsActionTypes.DELETE_ROLE),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.usersService.deleteRole(payload)
                    .pipe(
                        map(item => new DeleteRoleSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public getRolesTree$ = this.actions$
        .pipe(
            ofType(UsersSettingsActionTypes.GET_ROLES_TREE),
            exhaustMap(() =>
                this.usersService.getRolesTree()
                    .pipe(
                        map(item => new GetRolesTreeSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );
}
