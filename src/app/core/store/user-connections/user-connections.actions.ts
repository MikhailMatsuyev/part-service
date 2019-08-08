import { Action } from '@ngrx/store';

export enum UserConnectionsActionTypes {
    GET_USER_FACTOR = '[User Connections] GET_USER_FACTOR',
    GET_USER_FACTOR_SUCCESS = '[User Connections] GET_USER_FACTOR_SUCCESS',
    SET_DEPTH_CONNECTION = '[User Connections] SET_DEPTH_CONNECTION',
    GET_CONNECTED_USER_FACTORS = '[User Connections] GET_CONNECTED_USER_FACTORS',
    GET_CONNECTED_USER_FACTORS_SUCCESS = '[User Connections] GET_CONNECTED_USER_FACTORS_SUCCESS',
    GET_CONNECTED_COMPONENT_SERIES = '[User Connections] GET_CONNECTED_COMPONENT_SERIES',
    GET_CONNECTED_COMPONENT_SERIES_SUCCESS = '[User Connections] GET_CONNECTED_COMPONENT_SERIES_SUCCESS',
    GET_COMPONENT_SERIES_DIMIMPL = '[User Connections] GET_COMPONENT_SERIES_DIMIMPL',
    GET_COMPONENT_SERIES_DIMIMPL_SUCCESS = '[User Connections] GET_COMPONENT_SERIES_DIMIMPL_SUCCESS',
    GET_CONNECTED_FORMULAS = '[User Connections] GET_CONNECTED_FORMULAS',
    GET_CONNECTED_FORMULAS_SUCCESS = '[User Connections] GET_CONNECTED_FORMULAS_SUCCESS',
    GET_NETWORK_DATA = '[User Connections] GET_NETWORK_DATA',
    GET_NETWORK_DATA_SUCCESS = '[User Connections] GET_NETWORK_DATA_SUCCESS',
    UPDATE_USER_FACTOR_IMPL = '[User Connections] UPDATE_USER_FACTOR_IMPL',
    UPDATE_USER_FACTOR_IMPL_SUCCESS = '[User Connections] UPDATE_USER_FACTOR_IMPL_SUCCESS',
    GET_COMBINED_COMPONENT = '[User Connections] GET_COMBINED_COMPONENT',
    DOWNLOAD_COMPONENT_CONNECTIONS = '[User Connections] DOWNLOAD_COMPONENT_CONNECTIONS',
    DOWNLOAD_COMPONENT_CONNECTIONS_SUCCESS = '[User Connections] DOWNLOAD_COMPONENT_CONNECTIONS_SUCCESS',
    SET_ACTIVE_COMPONENT = '[User Connections] SET_ACTIVE_COMPONENT',
    SET_ACTIVE_ALL_COMPONENT = '[User Connections] SET_ACTIVE_ALL_COMPONENT',
    SET_DIMENSIONING_COMPONENT = '[User Connections] SET_DIMENSIONING_COMPONENT',
    SET_USER_FACTORS_IMPL = '[User Connections] SET_USER_FACTORS_IMPL',
    SET_USER_FACTORS_IMPL_SUCCESS = '[User Connections] SET_USER_FACTORS_IMPL_SUCCESS',
    GET_USER_FACTORS_LIST = '[User Connections] GET_USER_FACTORS_LIST',
    GET_USER_FACTORS_LIST_SUCCESS = '[User Connections] GET_USER_FACTORS_LIST_SUCCESS',
    SET_COMBINED_COMPONENT = '[User Connections] SET_COMBINED_COMPONENT',
    GET_COMPONENT_SERIES_IMPL = '[User Connections] GET_COMPONENT_SERIES_IMPL',
    GET_COMPONENT_SERIES_IMPL_SUCCESS = '[User Connections] GET_COMPONENT_SERIES_IMPL_SUCCESS',
    SET_COMPONENT_DIMENSIONIN = '[User Connections] SET_COMPONENT_DIMENSIONIN',
    SET_COMBINED_COMPONENT_SERIES = '[User Connections] SET_COMBINED_COMPONENT_SERIES',
    SET_COMBINED_COMPONENT_SERIES_SUCCESS = '[User Connections] SET_COMBINED_COMPONENT_SERIES_SUCCESS',
    SET_DEFAULT_STATE = '[User Connections] SET_DEFAULT_STATE'
}

