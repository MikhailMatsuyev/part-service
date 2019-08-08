import { Action } from '@ngrx/store';

export enum SelectionActionTypes {
    GET_SELECTION = '[Selection] GET_SELECTION',
    DOWNLOAD_SPEC_XLSX = '[Selection] DOWNLOAD_SPEC_XLSX',
    DOWNLOAD_PDF = '[Selection] DOWNLOAD_PDF',
    DOWNLOAD_EXPANDED_XLSX = '[Selection] DOWNLOAD_EXPANDED_XLSX',
    DOWNLOAD_BACKGROUND_INFORMATION = '[Selection] DOWNLOAD_BACKGROUND_INFORMATION',
    DOWNLOAD_BACKGROUND_INFORMATION_SUCCESS = '[Selection] DOWNLOAD_BACKGROUND_INFORMATION_SUCCESS',
    GET_SPECIFICATIONS = '[Selection] GET_SPECIFICATIONS',
    GET_SPECIFICATIONS_SUCCESS = '[Selection] GET_SPECIFICATIONS_SUCCESS',
    SAVE_SPECIFICATIONS = '[Selection] SAVE_SPECIFICATIONS',
    CREATE_SPECIFICATIONS = '[Selection] CREATE_SPECIFICATIONS',
    CREATE_SPECIFICATIONS_SUCCESS = '[Selection] CREATE_SPECIFICATIONS_SUCCESS',
    SAVE_DEFAULT_SPECIFICATION = '[Selection] SAVE_DEFAULT_SPECIFICATION',
    SAVE_DEFAULT_SPECIFICATION_SUCCESS = '[Selection] SAVE_DEFAULT_SPECIFICATION_SUCCESS',
    GET_SPECIFICATION_INFORMATION = '[Selection] GET_SPECIFICATION_INFORMATION',
    GET_SPECIFICATION_INFORMATION_SUCCESS = '[Selection] GET_SPECIFICATION_INFORMATION_SUCCESS',
    GET_SPECIFICATION_INFORMATION_FAILURE = '[Selection] GET_SPECIFICATION_INFORMATION_FAILURE',
    CREATE_BACKGROUND_INFORMATION = '[Selection] CREATE_BACKGROUND_INFORMATION',
    EDIT_BACKGROUND_INFORMATION = '[Selection] EDIT_BACKGROUND_INFORMATION',
    REMOVE_BACKGROUND_INFORMATION = '[Selection] REMOVE_BACKGROUND_INFORMATION',
    REMOVE_BACKGROUND_INFORMATION_SUCCESS = '[Selection] REMOVE_BACKGROUND_INFORMATION_SUCCESS',
    REMOVE_NODE = '[Selection] REMOVE_NODE',
    REMOVE_NODE_SUCCESS = '[Selection] REMOVE_NODE_SUCCESS',
    RENAME_NODE = '[Selection] RENAME_NODE',
    RENAME_NODE_SUCCESS = '[Selection] RENAME_NODE_SUCCESS',
    DUBLICATE_NODE = '[Selection] DUBLICATE_NODE',
    DUBLICATE_NODE_SUCCESS = '[Selection] DUBLICATE_NODE_SUCCESS',
    SET_ACTIVE_SPECIFICATIONS = '[Selection] SET_ACTIVE_SPECIFICATIONS',
    ADD_CATEGORY = '[Selection] ADD_CATEGORY',
    ADD_CATEGORY_SUCCESS = '[Selection] ADD_CATEGORY_SUCCESS',
    DELETE_CATEGORY = '[Selection] DELETE_CATEGORY',
    DELETE_CATEGORY_SUCCESS = '[Selection] DELETE_CATEGORY_SUCCESS',
    GET_PERFORMANCE_ORDER = '[Selection] GET_PERFORMANCE_ORDER',
    GET_PERFORMANCE_ORDER_SUCCESS = '[Selection] GET_PERFORMANCE_ORDER_SUCCESS',
    LOAD_SPECIFICATION = '[Selection] LOAD_SPECIFICATION',
    LOAD_SPECIFICATION_SUCCESS = '[Selection] LOAD_SPECIFICATION_SUCCESS',
    GET_USERFACTOR_TREE = '[Selection] GET_USERFACTOR_TREE',
    GET_USERFACTOR_TREE_SUCCESS = '[Selection] GET_USERFACTOR_TREE_SUCCESS',
    SET_SHOW_ALL = '[Selection] SET_SHOW_ALL',
    GET_COMPONENTS_TREE = '[Selection] GET_COMPONENTS_TREE',
    GET_COMPONENTS_TREE_SUCCESS = '[Selection] GET_COMPONENTS_TREE_SUCCESS',
    GET_ALL_COMPONENTS_TREE = '[Selection] GET_ALL_COMPONENTS_TREE',
    GET_ALL_COMPONENTS_TREE_SUCCESS = '[Selection] GET_ALL_COMPONENTS_TREE_SUCCESS',
    GET_ACTIVE_COMPONENTS_TREE = '[Selection] GET_ACTIVE_COMPONENTS_TREE',
    GET_INFO_NODE = '[Selection] GET_INFO_NODE',
    GET_INFO_NODE_SUCCESS = '[Selection] GET_INFO_NODE_SUCCESS',
    ADD_PERFORMANCE_FILTER = '[Selection] ADD_PERFORMANCE_FILTER',
    GET_TYPE_KEY_SETTINGS = '[Selection] GET_TYPE_KEY_SETTINGS',
    GET_TYPE_KEY_SETTINGS_SUCCESS = '[Selection] GET_TYPE_KEY_SETTINGS_SUCCESS',
    SET_AUTO_RELOAD = '[Selection] SET_AUTO_RELOAD',
    SAVE_USER_FACTOR_VALUES = '[Selection] SAVE_USER_FACTOR_VALUES',
    SAVE_USER_FACTOR_VALUES_SUCCESS = '[Selection] SAVE_USER_FACTOR_VALUES_SUCCESS',
    SET_AUTO_RELOAD_BLOCK = '[Selection] SET_AUTO_RELOAD_BLOCK',
    CLEAR_INFO_BLOCK = '[Selection] CLEAR_INFO_BLOCK',
    GET_RECOMMENDATIONS_COUNT = '[Selection] GET_RECOMMENDATIONS_COUNT',
    GET_RECOMMENDATIONS_COUNT_SUCCESS = '[Selection] GET_RECOMMENDATIONS_COUNT_SUCCESS',
    GET_IMPOSSIBLE_COMPONENTS = '[Selection] GET_IMPOSSIBLE_COMPONENTS',
    GET_IMPOSSIBLE_COMPONENTS_SUCCESS = '[Selection] GET_IMPOSSIBLE_COMPONENTS_SUCCESS',
    GET_AVAILABLE_UF_VALUES = '[Selection] GET_AVAILABLE_UF_VALUES',
    GET_AVAILABLE_UF_VALUES_SUCCESS = '[Selection] GET_AVAILABLE_UF_VALUES_SUCCESS',
    GET_COMPONENTS_INTERFACES = '[Selection] GET_COMPONENTS_INTERFACES',
    GET_COMPONENTS_INTERFACES_SUCCESS = '[Selection] GET_COMPONENTS_INTERFACES_SUCCESS',
    GET_FULLY_IMPOSSIBLE_COMPONENTS = '[Selection] GET_FULLY_IMPOSSIBLE_COMPONENTS',
    GET_FULLY_IMPOSSIBLE_COMPONENTS_SUCCESS = '[Selection] GET_FULLY_IMPOSSIBLE_COMPONENTS_SUCCESS',
    GET_FULLY_IMPOSSIBLE_COMPONENTS_FAILURE = '[Selection] GET_FULLY_IMPOSSIBLE_COMPONENTS_FAILURE',
    GET_FORMULA_VALUE = '[Selection] GET_FORMULA_VALUE',
    GET_FORMULA_VALUE_SUCCESS = '[Selection] GET_FORMULA_VALUE_SUCCESS',
    GET_TYPE_KEY = '[Selection] GET_TYPE_KEY',
    GET_TYPE_KEY_SUCCESS = '[Selection] GET_TYPE_KEY_SUCCESS',
    GET_TYPE_KEY_FAILURE = '[Selection] GET_TYPE_KEY_FAILURE',
    SET_CS_TREE_SPINNER = '[Selection] SET_CS_TREE_SPINNER',
    SET_UF_TREE_SPINNER = '[Selection] SET_UF_TREE_SPINNER',
    ANALYZE_STEPS = '[Selection] ANALYZE_STEPS',
    ANALYZE_STEPS_SUCCESS = '[Selection] ANALYZE_STEPS_SUCCESS',
    GET_COMPONENTS_STATE = '[Selection] GET_COMPONENTS_STATE',
    GET_COMPONENTS_STATE_SUCCESS = '[Selection] GET_COMPONENTS_STATE_SUCCESS',
    CHANGE_STATUS_ANALYZE_STEP = '[Selection] CHANGE_STATUS_ANALYZE_STEP',
    UNCOMPATABLE_USER_FACTOR_VALUES = '[Selection] UNCOMPATABLE_USER_FACTOR_VALUES',
    UNCOMPATABLE_USER_FACTOR_VALUES_SUCCESS = '[Selection] UNCOMPATABLE_USER_FACTOR_VALUES_SUCCESS',
    SAVE_SELECT_COMPONENTS = '[Selection] SAVE_SELECT_COMPONENTS',
    SAVE_SELECT_COMPONENTS_SUCCESS = '[Selection] SAVE_SELECT_COMPONENTS_SUCCESS',
    SAVE_UNSELECT_COMPONENTS = '[Selection] SAVE_UNSELECT_COMPONENTS',
    SAVE_UNSELECT_COMPONENTS_SUCCESS = '[Selection] SAVE_UNSELECT_COMPONENTS_SUCCESS',
    UPDATE_PERFORMANCE_FILTER = '[Selection] UPDATE_PERFORMANCE_FILTER',
    OPEN_RECOMENDATIONS_DIALOG = '[Selection] OPEN_RECOMENDATIONS_DIALOG',
    SET_MANY_USER_FACTORS = '[Selection] SET_MANY_USER_FACTORS',
    SET_MANY_USER_FACTORS_SUCCESS = '[Selection] SET_MANY_USER_FACTORS_SUCCESS',
    SET_DEFAULT_STATE = '[Selection] SET_DEFAULT_STATE',
    SET_ANALYZE_ELEMENTS_UF = '[Selection] SET_ANALYZE_ELEMENTS_UF',
    REMOVE_PERFORMANCE_FILTER = '[Selection] REMOVE_PERFORMANCE_FILTER',
    LOADING_ANALYZE_TOOLS = '[Selection] LOADING_ANALYZE_TOOLS',
}

