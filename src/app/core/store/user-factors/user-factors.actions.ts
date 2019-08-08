import { Action } from '@ngrx/store';
import { Levels, RequestImport } from '../../models/generic';

export enum UserFactorsActionTypes {
    GET_USER_FACTORS = '[UserFactors] GET_USER_FACTORS',
    GET_USER_FACTORS_SUCCESS = '[UserFactors] GET_USER_FACTORS_SUCCESS',
    SORT_USER_FACTORS_GROUP = '[UserFactors] SORT_USER_FACTORS_GROUP',
    SORT_USER_FACTORS = '[UserFactors] SORT_USER_FACTORS',
    SHOW_USERS_GROUPS = '[UserFactors] SHOW_USERS_GROUPS',
    COLLAPSE_USERS_GROUPS = '[UserFactors] COLLAPSE_USERS_GROUPS',
    CHANGE_GROUP_INFO = '[UserFactors] CHANGE_GROUP_INFO',
    CHANGE_GROUP_INFO_SUCCESS = '[UserFactors] CHANGE_GROUP_INFO_SUCCESS',
    ADD_USERS_GROUP_STEP = '[UserFactors] ADD_USERS_GROUP_STEP',
    SAVE_USERS_GROUP_STEP_SUCCESS = '[UserFactors] SAVE_USERS_GROUP_STEP_SUCCESS',
    SAVE_USERS_GROUP_STEP = '[UserFactors] SAVE_USERS_GROUP_STEP',
    EDIT_USERS_GROUP_STEP_SUCCESS = '[UserFactors] EDIT_USERS_GROUP_STEP_SUCCESS',
    EDIT_USERS_GROUP_STEP = '[UserFactors] EDIT_USERS_GROUP_STEP',
    REMOVE_USERS_GROUP_STEP = '[UserFactors] REMOVE_USERS_GROUP_STEP',
    DOWNLOAD_EXCEL = '[UserFactors] DOWNLOAD_EXCEL',
    SWAP_STEP_LEFT = '[UserFactors] SWAP_STEP_LEFT',
    SWAP_STEP_SUCCESS = '[UserFactors] SWAP_STEP_SUCCESS',
    SWAP_STEP_RIGHT = '[UserFactors] SWAP_STEP_RIGHT',
    SELECT_STEP = '[UserFactors] SELECT_STEP',
    CLEAR_SELECT_STEP = '[UserFactors] CLEAR_SELECT_STEP',
    INSERT_STEP = '[UserFactors] INSERT_STEP',
    INSERT_STEP_SUCCESS = '[UserFactors] INSERT_STEP_SUCCESS',
    DROP_STEPS = '[UserFactors] DROP_STEPS',
    GET_GROUP_LIST = '[UserFactors] GET_GROUP_LIST',
    GET_GROUP_LIST_SUCCESS = '[UserFactors] GET_GROUP_LIST_SUCCESS',
    REMOVE_USERS_GROUP_STEP_CELL = '[UserFactors] REMOVE_USERS_GROUP_STEP_CELL',
    REMOVE_USERS_GROUP_STEP_SUCCESS = '[UserFactors] REMOVE_USERS_GROUP_STEP_SUCCESS',
    SELECTED_GROUP = '[UserFactors] SELECTED_GROUP',
    CREATE_GROUP = '[UserFactors] CREATE_GROUP',
    CREATE_GROUP_SUCCESS = '[UserFactors] CREATE_GROUP_SUCCESS',
    REMOVE_USERS_GROUP = '[UserFactors] REMOVE_USERS_GROUP',
    REMOVE_USERS_GROUP_SUCCESS = '[UserFactors] REMOVE_USERS_GROUP_SUCCESS',
    CHANGE_GROUP_PLACE = '[UserFactors] CHANGE_GROUP_PLACE',
    CHANGE_GROUP_PLACE_SUCCESS = '[UserFactors] CHANGE_GROUP_PLACE_SUCCESS',
    COLLAPSE_GROUP = '[UserFactors] COLLAPSE_GROUP',
    IMPORT_STEP = '[UserFactors] IMPORT_STEP',
    IMPORT_STEP_SUCCESS = '[UserFactors] IMPORT_STEP_SUCCESS',
    GET_STEP = '[UserFactors] GET_STEP',
    APPLY_STEPS_IMPORT = '[UserFactors] APPLY_STEPS_IMPORT',
    APPLY_STEPS_IMPORT_SUCCESS = '[UserFactors] APPLY_STEPS_IMPORT_SUCCESS'
}

