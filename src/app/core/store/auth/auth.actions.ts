import { Action } from '@ngrx/store';

export interface Authenticate {
    username: string;
    password: string;
    isGuest: boolean;
}

export interface User {
    username: string;
    role: string;
    token: string;
    userId: number;
}

export enum AuthActionTypes {
    Login = '[Auth] Login',
    Logout = '[Auth] Logout',
    LoginSuccess = '[Auth] Login Success',
    LoginFailure = '[Auth] Login Failure',
    LoginRedirect = '[Auth] Login Redirect',
    CHECK_LOGIN_GUEST = '[Auth] CHECK_LOGIN_GUEST',
    CHECK_LOGIN_GUEST_SUCCESS = '[Auth] CHECK_LOGIN_GUEST_SUCCESS',
    SET_GUEST = '[Auth] SET_GUEST',
    SET_GUEST_SUCCESS = '[Auth] SET_GUEST_SUCCESS',
}

export class Login implements Action {
    readonly type = AuthActionTypes.Login;

    constructor(public payload: Authenticate) {}
}

export class LoginSuccess implements Action {
    readonly type = AuthActionTypes.LoginSuccess;

    constructor(public payload: User) {}
}

export class LoginFailure implements Action {
    readonly type = AuthActionTypes.LoginFailure;

    constructor(public payload: any) {}
}

export class LoginRedirect implements Action {
    readonly type = AuthActionTypes.LoginRedirect;
}

export class Logout implements Action {
    readonly type = AuthActionTypes.Logout;
}

export class CheckLoginGuest implements Action {
    readonly type = AuthActionTypes.CHECK_LOGIN_GUEST;
}

export class CheckLoginGuestSuccess implements Action {
    readonly type = AuthActionTypes.CHECK_LOGIN_GUEST_SUCCESS;
    constructor(public payload: boolean) {}
}

export class SetGuest implements Action {
    readonly type = AuthActionTypes.SET_GUEST;
    constructor(public payload: boolean) {}
}

export class SetGuestSuccess implements Action {
    readonly type = AuthActionTypes.SET_GUEST_SUCCESS;
    constructor(public payload: boolean) {}
}

export type AuthActions =
    | Login
    | LoginSuccess
    | LoginFailure
    | LoginRedirect
    | Logout
    | CheckLoginGuest
    | CheckLoginGuestSuccess
    | SetGuest
    | SetGuestSuccess;