export class SelectionGet implements Action {
    readonly type = SelectionActionTypes.GET_SELECTION;
    constructor(public payload: any) {}
}

export class DownloadSpecXLSX implements Action {
    readonly type = SelectionActionTypes.DOWNLOAD_SPEC_XLSX;
}

export class DownloadPDF implements Action {
    readonly type = SelectionActionTypes.DOWNLOAD_PDF;
}

export class DownloadExpandedXLSX implements Action {
    readonly type = SelectionActionTypes.DOWNLOAD_EXPANDED_XLSX;
}

export class DownloadBackgroundInformation implements Action {
    readonly type = SelectionActionTypes.DOWNLOAD_BACKGROUND_INFORMATION;
    constructor(public payload: number[]) {}
}

export class DownloadBackgroundInformationSuccess implements Action {
    readonly type = SelectionActionTypes.DOWNLOAD_BACKGROUND_INFORMATION_SUCCESS;
}

export class GetSpecifications implements Action {
    readonly type = SelectionActionTypes.GET_SPECIFICATIONS;
}

export class GetSpecificationsSuccess implements Action {
    readonly type = SelectionActionTypes.GET_SPECIFICATIONS_SUCCESS;
    constructor(public payload: {data: Specification[], userId: number}) {}
}

export class SaveSpecifications implements Action {
    readonly type = SelectionActionTypes.SAVE_SPECIFICATIONS;
}

