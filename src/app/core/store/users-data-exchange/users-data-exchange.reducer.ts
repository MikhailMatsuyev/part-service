import { UsersDataExchangeActionTypes } from './users-data-exchange.actions';

export interface UsersDataExchangeState {
    dataExchange: any[];
}

export const initialState: UsersDataExchangeState = {
    dataExchange: null
};

export function usersDataExchange(state: UsersDataExchangeState = initialState, action: IUnsafeAction): UsersDataExchangeState {
    const { type, payload } = action;
    switch (type) {
        case UsersDataExchangeActionTypes.IMPORT_USER_DATA_SUCCESS: {
            return {
                ...state,
                dataExchange: payload.map(item => ({nameOld: item, nameNew: item, action: -1}))
            };
        }

        case UsersDataExchangeActionTypes.CHANGE_USERNAME: {
            const dataExchange = state.dataExchange.map(item => {
                if (item.nameOld === payload.nameOld) {
                    return {
                        ...item,
                        ...payload
                    };
                }

                return item;
            });

            return {
                ...state,
                dataExchange
            };
        }

        case UsersDataExchangeActionTypes.APPLY_IMPORT_USERS_SUCCESS: {
            return {
                ...state,
                dataExchange: null
            };
        }

        case UsersDataExchangeActionTypes.SET_DEFAULT_STATE: {
            return {
                ...initialState
            };
        }

        default: {
            return state;
        }
    }
}
