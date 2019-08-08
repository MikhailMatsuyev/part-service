import { InterfaceConnectionsActionTypes } from './interfaces-connections.actions';

export interface InterfaceConnectionsState {
    interfaces: any[];
    connectedComponents: any[];
    depth: number;
    networkData: InterfaceNetwork;
    connectionElements: any[];
}

export const initialState: InterfaceConnectionsState = {
    interfaces: [],
    connectedComponents: [],
    depth: 2,
    networkData: {
        interfaces: [],
        components: [],
        links: []
    },
    connectionElements: []
};

export function interfaceConnections(state: InterfaceConnectionsState = initialState, action: IUnsafeAction): InterfaceConnectionsState {
    const { type, payload } = action;

    switch (type) {
        case InterfaceConnectionsActionTypes.GET_INTERFACES_SUCCESS: {
            return {
                ...state,
                interfaces: payload
            };
        }

        case InterfaceConnectionsActionTypes.GET_CONNECTED_COMPONENTS_SUCCESS: {
            const connectionElements = state.connectionElements.map(item => {
                    return {
                        ...item,
                        isChecked: payload.some(elem => item.id === elem.id)
                    };
            });

            return {
                ...state,
                connectionElements,
                connectedComponents: payload
            };
        }

        case InterfaceConnectionsActionTypes.GET_INTERFACE_NETWORK_SUCCESS: {
            return {
                ...state,
                networkData: payload
            };
        }

        case InterfaceConnectionsActionTypes.GET_CONNECTION_ELEMENTS_SUCCESS: {
            return {
                ...state,
                connectionElements : payload
            };
        }

        case InterfaceConnectionsActionTypes.SET_INTERFACE_CONNECTION: {
            const { id, checked } = payload;

            const connectionElements = state.connectionElements.map(item => {
                if (item.id === id) {
                    return { ...item, isChecked: checked };
                }

                return item;
            });

            return {
                ...state,
                connectionElements
            };
        }

        default: {
            return state;
        }
    }
}
