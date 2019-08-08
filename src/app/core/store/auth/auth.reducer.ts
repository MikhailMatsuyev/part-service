import { User, AuthActionTypes } from './auth.actions';

export interface AuthState {
    loggedIn: boolean;
    user: User | null;
    isActiveGuestMode: boolean;
}

export const initialState: AuthState = {
    loggedIn: !!JSON.parse(localStorage.getItem('token')),
    user: JSON.parse(localStorage.getItem('user')),
    isActiveGuestMode: true
};

export function auth(state: any = initialState, action: IUnsafeAction): AuthState {
    const { type, payload } = action;
    switch (type) {
        case AuthActionTypes.LoginSuccess: {
            return {
                ...state,
                loggedIn: true,
                user: payload,
            };
        }

        case AuthActionTypes.Logout: {
            return initialState;
        }

        case AuthActionTypes.SET_GUEST_SUCCESS:
        case AuthActionTypes.CHECK_LOGIN_GUEST_SUCCESS: {
            return {
                ...state,
                isActiveGuestMode: payload
            };
        }

        default: {
            return state;
        }
    }
}

