import { Action } from '@ngrx/store';
import { Levels } from '@core/models/generic';

export enum ComponentsActionTypes {
    GET_COMPONENTS = '[Components] GET_COMPONENTS',
    GET_COMPONENTS_SUCCESS = '[Components] GET_COMPONENTS_SUCCESS',
    SORT_COMPONENTS_GROUP = '[Components] SORT_COMPONENTS_GROUP',
    SORT_COMPONENTS = '[Components] SORT_COMPONENTS',
    SHOW_COMPONENTS_GROUPS = '[Components] SHOW_COMPONENTS_GROUPS',
    COLLAPSE_COMPONENTS_GROUPS = '[Components] COLLAPSE_COMPONENTS_GROUPS',
    CHANGE_GROUP_INFO = '[Components] CHANGE_GROUP_INFO',
    CHANGE_GROUP_INFO_SUCCESS = '[Components] CHANGE_GROUP_INFO_SUCCESS',
    ADD_COMPONENTS_STEP = '[Components] ADD_COMPONENTS_STEP',
    SAVE_COMPONENTS_STEP_SUCCESS = '[Components] SAVE_COMPONENTS_STEP_SUCCESS',
    SAVE_COMPONENTS_STEP = '[Components] SAVE_COMPONENTS_STEP',
    EDIT_COMPONENTS_STEP_SUCCESS = '[Components] EDIT_COMPONENTS_STEP_SUCCESS',
    EDIT_COMPONENTS_STEP = '[Components] EDIT_COMPONENTS_STEP',
    REMOVE_COMPONENTS_STEP = '[Components] REMOVE_COMPONENTS_STEP',
    DOWNLOAD_EXCEL = '[Components] DOWNLOAD_EXCEL',
    SWAP_STEP_LEFT = '[Components] SWAP_STEP_LEFT',
    SWAP_STEP_SUCCESS = '[Components] SWAP_STEP_SUCCESS',
    SWAP_STEP_RIGHT = '[Components] SWAP_STEP_RIGHT',
    SELECT_STEP = '[Components] SELECT_STEP',
    CLEAR_SELECT_STEP = '[Components] CLEAR_SELECT_STEP',
    INSERT_STEP = '[Components] INSERT_STEP',
    INSERT_STEP_SUCCESS = '[Components] INSERT_STEP_SUCCESS',
    DROP_STEPS = '[Components] DROP_STEPS',
    GET_GROUP_LIST = '[Components] GET_GROUP_LIST',
    GET_GROUP_LIST_SUCCESS = '[Components] GET_GROUP_LIST_SUCCESS',
    REMOVE_COMPONENTS_STEP_CELL = '[Components] REMOVE_USERS_GROUP_STEP_CELL',
    REMOVE_COMPONENTS_STEP_SUCCESS = '[Components] REMOVE_USERS_GROUP_STEP_SUCCESS',
    SELECTED_GROUP = '[Components] SELECTED_GROUP',
    CREATE_GROUP = '[Components] CREATE_GROUP',
    CREATE_GROUP_SUCCESS = '[Components] CREATE_GROUP_SUCCESS',
    REMOVE_COMPONENTS_GROUP = '[Components] REMOVE_COMPONENTS_GROUP',
    REMOVE_COMPONENTS_GROUP_SUCCESS = '[Components] REMOVE_COMPONENTS_GROUP_SUCCESS',
    CHANGE_GROUP_PLACE = '[Components] CHANGE_GROUP_PLACE',
    CHANGE_GROUP_PLACE_SUCCESS = '[Components] CHANGE_GROUP_PLACE_SUCCESS',
    COLLAPSE_GROUP = '[Components] COLLAPSE_GROUP',
    IMPORT_STEP = '[Components] IMPORT_STEP',
    IMPORT_STEP_SUCCESS = '[Components] IMPORT_STEP_SUCCESS',
    GET_STEP = '[Components] GET_STEP'
}

export class GetComponents implements Action {
    readonly type = ComponentsActionTypes.GET_COMPONENTS;
}

export class GetComponentsSuccess implements Action {
    readonly type = ComponentsActionTypes.GET_COMPONENTS_SUCCESS;
    constructor(public payload: UsersFactors[]) {}
}

export class SortComponentsGroup implements Action {
    readonly type = ComponentsActionTypes.SORT_COMPONENTS_GROUP;
}

export class SortComponents implements Action {
    readonly type = ComponentsActionTypes.SORT_COMPONENTS;
    constructor(public payload: {nameField: string[], groupId: number}) {}
}

export class ShowComponentsGroups implements Action {
    readonly type = ComponentsActionTypes.SHOW_COMPONENTS_GROUPS;
    constructor(public payload: {serieId: string, groupId: number}) {}
}

export class CollapseComponentsGroups implements Action {
    readonly type = ComponentsActionTypes.COLLAPSE_COMPONENTS_GROUPS;
    constructor(public payload?: boolean) {}
}

export class ChangeGroupInfo implements Action {
    readonly type = ComponentsActionTypes.CHANGE_GROUP_INFO;
    constructor(public payload: any) {}
}

export class ChangeGroupInfoSuccess implements Action {
    readonly type = ComponentsActionTypes.CHANGE_GROUP_INFO_SUCCESS;
    constructor(public payload: any) {}
}