export class UserFactorsGet implements Action {
    readonly type = UserFactorsActionTypes.GET_USER_FACTORS;
}

export class UserFactorsGetSuccess implements Action {
    readonly type = UserFactorsActionTypes.GET_USER_FACTORS_SUCCESS;
    constructor(public payload: UsersFactors[]) {}
}

export class SortUserFactorsGroup implements Action {
    readonly type = UserFactorsActionTypes.SORT_USER_FACTORS_GROUP;
}

export class SortUserFactors implements Action {
    readonly type = UserFactorsActionTypes.SORT_USER_FACTORS;
    constructor(public payload: {nameField: string[], groupId: number}) {}
}

export class ShowUserFactorsGroups implements Action {
    readonly type = UserFactorsActionTypes.SHOW_USERS_GROUPS;
    constructor(public payload: {serieId: string, groupId: number}) {}
}

export class CollapseUserFactorsGroups implements Action {
    readonly type = UserFactorsActionTypes.COLLAPSE_USERS_GROUPS;
    constructor(public payload?: boolean) {}
}

export class ChangeGroupInfo implements Action {
    readonly type = UserFactorsActionTypes.CHANGE_GROUP_INFO;
    constructor(public payload: any) {}
}

export class ChangeGroupInfoSuccess implements Action {
    readonly type = UserFactorsActionTypes.CHANGE_GROUP_INFO_SUCCESS;
    constructor(public payload: any) {}
}

export class AddUsersGroupStep implements Action {
    readonly type = UserFactorsActionTypes.ADD_USERS_GROUP_STEP;
    constructor(public payload: {groupId: string, serieId: string}) {}
}

export class SaveUsersGroupStepSuccess implements Action {
    readonly type = UserFactorsActionTypes.SAVE_USERS_GROUP_STEP_SUCCESS;
    constructor(public payload: any) {}
}

export class SaveUsersGroupStep implements Action {
    readonly type = UserFactorsActionTypes.SAVE_USERS_GROUP_STEP;
    constructor(public payload: any) {}
}

export class EditUsersGroupStep implements Action {
    readonly type = UserFactorsActionTypes.EDIT_USERS_GROUP_STEP;
    constructor(public payload: any) {}
}

export class EditUsersGroupStepSuccess implements Action {
    readonly type = UserFactorsActionTypes.EDIT_USERS_GROUP_STEP_SUCCESS;
    constructor(public payload: any) {}
}

export class RemoveUsersGroupStep implements Action {
    readonly type = UserFactorsActionTypes.REMOVE_USERS_GROUP_STEP;
    constructor(public payload: any) {}
}

export class DownloadExcel implements Action {
    readonly type = UserFactorsActionTypes.DOWNLOAD_EXCEL;
    constructor(public payload: Levels) {}
}

export class SwapStepLeft implements Action {
    readonly type = UserFactorsActionTypes.SWAP_STEP_LEFT;
    constructor(public payload: {data: StepSelectCopy, groupId: number}) {}
}

export class SwapStepSuccess implements Action {
    readonly type = UserFactorsActionTypes.SWAP_STEP_SUCCESS;
    constructor(public payload: StepSelectCopy) {}
}

export class SwapStepRight implements Action {
    readonly type = UserFactorsActionTypes.SWAP_STEP_RIGHT;
    constructor(public payload: {data: StepSelectCopy, groupId: number}) {}
}

export class SelectStep implements Action {
    readonly type = UserFactorsActionTypes.SELECT_STEP;
    constructor(public payload: any) {}
}

export class ClearSelectStep implements Action {
    readonly type = UserFactorsActionTypes.CLEAR_SELECT_STEP;
}

export class InsertStep implements Action {
    readonly type = UserFactorsActionTypes.INSERT_STEP;
    constructor(public payload: any) {}
}

export class InsertStepSuccess implements Action {
    readonly type = UserFactorsActionTypes.INSERT_STEP_SUCCESS;
    constructor(public payload: any) {}
}

