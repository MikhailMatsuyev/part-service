import { UserValuesActionTypes } from './user-values.actions';
import { sortBy } from '../../../utils/utilsfunc';

export interface UserValuesState {
    userValues: any[];
    userValuesTable: any[];
    directionSort: boolean;
    isActiveUserValue: any;
}

export const initialState: UserValuesState = {
    userValues: [],
    userValuesTable: [],
    directionSort: true,
    isActiveUserValue: null
};

export function userValues(state: UserValuesState = initialState, action: IUnsafeAction): UserValuesState {
    const { type, payload } = action;

    switch (type) {
        case UserValuesActionTypes.GET_USER_VALUES_SUCCESS: {
            return {
                ...state,
                userValues: sortBy(payload, 'name', state.directionSort),
                isActiveUserValue: (payload && Array.isArray(payload)) ? payload[0] : null
            };
        }

        case UserValuesActionTypes.GET_USER_VALUES_TABLE_SUCCESS: {
            const { data, payload: payloadId } = payload;

            return {
                ...state,
                userValuesTable: data,
                isActiveUserValue: state.userValues.find(({id}) => id === payloadId)
            };
        }

        case UserValuesActionTypes.SORTING_USER_VALUES_TABLE: {
            const directionSort = !state.directionSort;
            return {
                ...state,
                directionSort,
                userValues: sortBy(state.userValues, 'name', directionSort)
            };
        }

        case UserValuesActionTypes.SAVE_USER_VALUES_TABLE_SUCCESS: {
            const { stepId } = payload;
            const userValue = state.userValues.map(item => {
                if (item.stepId === stepId) {
                    return {
                        ...item,
                        ...payload
                    };
                }

                return item;
            });

            return {
                ...state,
                userValues: userValue
            };
        }

        case UserValuesActionTypes.SET_DEFAULT_STATE: {
            return {
                ...initialState
            };
        }

        case UserValuesActionTypes.SET_USER_VALUE: {
            return {
                ...state,
                isActiveUserValue: state.userValues.find(({id}) => id === payload)
            };
        }

        default: {
            return state;
        }
    }
}
