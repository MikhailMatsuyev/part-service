import { UserFactorsActionTypes } from '@core/store/user-factors/user-factors.actions';
import { sortByMultiply } from '@utils/utilsfunc';
import * as serieFuncs from '@utils/base-serie-funcs';

export const initialState: SerieState = {
    seriesGroup: [],
    direction: true,
    seriesSelection: [],
    groupList: [],
    groupsSelection: [],
    isCollapsed: false,
    importConflict: {
        addedSeries: [],
        mergedSeries: [],
        removedSeries: [],
        numberOfKeys: 0
    }
};

export function userFactors(state: any = initialState, action: IUnsafeAction): SerieState {
    const { type, payload } = action;

    switch (type) {
        case UserFactorsActionTypes.GET_USER_FACTORS_SUCCESS: {
            const seriesGroup = serieFuncs.mapSeries(payload);
            return {
                ...state,
                seriesGroup: sortByMultiply(seriesGroup, ['order', 'group'], state.direction)
            };
        }

        case UserFactorsActionTypes.SORT_USER_FACTORS_GROUP: {
            const direction = !state.direction;

            return {
                ...state,
                direction,
                seriesGroup: sortByMultiply([...state.seriesGroup], ['order', 'group'], direction)
            };
        }

        case UserFactorsActionTypes.SORT_USER_FACTORS: {
            const { nameField, groupId } = payload;
            const seriesGroup = serieFuncs.sortSeries(state.seriesGroup, groupId, nameField);

            return {
                ...state,
                seriesGroup
            };
        }

        case UserFactorsActionTypes.SHOW_USERS_GROUPS: {
            // TODO: update with change complexity O
            const { serieId, groupId } = payload;
            const seriesGroup = serieFuncs.showGroups(state.seriesGroup, groupId, serieId);

            return {
                ...state,
                seriesGroup,
            };
        }

        case UserFactorsActionTypes.COLLAPSE_USERS_GROUPS: {
            const isCollapsed = payload !== undefined ? payload : !state.isCollapsed;
            const seriesGroup = serieFuncs.collapseGroups(state.seriesGroup, payload, isCollapsed);

            return {
                ...state,
                seriesGroup,
                isCollapsed
            };
        }

        case UserFactorsActionTypes.ADD_USERS_GROUP_STEP: {
            const { groupId, serieId } = payload;
            const seriesGroup = serieFuncs.addNewStep(state.seriesGroup, groupId, serieId);

            return {
                ...state,
                seriesGroup
            };
        }

        case UserFactorsActionTypes.REMOVE_USERS_GROUP_STEP: {
            const { groupId, order, serieId } = payload;
            const seriesGroup = serieFuncs.removeStep(state.seriesGroup, groupId, serieId, order);

            return {
                ...state,
                seriesGroup
            };
        }

        case UserFactorsActionTypes.SWAP_STEP_SUCCESS: {
            const seriesGroup = serieFuncs.swapSteps(state.seriesGroup, payload);

            return {
                ...state,
                seriesGroup
            };
        }

        case UserFactorsActionTypes.SELECT_STEP: {
            return {
                ...state,
                seriesSelection: serieFuncs.selectStep(state.seriesSelection, payload)
            };
        }

        case UserFactorsActionTypes.CLEAR_SELECT_STEP: {
            return {
                ...state,
                groupsSelection: [],
                seriesSelection: []
            };
        }

        case UserFactorsActionTypes.INSERT_STEP_SUCCESS: {
            const { data, payload: { order } } = payload;
            const seriesGroup = serieFuncs.insertStep(state.seriesGroup, order, data);
            return {
                ...state,
                seriesGroup
            };
        }

        case UserFactorsActionTypes.GET_GROUP_LIST_SUCCESS: {
            return {
                ...state,
                groupList: payload
            };
        }

        case UserFactorsActionTypes.CREATE_GROUP_SUCCESS: {
            const { data: { serie, group }, payload: payloadData } = payload;

            if (!serie && !group) {
                return state;
            }

            return {
                ...state,
                seriesGroup: serieFuncs.createGroup(state.seriesGroup, serie, group, payloadData, state.direction)
            };
        }

        case UserFactorsActionTypes.SELECTED_GROUP: {
            return {
                ...state,
                groupsSelection: serieFuncs.selectedGroup(state.groupsSelection, payload)
            };
        }

        case UserFactorsActionTypes.REMOVE_USERS_GROUP_STEP_SUCCESS: {
            return {
                ...state,
                seriesGroup: serieFuncs.removeGroupStep(state.seriesGroup, payload)
            };
        }

        case UserFactorsActionTypes.SAVE_USERS_GROUP_STEP_SUCCESS: {
            const { Group, Serie, Step } = payload;
            return {
                ...state,
                seriesGroup: serieFuncs.saveGroupStep(state.seriesGroup, Group, Serie, Step)
            };
        }

        case UserFactorsActionTypes.REMOVE_USERS_GROUP_SUCCESS: {
            const data = serieFuncs.mergeGroupArrays(state.seriesGroup, payload);
            return {
                ...state,
                seriesGroup: sortByMultiply(data, ['order', 'group'], state.direction)
            };
        }

        case UserFactorsActionTypes.CHANGE_GROUP_PLACE_SUCCESS: {
            return {
                ...state,
                seriesGroup: serieFuncs.changeGroupPlace(state.seriesGroup, payload)
            };
        }

        case UserFactorsActionTypes.CHANGE_GROUP_INFO_SUCCESS: {
            return {
                ...state,
                seriesGroup: serieFuncs.changeGroupInfo(state.seriesGroup, payload, state.direction)
            };
        }

        case UserFactorsActionTypes.COLLAPSE_GROUP: {
            const seriesGroup = serieFuncs.collapseGroup(state.seriesGroup, payload);

            return {
                ...state,
                isCollapsed: !seriesGroup.some(item => item.isCollapsed !== undefined && item.isCollapsed),
                seriesGroup
            };
        }

        case UserFactorsActionTypes.EDIT_USERS_GROUP_STEP_SUCCESS: {
            return {
                ...state,
                seriesGroup: serieFuncs.editGroupStep(state.seriesGroup, payload)
            };
        }

        case UserFactorsActionTypes.IMPORT_STEP_SUCCESS: {
            return {
                ...state,
                importConflict: payload
            };
        }

        default: {
            return state;
        }
    }
}

