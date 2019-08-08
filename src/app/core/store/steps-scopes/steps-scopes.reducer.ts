import { StepsScopesActionTypes } from './steps-scopes.actions';

export interface StepsScopesState {
    stateScopesRoleValues: any[];
    stateScopesComponentSeriesIsAllActive: any[];
    componentSeriesValuesTable: any[];
    stateScopesComponentSeriesValue: any[];
    stateScopesRoleValueChoosed: number;
    stateScopesComponentValueChoosed: number;
    stateScopesComponentStepsValues: any[];
    directionSort: boolean;
}

export const initialState: StepsScopesState = {
    stateScopesRoleValues: [],
    stateScopesComponentSeriesIsAllActive: [],
    componentSeriesValuesTable: [],
    stateScopesComponentSeriesValue: [],
    stateScopesRoleValueChoosed: null,
    stateScopesComponentValueChoosed: null,
    stateScopesComponentStepsValues: [],
    directionSort: true
};

export function stepsScopes(state: StepsScopesState = initialState, action: IUnsafeAction): StepsScopesState {
    const { type, payload } = action;
    switch (action.type) {

        case StepsScopesActionTypes.SET_STEPS_SCOPES_ROLE_VALUES_SUCCESS: {
            return {
                ...state,
                stateScopesRoleValues: payload,
                stateScopesRoleValueChoosed: payload[0].id
            };
        }

        case StepsScopesActionTypes.SET_STEPS_SCOPES_ROLE_TABLE_SUCCESS: {
            const [{ id, steps }] = payload;

            return {
                ...state,
                stateScopesComponentSeriesValue: payload,
                stateScopesComponentValueChoosed: id,
                stateScopesComponentStepsValues: steps
            };
        }

        case StepsScopesActionTypes.SET_STEPS_SCOPES_ROLE_TABLE_CHOOSED: {
            return {
                ...state,
                stateScopesRoleValueChoosed: payload
            };
        }

        case StepsScopesActionTypes.SET_STEPS_SCOPES_COMPONENT_SERIES_TABLE_CHOOSED: {
            const { id, steps } = state.stateScopesComponentSeriesValue.find(item => item.id === payload);
            return {
                ...state,
                stateScopesComponentValueChoosed: id,
                stateScopesComponentStepsValues: steps
            };
        }

        case StepsScopesActionTypes.SET_STEPS_SCOPES_ACTIVE_ALL_COMPONENT_STEPS_SUCCESS: {
            const itemComponentSeriesTable = state.stateScopesComponentValueChoosed;
            let stateScopesComponentStepsValues = [];
            const stateScopesComponentSeriesValue = state.stateScopesComponentSeriesValue
                .map(item => {
                    if (itemComponentSeriesTable === item.id) {
                        const { state: changed } = payload;
                        const steps = item.steps.map(step => {
                            return {
                                ...step,
                                available: changed
                            };
                        });
                        stateScopesComponentStepsValues = steps;
                        return {
                            ...item,
                            steps
                        };
                    }
                    return item;
                });
            return {
                ...state,
                stateScopesComponentSeriesValue,
                stateScopesComponentStepsValues
            };
        }

        case StepsScopesActionTypes.SET_STEPS_SCOPES_ACTIVE_ONE_COMPONENT_STEPS_SUCCESS: {
            const itemComponentSeriesTable = state.stateScopesComponentValueChoosed;
            let stateScopesComponentStepsValues = [];
            const stateScopesComponentSeriesValue = state.stateScopesComponentSeriesValue
                .map(item => {
                    if (itemComponentSeriesTable === item.id) {
                        const { id, state: changed } = payload;
                        const steps = item.steps.map(step => {
                            if (step.id === id) {
                                return {
                                    ...step,
                                    available: changed
                                };
                            }
                            return step;
                        });
                        stateScopesComponentStepsValues = steps;
                        return {
                            ...item,
                            steps
                        };
                    }
                    return item;
                });
            return {
                ...state,
                stateScopesComponentSeriesValue,
                stateScopesComponentStepsValues
            };
        }

        case StepsScopesActionTypes.SET_STEPS_SCOPES_ACTIVE_All_STEPS_All_SERIES_SUCCESS: {
            const itemComponentSeriesTable = state.stateScopesComponentValueChoosed;
            let stateScopesComponentStepsValues = [];
            const stateScopesComponentSeriesValue = state.stateScopesComponentSeriesValue.map(item => {

                const steps = item.steps.map(step => {
                    const { state: changed } = payload;
                    return {
                        ...step,
                        available: changed
                    };
                });

                if (itemComponentSeriesTable === item.id) {
                    stateScopesComponentStepsValues = steps;
                }

                return {
                    ...item,
                    steps
                };
            });

            return {
                ...state,
                stateScopesComponentSeriesValue,
                stateScopesComponentStepsValues
            };
        }

        case StepsScopesActionTypes.SET_DEFAULT_STATE: {
            return {
                ...initialState
            };
        }

        default: {
            return state;
        }
    }
}
