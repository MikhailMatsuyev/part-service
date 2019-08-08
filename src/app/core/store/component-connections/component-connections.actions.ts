import { Action } from '@ngrx/store';

export enum ComponentConnectionsActionTypes {
    GET_COMPONENT_SERIES = '[Component Connections] GET_COMPONENT_SERIES',
    GET_COMPONENT_SERIES_SUCCESS = '[Component Connections] GET_COMPONENT_SERIES_SUCCESS',
    GET_COMBINED_SERIES = '[Component Connections] GET_COMBINED_SERIES',
    GET_COMBINED_SERIES_SUCCESS = '[Component Connections] GET_COMBINED_SERIES_SUCCESS',
    GET_CONNECTED_USER_FACTOR = '[Component Connections] GET_CONNECTED_USER_FACTOR',
    GET_CONNECTED_USER_FACTOR_SUCCESS = '[Component Connections] GET_CONNECTED_USER_FACTOR_SUCCESS',
    GET_CONNECTED_FORMUL = '[Component Connections] GET_CONNECTED_FORMUL',
    GET_CONNECTED_FORMUL_SUCCESS = '[Component Connections] GET_CONNECTED_FORMUL_SUCCESS',
    GET_NETWORK_DATA = '[Component Connections] GET_NETWORK_DATA',
    GET_NETWORK_DATA_SUCCESS = '[Component Connections] GET_NETWORK_DATA_SUCCESS',
    SET_FICTIVE_USER_FACTOR = '[Component Connections] SET_FICTIVE_USER_FACTOR',
    SET_FICTIVE_USER_FACTOR_SUCCESS = '[Component Connections] SET_FICTIVE_USER_FACTOR_SUCCESS',
    GET_COMPONENT_SERIES_LIST = '[Component Connections] GET_COMPONENT_SERIES_LIST',
    GET_COMPONENT_SERIES_LIST_SUCCESS = '[Component Connections] GET_COMPONENT_SERIES_LIST_SUCCESS',
    SET_COMBINED_COMPONENT_SERIES = '[Component Connections] SET_COMBINED_COMPONENT_SERIES',
    SET_COMBINED_COMPONENT_SERIES_SUCCESS = '[Component Connections] SET_COMBINED_COMPONENT_SERIES_SUCCESS',
    GET_USER_FACTORS_LIST = '[Component Connections] GET_USER_FACTORS_LIST',
    GET_USER_FACTORS_LIST_SUCCESS = '[Component Connections] GET_USER_FACTORS_LIST_SUCCESS',
    SET_USER_FACTORS_IMPL = '[Component Connections] SET_USER_FACTORS_IMPL',
    SET_USER_FACTORS_IMPL_SUCCESS = '[Component Connections] SET_USER_FACTORS_IMPL_SUCCESS',
    GET_ALL_COMPONENT_USER_FACTOR_EXPORT = '[Component Connections] GET_ALL_COMPONENT_USER_FACTOR_EXPORT',
    GET_COMBINED_COMPONENT = '[Component Connections] GET_COMBINED_COMPONENT',
    SET_ACTIVE_COMPONENT = '[Component Connections] SET_ACTIVE_COMPONENT',
    SET_ACTIVE_ALL_COMPONENT = '[Component Connections] SET_ACTIVE_ALL_COMPONENT',
    SET_DEPTH_CONNECTION = '[Component Connections] SET_DEPTH_CONNECTION',
    SET_COMBINED_COMPONENT = '[Component Connections] SET_COMBINED_COMPONENT',
    SET_USER_FACTOR_COMPONENT = '[Component Connections] SET_USER_FACTOR_COMPONENT',
    DOWNLOAD_COMPONENT_CONNECTIONS = '[Component Connections] DOWNLOAD_COMPONENT_CONNECTIONS',
    DOWNLOAD_COMPONENT_CONNECTIONS_SUCCESS = '[Component Connections] DOWNLOAD_COMPONENT_CONNECTIONS_SUCCESS',
    SET_DEFAULT_STATE = '[Component Connections] SET_DEFAULT_STATE'
}

export class GetComponentSeries implements Action {
    readonly type = ComponentConnectionsActionTypes.GET_COMPONENT_SERIES;
    constructor(public payload?: {combined: boolean}) {}
}

export class GetComponentSeriesSuccess implements Action {
    readonly type = ComponentConnectionsActionTypes.GET_COMPONENT_SERIES_SUCCESS;
    constructor(public payload: any) {}
}

export class GetComponentCombinedSeries implements Action {
    readonly type = ComponentConnectionsActionTypes.GET_COMBINED_SERIES;
    constructor(public payload: number) {}
}

export class GetComponentCombinedSeriesSuccess implements Action {
    readonly type = ComponentConnectionsActionTypes.GET_COMBINED_SERIES_SUCCESS;
    constructor(public payload: any[]) {}
}

export class GetConnectedUserFactor implements Action {
    readonly type = ComponentConnectionsActionTypes.GET_CONNECTED_USER_FACTOR;
    constructor(public payload: number) {}
}

export class GetConnectedUserFactorSuccess implements Action {
    readonly type = ComponentConnectionsActionTypes.GET_CONNECTED_USER_FACTOR_SUCCESS;
    constructor(public payload: any[]) {}
}

export class GetNetworkData implements Action {
    readonly type = ComponentConnectionsActionTypes.GET_NETWORK_DATA;
    constructor(public payload: {id: number, depth: number}) {}
}

export class GetNetworkDataSuccess implements Action {
    readonly type = ComponentConnectionsActionTypes.GET_NETWORK_DATA_SUCCESS;
    constructor(public payload: UserFactorNetwork) {}
}

