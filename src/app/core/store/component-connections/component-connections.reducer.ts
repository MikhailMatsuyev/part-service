import { ComponentConnectionsActionTypes } from './component-connections.actions';


export interface ComponentConnectionsState {
    componentSeries: any[];
    depth: number;
    isAllActive: boolean;
    combinedComponent: any[];
    connectedUserFactor: any[];
    hasFictive: boolean;
    links: Array<{ base: number, comb: number }>;
    names: Array<{ id: number, name: string }>;
    componentSeriesList: Array<{ id: number, name: string }>;
    activeComponentSeriesList: Array<{ id: number, name: string }>;
    activeConnectedUserFactor: Array<{ id: number, name: string }>;
    formulas: Formulas[];
}

export const initialState: ComponentConnectionsState = {
    componentSeries: [],
    depth: 2,
    isAllActive: false,
    combinedComponent: [],
    connectedUserFactor: [],
    hasFictive: false,
    links: [],
    names: [],
    componentSeriesList: [],
    formulas: [],
    activeComponentSeriesList: [],
    activeConnectedUserFactor: []
};

export function componentConnections(state: ComponentConnectionsState = initialState, action: IUnsafeAction): ComponentConnectionsState {
    const { type, payload } = action;

    switch (type) {
        case ComponentConnectionsActionTypes.GET_COMPONENT_SERIES_SUCCESS: {
            const { data , connection } = payload;
            const componentSeriesList = !connection ? data : state.componentSeriesList;
            return {
                ...initialState,
                componentSeries: data,
                componentSeriesList
            };
        }

        case ComponentConnectionsActionTypes.SET_ACTIVE_ALL_COMPONENT: {
            const componentSeries = state.componentSeries.map(item => ({ ...item, checked: payload }));

            return {
                ...state,
                componentSeries,
                isAllActive: payload
            };
        }

        case ComponentConnectionsActionTypes.SET_ACTIVE_COMPONENT: {
            const { id, checked } = payload;

            const componentSeries = state.componentSeries.map(item => {
                if (item.id === id) {
                    return { ...item, checked };
                }

                return item;
            });

            return {
                ...state,
                componentSeries,
                isAllActive: componentSeries.every(({ checked: checkedSeries }) => checkedSeries)
            };
        }

        case ComponentConnectionsActionTypes.GET_COMBINED_SERIES_SUCCESS: {
            const activeComponentSeriesList = state.componentSeriesList.map(seriesItem => {
                const element = payload.find(item => item.id === seriesItem.id);
                return {
                    ...seriesItem,
                    isChecked: !!element
                };
            });

            return {
                ...state,
                combinedComponent: payload,
                activeComponentSeriesList
            };
        }

        case ComponentConnectionsActionTypes.GET_CONNECTED_USER_FACTOR_SUCCESS: {
            const { hasFictive, data } = payload;

            return {
                ...state,
                connectedUserFactor: data,
                hasFictive
            };
        }

        case ComponentConnectionsActionTypes.GET_NETWORK_DATA_SUCCESS: {
            const { links, names } = payload;

            return {
                ...state,
                links,
                names
            };
        }

        case ComponentConnectionsActionTypes.SET_DEPTH_CONNECTION: {
            return {
                ...state,
                depth: payload
            };
        }

        case ComponentConnectionsActionTypes.GET_CONNECTED_FORMUL_SUCCESS: {
            return {
                ...state,
                formulas: payload
            };
        }

        case ComponentConnectionsActionTypes.SET_COMBINED_COMPONENT: {
            const { id, checked } = payload;

            const activeComponentSeriesList = state.activeComponentSeriesList.map(item => {
                if (item.id === id) {
                    return { ...item, isChecked: checked };
                }

                return item;
            });

            return {
                ...state,
                activeComponentSeriesList
            };
        }

        case ComponentConnectionsActionTypes.SET_COMBINED_COMPONENT_SERIES_SUCCESS: {
            const activeComponentSeriesList = state.componentSeriesList.map(seriesItem => {
                const element = payload.find(item => item.id === seriesItem.id);
                return {
                    ...seriesItem,
                    isChecked: !!element
                };
            });

            return {
                ...state,
                activeComponentSeriesList
            };
        }

        case ComponentConnectionsActionTypes.GET_USER_FACTORS_LIST_SUCCESS: {
            const activeConnectedUserFactor = payload.map((seriesItem) => {
                const element = state.connectedUserFactor.find(item => item.id === seriesItem.id);
                return {
                    ...seriesItem,
                    isChecked: !!element
                };
            });

            return {
                ...state,
                activeConnectedUserFactor
            };
        }

        case ComponentConnectionsActionTypes.SET_USER_FACTOR_COMPONENT: {
            const { id, checked } = payload;

            const activeConnectedUserFactor = state.activeConnectedUserFactor.map(item => {
                if (item.id === id) {
                    return { ...item, isChecked: checked };
                }

                return item;
            });

            return {
                ...state,
                activeConnectedUserFactor
            };
        }

        case ComponentConnectionsActionTypes.SET_USER_FACTORS_IMPL_SUCCESS: {
            return {
                ...state,
                connectedUserFactor: payload
            };
        }

        case ComponentConnectionsActionTypes.SET_DEFAULT_STATE: {
            return {
                ...initialState
            };
        }

        default: {
            return state;
        }
    }
}
