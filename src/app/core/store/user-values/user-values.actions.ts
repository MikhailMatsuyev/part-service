import { Action } from '@ngrx/store';

export enum UserValuesActionTypes {
    GET_USER_VALUES = '[User Value] GET_USER_VALUES',
    GET_USER_VALUES_SUCCESS = '[User Value] GET_USER_VALUES_SUCCESS',
    GET_USER_VALUES_TABLE = '[User Value] GET_USER_VALUES_TABLE',
    GET_USER_VALUES_TABLE_SUCCESS = '[User Value] GET_USER_VALUES_TABLE_SUCCESS',
    SORTING_USER_VALUES_TABLE = '[User Value] SORTING_USER_VALUES_TABLE',
    SAVE_USER_VALUES_TABLE = '[User Value] SAVE_USER_VALUES_TABLE',
    SAVE_USER_VALUES_TABLE_SUCCESS = '[User Value] SAVE_USER_VALUES_TABLE_SUCCESS',
    SET_DEFAULT_STATE = '[User Value] SET_DEFAULT_STATE',
    SET_USER_VALUE = '[User Value] SET_USER_VALUE'
}

export class UserValuesGet implements Action {
    readonly type = UserValuesActionTypes.GET_USER_VALUES;
}

export class UserValuesGetSuccess implements Action {
    readonly type = UserValuesActionTypes.GET_USER_VALUES_SUCCESS;
    constructor(public payload: any[]) {}
}

export class UserValuesGetTable implements Action {
    readonly type = UserValuesActionTypes.GET_USER_VALUES_TABLE;
    constructor(public payload?: number) {}
}

export class UserValuesGetTableSuccess implements Action {
    readonly type = UserValuesActionTypes.GET_USER_VALUES_TABLE_SUCCESS;
    constructor(public payload: {data: any[], payload: any}) {}
}

export class UserValuesTableSorting implements Action {
    readonly type = UserValuesActionTypes.SORTING_USER_VALUES_TABLE;
}

export class SaveUserValueTable implements Action {
    readonly type = UserValuesActionTypes.SAVE_USER_VALUES_TABLE;
    constructor(public payload: UserFactorValues) {}
}

export class SaveUserValueTableSuccess implements Action {
    readonly type = UserValuesActionTypes.SAVE_USER_VALUES_TABLE_SUCCESS;
    constructor(public payload: UserFactorValues) {}
}

export class SetDefaultState implements Action {
    readonly type = UserValuesActionTypes.SET_DEFAULT_STATE;
}

export class SetUserValue implements Action {
    readonly type = UserValuesActionTypes.SET_USER_VALUE;
    constructor(public payload: any) {}
}

export type UserValuesActions =
    | UserValuesGet
    | UserValuesGetSuccess
    | UserValuesGetTable
    | UserValuesGetTableSuccess
    | UserValuesTableSorting
    | SaveUserValueTable
    | SaveUserValueTableSuccess
    | SetDefaultState
    | SetUserValue;
