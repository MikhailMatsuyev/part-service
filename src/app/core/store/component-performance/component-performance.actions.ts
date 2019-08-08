import { Action } from '@ngrx/store';
import { Sort } from '@angular/material';

export enum ComponentPerformanceActionTypes {
    GET_PERFORMANCE = '[Component Performance] GET_PERFORMANCE',
    GET_PERFORMANCE_SUCCESS = '[Component Performance] GET_PERFORMANCE_SUCCESS',
    CHECK_ALL_PERFORMANCE = '[Component Performance] CHECK_ALL_PERFORMANCE',
    CHECK_PERFORMANCE = '[Component Performance] CHECK_PERFORMANCE',
    CREATE_PERFORMANCE = '[Component Performance] CREATE_PERFORMANCE',
    CREATE_PERFORMANCE_SUCCESS = '[Component Performance] CREATE_PERFORMANCE_SUCCESS',
    DELETE_PERFORMANCE = '[Component Performance] DELETE_PERFORMANCE',
    DELETE_PERFORMANCE_SUCCESS = '[Component Performance] DELETE_PERFORMANCE_SUCCESS',
    DOWNLOAD_PERFORMANCE = '[Component Performance] DOWNLOAD_PERFORMANCE',
    DOWNLOAD_PERFORMANCE_SUCCESS = '[Component Performance] DOWNLOAD_PERFORMANCE_SUCCESS',
    ADD_SORT_PERFORMANCE = '[Component Performance] ADD_SORT_PERFORMANCE',
    EDIT_PERFORMANCE = '[Component Performance] EDIT_PERFORMANCE',
    EDIT_PERFORMANCE_SUCCESS = '[Component Performance] EDIT_PERFORMANCE_SUCCESS',
    RESET_PERFORMANCE = '[Component Performance] RESET_PERFORMANCE',
    SET_PERFORMANCE = '[Component Performance] SET_PERFORMANCE',
    GET_FUNCTIONS_SETTINGS = '[Component Performance] GET_FUNCTIONS_SETTINGS',
    GET_FUNCTIONS_SETTINGS_SUCCESS = '[Component Performance] GET_FUNCTIONS_SETTINGS_SUCCESS',
    SET_FUNCTIONS_SETTINGS = '[Component Performance] SET_FUNCTIONS_SETTINGS',
    SET_FUNCTIONS_SETTINGS_SUCCESS = '[Component Performance] SET_FUNCTIONS_SETTINGS_SUCCESS',
    SET_FUNCTIONS_DISPLAY = '[Component Performance] SET_FUNCTIONS_DISPLAY',
    GET_UNIT_PRICING_CONNECTED = '[Component Performance] GET_UNIT_PRICING_CONNECTED',
    GET_UNIT_PRICING_CONNECTED_SUCCESS = '[Component Performance] GET_UNIT_PRICING_CONNECTED_SUCCESS',
    SET_UNIT_PRICING_CONNECTED = '[Component Performance] SET_UNIT_PRICING_CONNECTED',
    SET_UNIT_PRICING_CONNECTED_SUCCESS = '[Component Performance] SET_UNIT_PRICING_CONNECTED_SUCCESS',
    SET_UNIT_PRICING = '[Component Performance] SET_UNIT_PRICING',
    SET_DEFAULT_STATE = '[Component Performance] SET_DEFAULT_STATE'
}

export class GetPerformance implements Action {
    readonly type = ComponentPerformanceActionTypes.GET_PERFORMANCE;
}

export class GetPerformanceSuccess implements Action {
    readonly type = ComponentPerformanceActionTypes.GET_PERFORMANCE_SUCCESS;
    constructor(public payload: Performance) {}
}

export class CheckAllPerformance implements Action {
    readonly type = ComponentPerformanceActionTypes.CHECK_ALL_PERFORMANCE;
    constructor(public payload: boolean) {}
}

export class CheckPerformance implements Action {
    readonly type = ComponentPerformanceActionTypes.CHECK_PERFORMANCE;
    constructor(public payload: {id: number, status: boolean}) {}
}

export class CreatePerformance implements Action {
    readonly type = ComponentPerformanceActionTypes.CREATE_PERFORMANCE;
    constructor(public payload: Performance) {}
}

export class CreatePerformanceSuccess implements Action {
    readonly type = ComponentPerformanceActionTypes.CREATE_PERFORMANCE_SUCCESS;
    constructor(public payload: Performance) {}
}

export class DeletePerformance implements Action {
    readonly type = ComponentPerformanceActionTypes.DELETE_PERFORMANCE;
    constructor(public payload: number[]) {}
}

