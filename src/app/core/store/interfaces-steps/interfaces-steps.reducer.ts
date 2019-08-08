import { InterfacesStepsActionTypes } from './interfaces-steps.actions';
import { sortBy } from '../../../utils/utilsfunc';

export interface InterfacesStepsState {
    stateISInterfaceValueChoosed: number;
    stateISInterfaceValues: any[];
    stateISComponentValues: any[];
    stateISComponentValueChoosed: number;
    stateISComponentStepValues: any[];
    stateISComponentStepValuesChoosed: any[];
    stateDirectionSort: boolean;
    stateDirectionSortComponent: boolean;
    stateInterfaceStepValues: any[];
    stateInterfaceStepValuesConnect: any[];
    stateTrueCheckboxesComponentStep: any[];
}

export const initialState: InterfacesStepsState = {
    stateISInterfaceValueChoosed: null,
    stateISInterfaceValues: [],
    stateISComponentValues: [],
    stateISComponentValueChoosed: null,
    stateISComponentStepValues: [],
    stateISComponentStepValuesChoosed: [],
    stateDirectionSort: true,
    stateDirectionSortComponent: true,
    stateInterfaceStepValues: [],
    stateInterfaceStepValuesConnect: [],
    stateTrueCheckboxesComponentStep: []
};

export function interfacesSteps(state: InterfacesStepsState = initialState, action: IUnsafeAction): InterfacesStepsState {
    const { type, payload } = action;
    switch (action.type) {

        case InterfacesStepsActionTypes.SET_IS_INTERFACE_VALUES_SUCCESS: {
            return {
                ...state,
                stateISInterfaceValues: payload,
                stateISInterfaceValueChoosed: payload[0] ? payload[0].id : null
            };
        }

        case InterfacesStepsActionTypes.SET_IS_INTERFACE_VALUES_CHOOSED_SUCCESS: {
            return {
                ...state,
                stateISInterfaceValueChoosed: payload,
                stateInterfaceStepValues: [],
                stateISComponentStepValuesChoosed: []
            };
        }

        case InterfacesStepsActionTypes.SET_IS_COMPONENT_VALUES: {
            return {
                ...state,
                stateISComponentValues: payload,
                stateISComponentStepValues: []
            };
        }

        case InterfacesStepsActionTypes.SET_IS_COMPONENT_VALUE_CHOOSED_SUCCESS: {
            return {
                ...state,
                stateISComponentValueChoosed: payload,
                stateInterfaceStepValues: [],
                stateISComponentStepValuesChoosed: []
            };
        }

        case InterfacesStepsActionTypes.SET_IS_COMPONENT_STEP_VALUES: {
            const items = payload.map(item => {
                return {
                    ...item,
                    checked: false
                };
            });

                return {
                    ...state,
                    stateISComponentStepValues: items
                };
        }

        case InterfacesStepsActionTypes.SET_IS_INTERFACE_TABLE_SORTING: {
            const stateDirectionSort = !state.stateDirectionSort;
            return {
                ...state,
                stateDirectionSort,
                stateISInterfaceValues: sortBy(state.stateISInterfaceValues, 'name', stateDirectionSort)
            };
        }

        case InterfacesStepsActionTypes.SET_IS_COMPONENT_TABLE_SORTING: {
            const stateDirectionSortComponent = !state.stateDirectionSortComponent;
            return {
                ...state,
                stateDirectionSortComponent,
                stateISComponentValues: sortBy(state.stateISComponentValues, 'name', stateDirectionSortComponent)
            };
        }

        case InterfacesStepsActionTypes.SET_IS_INTERFACE_STEP_VALUES: {
            return {
                ...state,
                stateInterfaceStepValues: payload
            };
        }

        case InterfacesStepsActionTypes.SET_IS_FALSE_ALL_COMPONENT_STEP_VALUE: {
            return {
                ...state,
                stateInterfaceStepValues: payload,
                stateISComponentStepValuesChoosed: []
            };
        }


        case InterfacesStepsActionTypes.SET_IS_INTERFACE_STEP_VALUES_CONNECT_SUCCESS: {
            const items = payload.map(item => {
                return {
                    ...item,
                    checked: false
                };
            });

            const steps = items.map(step => {
                return {
                        ...step,
                        checked: state.stateInterfaceStepValues.find(m => step.id === m.id)
                };
            });

            return {
                ...state,
                stateInterfaceStepValuesConnect: steps
            };
        }

        case InterfacesStepsActionTypes.SET_MODAL_ONE_ITEM_CHECKED: {
            const { checked, id } = payload;
            const stateInterfaceStepValuesConnect = state.stateInterfaceStepValuesConnect
                .map(item => {
                    if (item.id === id) {
                        return {
                            ...item,
                            checked
                        };
                    }
                    return item;
                });
            return {
                ...state,
                stateInterfaceStepValuesConnect
            };
        }

        case InterfacesStepsActionTypes.SET_IS_COMPONENT_STEP_TRUE_CHECK_BOXES: {
            return {
                ...state,
                stateTrueCheckboxesComponentStep: payload,
                stateISComponentStepValuesChoosed: payload
            };
        }

        default: {
            return state;
        }
    }
}
