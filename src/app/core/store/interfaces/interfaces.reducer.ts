import { InterfacesActionTypes } from '@core/store/interfaces/interfaces.actions';
import { sortBy, sortByMultiply } from '@utils/utilsfunc';
import * as serieFuncs from '@utils/base-serie-funcs';


export const initialState: SerieState = {
    seriesGroup: [],
    direction: true,
    seriesSelection: [],
    groupList: [],
    groupsSelection: [],
    isCollapsed: false,
    importConflict: null
};

export function interfaces(state: any = initialState, action: IUnsafeAction): SerieState {
    const { type, payload } = action;

    switch (type) {
        case InterfacesActionTypes.GET_INTERFACES_SUCCESS: {
            const seriesGroup = serieFuncs.mapSeries(payload);
            return {
                ...state,
                seriesGroup: sortByMultiply(seriesGroup, ['order', 'group'], state.direction)
            };
        }

        case InterfacesActionTypes.SORT_INTERFACES_GROUP: {
            const direction = !state.direction;

            return {
                ...state,
                direction,
                interfacesGroups: sortByMultiply([...state.interfacesGroups], ['order', 'group'], direction)
            };
        }

        case InterfacesActionTypes.SORT_INTERFACES: {
            const { nameField, groupId } = payload;
            const seriesGroup = serieFuncs.sortSeries(state.seriesGroup, groupId, nameField);

            return {
                ...state,
                seriesGroup
            };
        }

        case InterfacesActionTypes.SHOW_INTERFACES_GROUPS: {
            // TODO: update with change complexity O
            const { serieId, groupId } = payload;
            const seriesGroup = serieFuncs.showGroups(state.seriesGroup, groupId, serieId);

            return {
                ...state,
                seriesGroup,
            };
        }

        case InterfacesActionTypes.COLLAPSE_INTERFACES_GROUPS: {
            const isCollapsed = payload !== undefined ? payload : !state.isCollapsed;
            const seriesGroup = serieFuncs.collapseGroups(state.seriesGroup, payload, isCollapsed);

            return {
                ...state,
                seriesGroup,
                isCollapsed
            };
        }

        case InterfacesActionTypes.ADD_INTERFACES_STEP: {
            const { groupId, serieId } = payload;
            const seriesGroup = serieFuncs.addNewStep(state.seriesGroup, groupId, serieId);

            return {
                ...state,
                seriesGroup
            };
        }

        case InterfacesActionTypes.REMOVE_INTERFACES_STEP: {
            const { groupId, order, serieId } = payload;
            const seriesGroup = serieFuncs.removeStep(state.seriesGroup, groupId, serieId, order);

            return {
                ...state,
                seriesGroup
            };
        }

        case InterfacesActionTypes.SWAP_STEP_SUCCESS: {
            const seriesGroup = serieFuncs.swapSteps(state.seriesGroup, payload);

            return {
                ...state,
                seriesGroup
            };
        }

        case InterfacesActionTypes.SELECT_STEP: {
            return {
                ...state,
                seriesSelection: serieFuncs.selectStep(state.seriesSelection, payload)
            };
        }

        case InterfacesActionTypes.CLEAR_SELECT_STEP: {
            return {
                ...state,
                groupsSelection: [],
                seriesSelection: []
            };
        }

        case InterfacesActionTypes.INSERT_STEP_SUCCESS: {
            const { data, payload: { order } } = payload;
            const seriesGroup = serieFuncs.insertStep(state.seriesGroup, order, data);
            return {
                ...state,
                seriesGroup
            };
        }

        case InterfacesActionTypes.GET_GROUP_LIST_SUCCESS: {
            return {
                ...state,
                groupList: payload
            };
        }

        case InterfacesActionTypes.CREATE_GROUP_SUCCESS: {
            const { data: { serie, group }, payload: payloadData } = payload;

            if (!serie && !group) {
                return state;
            }

            return {
                ...state,
                seriesGroup: serieFuncs.createGroup(state.seriesGroup, serie, group, payloadData, state.direction)
            };
        }

        case InterfacesActionTypes.SELECTED_GROUP: {
            return {
                ...state,
                groupsSelection: serieFuncs.selectedGroup(state.groupsSelection, payload)
            };
        }

        case InterfacesActionTypes.REMOVE_INTERFACES_STEP_SUCCESS: {
            return {
                ...state,
                seriesGroup: serieFuncs.removeGroupStep(state.seriesGroup, payload)
            };
        }

        case InterfacesActionTypes.SAVE_INTERFACES_STEP_SUCCESS: {
            const { Group, Serie, Step } = payload;
            return {
                ...state,
                seriesGroup: serieFuncs.saveGroupStep(state.seriesGroup, Group, Serie, Step)
            };
        }

        case InterfacesActionTypes.REMOVE_INTERFACES_GROUP_SUCCESS: {
            const data = serieFuncs.mergeGroupArrays(state.seriesGroup, payload);
            return {
                ...state,
                seriesGroup: sortByMultiply(data, ['order', 'group'], state.direction)
            };
        }

        case InterfacesActionTypes.CHANGE_GROUP_PLACE_SUCCESS: {
            return {
                ...state,
                seriesGroup: serieFuncs.changeGroupPlace(state.seriesGroup, payload)
            };
        }

        case InterfacesActionTypes.CHANGE_GROUP_INFO_SUCCESS: {
            return {
                ...state,
                seriesGroup: serieFuncs.changeGroupInfo(state.seriesGroup, payload, state.direction)
            };
        }

        case InterfacesActionTypes.COLLAPSE_GROUP: {
            const seriesGroup = serieFuncs.collapseGroup(state.seriesGroup, payload);

            return {
                ...state,
                isCollapsed: !seriesGroup.some(item => item.isCollapsed !== undefined && item.isCollapsed),
                seriesGroup
            };
        }

        case InterfacesActionTypes.EDIT_INTERFACES_STEP_SUCCESS: {
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

