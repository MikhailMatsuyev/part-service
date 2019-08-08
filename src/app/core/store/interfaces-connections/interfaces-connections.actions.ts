import { Action } from '@ngrx/store';

export enum InterfaceConnectionsActionTypes {
    GET_INTERFACES = '[Interface Connections] GET_INTERFACES',
    GET_INTERFACES_SUCCESS = '[Interface Connections] GET_INTERFACES_SUCCESS',
    GET_CONNECTIONS_INFO = '[Interface Connections] GET_CONNECTIONS_INFO',
    GET_CONNECTED_COMPONENTS = '[Interface Connections] GET_CONNECTED_COMPONENTS',
    GET_CONNECTED_COMPONENTS_SUCCESS = '[Interface Connections] GET_CONNECTED_COMPONENTS_SUCCESS',
    GET_INTERFACE_NETWORK = '[Interface Connections] GET_INTERFACE_NETWORK',
    GET_INTERFACE_NETWORK_SUCCESS = '[Interface Connections] GET_INTERFACE_NETWORK_SUCCESS',
    GET_CONNECTION_ELEMENTS = '[Interface Connections] GET_CONNECTION_ELEMENTS',
    GET_CONNECTION_ELEMENTS_SUCCESS = '[Interface Connections] GET_CONNECTION_ELEMENTS_SUCCESS',
    SET_INTERFACE_CONNECTION = '[Interface Connections] GET_INTERFACE_CONNECTION',
    SAVE_INTERFACE_CONNECTIONS = '[Interface Connections] SAVE_INTERFACE_CONNECTIONS',
    SAVE_INTERFACE_CONNECTIONS_SUCCESS = '[Interface Connections] SAVE_INTERFACE_CONNECTIONS_SUCCESS',
    DOWNLOAD_INTERFACE_CONNECTIONS = '[Interface Connections] DOWNLOAD_INTERFACE_CONNECTIONS',
    DOWNLOAD_INTERFACE_CONNECTIONS_SUCCESS = '[Interface Connections] DOWNLOAD_INTERFACE_CONNECTIONS_SUCCESS',
}

export class GetInterfaces implements Action {
    readonly type = InterfaceConnectionsActionTypes.GET_INTERFACES;
}

export class GetInterfacesSuccess implements Action {
    readonly type = InterfaceConnectionsActionTypes.GET_INTERFACES_SUCCESS;
    constructor(public payload: InterfacesImp[]) {}
}

export class GetConnectionInfo implements Action {
    readonly type = InterfaceConnectionsActionTypes.GET_CONNECTIONS_INFO;
    constructor(public payload: number) {}
}

export class GetConnectedComponents implements Action {
    readonly type = InterfaceConnectionsActionTypes.GET_CONNECTED_COMPONENTS;
    constructor(public payload: number) {}
}

export class GetConnectedComponentsSuccess implements Action {
    readonly type = InterfaceConnectionsActionTypes.GET_CONNECTED_COMPONENTS_SUCCESS;
    constructor(public payload: InterfacesImp[]) {}
}

export class GetInterfaceNetwork implements Action {
    readonly type = InterfaceConnectionsActionTypes.GET_INTERFACE_NETWORK;
    constructor(public payload: number) {}
}

export class GetInterfaceNetworkSuccess implements Action {
    readonly type = InterfaceConnectionsActionTypes.GET_INTERFACE_NETWORK_SUCCESS;
    constructor(public payload: InterfaceNetwork) {}
}

export class GetConnectionElements implements Action {
    readonly type = InterfaceConnectionsActionTypes.GET_CONNECTION_ELEMENTS;
}

export class GetConnectionElementsSuccess implements Action {
    readonly type = InterfaceConnectionsActionTypes.GET_CONNECTION_ELEMENTS_SUCCESS;
    constructor(public payload: any[]) {}
}

export class SetInterfaceConnection implements Action {
    readonly type = InterfaceConnectionsActionTypes.SET_INTERFACE_CONNECTION;
    constructor(public payload: { id: number, checked: boolean }) {}
}

export class SaveInterfaceConnections implements Action {
    readonly type = InterfaceConnectionsActionTypes.SAVE_INTERFACE_CONNECTIONS;
    constructor(public payload: { id: number }) {}
}

export class SaveInterfaceConnectionsSuccess implements Action {
    readonly type = InterfaceConnectionsActionTypes.SAVE_INTERFACE_CONNECTIONS_SUCCESS;
}

export class DownloadInterfaceConnections implements Action {
    readonly type = InterfaceConnectionsActionTypes.DOWNLOAD_INTERFACE_CONNECTIONS;
    constructor(public payload: { id: number }) {}
}

export class DownloadInterfaceConnectionsSuccess implements Action {
    readonly type = InterfaceConnectionsActionTypes.DOWNLOAD_INTERFACE_CONNECTIONS_SUCCESS;
}

export type InterfaceConnectionsActions =
| GetInterfaces
| GetInterfacesSuccess
| GetConnectedComponents
| GetConnectedComponentsSuccess
| GetConnectionElements
| GetConnectionElementsSuccess
| SetInterfaceConnection;

