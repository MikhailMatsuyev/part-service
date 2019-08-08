import { sortBy } from '../../../utils/utilsfunc';
import { ComponentValuesActionTypes } from './component-values.actions';

export interface ComponentValuesState {
    componentValues: any[];
    componentValuesTable: any[];
    directionSort: boolean;
    activeComponentStep: number;
    performance: any[];
}

export const initialState: ComponentValuesState = {
    componentValues: [],
    componentValuesTable: [],
    directionSort: true,
    activeComponentStep: null,
    performance: []
};

export function componentValues(state: ComponentValuesState = initialState, action: IUnsafeAction): ComponentValuesState {
    const { type, payload } = action;

    switch (type) {
        case ComponentValuesActionTypes.GET_COMPONENT_VALUES_SUCCESS: {
            const componentValue = payload.map(item => ({ ...item, isCollapse: false }));

            return {
                ...state,
                componentValues: sortBy(componentValue, 'name', state.directionSort),
                activeComponentStep: null
            };
        }

        case ComponentValuesActionTypes.COLLAPSE_VALUES: {
            const { id, isCollapse, isNeedCollapse } = payload;
            const activeComponentStep = state.activeComponentStep;

            const componentValue = state.componentValues.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        isCollapse: (isCollapse && !isNeedCollapse) || !item.isCollapse
                    };
                }

                return item;
            });

            return {
                ...state,
                componentValues: componentValue,
                componentValuesTable: activeComponentStep ? state.componentValuesTable : []
            };
        }

        case ComponentValuesActionTypes.GET_COMPONENT_STEPS_SUCCESS: {
            const { id, steps, withActiveMode } = payload;
            const componentValue = state.componentValues.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        steps
                    };
                }

                return item;
            });

            const activeComponentStep = withActiveMode ? state.activeComponentStep : (steps.length > 0) ? steps[0].id : null;

            return {
                ...state,
                componentValues: componentValue,
                activeComponentStep,
                componentValuesTable: activeComponentStep ? state.componentValuesTable : []
            };
        }

        case ComponentValuesActionTypes.GET_COMPONENT_VALUES_TABLE_SUCCESS: {
            return {
                ...state,
                componentValuesTable: payload,
            };
        }

        case ComponentValuesActionTypes.SORTING_COMPONENT_VALUES_TABLE: {
            const directionSort = !state.directionSort;
            return {
                ...state,
                directionSort,
                componentValues: sortBy(state.componentValues, 'name', directionSort)
            };
        }

        case ComponentValuesActionTypes.GET_PERFORMANCE_SUCCESS: {
            return {
                ...state,
                performance: payload.map(item => ({...item, isChecked: undefined}))
            };
        }

        case ComponentValuesActionTypes.GET_PERFORMANCE_COMPONENT_SUCCESS: {
            const performance = state.performance.map(item => {
                const element = payload.length > 0 ? payload.find(items => item.id === items.id) : false;

                return {
                    ...item,
                    isChecked: !!element
                };
            });

            return {
                ...state,
                performance
            };
        }

        case ComponentValuesActionTypes.SAVE_USER_FACTOR_VALUE_SUCCESS: {
            const { perfId } = payload;
            const componentValuesTable = state.componentValuesTable.map(item => {
                if (item.perfId === perfId) {
                    return {
                        ...item,
                        ...payload
                    };
                }

                return item;
            });

            return {
                ...state,
                componentValuesTable
            };
        }

        case ComponentValuesActionTypes.SET_ACTIVE_COMPONENT_STEP: {
            return {
                ...state,
                activeComponentStep: payload
            };
        }

        case ComponentValuesActionTypes.SET_DEFAULT_STATE: {
            return {
                ...initialState
            };
        }

        default: {
            return state;
        }
    }
}