export class GetUserFactor implements Action {
    readonly type = UserConnectionsActionTypes.GET_USER_FACTOR;
    constructor(public payload?: {combinedOnly: boolean, withoutConnections?: boolean}) {}
}

export class GetUserFactorSuccess implements Action {
    readonly type = UserConnectionsActionTypes.GET_USER_FACTOR_SUCCESS;
    constructor(public payload: any) {}
}

export class GetConnectedUserFactor implements Action {
    readonly type = UserConnectionsActionTypes.GET_CONNECTED_USER_FACTORS;
    constructor(public payload: number) {}
}

export class GetConnectedUserFactorSuccess implements Action {
    readonly type = UserConnectionsActionTypes.GET_CONNECTED_USER_FACTORS_SUCCESS;
    constructor(public payload: UserFactorConnected[]) {}
}

export class GetConnectedComponentSeries implements Action {
    readonly type = UserConnectionsActionTypes.GET_CONNECTED_COMPONENT_SERIES;
    constructor(public payload: number) {}
}

export class SetCombinedComponent implements Action {
    readonly type = UserConnectionsActionTypes.SET_COMBINED_COMPONENT;
    constructor(public payload: {id: number, checked: boolean}) {}
}

export class GetConnectedComponentSeriesSuccess implements Action {
    readonly type = UserConnectionsActionTypes.GET_CONNECTED_COMPONENT_SERIES_SUCCESS;
    constructor(public payload: UserFactorConnected[]) {}
}

export class GetComponentSeriesDimImpl implements Action {
    readonly type = UserConnectionsActionTypes.GET_COMPONENT_SERIES_DIMIMPL;
    constructor(public payload: number) {}
}

export class GetComponentSeriesDimImplSuccess implements Action {
    readonly type = UserConnectionsActionTypes.GET_COMPONENT_SERIES_DIMIMPL_SUCCESS;
    constructor(public payload: UserFactorConnected[]) {}
}

export class GetConnectedFormulas implements Action {
    readonly type = UserConnectionsActionTypes.GET_CONNECTED_FORMULAS;
    constructor(public payload: UserFactorConnected[]) {}
}

export class GetConnectedFormulasSuccess implements Action {
    readonly type = UserConnectionsActionTypes.GET_CONNECTED_FORMULAS_SUCCESS;
    constructor(public payload: Formulas[]) {}
}

export class GetNetworkData implements Action {
    readonly type = UserConnectionsActionTypes.GET_NETWORK_DATA;
    constructor(public payload: {id: number, depth: number}) {}
}

export class GetNetworkDataSuccess implements Action {
    readonly type = UserConnectionsActionTypes.GET_NETWORK_DATA_SUCCESS;
    constructor(public payload: UserFactorNetwork) {}
}

export class UpdateUserFactorImpl implements Action {
    readonly type = UserConnectionsActionTypes.UPDATE_USER_FACTOR_IMPL;
    constructor(public payload: UserFactorValuesImpl) {}
}

export class UpdateUserFactorImplSuccess implements Action {
    readonly type = UserConnectionsActionTypes.UPDATE_USER_FACTOR_IMPL_SUCCESS;
    constructor(public payload: any) {}
}

export class SetDepthConnection implements Action {
    readonly type = UserConnectionsActionTypes.SET_DEPTH_CONNECTION;
    constructor(public payload: number) {}
}

export class GetCombinedComponent implements Action {
    readonly type = UserConnectionsActionTypes.GET_COMBINED_COMPONENT;
    constructor(public payload: number) {}
}

export class DownloadComponentConnections implements Action {
    readonly type = UserConnectionsActionTypes.DOWNLOAD_COMPONENT_CONNECTIONS;
    constructor(public payload: DownloadConnections) {}
}

