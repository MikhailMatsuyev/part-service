import { ComponentsActionTypes } from '@core/store/component-elems/component-elems.actions';
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

export function components(state: any = initialState, action: IUnsafeAction): SerieState {
    const { type, payload } = action;

    switch (type) {
        case ComponentsActionTypes.GET_COMPONENTS_SUCCESS: {
            const seriesGroup = serieFuncs.mapSeries(payload);
            return {
                ...state,
                seriesGroup: sortByMultiply(seriesGroup, ['order', 'group'], state.direction)
            };
        }

        case ComponentsActionTypes.SORT_COMPONENTS_GROUP: {
            const direction = !state.direction;

            return {
                ...state,
                direction,
                seriesGroup: sortByMultiply([...state.seriesGroup], ['order', 'group'], direction)
            };
        }

        case ComponentsActionTypes.SORT_COMPONENTS: {
            const { nameField, groupId } = payload;
            const seriesGroup = serieFuncs.sortSeries(state.seriesGroup, groupId, nameField);

            return {
                ...state,
                seriesGroup
            };
        }

        case ComponentsActionTypes.SHOW_COMPONENTS_GROUPS: {
            // TODO: update with change complexity O
            const { serieId, groupId } = payload;
            const seriesGroup = serieFuncs.showGroups(state.seriesGroup, groupId, serieId);

            return {
                ...state,
                seriesGroup,
            };
        }

        case ComponentsActionTypes.COLLAPSE_COMPONENTS_GROUPS: {
            const isCollapsed = payload !== undefined ? payload : !state.isCollapsed;
            const seriesGroup = serieFuncs.collapseGroups(state.seriesGroup, payload, isCollapsed);

            return {
                ...state,
                seriesGroup,
                isCollapsed
            };
        }

        case ComponentsActionTypes.ADD_COMPONENTS_STEP: {
            const { groupId, serieId } = payload;
            const seriesGroup = serieFuncs.addNewStep(state.seriesGroup, groupId, serieId);

            return {
                ...state,
                seriesGroup
            };
        }

        case ComponentsActionTypes.REMOVE_COMPONENTS_STEP: {
            const { groupId, order, serieId } = payload;
            const seriesGroup = serieFuncs.removeStep(state.seriesGroup, groupId, serieId, order);

            return {
                ...state,
                seriesGroup
            };
        }

        case ComponentsActionTypes.SWAP_STEP_SUCCESS: {
            const seriesGroup = serieFuncs.swapSteps(state.seriesGroup, payload);

            return {
                ...state,
                seriesGroup
            };
        }

        case ComponentsActionTypes.SELECT_STEP: {
            return {
                ...state,
                seriesSelection: serieFuncs.selectStep(state.seriesSelection, payload)
            };
        }

        case ComponentsActionTypes.CLEAR_SELECT_STEP: {
            return {
                ...state,
                groupsSelection: [],
                seriesSelection: []
            };
        }

        case ComponentsActionTypes.INSERT_STEP_SUCCESS: {
            const { data, payload: { order } } = payload;
            const seriesGroup = serieFuncs.insertStep(state.seriesGroup, order, data);
            return {
                ...state,
                seriesGroup
            };
        }

        case ComponentsActionTypes.GET_GROUP_LIST_SUCCESS: {
            return {
                ...state,
                groupList: payload
            };
        }

        case ComponentsActionTypes.CREATE_GROUP_SUCCESS: {
            const { data: { serie, group }, payload: payloadData } = payload;

            if (!serie && !group) {
                return state;
            }

            return {
                ...state,
                seriesGroup: serieFuncs.createGroup(state.seriesGroup, serie, group, payloadData, state.direction)
            };
        }

        case ComponentsActionTypes.SELECTED_GROUP: {
            return {
                ...state,
                groupsSelection: serieFuncs.selectedGroup(state.groupsSelection, payload)
            };
        }

        case ComponentsActionTypes.REMOVE_COMPONENTS_STEP_SUCCESS: {
            return {
                ...state,
                seriesGroup: serieFuncs.removeGroupStep(state.seriesGroup, payload)
            };
        }

        case ComponentsActionTypes.SAVE_COMPONENTS_STEP_SUCCESS: {
            const { Group, Serie, Step } = payload;
            return {
                ...state,
                seriesGroup: serieFuncs.saveGroupStep(state.seriesGroup, Group, Serie, Step)
            };
        }

        case ComponentsActionTypes.REMOVE_COMPONENTS_GROUP_SUCCESS: {
            const data = serieFuncs.mergeGroupArrays(state.seriesGroup, payload);
            return {
                ...state,
                seriesGroup: sortByMultiply(data, ['order', 'group'], state.direction)
            };
        }

        case ComponentsActionTypes.CHANGE_GROUP_PLACE_SUCCESS: {
            return {
                ...state,
                seriesGroup: serieFuncs.changeGroupPlace(state.seriesGroup, payload)
            };
        }

        case ComponentsActionTypes.CHANGE_GROUP_INFO_SUCCESS: {
            return {
                ...state,
                seriesGroup: serieFuncs.changeGroupInfo(state.seriesGroup, payload, state.direction)
            };
        }

        case ComponentsActionTypes.COLLAPSE_GROUP: {
            const seriesGroup = serieFuncs.collapseGroup(state.seriesGroup, payload);

            return {
                ...state,
                isCollapsed: !seriesGroup.some(item => item.isCollapsed !== undefined && item.isCollapsed),
                seriesGroup
            };
        }

        case ComponentsActionTypes.EDIT_COMPONENTS_STEP_SUCCESS: {
            return {
                ...state,
                seriesGroup: serieFuncs.editGroupStep(state.seriesGroup, payload)
            };
        }

        default: {
            return state;
        }
    }
}

