import { Action } from '@ngrx/store';
import { Levels } from '@core/models/generic';

export enum InterfacesActionTypes {
    GET_INTERFACES = '[Interfaces] GET_INTERFACES',
    GET_INTERFACES_SUCCESS = '[Interfaces] GET_INTERFACES_SUCCESS',
    SORT_INTERFACES_GROUP = '[Interfaces] SORT_INTERFACES_GROUP',
    SORT_INTERFACES = '[Interfaces] SORT_INTERFACES',
    SHOW_INTERFACES_GROUPS = '[Interfaces] SHOW_INTERFACES_GROUPS',
    COLLAPSE_INTERFACES_GROUPS = '[Interfaces] COLLAPSE_INTERFACES_GROUPS',
    CHANGE_GROUP_INFO = '[Interfaces] CHANGE_GROUP_INFO',
    CHANGE_GROUP_INFO_SUCCESS = '[Interfaces] CHANGE_GROUP_INFO_SUCCESS',
    ADD_INTERFACES_STEP = '[Interfaces] ADD_INTERFACES_STEP',
    SAVE_INTERFACES_STEP_SUCCESS = '[Interfaces] SAVE_INTERFACES_STEP_SUCCESS',
    SAVE_INTERFACES_STEP = '[Interfaces] SAVE_INTERFACES_STEP',
    EDIT_INTERFACES_STEP_SUCCESS = '[Interfaces] EDIT_INTERFACES_STEP_SUCCESS',
    EDIT_INTERFACES_STEP = '[Interfaces] EDIT_INTERFACES_STEP',
    REMOVE_INTERFACES_STEP = '[Interfaces] REMOVE_INTERFACES_STEP',
    DOWNLOAD_EXCEL = '[Interfaces] DOWNLOAD_EXCEL',
    SWAP_STEP_LEFT = '[Interfaces] SWAP_STEP_LEFT',
    SWAP_STEP_SUCCESS = '[Interfaces] SWAP_STEP_SUCCESS',
    SWAP_STEP_RIGHT = '[Interfaces] SWAP_STEP_RIGHT',
    SELECT_STEP = '[Interfaces] SELECT_STEP',
    CLEAR_SELECT_STEP = '[Interfaces] CLEAR_SELECT_STEP',
    INSERT_STEP = '[Interfaces] INSERT_STEP',
    INSERT_STEP_SUCCESS = '[Interfaces] INSERT_STEP_SUCCESS',
    DROP_STEPS = '[Interfaces] DROP_STEPS',
    GET_GROUP_LIST = '[Interfaces] GET_GROUP_LIST',
    GET_GROUP_LIST_SUCCESS = '[Interfaces] GET_GROUP_LIST_SUCCESS',
    REMOVE_INTERFACES_STEP_CELL = '[Interfaces] REMOVE_USERS_GROUP_STEP_CELL',
    REMOVE_INTERFACES_STEP_SUCCESS = '[Interfaces] REMOVE_USERS_GROUP_STEP_SUCCESS',
    SELECTED_GROUP = '[Interfaces] SELECTED_GROUP',
    CREATE_GROUP = '[Interfaces] CREATE_GROUP',
    CREATE_GROUP_SUCCESS = '[Interfaces] CREATE_GROUP_SUCCESS',
    REMOVE_INTERFACES_GROUP = '[Interfaces] REMOVE_INTERFACES_GROUP',
    REMOVE_INTERFACES_GROUP_SUCCESS = '[Interfaces] REMOVE_INTERFACES_GROUP_SUCCESS',
    CHANGE_GROUP_PLACE = '[Interfaces] CHANGE_GROUP_PLACE',
    CHANGE_GROUP_PLACE_SUCCESS = '[Interfaces] CHANGE_GROUP_PLACE_SUCCESS',
    COLLAPSE_GROUP = '[Interfaces] COLLAPSE_GROUP',
    IMPORT_STEP = '[Interfaces] IMPORT_STEP',
    IMPORT_STEP_SUCCESS = '[Interfaces] IMPORT_STEP_SUCCESS',
    GET_STEP = '[Interfaces] GET_STEP'
}

export class GetInterfaces implements Action {
    readonly type = InterfacesActionTypes.GET_INTERFACES;
}

export class GetInterfacesSuccess implements Action {
    readonly type = InterfacesActionTypes.GET_INTERFACES_SUCCESS;
    constructor(public payload: UsersFactors[]) {}
}

export class SortInterfacesGroup implements Action {
    readonly type = InterfacesActionTypes.SORT_INTERFACES_GROUP;
}

export class SortInterfaces implements Action {
    readonly type = InterfacesActionTypes.SORT_INTERFACES;
    constructor(public payload: {nameField: string[], groupId: number}) {}
}

export class ShowInterfacesGroups implements Action {
    readonly type = InterfacesActionTypes.SHOW_INTERFACES_GROUPS;
    constructor(public payload: {serieId: string, groupId: number}) {}
}

export class CollapseInterfacesGroups implements Action {
    readonly type = InterfacesActionTypes.COLLAPSE_INTERFACES_GROUPS;
    constructor(public payload?: boolean) {}
}

export class ChangeGroupInfo implements Action {
    readonly type = InterfacesActionTypes.CHANGE_GROUP_INFO;
    constructor(public payload: any) {}
}

