import { Action } from '@ngrx/store';

export enum UsersDataExchangeActionTypes {
    EXPORT_USER_DATA = '[Users Data Exchange] EXPORT_USER_DATA',
    EXPORT_USER_DATA_SUCCESS = '[Users Data Exchange] EXPORT_USER_DATA_SUCCESS',
    IMPORT_USER_DATA = '[Users Data Exchange] IMPORT_USER_DATA',
    IMPORT_USER_DATA_SUCCESS = '[Users Data Exchange] IMPORT_USER_DATA_SUCCESS',
    CHANGE_USERNAME = '[Users Data Exchange] CHANGE_USERNAME',
    APPLY_IMPORT_USERS = '[Users Data Exchange] APPLY_IMPORT_USERS',
    APPLY_IMPORT_USERS_SUCCESS = '[Users Data Exchange] APPLY_IMPORT_USERS_SUCCESS',
    SET_DEFAULT_STATE = '[User Data Exchange] SET_DEFAULT_STATE'
}

export class ExportUserData implements Action {
    readonly type = UsersDataExchangeActionTypes.EXPORT_USER_DATA;
}

export class ExportUserDataSuccess implements Action {
    readonly type = UsersDataExchangeActionTypes.EXPORT_USER_DATA_SUCCESS;
}

export class ImportUserData implements Action {
    readonly type = UsersDataExchangeActionTypes.IMPORT_USER_DATA;
    constructor(public payload: any) {}
}

export class ImportUserDataSuccess implements Action {
    readonly type = UsersDataExchangeActionTypes.IMPORT_USER_DATA_SUCCESS;
    constructor(public payload: string[]) {}
}

export class ChangeUserName implements Action {
    readonly type = UsersDataExchangeActionTypes.CHANGE_USERNAME;
    constructor(public payload: any) {}
}

export class ApplyImportUsers implements Action {
    readonly type = UsersDataExchangeActionTypes.APPLY_IMPORT_USERS;
}

export class ApplyImportUsersSuccess implements Action {
    readonly type = UsersDataExchangeActionTypes.APPLY_IMPORT_USERS_SUCCESS;
}

export class SetDefaultState implements Action {
    readonly type = UsersDataExchangeActionTypes.SET_DEFAULT_STATE;
}

export type UsersDataExchangeActions =
    | ExportUserData
    | ExportUserDataSuccess
    | ImportUserData
    | ImportUserDataSuccess
    | ChangeUserName
    | ApplyImportUsers
    | ApplyImportUsersSuccess
    | SetDefaultState;