export class DeletePerformanceSuccess implements Action {
    readonly type = ComponentPerformanceActionTypes.DELETE_PERFORMANCE_SUCCESS;
    constructor(public payload: any) {}
}

export class DownloadPerformance implements Action {
    readonly type = ComponentPerformanceActionTypes.DOWNLOAD_PERFORMANCE;
    constructor(public payload: number[] | null) {}
}

export class DownloadPerformanceSuccess implements Action {
    readonly type = ComponentPerformanceActionTypes.DOWNLOAD_PERFORMANCE_SUCCESS;
    constructor(public payload: number[] | null) {}
}

export class EditPerformance implements Action {
    readonly type = ComponentPerformanceActionTypes.EDIT_PERFORMANCE;
    constructor(public payload: {performance: Performance, fieldsChange?: string[], selectedPerf?: number}) {}
}

export class EditPerformanceSuccess implements Action {
    readonly type = ComponentPerformanceActionTypes.EDIT_PERFORMANCE_SUCCESS;
    constructor(public payload: Performance) {}
}

export class ResetPerformance implements Action {
    readonly type = ComponentPerformanceActionTypes.RESET_PERFORMANCE;
    constructor(public payload: Performance) {}
}

export class AddSortPerformance implements Action {
    readonly type = ComponentPerformanceActionTypes.ADD_SORT_PERFORMANCE;
    constructor(public payload: MultipleSort) {}
}

export class SetPerformance implements Action {
    readonly type = ComponentPerformanceActionTypes.SET_PERFORMANCE;
    constructor(public payload: Performance) {}
}

export class GetFunctionsSettings implements Action {
    readonly type = ComponentPerformanceActionTypes.GET_FUNCTIONS_SETTINGS;
    constructor(public payload: number) {}
}

export class GetFunctionsSettingsSuccess implements Action {
    readonly type = ComponentPerformanceActionTypes.GET_FUNCTIONS_SETTINGS_SUCCESS;
    constructor(public payload: FunctionsSettings) {}
}

export class SetFunctionsSettings implements Action {
    readonly type = ComponentPerformanceActionTypes.SET_FUNCTIONS_SETTINGS;
    constructor(public payload: FunctionsSettingsModel) {}
}

export class SetFunctionsSettingsSuccess implements Action {
    readonly type = ComponentPerformanceActionTypes.SET_FUNCTIONS_SETTINGS_SUCCESS;
    constructor(public payload: FunctionsSettings) {}
}

export class SetFunctionDisplay implements Action {
    readonly type = ComponentPerformanceActionTypes.SET_FUNCTIONS_DISPLAY;
    constructor(public payload: boolean) {}
}

export class GetUnitPricingConnected implements Action {
    readonly type = ComponentPerformanceActionTypes.GET_UNIT_PRICING_CONNECTED;
    constructor(public payload: number) {}
}

export class GetUnitPricingConnectedSuccess implements Action {
    readonly type = ComponentPerformanceActionTypes.GET_UNIT_PRICING_CONNECTED_SUCCESS;
    constructor(public payload: UnitPricing) {}
}

export class SetUnitPricingConnected implements Action {
    readonly type = ComponentPerformanceActionTypes.SET_UNIT_PRICING_CONNECTED;
    constructor(public payload: {perfId: number, csIds?: number[]}) {}
}

export class SetUnitPricingConnectedSuccess implements Action {
    readonly type = ComponentPerformanceActionTypes.SET_UNIT_PRICING_CONNECTED_SUCCESS;
    constructor(public payload: any) {}
}

export class SetUnitPricing implements Action {
    readonly type = ComponentPerformanceActionTypes.SET_UNIT_PRICING;
    constructor(public payload: {id: number, enabled: boolean}) {}
}

export class SetDefaultState implements Action {
    readonly type = ComponentPerformanceActionTypes.SET_DEFAULT_STATE;
}

export type ComponentPerformanceActions =
    | GetPerformance
    | GetPerformanceSuccess
    | CheckAllPerformance
    | CheckPerformance
    | CreatePerformance
    | CreatePerformanceSuccess
    | DeletePerformance
    | DeletePerformanceSuccess
    | DownloadPerformance
    | DownloadPerformanceSuccess
    | EditPerformance
    | EditPerformanceSuccess
    | SetPerformance
    | GetFunctionsSettings
    | GetFunctionsSettingsSuccess
    | SetFunctionsSettings
    | SetFunctionsSettingsSuccess
    | SetFunctionDisplay
    | GetUnitPricingConnected
    | GetUnitPricingConnectedSuccess
    | SetUnitPricingConnected
    | SetUnitPricingConnectedSuccess
    | SetUnitPricing
    | SetDefaultState;