export class AddComponentsStep implements Action {
    readonly type = ComponentsActionTypes.ADD_COMPONENTS_STEP;
    constructor(public payload: {groupId: string, serieId: string}) {}
}

export class SaveComponentsStepSuccess implements Action {
    readonly type = ComponentsActionTypes.SAVE_COMPONENTS_STEP_SUCCESS;
    constructor(public payload: any) {}
}

export class SaveComponentsStep implements Action {
    readonly type = ComponentsActionTypes.SAVE_COMPONENTS_STEP;
    constructor(public payload: any) {}
}

export class EditComponentsStep implements Action {
    readonly type = ComponentsActionTypes.EDIT_COMPONENTS_STEP;
    constructor(public payload: any) {}
}

export class EditComponentsStepSuccess implements Action {
    readonly type = ComponentsActionTypes.EDIT_COMPONENTS_STEP_SUCCESS;
    constructor(public payload: any) {}
}

export class RemoveComponentsStep implements Action {
    readonly type = ComponentsActionTypes.REMOVE_COMPONENTS_STEP;
    constructor(public payload: any) {}
}

export class DownloadExcel implements Action {
    readonly type = ComponentsActionTypes.DOWNLOAD_EXCEL;
    constructor(public payload: Levels) {}
}

export class SwapStepLeft implements Action {
    readonly type = ComponentsActionTypes.SWAP_STEP_LEFT;
    constructor(public payload: {data: StepSelectCopy, groupId: number}) {}
}

export class SwapStepSuccess implements Action {
    readonly type = ComponentsActionTypes.SWAP_STEP_SUCCESS;
    constructor(public payload: StepSelectCopy) {}
}

export class SwapStepRight implements Action {
    readonly type = ComponentsActionTypes.SWAP_STEP_RIGHT;
    constructor(public payload: {data: StepSelectCopy, groupId: number}) {}
}

export class SelectStep implements Action {
    readonly type = ComponentsActionTypes.SELECT_STEP;
    constructor(public payload: any) {}
}

export class ClearSelectStep implements Action {
    readonly type = ComponentsActionTypes.CLEAR_SELECT_STEP;
}

export class InsertStep implements Action {
    readonly type = ComponentsActionTypes.INSERT_STEP;
    constructor(public payload: any) {}
}

export class InsertStepSuccess implements Action {
    readonly type = ComponentsActionTypes.INSERT_STEP_SUCCESS;
    constructor(public payload: any) {}
}

export class DropSteps implements Action {
    readonly type = ComponentsActionTypes.DROP_STEPS;
    constructor(public payload: any) {}
}

export class GetGroupList implements Action {
    readonly type = ComponentsActionTypes.GET_GROUP_LIST;
}

export class GetGroupListSuccess implements Action {
    readonly type = ComponentsActionTypes.GET_GROUP_LIST_SUCCESS;
    constructor(public payload: any) {}
}

export class RemoveComponentstepsCell implements Action {
    readonly type = ComponentsActionTypes.REMOVE_COMPONENTS_STEP_CELL;
    constructor(public payload: any) {}
}

export class RemoveComponentstepsSuccess implements Action {
    readonly type = ComponentsActionTypes.REMOVE_COMPONENTS_STEP_SUCCESS;
    constructor(public payload: any) {}
}

export class SelectedGroup implements Action {
    readonly type = ComponentsActionTypes.SELECTED_GROUP;
    constructor(public payload: any) {}
}

export class CreateGroup implements Action {
    readonly type = ComponentsActionTypes.CREATE_GROUP;
    constructor(public payload: any) {}
}

export class CreateGroupSuccess implements Action {
    readonly type = ComponentsActionTypes.CREATE_GROUP_SUCCESS;
    constructor(public payload: any) {}
}

export class RemoveGroup implements Action {
    readonly type = ComponentsActionTypes.REMOVE_COMPONENTS_GROUP;
    constructor(public payload: any) {}
}

export class RemoveGroupSuccess implements Action {
    readonly type = ComponentsActionTypes.REMOVE_COMPONENTS_GROUP_SUCCESS;
    constructor(public payload: any) {}
}

export class ChangeGroupPlace implements Action {
    readonly type = ComponentsActionTypes.CHANGE_GROUP_PLACE;
    constructor(public payload: any) {}
}

export class ChangeGroupPlaceSuccess implements Action {
    readonly type = ComponentsActionTypes.CHANGE_GROUP_PLACE_SUCCESS;
    constructor(public payload: any) {}
}

export class CollapseGroup implements Action {
    readonly type = ComponentsActionTypes.COLLAPSE_GROUP;
    constructor(public payload: any) {}
}

export class ImportStep implements Action {
    readonly type = ComponentsActionTypes.IMPORT_STEP;
    constructor(public payload: any) {}
}

export class ImportStepSuccess implements Action {
    readonly type = ComponentsActionTypes.IMPORT_STEP_SUCCESS;
    constructor(public payload: any) {}
}

export class GetStep implements Action {
    readonly type = ComponentsActionTypes.GET_STEP;
    constructor(public payload: number) {}
}

export type ComponentsActions =
    | GetComponents
    | GetComponentsSuccess;