export class CreateSpecifications implements Action {
    readonly type = SelectionActionTypes.CREATE_SPECIFICATIONS;
    constructor(public payload: {specName: string, specCategory: number, userId?: number}) {}
}

export class CreateSpecificationsSuccess implements Action {
    readonly type = SelectionActionTypes.CREATE_SPECIFICATIONS_SUCCESS;
    constructor(public payload: any) {}
}

export class SaveDefaultSpecification implements Action {
    readonly type = SelectionActionTypes.SAVE_DEFAULT_SPECIFICATION;
    constructor(public payload: number) {}
}

export class SaveDefaultSpecificationSuccess implements Action {
    readonly type = SelectionActionTypes.SAVE_DEFAULT_SPECIFICATION_SUCCESS;
    constructor(public payload: number) {}
}

export class GetSpecificationInformation implements Action {
    readonly type = SelectionActionTypes.GET_SPECIFICATION_INFORMATION;
    constructor(public payload: number) {}
}

export class GetSpecificationInformationSuccess implements Action {
    readonly type = SelectionActionTypes.GET_SPECIFICATION_INFORMATION_SUCCESS;
    constructor(public payload: any) {}
}

export class GetSpecificationInformationFailure implements Action {
    readonly type = SelectionActionTypes.GET_SPECIFICATION_INFORMATION_FAILURE;
    constructor(public payload: any) {}
}