export class DropSteps implements Action {
    readonly type = UserFactorsActionTypes.DROP_STEPS;
    constructor(public payload: any) {}
}

export class GetGroupList implements Action {
    readonly type = UserFactorsActionTypes.GET_GROUP_LIST;
}

export class GetGroupListSuccess implements Action {
    readonly type = UserFactorsActionTypes.GET_GROUP_LIST_SUCCESS;
    constructor(public payload: any) {}
}

export class RemoveUsersGroupStepsCell implements Action {
    readonly type = UserFactorsActionTypes.REMOVE_USERS_GROUP_STEP_CELL;
    constructor(public payload: any) {}
}

export class RemoveUsersGroupStepsSuccess implements Action {
    readonly type = UserFactorsActionTypes.REMOVE_USERS_GROUP_STEP_SUCCESS;
    constructor(public payload: any) {}
}

export class SelectedGroup implements Action {
    readonly type = UserFactorsActionTypes.SELECTED_GROUP;
    constructor(public payload: any) {}
}

export class CreateGroup implements Action {
    readonly type = UserFactorsActionTypes.CREATE_GROUP;
    constructor(public payload: any) {}
}

export class CreateGroupSuccess implements Action {
    readonly type = UserFactorsActionTypes.CREATE_GROUP_SUCCESS;
    constructor(public payload: any) {}
}

export class RemoveGroup implements Action {
    readonly type = UserFactorsActionTypes.REMOVE_USERS_GROUP;
    constructor(public payload: any) {}
}

export class RemoveGroupSuccess implements Action {
    readonly type = UserFactorsActionTypes.REMOVE_USERS_GROUP_SUCCESS;
    constructor(public payload: any) {}
}

export class ChangeGroupPlace implements Action {
    readonly type = UserFactorsActionTypes.CHANGE_GROUP_PLACE;
    constructor(public payload: any) {}
}

export class ChangeGroupPlaceSuccess implements Action {
    readonly type = UserFactorsActionTypes.CHANGE_GROUP_PLACE_SUCCESS;
    constructor(public payload: any) {}
}

export class CollapseGroup implements Action {
    readonly type = UserFactorsActionTypes.COLLAPSE_GROUP;
    constructor(public payload: any) {}
}

export class ImportStep implements Action {
    readonly type = UserFactorsActionTypes.IMPORT_STEP;
    constructor(public payload: any) {}
}

export class ImportStepSuccess implements Action {
    readonly type = UserFactorsActionTypes.IMPORT_STEP_SUCCESS;
    constructor(public payload: SeriesImportModel) {}
}

export class GetStep implements Action {
    readonly type = UserFactorsActionTypes.GET_STEP;
    constructor(public payload: number) {}
}

export class ApplyStepsImport implements Action {
    readonly type = UserFactorsActionTypes.APPLY_STEPS_IMPORT;
    constructor(public payload: RequestImport) {}
}

export class ApplyStepsImportSuccess implements Action {
    readonly type = UserFactorsActionTypes.APPLY_STEPS_IMPORT_SUCCESS;
}

export type UserFactorsActions =
    | UserFactorsGet
    | UserFactorsGetSuccess
    | SortUserFactorsGroup
    | SortUserFactors
    | ShowUserFactorsGroups
    | ChangeGroupInfo
    | ChangeGroupInfoSuccess
    | AddUsersGroupStep
    | SaveUsersGroupStep
    | SaveUsersGroupStepSuccess
    | EditUsersGroupStep
    | EditUsersGroupStepSuccess
    | RemoveUsersGroupStep
    | DownloadExcel
    | SwapStepLeft
    | SwapStepRight
    | SwapStepSuccess
    | SelectStep
    | ClearSelectStep
    | InsertStep
    | InsertStepSuccess
    | DropSteps
    | GetGroupList
    | GetGroupListSuccess
    | RemoveUsersGroupStepsSuccess
    | RemoveUsersGroupStepsCell
    | SelectedGroup
    | CreateGroup
    | CreateGroupSuccess
    | ChangeGroupPlace
    | ChangeGroupPlaceSuccess
    | CollapseGroup
    | ImportStep
    | ImportStepSuccess
    | GetStep
    | ApplyStepsImport
    | ApplyStepsImportSuccess;
