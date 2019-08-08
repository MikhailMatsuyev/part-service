import { AppSettingsActionTypes } from './app-settings.actions';

export interface AppSettingsState {
    numberDisplayType: number;
    displayAnalyzeButtons: boolean;
    timeoutDuration: number;
}

export const initialState: AppSettingsState = {
    numberDisplayType: -1,
    displayAnalyzeButtons: false,
    timeoutDuration: 0
};

export function appSettings(state: AppSettingsState = initialState, action: IUnsafeAction): AppSettingsState {
    const { type, payload } = action;

    switch (type) {
        case AppSettingsActionTypes.GET_APP_SETTINGS_SUCCESS: {

            return {
                ...state,
                numberDisplayType: payload.numsType,
                displayAnalyzeButtons: payload.analyzeVisibility,
                timeoutDuration: payload.timeout
            };
        }

        case AppSettingsActionTypes.SET_NUMS_TYPE_SUCCESS: {

            return {
                ...state,
                numberDisplayType: payload
            };
        }

        case AppSettingsActionTypes.SET_ANALYZE_BUTTON_VISIBILITY_SUCCESS: {

            return {
                ...state,
                displayAnalyzeButtons: payload
            };
        }

        case AppSettingsActionTypes.SET_ANALYZE_TIMEOUT_SUCCESS: {

            return {
                ...state,
                timeoutDuration: payload
            };
        }

        default: {
            return state;
        }
    }
}
