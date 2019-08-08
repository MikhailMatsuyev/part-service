import { Sort } from '@angular/material';
import { ComponentPerformanceActionTypes } from './component-performance.actions';
import { sortBy, sortByMultiply } from '../../../utils/utilsfunc';

export interface ComponentPerformanceState {
    performances: Performance[];
    sortPerformances: MultipleSort;
    performancesSelected: Performance;
    unitPricing: UnitPricing[];
    functionsSettings: FunctionsSettings;
}

export const initialState: ComponentPerformanceState = {
    performances: [],
    sortPerformances: null,
    performancesSelected: null,
    unitPricing: [],
    functionsSettings: null,
};

export function componentPerformance(state: ComponentPerformanceState = initialState, action: IUnsafeAction): ComponentPerformanceState {
    const { type, payload } = action;

    switch (type) {
        case ComponentPerformanceActionTypes.GET_PERFORMANCE_SUCCESS: {
            return {
                ...state,
                performances: payload.map(item => ({ ...item, isChecked: false })),
                performancesSelected: payload.length > 0 ? payload[0] : null
            };
        }

        case ComponentPerformanceActionTypes.CHECK_PERFORMANCE: {
            const { id, status } = payload;
            const performances = state.performances.map(item => item.id === id ? ({ ...item, isChecked: status }) : item);

            return {
                ...state,
                performances
            };
        }

        case ComponentPerformanceActionTypes.CHECK_ALL_PERFORMANCE: {
            return {
                ...state,
                performances: state.performances.map(item => ({...item, isChecked: payload}))
            };
        }

        case ComponentPerformanceActionTypes.CREATE_PERFORMANCE_SUCCESS: {
            const { sortPerformances } = state;
            let performances = [...state.performances, {...payload, isChecked: false}];

            if (sortPerformances) {
                performances = sortByMultiply(performances, sortPerformances.active, sortPerformances.direction);
            } else {
                performances = sortByMultiply(performances, ['name'], true);
            }

            return {
                ...state,
                performances
            };
        }

        case ComponentPerformanceActionTypes.RESET_PERFORMANCE:
        case ComponentPerformanceActionTypes.EDIT_PERFORMANCE_SUCCESS: {
            const { sortPerformances } = state;
            let performances = state.performances.map(item =>
                (item.id === payload.id) ? {... payload, isChecked: (item as any).isChecked} : item);

            if (sortPerformances) {
                performances = sortByMultiply(performances, sortPerformances.active, sortPerformances.direction);
            }

            return {
                ...state,
                performances
            };
        }

        case ComponentPerformanceActionTypes.DELETE_PERFORMANCE_SUCCESS: {
            const { sortPerformances} = state;
            let performances = payload.map(item => ({ ...item, isChecked: false }));

            if (sortPerformances) {
                performances = sortByMultiply(performances, sortPerformances.active, sortPerformances.direction);
            }

            return {
                ...state,
                performances
            };
        }

        case ComponentPerformanceActionTypes.ADD_SORT_PERFORMANCE: {
            const { direction, active } = payload;

            return {
                ...state,
                performances: sortByMultiply(state.performances, active, direction),
                sortPerformances: payload
            };
        }

        case ComponentPerformanceActionTypes.GET_FUNCTIONS_SETTINGS_SUCCESS: {
            return {
                ...state,
                functionsSettings: payload
            };
        }

        case ComponentPerformanceActionTypes.GET_UNIT_PRICING_CONNECTED_SUCCESS: {
            return {
                ...state,
                unitPricing: payload
            };
        }

        case ComponentPerformanceActionTypes.SET_UNIT_PRICING: {
            const { id, enabled } = payload;
            const unitPricing = state.unitPricing.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        enabled
                    };
                }

                return item;
            });
            return {
                ...state,
                unitPricing
            };
        }

        case ComponentPerformanceActionTypes.SET_DEFAULT_STATE: {
            return {
                ...initialState
            };
        }

        default: {
            return state;
        }
    }
}
