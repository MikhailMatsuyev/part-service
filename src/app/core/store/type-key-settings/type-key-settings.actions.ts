import { Action } from '@ngrx/store';
import { Sort } from '@angular/material';

export enum TypeKeySettingsActionTypes {
    GET_TYPE_KEY_SETTINGS = '[Type Key Settings] GET_TYPE_KEY_SETTINGS',
    GET_TYPE_KEY_SETTINGS_SUCCESS = '[Type Key Settings] GET_TYPE_KEY_SETTINGS_SUCCESS',
    GET_VARIANT_CODE_SETTINGS = '[Type Key Settings] GET_VARIANT_CODE_SETTINGS',
    GET_VARIANT_CODE_SETTINGS_SUCCESS = '[Type Key Settings] GET_VARIANT_CODE_SETTINGS_SUCCESS',
    SAVE_TYPE_KEY_ROW = '[Type Key Settings] SAVE_TYPE_KEY_ROW',
    SAVE_TYPE_KEY_ROW_SUCCESS = '[Type Key Settings] SAVE_TYPE_KEY_ROW_SUCESS',
    SAVE_TYPE_KEY_SETTINGS = '[Type Key Settings] SAVE_TYPE_KEY_SETTINGS',
    SAVE_TYPE_KEY_SETTINGS_SUCCESS = '[Type Key Settings] SAVE_TYPE_KEY_SETTINGS_SUCCESS',
    EDIT_USER_FACTOR_TYPE_KEY = '[Type Key Settings] EDIT_USER_FACTOR_TYPE_KEY',
    EDIT_USER_FACTOR_TYPE_KEY_SUCCESS = '[Type Key Settings] EDIT_USER_FACTOR_TYPE_KEY_SUCCESS',
    ADD_FREE_TEXT_TO_TYPE_KEY = '[Type Key Settings] ADD_FREE_TEXT_TO_TYPE_KEY',
    ADD_FREE_TEXT_TO_TYPE_KEY_SUCCESS = '[Type Key Settings] ADD_FREE_TEXT_TO_TYPE_KEY_SUCCES',
    REMOVE_FREE_TEXT_FROM_TYPE_KEY = '[Type Key Settings] REMOVE_FREE_TEXT_FROM_TYPE_KEY',
    REMOVE_FREE_TEXT_FROM_TYPE_KEY_SUCCESS = '[Type Key Settings] REMOVE_FREE_TEXT_FROM_TYPE_KEY_SUCCES',
    UPDATE_FREE_TEXT_LIST = '[Type Key Settings] UPDATE_FREE_TEXT_LIST',
    SELECT_PERFORMANCE = '[Type Key Settings] SELECT_PERFORMANCE',
    SELECT_PERFORMANCE_SUCCESS = '[Type Key Settings] SELECT_PERFORMANCE_SUCCESS',
    ADD_SORT_TYPE_KEY = '[Type Key Settings] ADD_SORT_TYPE_KEY',
    SHOW_ERROR_MESSAGE = '[Type Key Settings] SHOW_ERROR_MESSAGE'
}

export class GetTypeKeySettings implements Action {
    readonly type = TypeKeySettingsActionTypes.GET_TYPE_KEY_SETTINGS;
}

export class GetTypeKeySettingsSuccess implements Action {
    readonly type = TypeKeySettingsActionTypes.GET_TYPE_KEY_SETTINGS_SUCCESS;
    constructor(public payload: PrimaryKeySettingsModel) {}
}

export class GetVariantCodeSettings implements Action {
    readonly type = TypeKeySettingsActionTypes.GET_VARIANT_CODE_SETTINGS;
    constructor(public payload: number) {}

}

export class GetVariantCodeSettingsSuccess implements Action {
    readonly type = TypeKeySettingsActionTypes.GET_VARIANT_CODE_SETTINGS_SUCCESS;
    constructor(public payload: TypeKeySettingsRow[]) {}
}

export class SaveTypeKeyRow implements Action {
    readonly type = TypeKeySettingsActionTypes.SAVE_TYPE_KEY_ROW;
    constructor(public payload: TypeKeySettingsRow) {}
}

export class SaveTypeKeyRowSuccess implements Action {
    readonly type = TypeKeySettingsActionTypes.SAVE_TYPE_KEY_ROW_SUCCESS;
    constructor(public payload: TypeKeySettingsRow) {}
}

export class SaveTypeKeySettings implements Action {
    readonly type = TypeKeySettingsActionTypes.SAVE_TYPE_KEY_SETTINGS;
    constructor(public payload: PrimaryKeySettingsModel) {}
}

export class SaveTypeKeySettingsSuccess implements Action {
    readonly type = TypeKeySettingsActionTypes.SAVE_TYPE_KEY_SETTINGS_SUCCESS;
    constructor(public payload: PrimaryKeySettingsModel) {}
}

export class EditUserFactorTypeKey implements Action {
    readonly type = TypeKeySettingsActionTypes.EDIT_USER_FACTOR_TYPE_KEY;
    constructor(public payload: any) {}
}

export class EditUserFactorTypeKeySuccess implements Action {
    readonly type = TypeKeySettingsActionTypes.EDIT_USER_FACTOR_TYPE_KEY_SUCCESS;
}

export class UpdateFreeTextList implements Action {
    readonly type = TypeKeySettingsActionTypes.UPDATE_FREE_TEXT_LIST;
    constructor(public payload: any) {}
}

export class RemoveFreeTextFromTypeKey implements Action {
    readonly type = TypeKeySettingsActionTypes.REMOVE_FREE_TEXT_FROM_TYPE_KEY;
    constructor(public payload: any) {}
}

export class AddFreeTextToTypeKey implements Action {
    readonly type = TypeKeySettingsActionTypes.ADD_FREE_TEXT_TO_TYPE_KEY;
    constructor(public payload: FreeTextItem) {}
}

export class AddSortTypeKey implements Action {
    readonly type = TypeKeySettingsActionTypes.ADD_SORT_TYPE_KEY;
    constructor(public payload: Sort) {}
}

export class AddFreeTextToTypeKeySuccess implements Action {
    readonly type = TypeKeySettingsActionTypes.ADD_FREE_TEXT_TO_TYPE_KEY_SUCCESS;
}

export class RemoveFreeTextFromTypeKeySuccess implements Action {
    readonly type = TypeKeySettingsActionTypes.REMOVE_FREE_TEXT_FROM_TYPE_KEY_SUCCESS;
}

export class SelectPerformance implements Action {
    readonly type = TypeKeySettingsActionTypes.SELECT_PERFORMANCE;
    constructor(public payload: number) {}
}

export class ShowErrorMessage implements Action {
    readonly type = TypeKeySettingsActionTypes.SHOW_ERROR_MESSAGE;
    constructor(public payload: TypeKeySettingsError) {}
}
