import { Action } from '@ngrx/store';

export enum ComponentValuesActionTypes {
    GET_COMPONENT_VALUES = '[Component Value] GET_COMPONENT_VALUES',
    GET_COMPONENT_VALUES_SUCCESS = '[Component Value] GET_COMPONENT_VALUES_SUCCESS',
    GET_COMPONENT_VALUES_TABLE = '[Component Value] GET_COMPONENT_VALUES_TABLE',
    GET_COMPONENT_VALUES_TABLE_SUCCESS = '[Component Value] GET_COMPONENT_VALUES_TABLE_SUCCESS',
    SORTING_COMPONENT_VALUES_TABLE = '[Component Value] SORTING_COMPONENT_VALUES_TABLE',
    COLLAPSE_VALUES = '[Component Value] COLLAPSE_VALUES',
    GET_COMPONENT_STEPS = '[Component Value] GET_COMPONENT_STEPS',
    GET_COMPONENT_STEPS_SUCCESS = '[Component Value] GET_COMPONENT_STEPS_SUCCESS',
    GET_PERFORMANCE = '[Component Value] GET_PERFORMANCE',
    GET_PERFORMANCE_SUCCESS = '[Component Value] GET_PERFORMANCE_SUCCESS',
    GET_PERFORMANCE_COMPONENT = '[Component Value] GET_PERFORMANCE_COMPONENT',
    GET_PERFORMANCE_COMPONENT_SUCCESS = '[Component Value] GET_PERFORMANCE_COMPONENT_SUCCESS',
    SAVE_PERFORMANCE = '[Component Value] SAVE_PERFORMANCE',
    SAVE_PERFORMANCE_COMPONENT = '[Component Value] SAVE_PERFORMANCE_COMPONENT',
    SAVE_USER_FACTOR_VALUE = '[Component Value] SAVE_USER_FACTOR_VALUE',
    SAVE_USER_FACTOR_VALUE_SUCCESS = '[Component Value] SAVE_USER_FACTOR_VALUE_SUCCESS',
    DOWNLOAD_PERFORMANCES  = '[Component Value] DOWNLOAD_PERFORMANCES',
    DOWNLOAD_PERFORMANCES_SUCCESS  = '[Component Value] DOWNLOAD_PERFORMANCES_SUCCESS',
    SET_ACTIVE_COMPONENT_STEP = '[Component Value] SET_ACTIVE_COMPONENT_STEP',
    SET_DEFAULT_STATE = '[Component Value] SET_DEFAULT_STATE'
}

export class ComponentValuesGet implements Action {
    readonly type = ComponentValuesActionTypes.GET_COMPONENT_VALUES;
}

export class ComponentValuesGetSuccess implements Action {
    readonly type = ComponentValuesActionTypes.GET_COMPONENT_VALUES_SUCCESS;
    constructor(public payload: any[]) {}
}

export class ComponentValuesGetTable implements Action {
    readonly type = ComponentValuesActionTypes.GET_COMPONENT_VALUES_TABLE;
    constructor(public payload: number) {}
}

export class ComponentValuesGetTableSuccess implements Action {
    readonly type = ComponentValuesActionTypes.GET_COMPONENT_VALUES_TABLE_SUCCESS;
    constructor(public payload: any[]) {}
}

export class ComponentValuesSorting implements Action {
    readonly type = ComponentValuesActionTypes.SORTING_COMPONENT_VALUES_TABLE;
}

export class CollapseValues implements Action {
    readonly type = ComponentValuesActionTypes.COLLAPSE_VALUES;
    constructor(public payload: any) {}
}

export class ComponentStepsGet implements Action {
    readonly type = ComponentValuesActionTypes.GET_COMPONENT_STEPS;
    constructor(public payload: any) {}
}

export class ComponentStepsGetSuccess implements Action {
    readonly type = ComponentValuesActionTypes.GET_COMPONENT_STEPS_SUCCESS;
    constructor(public payload: any) {}
}

export class PerformanceGet implements Action {
    readonly type = ComponentValuesActionTypes.GET_PERFORMANCE;
}

export class PerformanceGetSuccess implements Action {
    readonly type = ComponentValuesActionTypes.GET_PERFORMANCE_SUCCESS;
    constructor(public payload: any) {}
}

export class PerformanceComponentGet implements Action {
    readonly type = ComponentValuesActionTypes.GET_PERFORMANCE_COMPONENT;
    constructor(public payload: any) {}
}

export class PerformanceComponentGetSuccess implements Action {
    readonly type = ComponentValuesActionTypes.GET_PERFORMANCE_COMPONENT_SUCCESS;
    constructor(public payload: any) {}
}

export class SavePerformance implements Action {
    readonly type = ComponentValuesActionTypes.SAVE_PERFORMANCE;
    constructor(public payload: any) {}
}

export class SavePerformanceComponent implements Action {
    readonly type = ComponentValuesActionTypes.SAVE_PERFORMANCE_COMPONENT;
    constructor(public payload: any) {}
}

export class SaveUserFactorValue implements Action {
    readonly type = ComponentValuesActionTypes.SAVE_USER_FACTOR_VALUE;
    constructor(public payload: UserFactorValues) {}
}

export class SaveUserFactorValueSuccess implements Action {
    readonly type = ComponentValuesActionTypes.SAVE_USER_FACTOR_VALUE_SUCCESS;
    constructor(public payload: UserFactorValues) {}
}

export class DownloadPerformances implements Action {
    readonly type = ComponentValuesActionTypes.DOWNLOAD_PERFORMANCES;
    constructor(public payload: any) {}
}

export class DownloadPerformancesSuccess implements Action {
    readonly type = ComponentValuesActionTypes.DOWNLOAD_PERFORMANCES_SUCCESS;
    constructor(public payload: any) {}
}

export class SetActiveComponentStep implements Action {
    readonly type = ComponentValuesActionTypes.SET_ACTIVE_COMPONENT_STEP;
    constructor(public payload: any) {}
}

export class SetDefaultState implements Action {
    readonly type = ComponentValuesActionTypes.SET_DEFAULT_STATE;
}

export type ComponentValuesActions =
    | ComponentValuesGet
    | ComponentValuesGetSuccess
    | ComponentValuesGetTable
    | ComponentValuesGetTableSuccess
    | ComponentValuesSorting
    | CollapseValues
    | ComponentStepsGet
    | ComponentStepsGetSuccess
    | PerformanceGet
    | PerformanceGetSuccess
    | PerformanceComponentGet
    | PerformanceComponentGetSuccess
    | SavePerformance
    | SavePerformanceComponent
    | SaveUserFactorValue
    | SaveUserFactorValueSuccess
    | DownloadPerformances
    | DownloadPerformancesSuccess
    | SetActiveComponentStep
    | SetDefaultState;