export class SetFictiveUserFactor implements Action {
    readonly type = ComponentConnectionsActionTypes.SET_FICTIVE_USER_FACTOR;
    constructor(public payload: {serieId: number, state: boolean}) {}
}

export class SetFictiveUserFactorSuccess implements Action {
    readonly type = ComponentConnectionsActionTypes.SET_FICTIVE_USER_FACTOR_SUCCESS;
    constructor(public payload: any[]) {}
}

export class GetComponentSeriesList implements Action {
    readonly type = ComponentConnectionsActionTypes.GET_COMPONENT_SERIES_LIST;
    constructor(public payload: number) {}
}

export class GetComponentSeriesListSuccess implements Action {
    readonly type = ComponentConnectionsActionTypes.GET_COMPONENT_SERIES_LIST_SUCCESS;
    constructor(public payload: any[]) {}
}

export class SetCombinedComponentSeries implements Action {
    readonly type = ComponentConnectionsActionTypes.SET_COMBINED_COMPONENT_SERIES;
    constructor(public payload?: { id: number, values?: number[] }) {}
}

export class SetCombinedComponentSeriesSuccess implements Action {
    readonly type = ComponentConnectionsActionTypes.SET_COMBINED_COMPONENT_SERIES_SUCCESS;
    constructor(public payload: any[]) {}
}

export class GetUserFactorsList implements Action {
    readonly type = ComponentConnectionsActionTypes.GET_USER_FACTORS_LIST;
    constructor(public payload: number) {}
}

export class GetUserFactorsListSuccess implements Action {
    readonly type = ComponentConnectionsActionTypes.GET_USER_FACTORS_LIST_SUCCESS;
    constructor(public payload: any[]) {}
}

export class SetUserFactorsImpl implements Action {
    readonly type = ComponentConnectionsActionTypes.SET_USER_FACTORS_IMPL;
    constructor(public payload: {id: number, values?: number[]}) {}
}

export class SetUserFactorsImplSuccess implements Action {
    readonly type = ComponentConnectionsActionTypes.SET_USER_FACTORS_IMPL_SUCCESS;
    constructor(public payload: any[]) {}
}

export class GetAllComponentUserFactorExport implements Action {
    readonly type = ComponentConnectionsActionTypes.GET_ALL_COMPONENT_USER_FACTOR_EXPORT;
    constructor(public payload: any[]) {}
}

export class GetCombinedComponent implements Action {
    readonly type = ComponentConnectionsActionTypes.GET_COMBINED_COMPONENT;
    constructor(public payload: number) {}
}

export class SetAllActiveComponent implements Action {
    readonly type = ComponentConnectionsActionTypes.SET_ACTIVE_ALL_COMPONENT;
    constructor(public payload: boolean) {}
}

export class SetActiveComponent implements Action {
    readonly type = ComponentConnectionsActionTypes.SET_ACTIVE_COMPONENT;
    constructor(public payload: {id: number, checked: boolean}) {}
}

export class SetDepthConnection implements Action {
    readonly type = ComponentConnectionsActionTypes.SET_DEPTH_CONNECTION;
    constructor(public payload: number) {}
}

export class GetConnectedFormul implements Action {
    readonly type = ComponentConnectionsActionTypes.GET_CONNECTED_FORMUL;
    constructor(public payload: number) {}
}

export class GetConnectedFormulSuccess implements Action {
    readonly type = ComponentConnectionsActionTypes.GET_CONNECTED_FORMUL_SUCCESS;
    constructor(public payload: Formulas) {}
}

export class SetCombinedComponent implements Action {
    readonly type = ComponentConnectionsActionTypes.SET_COMBINED_COMPONENT;
    constructor(public payload: {id: number, checked: boolean}) {}
}

export class SetUserFactorComponent implements Action {
    readonly type = ComponentConnectionsActionTypes.SET_USER_FACTOR_COMPONENT;
    constructor(public payload: {id: number, checked: boolean}) {}
}

export class DownloadComponentConnections implements Action {
    readonly type = ComponentConnectionsActionTypes.DOWNLOAD_COMPONENT_CONNECTIONS;
    constructor(public payload: DownloadConnections) {}
}

export class DownloadComponentConnectionsSuccess implements Action {
    readonly type = ComponentConnectionsActionTypes.DOWNLOAD_COMPONENT_CONNECTIONS_SUCCESS;
}

export class SetDefaultState implements Action {
    readonly type = ComponentConnectionsActionTypes.SET_DEFAULT_STATE;
}

export type ComponentConnectionsActions =
    | GetComponentSeries
    | GetComponentSeriesSuccess
    | GetComponentCombinedSeries
    | GetComponentCombinedSeriesSuccess
    | GetNetworkData
    | GetNetworkDataSuccess
    | SetFictiveUserFactor
    | SetFictiveUserFactorSuccess
    | GetComponentSeriesList
    | GetComponentSeriesListSuccess
    | SetCombinedComponentSeries
    | SetCombinedComponentSeriesSuccess
    | GetUserFactorsList
    | GetUserFactorsListSuccess
    | SetUserFactorsImpl
    | SetUserFactorsImplSuccess
    | GetAllComponentUserFactorExport
    | GetCombinedComponent
    | SetAllActiveComponent
    | SetActiveComponent
    | SetDepthConnection
    | SetCombinedComponent
    | SetUserFactorComponent
    | DownloadComponentConnections
    | DownloadComponentConnectionsSuccess
    | SetDefaultState;
