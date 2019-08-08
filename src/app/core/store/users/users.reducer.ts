import { UsersActionTypes } from './users.actions';

export interface UsersState {
    usersOnline: OnlineStatus[];
    changePasswordMessage: string;
}

export const initialState: UsersState = {
    usersOnline: [],
    changePasswordMessage: null
};

export function users(state: UsersState = initialState, action: IUnsafeAction): UsersState {
    const { type, payload } = action;
    switch (type) {

        case UsersActionTypes.GET_USERS_ONLINE_SUCCESS: {
            return {
                ...state,
                usersOnline: payload
            };
        }

        case UsersActionTypes.CHANGE_USERS_PASSWORD_SUCCESS: {
            return {
                ...state,
                changePasswordMessage: null
            };
        }

        case UsersActionTypes.CHANGE_USERS_PASSWORD_FAILURE: {
            const { Message } = payload;

            return {
                ...state,
                changePasswordMessage: Message
            };
        }

        default: {
            return state;
        }
    }
}
