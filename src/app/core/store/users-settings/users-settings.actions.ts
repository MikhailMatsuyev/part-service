import { Action } from '@ngrx/store';

export enum UsersSettingsActionTypes {
    GET_ROLES = '[Users Settings] GET_ROLES',
    GET_ROLES_SUCCESS = '[Users Settings] GET_ROLES_SUCCESS',
    GET_USERS = '[Users Settings] GET_USERS',
    GET_USERS_SUCCESS = '[Users Settings] GET_USERS_SUCCESS',
    EDIT_ROLE = '[Users Settings] EDIT_ROLE',
    EDIT_ROLE_SUCCESS = '[Users Settings] EDIT_ROLE_SUCCESS',
    DELETE_ROLE = '[Users Settings] DELETE_ROLE',
    DELETE_ROLE_SUCCESS = '[Users Settings] DELETE_ROLE_SUCCESS',
    EDIT_USER = '[Users Settings] EDIT_USER',
    EDIT_USER_SUCCESS = '[Users Settings] EDIT_USER_SUCCESS',
    DELETE_USER = '[Users Settings] DELETE_USER',
    DELETE_USER_SUCCESS = '[Users Settings] DELETE_USER_SUCCESS',
    SET_MANAGE_ROLE = '[Users Settings] SET_MANAGE_ROLE',
    SET_MANAGE_ROLE_SUCCESS = '[Users Settings] SET_MANAGE_ROLE_SUCCESS',
    ADD_ROLE = '[User Settings] ADD_ROLE',
    GET_ROLES_TREE = '[Users Settings] GET_ROLES_TREE',
    GET_ROLES_TREE_SUCCESS = '[Users Settings] GET_ROLES_TREE_SUCCESS'
}

export class GetRoles implements Action {
    readonly type = UsersSettingsActionTypes.GET_ROLES;
}

export class GetRolesSuccess implements Action {
    readonly type = UsersSettingsActionTypes.GET_ROLES_SUCCESS;
    constructor(public payload: UserRoles[]) {}
}

export class GetUsers implements Action {
    readonly type = UsersSettingsActionTypes.GET_USERS;
    constructor(public payload: number) {}
}

export class GetUsersSuccess implements Action {
    readonly type = UsersSettingsActionTypes.GET_USERS_SUCCESS;
    constructor(public payload: UsersModel[]) {}
}

export class EditRole implements Action {
    readonly type = UsersSettingsActionTypes.EDIT_ROLE;
    constructor(public payload: {id: number, name: string}) {}
}

export class EditRoleSuccess implements Action {
    readonly type = UsersSettingsActionTypes.EDIT_ROLE_SUCCESS;
    constructor(public payload: UserRoles) {}
}

export class DeleteRole implements Action {
    readonly type = UsersSettingsActionTypes.DELETE_ROLE;
    constructor(public payload: number) {}
}

export class DeleteRoleSuccess implements Action {
    readonly type = UsersSettingsActionTypes.DELETE_ROLE_SUCCESS;
    constructor(public payload: boolean) {}
}

export class EditUser implements Action {
    readonly type = UsersSettingsActionTypes.EDIT_USER;
    constructor(public payload: UserResponseModel) {}
}

export class EditUserSuccess implements Action {
    readonly type = UsersSettingsActionTypes.EDIT_USER_SUCCESS;
}

export class DeleteUser implements Action {
    readonly type = UsersSettingsActionTypes.DELETE_USER;
    constructor(public payload: number[]) {}
}

export class DeleteUserSuccess implements Action {
    readonly type = UsersSettingsActionTypes.DELETE_USER_SUCCESS;
}

export class SetManageRole implements Action {
    readonly type = UsersSettingsActionTypes.SET_MANAGE_ROLE;
    constructor(public payload: {roleId: number, users: number[]}) {}
}

export class SetManageRoleSuccess implements Action {
    readonly type = UsersSettingsActionTypes.SET_MANAGE_ROLE_SUCCESS;
}

export class AddRole implements Action {
    readonly type = UsersSettingsActionTypes.ADD_ROLE;
    constructor(public payload: {roleId: number, name: string}) {}
}

export class GetRolesTree implements Action {
    readonly type = UsersSettingsActionTypes.GET_ROLES_TREE;
}

export class GetRolesTreeSuccess implements Action {
    readonly type = UsersSettingsActionTypes.GET_ROLES_TREE_SUCCESS;
    constructor(public payload: any[]) {}
}

export type UsersSettingsActions =
    | GetRoles
    | GetRolesSuccess
    | GetUsers
    | GetUsersSuccess
    | EditRole
    | EditRoleSuccess
    | DeleteRole
    | DeleteRoleSuccess
    | EditUser
    | EditUserSuccess
    | DeleteUser
    | DeleteUserSuccess
    | SetManageRole
    | SetManageRoleSuccess
    | GetRolesTree
    | GetRolesTreeSuccess;