export class CreateBackgroundInformation implements Action {
    readonly type = SelectionActionTypes.CREATE_BACKGROUND_INFORMATION;
    constructor(public payload: SpecInformation) {}
}

export class EditBackgroundInformation implements Action {
    readonly type = SelectionActionTypes.EDIT_BACKGROUND_INFORMATION;
    constructor(public payload: SpecInformation) {}
}

export class RemoveBackgroundInformation implements Action {
    readonly type = SelectionActionTypes.REMOVE_BACKGROUND_INFORMATION;
    constructor(public payload: number) {}
}

export class RemoveBackgroundInformationSuccess implements Action {
    readonly type = SelectionActionTypes.REMOVE_BACKGROUND_INFORMATION_SUCCESS;
}

export class RemoveNode implements Action {
    readonly type = SelectionActionTypes.REMOVE_NODE;
    constructor(public payload: DeleteNodeModel) {}
}

export class RemoveNodeSuccess implements Action {
    readonly type = SelectionActionTypes.REMOVE_NODE_SUCCESS;
    constructor(public payload: DeleteNodeModel) {}
}

export class RenameNode implements Action {
    readonly type = SelectionActionTypes.RENAME_NODE;
    constructor(public payload: RenameNodeModel) {}
}

export class RenameNodeSuccess implements Action {
    readonly type = SelectionActionTypes.RENAME_NODE_SUCCESS;
    constructor(public payload: RenameNodeModel) {}
}

export class DublicateNode implements Action {
    readonly type = SelectionActionTypes.DUBLICATE_NODE;
    constructor(public payload: SpecificationsSaveAsModel) {}
}

export class DublicateNodeSuccess implements Action {
    readonly type = SelectionActionTypes.DUBLICATE_NODE_SUCCESS;
    constructor(public payload: any) {}
}

export class SetActiveSpecifications implements Action {
    readonly type = SelectionActionTypes.SET_ACTIVE_SPECIFICATIONS;
    constructor(public payload: number) {}
}

