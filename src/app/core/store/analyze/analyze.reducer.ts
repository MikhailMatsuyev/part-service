import { AnalyzeActionTypes } from './analyze.actions';
import { setColumsNameAndDisplayedColums, setColumsNameAndDisplayedColumsVerticalTable } from '@utils/utilsfunc';

export interface AnalyzeState {
    componentSeries: AnalyzeComponent[];
    activeSeries: AnalyzeComponent;
    componentStep: AnalyzeSteps;
    allInvalid: boolean;
    dependGroupMode: boolean;
    activeSteps: number[];
    series: any;
    forTable: any[];
    columnsName: any[];
    displayedColumns: any[];
    isTablePositionHorizontal: boolean;
    steps: any[];
    arrayForTableTopRow: any[];
    canChangePositionTable: boolean;
    userFactorStep: any[];
}

export const initialState: AnalyzeState = {
    componentSeries: [],
    activeSeries: null,
    componentStep: {
        series: [],
        combined: false
    },
    allInvalid: false,
    dependGroupMode: false,
    activeSteps: [],
    series: {
        maxSteps: null,
        series: []
    },
    forTable: [],
    columnsName: [],
    displayedColumns: [],
    isTablePositionHorizontal: true,
    steps: [],
    arrayForTableTopRow: [],
    canChangePositionTable: false,
    userFactorStep: []
};

export function analyze(state: AnalyzeState = initialState, action: IUnsafeAction): AnalyzeState {
    const { type, payload } = action;

    switch (type) {
        case AnalyzeActionTypes.GET_COMPONENT_SERIES_SUCCESS: {
            return {
                ...state,
                componentSeries: payload,
                activeSeries: (payload && payload.length > 0) ? payload[0] : null
            };
        }

        case AnalyzeActionTypes.GET_COMPONENT_STEPS_SUCCESS: {
            const series = payload.series
                .map(item => {
                    const steps = item.steps.map(step => {
                        return {
                            ...step,
                            checked: true
                        };
                    });
                    return {
                        ...item,
                        steps
                    };
                });

            const componentStep = {
                ...payload,
                series
            };

            return {
                ...state,
                componentStep
            };
        }

        case AnalyzeActionTypes.SET_COMPONENT_SERIES: {
            return {
                ...state,
                activeSeries: state.componentSeries.find((item: any) => item.Id === payload)
            };
        }

        case AnalyzeActionTypes.SET_DEPEND_GROUP_MODE: {
            return {
                ...state,
                dependGroupMode: payload
            };
        }

        case AnalyzeActionTypes.SET_MODE: {
            let { componentStep } = state;
            const series = componentStep.series
                .map(item => {
                    const steps = item.steps.map(step => {
                        return {
                            ...step,
                            checked: payload
                        };
                    });
                    return {
                        ...item,
                        steps
                    };
                });

            componentStep = {
                ...componentStep,
                series
            };

            return {
                ...state,
                componentStep
            };
        }

        case AnalyzeActionTypes.SET_ONE_STEP_CHOOSED: {
            let { componentStep } = state;
            const { id, checked } = payload;
            const series = componentStep.series
                .map(item => {
                    const steps = item.steps.map(step => {
                        if (step.compId === id) {
                            return {
                                ...step,
                                checked
                            };
                        }
                        return step;
                    });
                    return {
                        ...item,
                        steps
                    };
                });
            componentStep = {
                ...componentStep,
                series
            };

            return {
                ...state,
                componentStep
            };
        }

        case AnalyzeActionTypes.GET_STEPS_ANALYZE_SUCCESS: {
            return {
                ...state,
                series: payload
            };
        }

        case AnalyzeActionTypes.GET_VALUE_COUNT_SUCCESS: {
            return {
                ...state,
                steps: payload
            };
        }

        case AnalyzeActionTypes.SET_CAN_CHANGE_POSITION_TABLE: {
            return {
                ...state,
                canChangePositionTable: true,
                isTablePositionHorizontal: !state.isTablePositionHorizontal,
            }
        }

        case AnalyzeActionTypes.SET_SHOWING_TABLE_HORIZONTAL: {
            let arrayForTable = [];
            const arrayForTableTopRow = ['USER FACTOR', 'STEPCIRCLES'];
            let isTablePositionHorizontal: boolean;
            let userFactorStep = [];
            let columnsName = [];
            let displayedColumns = [];
            

            if (state.isTablePositionHorizontal) {
                const maxSteps = state.series.maxSteps;
                const { arr1, arr2 } = setColumsNameAndDisplayedColums(maxSteps);
                columnsName = [...columnsName, ...arr1];
                displayedColumns = [...displayedColumns, ...arr2];
                 arrayForTable = [...arrayForTable, ...state.series.series.reduce((acc, item, i) => {
                        const objectForSteps = item.steps.reduce((arr, amount, index) => {
                            if (index === 0) {arr['Step'] = { stepUF: item.uf }; }
                            const { pos, rec } = state.steps.find(p => p.ufvId === amount.ufvId);
                            arr['Step' + (++index)] = {
                                name: amount.ufv,
                                pos,
                                rec
                            };
                            return arr;
                        }, {});

                    return [...acc, {...objectForSteps}]
                 }, [])];
                isTablePositionHorizontal = true;
                userFactorStep = [{ key: 'STEP' }, { key: 'USER FACTOR' }];
            } else {
                for (let i = 1; i <= state.series.maxSteps; i++) {
                    const objectForSteps = {
                        Step: { stepUF: 'Step ' + i }
                    };
                    arrayForTable.push(objectForSteps);
                }

                const { arr1, arr2 } = setColumsNameAndDisplayedColumsVerticalTable(state.series);
                columnsName = [...columnsName, ...arr1];
                displayedColumns = [...displayedColumns, ...arr2];
                state.series.series.reduce((acc, item) => {
                    item.steps.reduce((arr, amount, index) => {
                        arrayForTable[index][item.uf] = {
                                name: amount.ufv,
                                pos: state.steps.find(p => p.ufvId === amount.ufvId).pos,
                                rec: state.steps.find(p => p.ufvId === amount.ufvId).rec
                            };
                    }, {});
                }, {});

                isTablePositionHorizontal = false;
                userFactorStep = [{ key: 'USER FACTOR' }, { key: 'STEP' }];
            }
            return {
                ...state,
                forTable: arrayForTable,
                columnsName,
                displayedColumns,
                arrayForTableTopRow,
                isTablePositionHorizontal,
                canChangePositionTable: false,
                userFactorStep
            };
        }

        default: {
            return state;
        }
    }
}
