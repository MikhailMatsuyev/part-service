import { UserConnectionsActionTypes } from './user-connections.actions';

export interface UserFactorConnectionsState {
    userFactors: any[];
    depth: number;
    netWorkData: UserFactorNetwork;
    formulas: Formulas[];
    connectedComponents: UserFactorConnected[];
    componentSeriesDimImpl: UserFactorConnected[];
    connectedUserFactor: UserFactorConnected[];
    activeComponentSeriesList: Array<{ id: number, name: string }>;
    activeConnectedUserFactor: Array<{ id: number, name: string }>;
    isAllActive: boolean;
}

export const initialState: UserFactorConnectionsState = {
    userFactors: [],
    depth: 2,
    netWorkData: null,
    formulas: [],
    connectedComponents: [],
    componentSeriesDimImpl: [],
    connectedUserFactor: [],
    isAllActive: false,
    activeComponentSeriesList: [],
    activeConnectedUserFactor: []
};

export function userFactorConnections(state: UserFactorConnectionsState = initialState, action: IUnsafeAction): UserFactorConnectionsState {
    const { type, payload } = action;

    switch (type) {
        case UserConnectionsActionTypes.GET_USER_FACTOR_SUCCESS: {
            return {
                ...state,
                netWorkData: { links: [], names: [] },
                userFactors: payload.map(item => ({...item, isChecked: false}))
            };
        }

        case UserConnectionsActionTypes.SET_DEPTH_CONNECTION: {
            return {
                ...state,
                depth: payload
            };
        }

        case UserConnectionsActionTypes.GET_NETWORK_DATA_SUCCESS: {
            return {
                ...state,
                netWorkData: payload
            };
        }

        case UserConnectionsActionTypes.GET_CONNECTED_FORMULAS_SUCCESS: {
            return {
                ...state,
                formulas: payload
            };
        }

        case UserConnectionsActionTypes.GET_CONNECTED_COMPONENT_SERIES_SUCCESS: {
            return {
                ...state,
                connectedComponents: payload
            };
        }

        case UserConnectionsActionTypes.GET_COMPONENT_SERIES_DIMIMPL_SUCCESS: {
            const activeComponentSeriesList = state.activeComponentSeriesList.map(seriesItem => {
                const element = payload.find(item => item.id === seriesItem.id);
                return {
                    ...seriesItem,
                    isChecked: !!element
                };
            });

            return {
                ...state,
                componentSeriesDimImpl: payload,
                activeComponentSeriesList
            };
        }

        case UserConnectionsActionTypes.GET_CONNECTED_USER_FACTORS_SUCCESS: {
            const activeConnectedUserFactor = state.activeConnectedUserFactor.map(seriesItem => {
                const element = payload.find(item => item.id === seriesItem.id);
                return {
                    ...seriesItem,
                    isChecked: !!element
                };
            });

            return {
                ...state,
                connectedUserFactor: payload,
                activeConnectedUserFactor
            };
        }

        case UserConnectionsActionTypes.SET_COMBINED_COMPONENT: {
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

        case UserConnectionsActionTypes.SET_ACTIVE_ALL_COMPONENT: {
            const userFactors = state.userFactors.map(item => ({ ...item, isChecked: payload }));

            return {
                ...state,
                userFactors,
                isAllActive: payload
            };
        }

        case UserConnectionsActionTypes.SET_ACTIVE_COMPONENT: {
            const { id, checked } = payload;

            const userFactors = state.userFactors.map(item => {
                if (item.id === id) {
                    return { ...item, isChecked: checked };
                }

                return item;
            });

            return {
                ...state,
                userFactors,
                isAllActive: userFactors.every(({ isChecked: checkedSeries }) => checkedSeries)
            };
        }

        case UserConnectionsActionTypes.SET_COMPONENT_DIMENSIONIN: {
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

        case UserConnectionsActionTypes.SET_DIMENSIONING_COMPONENT: {
            const { id, checked } = payload;

            const userFactors = state.userFactors.map(item => {
                if (item.id === id) {
                    return { ...item, dimEnabled: checked };
                }

                return item;
            });

            return {
                ...state,
                userFactors
            };
        }

        case UserConnectionsActionTypes.UPDATE_USER_FACTOR_IMPL_SUCCESS: {
            const { id, isNeedUpdate } = payload;

            const userFactors = state.userFactors.map(item => {
                if (item.id === id) {
                    if (isNeedUpdate) {
                        return { ...item, ...payload };
                    } else {
                        const { dimEnabled, maxDim, formula } = payload;
                        return { ...item, maxDim, dimEnabled, formula};
                    }
                }

                return item;
            });

            return {
                ...state,
                userFactors
            };
        }

        case UserConnectionsActionTypes.GET_USER_FACTORS_LIST_SUCCESS: {
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

        case UserConnectionsActionTypes.GET_COMPONENT_SERIES_IMPL_SUCCESS: {
            return {
                ...state,
                activeComponentSeriesList: payload
            };
        }

        case UserConnectionsActionTypes.SET_DEFAULT_STATE: {
            return {
                ...initialState
            };
        }

        default: {
            return state;
        }
    }
}