export class AddCategory implements Action {
    readonly type = SelectionActionTypes.ADD_CATEGORY;
    constructor(public payload: string) {}
}

export class AddCategorySuccess implements Action {
    readonly type = SelectionActionTypes.ADD_CATEGORY_SUCCESS;
    constructor(public payload: {categoryId: number, userId: number, category: string}) {}
}

export class DeleteCategory implements Action {
    readonly type = SelectionActionTypes.DELETE_CATEGORY;
    constructor(public payload: DeleteNodeModel) {}
}

export class DeleteCategorySuccess implements Action {
    readonly type = SelectionActionTypes.DELETE_CATEGORY_SUCCESS;
    constructor(public payload: DeleteNodeModel) {}
}

export class GetPerformanceOrder implements Action {
    readonly type = SelectionActionTypes.GET_PERFORMANCE_ORDER;
}

export class GetPerformanceOrderSuccess implements Action {
    readonly type = SelectionActionTypes.GET_PERFORMANCE_ORDER_SUCCESS;
    constructor(public payload: UserFactorConnected[]) {}
}

export class LoadSpecificationAction implements Action {
    readonly type = SelectionActionTypes.LOAD_SPECIFICATION;
}

export class LoadSpecificationActionSuccess implements Action {
    readonly type = SelectionActionTypes.LOAD_SPECIFICATION_SUCCESS;
    constructor(public payload: LoadSpecification) {}
}

export class GetUserFactorTree implements Action {
    readonly type = SelectionActionTypes.GET_USERFACTOR_TREE;
}

export class GetUserFactorTreeSuccess implements Action {
    readonly type = SelectionActionTypes.GET_USERFACTOR_TREE_SUCCESS;
    constructor(public payload: UfTree[]) {}
}

export class SetShowAll implements Action {
    readonly type = SelectionActionTypes.SET_SHOW_ALL;
    constructor(public payload: boolean) {}
}

export class GetComponentsTree implements Action {
    readonly type = SelectionActionTypes.GET_COMPONENTS_TREE;
    constructor(public payload: {reverted?: boolean, notificationsOff?: boolean}) {}
}

export class GetComponentsTreeSuccess implements Action {
    readonly type = SelectionActionTypes.GET_COMPONENTS_TREE_SUCCESS;
    constructor(public payload: CSTree) {}
}

export class GetAllComponentsTree implements Action {
    readonly type = SelectionActionTypes.GET_ALL_COMPONENTS_TREE;
}

export class GetAllComponentsTreeSuccess implements Action {
    readonly type = SelectionActionTypes.GET_ALL_COMPONENTS_TREE_SUCCESS;
    constructor(public payload: csgList) {}
}

export class GetActiveComponentsTree implements Action {
    readonly type = SelectionActionTypes.GET_ACTIVE_COMPONENTS_TREE;
    constructor(public payload: {reverted?: boolean, notificationsOff?: boolean}) {}
}

export class GetInfoNode implements Action {
    readonly type = SelectionActionTypes.GET_INFO_NODE;
    constructor(public payload: {id: number, type: SelectionInfoType}) {}
}

export class GetInfoNodeSuccess implements Action {
    readonly type = SelectionActionTypes.GET_INFO_NODE_SUCCESS;
    constructor(public payload: SelectionGetInfo) {}
}

export class AddPerformanceFilter implements Action {
    readonly type = SelectionActionTypes.ADD_PERFORMANCE_FILTER;
}

export class GetTypeKeySettings implements Action {
    readonly type = SelectionActionTypes.GET_TYPE_KEY_SETTINGS;
}

export class GetTypeKeySettingsSuccess implements Action {
    readonly type = SelectionActionTypes.GET_TYPE_KEY_SETTINGS_SUCCESS;
    constructor(public payload: PrimaryKeySettingsModel) {}
}

export class SetAutoReload implements Action {
    readonly type = SelectionActionTypes.SET_AUTO_RELOAD;
    constructor(public payload: boolean) {}
}

