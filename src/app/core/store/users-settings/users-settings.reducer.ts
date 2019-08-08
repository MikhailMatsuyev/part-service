import { UsersSettingsActionTypes } from './users-settings.actions';

export interface UsersSettingsState {
    usersRoles: UserRoles[];
    users: UsersModel[];
    rolesTree: any[];
}

export const initialState: UsersSettingsState = {
    usersRoles: [],
    users: [],
    rolesTree: []
};

export function usersSettings(state: UsersSettingsState = initialState, action: IUnsafeAction): UsersSettingsState {
    const { type, payload } = action;

    switch (type) {
        case UsersSettingsActionTypes.GET_ROLES_SUCCESS: {
            return {
                ...state,
                usersRoles: [{id: -1, name: 'All'}, ...payload]
            };
        }

        case UsersSettingsActionTypes.GET_USERS_SUCCESS: {
            return {
                ...state,
                users: payload
            };
        }

        case UsersSettingsActionTypes.GET_ROLES_TREE_SUCCESS: {
            return {
                ...state,
                rolesTree: payload
            };
        }

        default: {
            return state;
        }
    }
}
