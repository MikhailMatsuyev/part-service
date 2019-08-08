import { RecommendationsCalculationsActionTypes } from './recommendations-calculations.actions';
import { setActiveOrFirst } from '@utils/utilsfunc';

export interface RecommendationsCalculationsState {
    componentSeries: RecommendationsComponent[];
    userFactor: RecommendationsComponent[];
    valuesWithStatus: RecommendationsCalculationsStatus;
    dimensionsRecommendation: any;
    recommendationView: any;
    isActiveComponentSeries: RecommendationsComponent;
    isActiveUserFactor: RecommendationsComponent;
    textChanges: LastChangesText;
    activeComponentStep: Array<{ csId: number, csvId: number }>;
    activeUserFactorStep: Array<{ ufId: number, ufvId: number }>;
    rowFirst: number;
    colFirst: number;
    exportTableModel: any;
    statusCalculate: StatusCalculate;
}

export const initialState: RecommendationsCalculationsState = {
    componentSeries: [],
    userFactor: [],
    valuesWithStatus: {
        cs: [],
        uf: []
    },
    dimensionsRecommendation: null,
    recommendationView: null,
    isActiveComponentSeries: null,
    isActiveUserFactor: null,
    textChanges: null,
    activeComponentStep: null,
    activeUserFactorStep: null,
    rowFirst: 1,
    colFirst: 1,
    exportTableModel: {
        viewType: 1,
        ufId: -1,
        csId: -1,
        rowsTotal: Number.MAX_SAFE_INTEGER,
        rowsToLoad: Number.MAX_SAFE_INTEGER,
        rowFirst: 1,
        colsToLoad: 11,
        colsTotal: 11,
        colFirst: 1,
        steps: {
            cs: [],
            uf: []
        }
    },
    statusCalculate: null
};

export function recommendationsCalculations(state = initialState, action: IUnsafeAction): RecommendationsCalculationsState {
    const { type, payload } = action;

    switch (type) {
        case RecommendationsCalculationsActionTypes.GET_COMPONENT_SERIES_SUCCESS: {
            return {
                ...state,
                componentSeries: payload,
                isActiveComponentSeries: setActiveOrFirst(payload, state.isActiveComponentSeries)
            };
        }

        case RecommendationsCalculationsActionTypes.GET_USER_FACTOR_SUCCESS: {
            return {
                ...state,
                userFactor: payload,
                isActiveUserFactor: setActiveOrFirst(payload, state.isActiveUserFactor)
            };
        }

        case RecommendationsCalculationsActionTypes.GET_ITEM_DEPENDENCIES_SUCCESS: {
            const { data, type: typeSeries } = payload;
            let depened = {};

            if (typeSeries === 0) {
                depened = {
                    userFactor: data,
                    isActiveUserFactor: setActiveOrFirst(data, state.isActiveUserFactor)
                };
            } else {
                depened = {
                    componentSeries: data,
                    isActiveComponentSeries: setActiveOrFirst(data, state.isActiveComponentSeries)
                };
            }

            return {
                ...state,
                ...depened
            };
        }

        case RecommendationsCalculationsActionTypes.GET_VALUES_WITH_STATUS_SUCCESS: {
            const { cs, uf } = payload;

            return {
                ...state,
                valuesWithStatus: payload,
                activeComponentStep: cs.map(item => ({
                    csId: item.serieId,
                    csvId: (item.steps && item.steps.lenght > 0) ? item.steps[0] : -1
                })),
                activeUserFactorStep: uf.map(item => ({
                    ufId: item.serieId,
                    ufvId: (item.steps && item.steps.lenght > 0) ? item.steps[0] : -1
                })),
            };
        }

        case RecommendationsCalculationsActionTypes.SET_ACTIVE_CS: {
            return {
                ...state,
                isActiveComponentSeries: state.componentSeries.find(item => item.id === payload)
            };
        }

        case RecommendationsCalculationsActionTypes.SET_ACTIVE_UF: {
            return {
                ...state,
                isActiveUserFactor: state.userFactor.find(item => item.id === payload)
            };
        }

        case RecommendationsCalculationsActionTypes.GET_DIMENSIONS_SUCCESS: {
            return {
                ...state,
                dimensionsRecommendation: payload
            };
        }

        case RecommendationsCalculationsActionTypes.GET_RECOMMENDATION_VIEW_SUCCESS: {
            return {
                ...state,
                recommendationView: payload || []
            };
        }

        case RecommendationsCalculationsActionTypes.GET_LAST_CHANGES_SUCCESS: {
            return {
                ...state,
                textChanges: payload
            };
        }

        case RecommendationsCalculationsActionTypes.SET_CS_STEPS: {
            const { csId, csvId } = payload;
            const activeComponentStep = state.activeComponentStep.map(item => {
                if (item.csId === csId) {
                    return {
                        ...item,
                        csvId
                    };
                }

                return item;
            });

            return {
                ...state,
                activeComponentStep
            };
        }

        case RecommendationsCalculationsActionTypes.SET_UF_STEPS: {
            const { ufId, ufvId } = payload;
            const activeUserFactorStep = state.activeUserFactorStep.map(item => {
                if (item.ufId === ufId) {
                    return {
                        ...item,
                        ufvId
                    };
                }

                return item;
            });

            return {
                ...state,
                activeUserFactorStep
            };
        }

        case RecommendationsCalculationsActionTypes.SET_CALCULATE_TABLE_MODEL: {
            return {
                ...state,
                exportTableModel: payload
            };
        }

        case RecommendationsCalculationsActionTypes.UPDATE_LAST_CHANGES: {
            const { message, duration, done, success } = payload;
            return {
                ...state,
                textChanges: {
                    ...state.textChanges,
                    updates: {
                        ...state.textChanges.updates,
                        date: null,
                        errorMessage: message,
                        duration,
                        error: done && !success,
                        done
                    }
                }
            };
        }

        case RecommendationsCalculationsActionTypes.UPDATE_LAST_CHANGES_POSTFIX_MESSAGE: {
            return {
                ...state,
                textChanges: {
                    ...state.textChanges,
                    updates: {
                        ...state.textChanges.updates,
                        done: false,
                        postFixMessage: payload
                    }
                }
            };
        }

        case RecommendationsCalculationsActionTypes.SET_DEFAULT_STATE: {
            return {
                ...initialState
            };
        }

        case RecommendationsCalculationsActionTypes.GET_UPDATE_STATUS_SUCCESS: {
            return {
                ...state,
                statusCalculate: payload
            };
        }

        default: {
            return state;
        }
    }
}