export class SaveUserFactorValues implements Action {
    readonly type = SelectionActionTypes.SAVE_USER_FACTOR_VALUES;
    constructor(public payload: any) {}
}

export class SaveUserFactorValuesSuccess implements Action {
    readonly type = SelectionActionTypes.SAVE_USER_FACTOR_VALUES_SUCCESS;
    constructor(public payload: any) {}
}

export class SetAutoReloadBlock implements Action {
    readonly type = SelectionActionTypes.SET_AUTO_RELOAD_BLOCK;
    constructor(public payload: boolean) {}
}

export class ClearInfoBlock implements Action {
    readonly type = SelectionActionTypes.CLEAR_INFO_BLOCK;
}

export class GetRecommendationsCount implements Action {
    readonly type = SelectionActionTypes.GET_RECOMMENDATIONS_COUNT;
    constructor(public payload: {csId: number, categoryId?: number, name?: string}) {}
}

export class GetRecommendationsCountSuccess implements Action {
    readonly type = SelectionActionTypes.GET_RECOMMENDATIONS_COUNT_SUCCESS;
    constructor(public payload: {count: number, name?: string, id?: string}) {}
}

export class GetImpossibleComponents implements Action {
    readonly type = SelectionActionTypes.GET_IMPOSSIBLE_COMPONENTS;
    constructor(public payload: {csId: number, categoryId?: number, name?: string, isActiveModal?: boolean}) {}
}

export class GetImpossibleComponentsSuccess implements Action {
    readonly type = SelectionActionTypes.GET_IMPOSSIBLE_COMPONENTS_SUCCESS;
    constructor(public payload: {data: ImpossibleComponents, name?: string, isActiveModal?: boolean}) {}
}

export class GetAvailableUFValues implements Action {
    readonly type = SelectionActionTypes.GET_AVAILABLE_UF_VALUES;
    constructor(public payload: { data: number[], isActiveModal?: boolean, csData?: any}) {}
}

export class GetAvailableUFValuesSuccess implements Action {
    readonly type = SelectionActionTypes.GET_AVAILABLE_UF_VALUES_SUCCESS;
    constructor(public payload: {data: AvailableUserFactor, isActiveModal?: boolean}) {}
}

export class GetComponentsInterfaces implements Action {
    readonly type = SelectionActionTypes.GET_COMPONENTS_INTERFACES;
    constructor(public payload: number) {}
}

export class GetComponentsInterfacesSuccess implements Action {
    readonly type = SelectionActionTypes.GET_COMPONENTS_INTERFACES_SUCCESS;
    constructor(public payload: SelectionComponentsInterfaces) {}
}

export class GetFullyImpossibleComponents implements Action {
    readonly type = SelectionActionTypes.GET_FULLY_IMPOSSIBLE_COMPONENTS;
    constructor(public payload: {id: number, name: string}) {}
}

export class GetFullyImpossibleComponentsSuccess implements Action {
    readonly type = SelectionActionTypes.GET_FULLY_IMPOSSIBLE_COMPONENTS_SUCCESS;
    constructor(public payload: {data: FullyImpossibleComponent[], id?: number}) {}
}

export class GetFullyImpossibleComponentsFailure implements Action {
    readonly type = SelectionActionTypes.GET_FULLY_IMPOSSIBLE_COMPONENTS_FAILURE;
    constructor(public payload: {data: {message?: string, name?: string}, id?: number}) {}
}

export class GetFormulaValue implements Action {
    readonly type = SelectionActionTypes.GET_FORMULA_VALUE;
}

export class GetFormulaValueSuccess implements Action {
    readonly type = SelectionActionTypes.GET_FORMULA_VALUE_SUCCESS;
    constructor(public payload: string) {}
}

export class GetTypeKey implements Action {
    readonly type = SelectionActionTypes.GET_TYPE_KEY;
    constructor(public payload?: number[]) {}
}