export class ChangeGroupInfoSuccess implements Action {
    readonly type = InterfacesActionTypes.CHANGE_GROUP_INFO_SUCCESS;
    constructor(public payload: any) {}
}

export class AddInterfacesStep implements Action {
    readonly type = InterfacesActionTypes.ADD_INTERFACES_STEP;
    constructor(public payload: {groupId: string, serieId: string}) {}
}

export class SaveInterfacesStepSuccess implements Action {
    readonly type = InterfacesActionTypes.SAVE_INTERFACES_STEP_SUCCESS;
    constructor(public payload: any) {}
}

export class SaveInterfacesStep implements Action {
    readonly type = InterfacesActionTypes.SAVE_INTERFACES_STEP;
    constructor(public payload: any) {}
}

export class EditInterfacesStep implements Action {
    readonly type = InterfacesActionTypes.EDIT_INTERFACES_STEP;
    constructor(public payload: any) {}
}

export class EditInterfacesStepSuccess implements Action {
    readonly type = InterfacesActionTypes.EDIT_INTERFACES_STEP_SUCCESS;
    constructor(public payload: any) {}
}

export class RemoveInterfacesStep implements Action {
    readonly type = InterfacesActionTypes.REMOVE_INTERFACES_STEP;
    constructor(public payload: any) {}
}

export class DownloadExcel implements Action {
    readonly type = InterfacesActionTypes.DOWNLOAD_EXCEL;
    constructor(public payload: Levels) {}
}

export class SwapStepLeft implements Action {
    readonly type = InterfacesActionTypes.SWAP_STEP_LEFT;
    constructor(public payload: {data: StepSelectCopy, groupId: number}) {}
}

export class SwapStepSuccess implements Action {
    readonly type = InterfacesActionTypes.SWAP_STEP_SUCCESS;
    constructor(public payload: StepSelectCopy) {}
}

export class SwapStepRight implements Action {
    readonly type = InterfacesActionTypes.SWAP_STEP_RIGHT;
    constructor(public payload: {data: StepSelectCopy, groupId: number}) {}
}

export class SelectStep implements Action {
    readonly type = InterfacesActionTypes.SELECT_STEP;
    constructor(public payload: any) {}
}

export class ClearSelectStep implements Action {
    readonly type = InterfacesActionTypes.CLEAR_SELECT_STEP;
}

export class InsertStep implements Action {
    readonly type = InterfacesActionTypes.INSERT_STEP;
    constructor(public payload: any) {}
}

export class InsertStepSuccess implements Action {
    readonly type = InterfacesActionTypes.INSERT_STEP_SUCCESS;
    constructor(public payload: any) {}
}

export class DropSteps implements Action {
    readonly type = InterfacesActionTypes.DROP_STEPS;
    constructor(public payload: any) {}
}

export class GetGroupList implements Action {
    readonly type = InterfacesActionTypes.GET_GROUP_LIST;
}

export class GetGroupListSuccess implements Action {
    readonly type = InterfacesActionTypes.GET_GROUP_LIST_SUCCESS;
    constructor(public payload: any) {}
}

export class RemoveInterfaceStepsCell implements Action {
    readonly type = InterfacesActionTypes.REMOVE_INTERFACES_STEP_CELL;
    constructor(public payload: any) {}
}

export class RemoveInterfaceStepsSuccess implements Action {
    readonly type = InterfacesActionTypes.REMOVE_INTERFACES_STEP_SUCCESS;
    constructor(public payload: any) {}
}

export class SelectedGroup implements Action {
    readonly type = InterfacesActionTypes.SELECTED_GROUP;
    constructor(public payload: any) {}
}

export class CreateGroup implements Action {
    readonly type = InterfacesActionTypes.CREATE_GROUP;
    constructor(public payload: any) {}
}

export class CreateGroupSuccess implements Action {
    readonly type = InterfacesActionTypes.CREATE_GROUP_SUCCESS;
    constructor(public payload: any) {}
}

export class RemoveGroup implements Action {
    readonly type = InterfacesActionTypes.REMOVE_INTERFACES_GROUP;
    constructor(public payload: any) {}
}

export class RemoveGroupSuccess implements Action {
    readonly type = InterfacesActionTypes.REMOVE_INTERFACES_GROUP_SUCCESS;
    constructor(public payload: any) {}
}

export class ChangeGroupPlace implements Action {
    readonly type = InterfacesActionTypes.CHANGE_GROUP_PLACE;
    constructor(public payload: any) {}
}

export class ChangeGroupPlaceSuccess implements Action {
    readonly type = InterfacesActionTypes.CHANGE_GROUP_PLACE_SUCCESS;
    constructor(public payload: any) {}
}

export class CollapseGroup implements Action {
    readonly type = InterfacesActionTypes.COLLAPSE_GROUP;
    constructor(public payload: any) {}
}

export class ImportStep implements Action {
    readonly type = InterfacesActionTypes.IMPORT_STEP;
    constructor(public payload: any) {}
}

export class ImportStepSuccess implements Action {
    readonly type = InterfacesActionTypes.IMPORT_STEP_SUCCESS;
    constructor(public payload: any) {}
}

export class GetStep implements Action {
    readonly type = InterfacesActionTypes.GET_STEP;
    constructor(public payload: number) {}
}

export type InterfacesActions =
    | GetInterfaces
    | GetInterfacesSuccess;
