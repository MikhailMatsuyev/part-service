import { TypeKeySettingsActionTypes } from './type-key-settings.actions';
import { sortBy } from '../../../utils/utilsfunc';

export interface TypeKeySettingsState {
    primaryTypeKeySettings: PrimaryKeySettingsModel;
    tableData: TypeKeySettingsRow[];
    errorResponse: TypeKeySettingsError;
}

export const initialState: TypeKeySettingsState = {
    primaryTypeKeySettings: {
        delimiter: '',
        perfId: 0,
        fixed: false,
        digitsOnly: null,
        displayField: false,
        defaultValue: null,
        perfList: null,
        ufList: null,
        textList: null,
        sortTypeKeyItems: null
    },
    tableData: null,
    errorResponse: {
        data: null,
        error: false,
        message: ''
    }
};

export function typeKeySettings(state: any = initialState, action: IUnsafeAction): TypeKeySettingsState {
    const { type, payload } = action;

    switch (type) {
        case TypeKeySettingsActionTypes.GET_TYPE_KEY_SETTINGS_SUCCESS: {
            return {
                ...state,
                primaryTypeKeySettings: payload,
                errorResponse: initialState.errorResponse
            };
        }

        case TypeKeySettingsActionTypes.GET_VARIANT_CODE_SETTINGS_SUCCESS: {
            const { sortTypeKeyItems } = state.primaryTypeKeySettings;

            return {
                ...state,
                tableData: sortTypeKeyItems
                    ? sortBy(payload, sortTypeKeyItems.active, sortTypeKeyItems.direction === 'asc')
                    : payload
            };
        }

        case TypeKeySettingsActionTypes.GET_VARIANT_CODE_SETTINGS: {
            const { primaryTypeKeySettings } = state;

            return {
                ...state,
                primaryTypeKeySettings: { ...primaryTypeKeySettings, perfId: payload }
            };
        }

        case TypeKeySettingsActionTypes.ADD_SORT_TYPE_KEY: {
            const { primaryTypeKeySettings } = state;

            return {
                ...state,
                primaryTypeKeySettings: {...primaryTypeKeySettings, sortTypeKeyItems: payload}
            };
        }

        case TypeKeySettingsActionTypes.SHOW_ERROR_MESSAGE: {
            return {
                ...state,
                errorResponse: payload
            };
        }

        case TypeKeySettingsActionTypes.UPDATE_FREE_TEXT_LIST: {
            const { primaryTypeKeySettings } = state;

            return {
                ...state,
                primaryTypeKeySettings: {...primaryTypeKeySettings, textList: payload}
            };
        }

        default: {
            return state;
        }
    }
}