export class GetTypeKeySuccess implements Action {
    readonly type = SelectionActionTypes.GET_TYPE_KEY_SUCCESS;
    constructor(public payload: string) {}
}

export class GetTypeKeyFailure implements Action {
    readonly type = SelectionActionTypes.GET_TYPE_KEY_FAILURE;
    constructor(public payload: string) {}
}

export class SetCSTreeSpinner implements Action {
    readonly type = SelectionActionTypes.SET_CS_TREE_SPINNER;
    constructor(public payload: boolean) {}
}

export class SetUFTreeSpinner implements Action {
    readonly type = SelectionActionTypes.SET_UF_TREE_SPINNER;
    constructor(public payload: boolean) {}
}


export class AnalyzeSteps implements Action {
    readonly type = SelectionActionTypes.ANALYZE_STEPS;
    constructor(public payload: {csId: number, csvId: number, headerName: string}) {}
}

export class AnalyzeStepsSuccess implements Action {
    readonly type = SelectionActionTypes.ANALYZE_STEPS_SUCCESS;
    constructor(public payload: {data: AnalyzeComponentState, headerName: string}) {}
}

export class GetComponentsState implements Action {
    readonly type = SelectionActionTypes.GET_COMPONENTS_STATE;
    constructor(public payload: {data: { csvIds: number[], ufvIds: number[] }, isActiveModal?: boolean, csData?: any}) {}
}

export class GetComponentsStateSuccess implements Action {
    readonly type = SelectionActionTypes.GET_COMPONENTS_STATE_SUCCESS;
    constructor(public payload: {data: {csvId: boolean, rec: boolean}[], isActiveModal?: boolean, csData?: any}) {}
}

export class ChangeStatusAnalyzeStep implements Action {
    readonly type = SelectionActionTypes.CHANGE_STATUS_ANALYZE_STEP;
    constructor(public payload: any) {}
}

export class UncompatableUserFactorValues implements Action {
    readonly type = SelectionActionTypes.UNCOMPATABLE_USER_FACTOR_VALUES;
    constructor(public payload: any) {}
}

export class UncompatableUserFactorValuesSuccess implements Action {
    readonly type = SelectionActionTypes.UNCOMPATABLE_USER_FACTOR_VALUES_SUCCESS;
    constructor(public payload: any) {}
}

export class SaveSelectComponents implements Action {
    readonly type = SelectionActionTypes.SAVE_SELECT_COMPONENTS;
    constructor(public payload: {data: number, activeSteps: any}) {}
}

export class SaveSelectComponentsSuccess implements Action {
    readonly type = SelectionActionTypes.SAVE_SELECT_COMPONENTS_SUCCESS;
    constructor(public payload: {data: SelectComponentModel, activeSteps: any, selectMode: boolean}) {}
}

export class SaveUnSelectComponents implements Action {
    readonly type = SelectionActionTypes.SAVE_UNSELECT_COMPONENTS;
    constructor(public payload: {data: number, activeSteps: any}) {}
}

export class SaveUnSelectComponentsSuccess implements Action {
    readonly type = SelectionActionTypes.SAVE_UNSELECT_COMPONENTS_SUCCESS;
    constructor(public payload: {data: SelectComponentModel, activeSteps: any, selectMode: boolean}) {}
}

export class UpdatePerformanceFilter implements Action {
    readonly type = SelectionActionTypes.UPDATE_PERFORMANCE_FILTER;
    constructor(public payload: {data: any, index: number}) {}
}

export class RemovePerformanceFilter implements Action {
    readonly type = SelectionActionTypes.REMOVE_PERFORMANCE_FILTER;
    constructor(public payload: number) {}
}

export class OpenRecomendationsDialog implements Action {
    readonly type = SelectionActionTypes.OPEN_RECOMENDATIONS_DIALOG;
}

export class SetManyUserFactors implements Action {
    readonly type = SelectionActionTypes.SET_MANY_USER_FACTORS;
    constructor(public payload: number[]) {}
}

