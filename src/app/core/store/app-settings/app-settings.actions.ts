import { Action } from '@ngrx/store';

export enum AppSettingsActionTypes {
    GET_APP_SETTINGS = '[AppSettings] GET_APP_SETTINGS',
    GET_APP_SETTINGS_SUCCESS = '[AppSettings] GET_APP_SETTINGS_SUCCESS',
    SET_NUMS_TYPE = '[AppSettings] SET_NUMS_TYPE',
    SET_NUMS_TYPE_SUCCESS = '[AppSettings] SET_NUMS_TYPE_SUCCESS',
    SET_ANALYZE_BUTTON_VISIBILITY = '[AppSettings] SET_ANALYZE_BUTTON_VISIBILITY',
    SET_ANALYZE_BUTTON_VISIBILITY_SUCCESS = '[AppSettings] SET_ANALYZE_BUTTON_VISIBILITY_SUCCESS',
    SET_ANALYZE_TIMEOUT = '[AppSettings] SET_ANALYZE_TIMEOUT',
    SET_ANALYZE_TIMEOUT_SUCCESS = '[AppSettings] SET_ANALYZE_TIMEOUT_SUCCESS'
}

export class GetAppSettings implements Action {
    readonly type = AppSettingsActionTypes.GET_APP_SETTINGS;
}

export class GetAppSettingsSuccess implements Action {
    readonly type = AppSettingsActionTypes.GET_APP_SETTINGS_SUCCESS;

    constructor(public payload: any) { }
}

export class SetNumbersType implements Action {
    readonly type = AppSettingsActionTypes.SET_NUMS_TYPE;

    constructor(public payload: number) { }
}

export class SetNumbersTypeSuccess implements Action {
    readonly type = AppSettingsActionTypes.SET_NUMS_TYPE_SUCCESS;

    constructor(public payload: number) { }
}

export class SetAnalyzeButtonVisibility implements Action {
    readonly type = AppSettingsActionTypes.SET_ANALYZE_BUTTON_VISIBILITY;

    constructor(public payload: boolean) {}
}

export class SetAnalyzeButtonVisibilitySuccess implements Action {
    readonly type = AppSettingsActionTypes.SET_ANALYZE_BUTTON_VISIBILITY_SUCCESS;

    constructor(public payload: boolean) {}
}

export class SetAnalyzeTimeout implements Action {
    readonly type = AppSettingsActionTypes.SET_ANALYZE_TIMEOUT;

    constructor(public payload: number) {}
}

export class SetAnalyzeTimeoutSuccess implements Action {
    readonly type = AppSettingsActionTypes.SET_ANALYZE_TIMEOUT_SUCCESS;

    constructor(public payload: number) {}
}

export type AppSettingActions =
    | GetAppSettings
    | GetAppSettingsSuccess
    | SetNumbersType
    | SetNumbersTypeSuccess
    | SetAnalyzeButtonVisibility
    | SetAnalyzeButtonVisibilitySuccess
    | SetAnalyzeTimeout
    | SetAnalyzeTimeoutSuccess;
