import { Action } from '@ngrx/store';

export enum UsersActionTypes {
    GET_USERS_ONLINE = '[Users] GET_USERS_ONLINE',
    GET_USERS_ONLINE_SUCCESS = '[Users] GET_USERS_ONLINE_SUCCESS',
    CHANGE_USERS_PASSWORD = '[Users] CHANGE_USERS_PASSWORD',
    CHANGE_USERS_PASSWORD_SUCCESS = '[Users] CHANGE_USERS_PASSWORD_SUCCESS',
    CHANGE_USERS_PASSWORD_FAILURE = '[Users] CHANGE_USERS_PASSWORD_FAILURE',
}

export class GetUsersOnline implements Action {
    readonly type = UsersActionTypes.GET_USERS_ONLINE;
}

export class GetUsersOnlineSuccess implements Action {
    readonly type = UsersActionTypes.GET_USERS_ONLINE_SUCCESS;
    constructor(public payload: OnlineStatus[]) {}
}

export class ChangeUsersPassword implements Action {
    readonly type = UsersActionTypes.CHANGE_USERS_PASSWORD;
    constructor(public payload: {oldPassword: string, newPassword: string}) {}
}

export class ChangeUsersPasswordSuccess implements Action {
    readonly type = UsersActionTypes.CHANGE_USERS_PASSWORD_SUCCESS;
    constructor(public payload: string) {}
}

export class ChangeUsersPasswordFailure implements Action {
    readonly type = UsersActionTypes.CHANGE_USERS_PASSWORD_FAILURE;
    constructor(public payload: string) {}
}

export type UsersActions =
    | GetUsersOnline
    | GetUsersOnlineSuccess
    | ChangeUsersPassword
    | ChangeUsersPasswordSuccess
    | ChangeUsersPasswordFailure;