export class SetManyUserFactorsSuccess implements Action {
    readonly type = SelectionActionTypes.SET_MANY_USER_FACTORS_SUCCESS;
}

export class SetDefaultState implements Action {
    readonly type = SelectionActionTypes.SET_DEFAULT_STATE;
}

export class SetAnalyzeElementsUf implements Action {
    readonly type = SelectionActionTypes.SET_ANALYZE_ELEMENTS_UF;
    constructor(public payload: {id: number, type: string, checked: boolean}) {}
}

export class LoadingAnalyzeTools implements Action {
    readonly type = SelectionActionTypes.LOADING_ANALYZE_TOOLS;
    constructor(public payload: {data: any, status: boolean}) {}
}

export type SelectionActions =
    | SelectionGet
    | DownloadSpecXLSX
    | DownloadPDF
    | DownloadExpandedXLSX
    | DownloadBackgroundInformation
    | DownloadBackgroundInformationSuccess
    | GetSpecifications
    | GetSpecificationsSuccess
    | SaveSpecifications
    | CreateSpecifications
    | CreateSpecificationsSuccess
    | SaveDefaultSpecification
    | SaveDefaultSpecificationSuccess
    | GetSpecificationInformation
    | GetSpecificationInformationSuccess
    | GetSpecificationInformationFailure
    | CreateBackgroundInformation
    | EditBackgroundInformation
    | RemoveBackgroundInformation
    | RemoveBackgroundInformationSuccess
    | RemoveNode
    | RemoveNodeSuccess
    | RenameNode
    | RenameNodeSuccess
    | DublicateNode
    | DublicateNodeSuccess
    | SetActiveSpecifications
    | AddCategory
    | AddCategorySuccess
    | GetPerformanceOrder
    | GetPerformanceOrderSuccess
    | LoadSpecificationAction
    | LoadSpecificationActionSuccess
    | GetUserFactorTree
    | GetUserFactorTreeSuccess
    | SetShowAll
    | GetComponentsTree
    | GetComponentsTreeSuccess
    | GetAllComponentsTree
    | GetAllComponentsTreeSuccess
    | GetActiveComponentsTree
    | GetInfoNode
    | GetInfoNodeSuccess
    | AddPerformanceFilter
    | GetTypeKeySettings
    | GetTypeKeySettingsSuccess
    | SetAutoReload
    | SaveUserFactorValues
    | SaveUserFactorValuesSuccess
    | SetAutoReloadBlock
    | ClearInfoBlock
    | GetRecommendationsCount
    | GetRecommendationsCountSuccess
    | GetImpossibleComponents
    | GetImpossibleComponentsSuccess
    | GetAvailableUFValues
    | GetAvailableUFValuesSuccess
    | GetComponentsInterfaces
    | GetComponentsInterfacesSuccess
    | GetFullyImpossibleComponents
    | GetFullyImpossibleComponentsSuccess
    | GetFullyImpossibleComponentsFailure
    | GetFormulaValue
    | GetFormulaValueSuccess
    | GetTypeKey
    | GetTypeKeySuccess
    | SetCSTreeSpinner
    | SetUFTreeSpinner
    | GetTypeKeyFailure
    | AnalyzeSteps
    | AnalyzeStepsSuccess
    | GetComponentsState
    | GetComponentsStateSuccess
    | ChangeStatusAnalyzeStep
    | UncompatableUserFactorValues
    | UncompatableUserFactorValuesSuccess
    | SaveSelectComponents
    | SaveSelectComponentsSuccess
    | SaveUnSelectComponents
    | SaveUnSelectComponentsSuccess
    | UpdatePerformanceFilter
    | OpenRecomendationsDialog
    | SetManyUserFactors
    | SetManyUserFactorsSuccess
    | SetDefaultState
    | SetAnalyzeElementsUf
    | LoadingAnalyzeTools;
