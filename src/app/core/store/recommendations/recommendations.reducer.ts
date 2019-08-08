import { mapRows, mapColumns } from './utils';
import { RecommendationsActionTypes } from './recommendations.actions';
import { initialState } from './initialState';
import { setActiveOrFirst, setRecomendationStatus } from '@utils/utilsfunc';

export interface RecommendationsState {
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
    recommendationTypes: Array<{ type: RecommendationsType, name: string, isActive: boolean }>;
    performancesList: UserFactorConnected[];
    activeComment: RecommendationCellComment;
    isActiveTable: boolean;
    isSwapHeaders: boolean;
}

export function recommendations(state = initialState, action: IUnsafeAction): RecommendationsState {
    const { type, payload } = action;

    switch (type) {
        case RecommendationsActionTypes.GET_COMPONENT_SERIES_SUCCESS: {
            return {
                ...state,
                componentSeries: payload.map(item => ({...item, isSelected: false})),
                isActiveComponentSeries: setActiveOrFirst(payload, state.isActiveComponentSeries)
            };
        }

        case RecommendationsActionTypes.GET_USER_FACTOR_SUCCESS: {
            return {
                ...state,
                userFactor: payload.map(item => ({...item, isSelected: false})),
                isActiveUserFactor: setActiveOrFirst(payload, state.isActiveUserFactor)
            };
        }

        case RecommendationsActionTypes.GET_ITEM_DEPENDENCIES_SUCCESS: {
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

        case RecommendationsActionTypes.GET_VALUES_WITH_STATUS_SUCCESS: {
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

        case RecommendationsActionTypes.SET_ACTIVE_CS: {
            return {
                ...state,
                isActiveComponentSeries: state.componentSeries.find(item => item.id === payload)
            };
        }

        case RecommendationsActionTypes.SET_ACTIVE_UF: {
            return {
                ...state,
                isActiveUserFactor: state.userFactor.find(item => item.id === payload)
            };
        }

        case RecommendationsActionTypes.GET_DIMENSIONS_SUCCESS: {
            return {
                ...state,
                dimensionsRecommendation: payload
            };
        }

        case RecommendationsActionTypes.GET_RECOMMENDATION_VIEW_SUCCESS: {
            return {
                ...state,
                isSwapHeaders: false,
                recommendationView: payload ? mapRows(payload, false) : null
            };
        }

        case RecommendationsActionTypes.GET_LAST_CHANGES_SUCCESS: {
            return {
                ...state,
                textChanges: payload
            };
        }

        case RecommendationsActionTypes.SET_CS_STEPS: {
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

        case RecommendationsActionTypes.SET_UF_STEPS: {
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

        case RecommendationsActionTypes.SET_CALCULATE_TABLE_MODEL: {
            return {
                ...state,
                exportTableModel: payload
            };
        }

        case RecommendationsActionTypes.GET_DEFAULT_RECOMMENDATION_TYPE_SUCCESS: {
            const recommendationTypes = state.recommendationTypes.map(item => ({
                ...item,
                isActive: item.type === payload
            }));

            return {
                ...state,
                recommendationTypes
            };
        }

        case RecommendationsActionTypes.SET_DEFAULT_RECOMMENDATION_TYPE: {
            const { type: typeDefault } = payload;
            const recommendationTypes = state.recommendationTypes.map(item => ({
                ...item,
                isActive: item.type === typeDefault
            }));

            return {
                ...state,
                recommendationTypes
            };
        }

        case RecommendationsActionTypes.SELECTE_DEPENDENCIES_DROPDOWN: {
            const { id, type: typeSeries, isChecked } = payload;

            let depened = {};

            if (typeSeries === 0) {
                depened = {
                    userFactor: state.userFactor.map(item => {
                        if (item.id === id) {
                            return {
                                ...item,
                                isSelected: isChecked
                            };
                        }

                        return item;
                    }),
                };
            } else {
                depened = {
                    componentSeries: state.componentSeries.map(item => {
                        if (item.id === id) {
                            return {
                                ...item,
                                isSelected: isChecked
                            };
                        }

                        return item;
                    }),
                };
            }

            return {
                ...state,
                ...depened
            };
        }

        case RecommendationsActionTypes.SELECTE_DEPENDENCIES_DROPDOWN_ALL: {
            const { type: typeSeries, status } = payload;

            let depened = {};

            if (typeSeries === 0) {
                depened = {
                    userFactor: state.userFactor.map(item => ({
                        ...item,
                        isSelected: status
                    })),
                };
            } else {
                depened = {
                    componentSeries: state.componentSeries.map(item => ({
                        ...item,
                        isSelected: status
                    })),
                };
            }

            return {
                ...state,
                ...depened
            };
        }

        case RecommendationsActionTypes.GET_SERIES_PERFORMANCES_SUCCESS: {
            return {
                ...state,
                performancesList: payload
            };
        }

        case RecommendationsActionTypes.SAVE_ROW_TABLE_SUCCESS: {
            const { data, index: {csvRows, ufvRows, name} } = payload;
            const recommendationView = {
                ...state.recommendationView,
                rows: state.recommendationView.rows.map((item: any) => {
                    if (csvRows === item.csvRows && ufvRows === item.ufvRows) {
                        return {
                            ...item,
                            [name]: data
                        };
                    }
                    return item;
                })
            };

            return {
                ...state,
                recommendationView
            };
        }

        case RecommendationsActionTypes.SELECTED_ALL_ROWS: {
            const { data: { ufvRows, csvRows, isActiveRow }, status } = payload;
            const { columns } = state.recommendationView;

            const recommendationView = {
                ...state.recommendationView,
                rows: state.recommendationView.rows.map((item: any) => {
                    if (csvRows === item.csvRows && ufvRows === item.ufvRows) {
                        const activeRow = status === undefined ? isActiveRow === undefined ? true : !isActiveRow : status;
                        const data = Object.keys(item).reduce((acc, key) => {
                            if (key.slice(0, 3) === 'col') {
                                const activeColumn = columns.some(({ name, isActiveColumn }) => name === key && isActiveColumn);
                                return {
                                    ...acc,
                                    [key]: {
                                        ...item[key],
                                        isActiveCell: activeRow || activeColumn
                                    }
                                };
                            }

                            return {
                                ...acc,
                                [key]: item[key],
                            };
                        }, {});

                        return {
                            ...data,
                            isActiveRow: activeRow
                        };
                    }
                    return item;
                })
            };

            return {
                ...state,
                recommendationView
            };
        }

        case RecommendationsActionTypes.SELECTED_ALL_COLUMNS: {
            const { name, header, isActiveColumn } = payload;
            const activeColumn = isActiveColumn === undefined ? true : !isActiveColumn;
            const columns = state.recommendationView.columns.map(item => {
                if (item.name === name && item.header === header) {
                    return {
                        ...item,
                        isActiveColumn: activeColumn
                    };
                }

                return item;
            });

            const rows = state.recommendationView.rows.map((item: any) => {
                const data = Object.keys(item).reduce((acc, key) => {
                    const itemCell = item[key];
                    if (key.slice(0, 3) === 'col' && name === key) {
                        return {
                            ...acc,
                            [key]: {
                                ...itemCell,
                                isActiveCell: activeColumn || item.isActiveRow
                            }
                        };
                    }

                    return {
                        ...acc,
                        [key]: itemCell,
                    };
                }, {});

                return {
                    ...data,
                    isActiveColumn: activeColumn
                };
            });

            return {
                ...state,
                recommendationView: {
                    ...state.recommendationView,
                    columns,
                    rows
                }
            };
        }

        case RecommendationsActionTypes.GET_CELL_COMMENT_SUCCESS: {
            return {
                ...state,
                activeComment: payload
            };
        }

        case RecommendationsActionTypes.SET_CELL_COMMENT_SUCCESS: {
            const { csvId, ufvId } = payload;

            const recommendationView = {
                ...state.recommendationView,
                rows: state.recommendationView.rows.map((item: any) => {
                    return Object.keys(item).reduce((acc, key) => {
                        const cell = item[key];
                        if (cell.csvId === csvId && cell.ufvId === ufvId) {
                            return {
                                ...acc,
                                [key]: {
                                    ...cell,
                                    hasComment: true
                                }
                            };
                        }

                        return {
                            ...acc,
                            [key]: cell,
                        };
                    }, {});
                })
            };

            return {
                ...state,
                recommendationView
            };
        }

        case RecommendationsActionTypes.SET_ROW_STATUS_SUCCESS: {
            const { status, ufvIds } = payload;
            const newStatus = setRecomendationStatus(status);
            const rows = state.recommendationView.rows.map(item => {
                const data = Object.keys(item).reduce((acc, key) => {
                    const itemCell = item[key];
                    if (key.slice(0, 3) === 'col' && ufvIds.some(ufId => ufId === itemCell.ufvId)) {
                        return {
                            ...acc,
                            [key]: {
                                ...itemCell,
                                ...newStatus
                            }
                        };
                    }

                    return {
                        ...acc,
                        [key]: itemCell,
                    };
                }, {});

                return {
                    ...data,
                };
            });

            return {
                ...state,
                recommendationView: {
                    ...state.recommendationView,
                    rows
                }
            };
        }

        case RecommendationsActionTypes.SELECTED_ALL_TABLE: {
            let { isActiveTable } = state;
            isActiveTable = !isActiveTable;
            const columns = state.recommendationView.columns.map(item => ({
                ...item,
                isActiveColumn: isActiveTable
            }));

            const rows = state.recommendationView.rows.map((item: any) => {
                const data = Object.keys(item).reduce((acc, key) => {
                    const itemCell = item[key];
                    if (key.slice(0, 3) === 'col') {
                        return {
                            ...acc,
                            [key]: {
                                ...itemCell,
                                isActiveCell: isActiveTable
                            }
                        };
                    }

                    return {
                        ...acc,
                        [key]: itemCell,
                    };
                }, {});

                return {
                    ...data,
                    isActiveColumn: isActiveTable,
                    isActiveRow: isActiveTable
                };
            });

            return {
                ...state,
                recommendationView: {
                    ...state.recommendationView,
                    columns,
                    rows
                },
                isActiveTable
            };
        }

        case RecommendationsActionTypes.SWITCH_TABLE_HEADER: {
            // tslint:disable-next-line:prefer-const
            let { isSwapHeaders, recommendationView } = state;
            isSwapHeaders = !isSwapHeaders;
            const dataTable = isSwapHeaders ? mapColumns(recommendationView, isSwapHeaders) : mapRows(recommendationView, isSwapHeaders);

            return {
                ...state,
                recommendationView: {
                    ...recommendationView,
                    ...dataTable
                },
                isSwapHeaders
            };
        }

        case RecommendationsActionTypes.CLEAR_CELL_COMMENT: {
            return {
                ...state,
                activeComment: null
            };
        }

        case RecommendationsActionTypes.UPDATE_LAST_CHANGES: {
            const { message, duration, done, success } = payload;
            return {
                ...state,
                textChanges: {
                    ...state.textChanges,
                    updates: {
                        date: null,
                        errorMessage: message,
                        duration,
                        error: done && !success,
                        done
                    }
                }
            };
        }

        case RecommendationsActionTypes.SET_DEFAULT_STATE: {
            return {
                ...initialState
            };
        }

        case RecommendationsActionTypes.GET_UPDATE_STATUS_SUCCESS: {
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