export class DownloadComponentConnectionsSuccess implements Action {
    readonly type = UserConnectionsActionTypes.DOWNLOAD_COMPONENT_CONNECTIONS_SUCCESS;
}

export class SetAllActiveComponent implements Action {
    readonly type = UserConnectionsActionTypes.SET_ACTIVE_ALL_COMPONENT;
    constructor(public payload: boolean) {}
}

export class SetActiveComponent implements Action {
    readonly type = UserConnectionsActionTypes.SET_ACTIVE_COMPONENT;
    constructor(public payload: {id: number, checked: boolean}) {}
}

export class SetDimensioningComponent implements Action {
    readonly type = UserConnectionsActionTypes.SET_DIMENSIONING_COMPONENT;
    constructor(public payload: {id: number, checked: boolean}) {}
}

export class SetUserFactorsImpl implements Action {
    readonly type = UserConnectionsActionTypes.SET_USER_FACTORS_IMPL;
    constructor(public payload: {id: number, values?: number[]}) {}
}

export class SetUserFactorsImplSuccess implements Action {
    readonly type = UserConnectionsActionTypes.SET_USER_FACTORS_IMPL_SUCCESS;
    constructor(public payload: any[]) {}
}

export class GetUserFactorsList implements Action {
    readonly type = UserConnectionsActionTypes.GET_USER_FACTORS_LIST;
    constructor(public payload: number) {}
}

export class GetUserFactorsListSuccess implements Action {
    readonly type = UserConnectionsActionTypes.GET_USER_FACTORS_LIST_SUCCESS;
    constructor(public payload: any[]) {}
}

export class GetComponentSeriesImpl implements Action {
    readonly type = UserConnectionsActionTypes.GET_COMPONENT_SERIES_IMPL;
}

export class GetComponentSeriesImplSuccess implements Action {
    readonly type = UserConnectionsActionTypes.GET_COMPONENT_SERIES_IMPL_SUCCESS;
    constructor(public payload: any[]) {}
}


export class SetComponentDimensioning implements Action {
    readonly type = UserConnectionsActionTypes.SET_COMPONENT_DIMENSIONIN;
    constructor(public payload: {id: number, checked: boolean}) {}
}

export class SetCombinedComponentSeries implements Action {
    readonly type = UserConnectionsActionTypes.SET_COMBINED_COMPONENT_SERIES;
    constructor(public payload: {id: number, values?: number[]}) {}
}

export class SetCombinedComponentSeriesSuccess implements Action {
    readonly type = UserConnectionsActionTypes.SET_COMBINED_COMPONENT_SERIES_SUCCESS;
    constructor(public payload: any[]) {}
}

export class SetDefaultState implements Action {
    readonly type = UserConnectionsActionTypes.SET_DEFAULT_STATE;
}


export type UserConnectionsActions =
    | GetUserFactor
    | GetUserFactorSuccess
    | SetDepthConnection
    | GetConnectedUserFactor
    | GetConnectedUserFactorSuccess
    | GetConnectedComponentSeries
    | GetConnectedComponentSeriesSuccess
    | GetComponentSeriesDimImpl
    | GetComponentSeriesDimImplSuccess
    | GetConnectedFormulas
    | GetConnectedFormulasSuccess
    | GetNetworkData
    | GetNetworkDataSuccess
    | UpdateUserFactorImpl
    | UpdateUserFactorImplSuccess
    | GetCombinedComponent
    | DownloadComponentConnections
    | DownloadComponentConnectionsSuccess
    | SetAllActiveComponent
    | SetActiveComponent
    | SetDimensioningComponent
    | SetUserFactorsImpl
    | SetUserFactorsImplSuccess
    | GetUserFactorsList
    | GetUserFactorsListSuccess
    | SetCombinedComponent
    | GetComponentSeriesImpl
    | GetComponentSeriesImplSuccess
    | SetComponentDimensioning
    | SetCombinedComponentSeries
    | SetCombinedComponentSeriesSuccess
    | SetDefaultState;
