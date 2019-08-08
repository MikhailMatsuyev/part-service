import { SelectionActionTypes } from './selection.actions';
import { flatten } from 'lodash';
import { sortBy, unionArray } from '@utils/utilsfunc';
import { initialState } from './initialState';
import { getActiveSteps, guuid } from './util';

export interface SelectionState {
    userFactorTree: UfTree[];
    specifications: Specification[];
    activeSpecification: SpecificationSpec;
    specficationsName: string[];
    categoryNames: string[];
    performances: UserFactorConnected[];
    showAll: boolean;
    performanceFilters: any[];
    autoReload: boolean;
    isActiveReloadedBlock: boolean;
    orderingKey: boolean;
    activeInfo: SelectionGetInfo;
    componentTree: csgList[];
    activeFormula: string;
    csSpinner: boolean;
    ufSpinner: boolean;
    orderingKeyModel: { error?: string, message?: string };
    activeSteps: number[];
    impossibleComponents: any;
    availableUserFactor: any;
}

export function selection(state: any = initialState, action: IUnsafeAction): SelectionState {
    const { payload, type } = action;

    switch (type) {
        case SelectionActionTypes.GET_SPECIFICATIONS_SUCCESS: {
            const { data, userId } = payload;
            const activeUserData = data.filter(({ userId: categoryUserId }) => categoryUserId === userId);
            const activeSpecification = flatten(data
                .filter(({ isAdmin }) => isAdmin)
                .map(({ specs }) => specs))
                .find(({ isDefault }) => isDefault);
            return {
                ...state,
                specifications: data,
                activeSpecification,
                categoryNames: flatten(activeUserData.map(({ categories }) => categories)).map(({ category }) => category),
                specficationsName: flatten(activeUserData.map(({ specs }) => specs)).map(({ spec }) => spec)
            };
        }

        case SelectionActionTypes.CREATE_SPECIFICATIONS_SUCCESS: {
            const { userId, ...data } = payload;
            const specifications = state.specifications.map(item => {
                if (item.userId === userId) {
                    return {
                        ...item,
                        specs: sortBy([
                            ...item.specs,
                            {
                                ...data,
                                isAdmin: true,
                                isDefault: false
                            }
                        ], 'spec', true)
                    };
                }

                return item;
            });

            const specficationsName = flatten(specifications
                .filter(({ userId: categoryUserId }) => categoryUserId === userId)
                .map(({ specs }) => specs))
                .map(({ spec }) => spec);

            return {
                ...state,
                specifications,
                specficationsName
            };
        }

        case SelectionActionTypes.SAVE_DEFAULT_SPECIFICATION_SUCCESS: {
            const specifications = state.specifications.map(item => ({
                ...item,
                specs: item.specs.map(specItem => ({...specItem, isDefault: specItem.specId === payload}))
            }));
            return {
                ...state,
                specifications
            };
        }

        case SelectionActionTypes.RENAME_NODE_SUCCESS: {
            const { id, name } = payload;

            const specifications = state.specifications.map(item => ({
                ...item,
                specs: item.specs.map(specItem => {
                    if (specItem.specId === id) {
                        return { ...specItem, spec: name };
                    }

                    return specItem;
                })
            }));

            // TODO: update specArray for uniq

            return {
                ...state,
                specifications
            };
        }

        case SelectionActionTypes.DUBLICATE_NODE_SUCCESS: {
            const { userId, newId, categoryId, spec } = payload;
            const specifications = state.specifications.map(item => {
                if (item.userId === userId) {
                    return {
                        ...item,
                        specs: sortBy([
                            ...item.specs,
                            {
                                categoryId,
                                spec,
                                specId: newId,
                                isAdmin: true,
                                isDefault: false
                            }
                        ], 'spec', true)
                    };
                }

                return item;
            });

            return {
                ...state,
                specifications
            };
        }

        case SelectionActionTypes.REMOVE_NODE_SUCCESS: {
            const { userId, id } = payload;

            const specifications = state.specifications.map(item => {
                if (item.userId === userId) {
                    return {
                        ...item,
                        specs: sortBy(item.specs.filter(specs => specs.specId !== id), 'spec', true)
                    };
                }

                return item;
            });

            const activeSpecification = (state.activeSpecification && state.activeSpecification.specId === id)
                ? null
                : state.activeSpecification;

            return {
                ...state,
                specifications,
                activeSpecification
            };
        }

        case SelectionActionTypes.SET_ACTIVE_SPECIFICATIONS: {
            const activeSpecification = flatten(state.specifications
                .map(({ specs }) => specs))
                .find(({ specId }) => specId === payload);

            return {
                ...state,
                activeSpecification
            };
        }

        case SelectionActionTypes.ADD_CATEGORY_SUCCESS: {
            const { userId, ...data } = payload;

            const specifications = state.specifications.map(item => {
                if (item.userId === userId) {
                    return {
                        ...item,
                        categories: sortBy([
                            ...item.categories,
                            {
                                ...data
                            }
                        ], 'category', true)
                    };
                }

                return item;
            });

            return {
                ...state,
                specifications
            };
        }

        case SelectionActionTypes.DELETE_CATEGORY_SUCCESS: {
            const { userId, id } = payload;

            const specifications = state.specifications.map(item => {
                if (item.userId === userId) {
                    return {
                        ...item,
                        categories: sortBy(item.categories.filter(({categoryId}) => categoryId !== id), 'category', true)
                    };
                }

                return item;
            });

            return {
                ...state,
                specifications
            };
        }

        case SelectionActionTypes.GET_PERFORMANCE_ORDER_SUCCESS: {
            return {
                ...state,
                performances: payload
            };
        }

        case SelectionActionTypes.GET_USERFACTOR_TREE_SUCCESS: {
            return {
                ...state,
                userFactorTree: payload
            };
        }

        case SelectionActionTypes.SET_SHOW_ALL: {
            return {
                ...state,
                showAll: payload
            };
        }

        case SelectionActionTypes.ADD_PERFORMANCE_FILTER: {
            return {
                ...state,
                performanceFilters: [...state.performanceFilters , {
                    direction: false,
                    position: null,
                    performance: '',
                    id: guuid()
                }]
            };
        }

        case SelectionActionTypes.SET_AUTO_RELOAD: {
            return {
                ...state,
                autoReload: payload
            };
        }

        case SelectionActionTypes.SAVE_USER_FACTOR_VALUES_SUCCESS: {
            const { groupId, id } = payload;
            const userFactorTree = state.userFactorTree.map(item => {
                const elements = item.series.find(({ ufId }) => ufId === groupId);

                if (elements) {
                    return {
                        ...item,
                        series: item.series.map(series => {
                            if (series.ufId === groupId) {
                                return {
                                    ...series,
                                    steps: series.steps.map(steps => {
                                        return {
                                            ...steps,
                                            selected: steps.ufvId === id
                                        };
                                    })
                                };
                            }

                            return series;
                        })
                    };
                }

                return item;
            });

            return {
                ...state,
                userFactorTree,
                isActiveReloadedBlock: !state.autoReload
            };
        }

        case SelectionActionTypes.SET_AUTO_RELOAD_BLOCK: {
            return {
                ...state,
                isActiveReloadedBlock: payload
            };
        }

        case SelectionActionTypes.GET_TYPE_KEY_SETTINGS_SUCCESS: {
            const { displayField } = payload;

            return {
                ...state,
                orderingKey: displayField
            };
        }

        case SelectionActionTypes.GET_INFO_NODE_SUCCESS: {
            return {
                ...state,
                activeInfo: payload
            };
        }

        case SelectionActionTypes.CLEAR_INFO_BLOCK: {
            return {
                ...state,
                activeInfo: null
            };
        }

        case SelectionActionTypes.GET_COMPONENTS_TREE_SUCCESS: {
            const { csgList } = payload;

            return {
                ...state,
                componentTree: csgList,
                activeSteps: getActiveSteps(csgList)
            };
        }

        case SelectionActionTypes.GET_ALL_COMPONENTS_TREE_SUCCESS: {
            return {
                ...state,
                componentTree: payload,
                activeSteps: getActiveSteps(payload)
            };
        }

        case SelectionActionTypes.GET_FORMULA_VALUE_SUCCESS: {
            return {
                ...state,
                activeFormula: payload
            };
        }

        case SelectionActionTypes.SET_CS_TREE_SPINNER: {
            return {
                ...state,
                csSpinner: payload
            };
        }

        case SelectionActionTypes.SET_UF_TREE_SPINNER: {
            return {
                ...state,
                ufSpinner: payload
            };
        }

        case SelectionActionTypes.GET_TYPE_KEY_SUCCESS: {
            return {
                ...state,
                orderingKeyModel: {message: payload}
            };
        }

        case SelectionActionTypes.GET_TYPE_KEY_FAILURE: {
            return {
                ...state,
                orderingKeyModel: {error: payload}
            };
        }

        case SelectionActionTypes.GET_IMPOSSIBLE_COMPONENTS_SUCCESS: {
            return {
                ...state,
                impossibleComponents: payload
            };
        }

        case SelectionActionTypes.GET_AVAILABLE_UF_VALUES_SUCCESS: {
            // tslint:disable-next-line:prefer-const
            let { data: {ufvs, uncompUfValues} } = payload;
            ufvs = ufvs.map(item => {
                return {
                    ...item,
                    ufvIds: item.ufvIds.filter(({ id }) => !uncompUfValues.some(({ufvId, ufId}) => ufId === item.ufId && id === ufvId))
                };
            });
            return {
                ...state,
                availableUserFactor: {
                    ...payload,
                    data: {
                        ...payload.data,
                        ufvs
                    }
                }
            };
        }

        case SelectionActionTypes.GET_COMPONENTS_STATE_SUCCESS: {
            const { data } = payload;
            return {
                ...state,
                impossibleComponents: {
                    ...state.impossibleComponents,
                    data: {
                        ...state.impossibleComponents.data,
                        cs: state.impossibleComponents.data.cs.map(item => {
                            return {
                                ...item,
                                steps: item.steps.map(step => {
                                    const elements = data.find(({ csvId }) => step.stepId === csvId);

                                    return {
                                        ...step,
                                        rec: (elements && elements.rec) || false,
                                        active: !!elements
                                    };
                                })
                            };
                        })
                    }
                }
            };
        }

        case SelectionActionTypes.CHANGE_STATUS_ANALYZE_STEP: {
            const { checked, id, groupId } = payload;

            return {
                ...state,
                impossibleComponents: {
                    ...state.impossibleComponents,
                    data: {
                        ...state.impossibleComponents.data,
                        cs: state.impossibleComponents.data.cs.map(item => {
                            if (item.serieId !== groupId) {
                                return item;
                            }

                            return {
                                ...item,
                                steps: item.steps.map(step => {
                                    if (step.stepId !== id) {
                                        return step;
                                    }

                                    return {
                                        ...step,
                                        active: checked
                                    };
                                })
                            };
                        })
                    }
                }
            };
        }

        case SelectionActionTypes.UPDATE_PERFORMANCE_FILTER: {
            const { data } = payload;
            const performanceFilters = state.performanceFilters.map((item) => {
                if (item.id === data.id) {
                    return {
                        ...item,
                        ...data
                    };
                }

                return item;
            });

            return {
                ...state,
                performanceFilters
            };
        }

        case SelectionActionTypes.SAVE_UNSELECT_COMPONENTS_SUCCESS:
        case SelectionActionTypes.SAVE_SELECT_COMPONENTS_SUCCESS: {
            const { data: { csTree }, activeSteps: { groupId, id }, selectMode } = payload;
            const componentTree = state.componentTree.map(item => {
                const elements = csTree.find(csTreeElements => csTreeElements.csgId === item.csgId);

                if (elements) {
                    let series = item.series.map(seriesItem => {
                        const elem = elements.series.find(elementItem => elementItem.csId === seriesItem.csId);
                        if (elem) {
                            return {
                                ...seriesItem,
                                ...elem,
                            };
                        }

                        return seriesItem;
                    });

                    series = series.map(seriesItem => {
                        if (seriesItem.csId === groupId) {
                            return {
                                ...seriesItem,
                                steps: seriesItem.steps.map(stepsItem => ({
                                    ...stepsItem,
                                    selectedMode: stepsItem.csvId === id && selectMode,
                                    selected: stepsItem.csvId === id && selectMode
                                }))
                            };
                        }

                        return seriesItem;
                    });

                    return {
                        ...item,
                        ...elements,
                        series
                    };
                }

                return item;
            });

            return {
                ...state,
                componentTree
            };
        }

        case SelectionActionTypes.SET_DEFAULT_STATE: {
            return {
                ...initialState,
                autoReload: JSON.parse(localStorage.getItem('autoReload')) || false
            };
        }

        case SelectionActionTypes.SET_ANALYZE_ELEMENTS_UF: {
            const { checked, id, groupId } = payload;
            // tslint:disable-next-line:prefer-const
            let { preselected, ufvs} = state.availableUserFactor.data;
            // ufvs
            ufvs.forEach(item => {
                if (item.ufId === groupId) {
                    if (checked) {
                        const newSelected = preselected.filter(preselectedId =>
                            !item.ufvIds.some(({ id: ufvId }) => preselectedId === ufvId)
                        );
                        preselected = [...newSelected, id];
                    } else {
                        preselected = preselected.filter(preselectedId => preselectedId !== id);
                    }
                }
            });

            return {
                ...state,
                availableUserFactor: {
                    ...state.availableUserFactor,
                    data: {
                        ...state.availableUserFactor.data,
                        preselected: unionArray(preselected)
                    }
                }
            };
        }

        case SelectionActionTypes.REMOVE_PERFORMANCE_FILTER: {
            return {
                ...state,
                performanceFilters: state.performanceFilters.filter(({id}) => id !== payload)
            };
        }

        case SelectionActionTypes.UNCOMPATABLE_USER_FACTOR_VALUES_SUCCESS: {
            let { ufvs } = state.availableUserFactor.data;

            ufvs = ufvs.map(item => {
                return {
                    ...item,
                    ufvIds: item.ufvIds.filter(({ id }) => !payload.includes(id))
                };
            });

            return {
                ...state,
                availableUserFactor: {
                    ...state.availableUserFactor,
                    data: {
                        ...state.availableUserFactor.data,
                        ufvs
                    }
                }
            };
        }

        case SelectionActionTypes.LOADING_ANALYZE_TOOLS: {
            const { data, status } = payload;
            const componentTree = state.componentTree.map(item => {
                if (item.series) {
                    return {
                        ...item,
                        series: item.series.map(series => {
                            if (series.csId === data.id) {
                                return {
                                    ...series,
                                    loading: status
                                };
                            }

                            return series;
                        })
                    };
                }

                return item;
            });

            return {
                ...state,
                componentTree
            };
        }

        default: {
            return state;
        }
    }
}

