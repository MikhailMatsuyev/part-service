import { Action } from '@ngrx/store';

export enum RecommendationsActionTypes {
    GET_COMPONENT_SERIES = '[Recommendations] GET_COMPONENT_SERIES',
    GET_COMPONENT_SERIES_SUCCESS = '[Recommendations] GET_COMPONENT_SERIES_SUCCESS',
    GET_USER_FACTOR = '[Recommendations] GET_USER_FACTOR',
    GET_USER_FACTOR_SUCCESS = '[Recommendations] GET_USER_FACTOR_SUCCESS',
    GET_ITEM_DEPENDENCIES = '[Recommendations] GET_ITEM_DEPENDENCIES',
    GET_ITEM_DEPENDENCIES_SUCCESS = '[Recommendations] GET_ITEM_DEPENDENCIES_SUCCESS',
    GET_VALUES_WITH_STATUS = '[Recommendations] GET_VALUES_WITH_STATUS',
    GET_VALUES_WITH_STATUS_SUCCESS = '[Recommendations] GET_VALUES_WITH_STATUS_SUCCESS',
    GET_DIMENSIONS = '[Recommendations] GET_DIMENSIONS',
    GET_DIMENSIONS_SUCCESS = '[Recommendations] GET_DIMENSIONS_SUCCESS',
    GET_RECOMMENDATION_VIEW = '[Recommendations] GET_RECOMMENDATION_VIEW',
    GET_RECOMMENDATION_VIEW_SUCCESS = '[Recommendations] GET_RECOMMENDATION_VIEW_SUCCESS',
    GET_ITEM_DEPENDENCIES_SERIES = '[Recommendations] GET_ITEM_DEPENDENCIES_SERIES',
    GET_LAST_CHANGES = '[Recommendations] GET_LAST_CHANGES',
    GET_LAST_CHANGES_SUCCESS = '[Recommendations] GET_LAST_CHANGES_SUCCESS',
    AUTO_GENERATE = '[Recommendations] AUTO_GENERATE',
    AUTO_GENERATE_SUCCESS = '[Recommendations] AUTO_GENERATE_SUCCESS',
    CANCEL_UPDATE = '[Recommendations] CANCEL_UPDATE',
    CANCEL_UPDATE_SUCCESS = '[Recommendations] CANCEL_UPDATE_SUCCESS',
    SET_CS_STEPS = '[Recommendations] SET_CS_STEPS',
    SET_UF_STEPS = '[Recommendations] SET_UF_STEPS',
    SET_ACTIVE_CS = '[Recommendations] SET_ACTIVE_CS',
    SET_ACTIVE_UF = '[Recommendations] SET_ACTIVE_UF',
    SET_CALCULATE_TABLE_MODEL = '[Recommendations] SET_CALCULATE_TABLE_MODEL',
    EXPORT_CALCULATE_TABLE = '[Recommendations] EXPORT_CALCULATE_TABLE',
    EXPORT_CALCULATE_TABLE_SUCCESS = '[Recommendations] EXPORT_CALCULATE_TABLE_SUCCESS',
    GET_UPDATE_STATUS = '[Recommendations] GET_UPDATE_STATUS',
    GET_UPDATE_STATUS_SUCCESS = '[Recommendations] GET_UPDATE_STATUS_SUCCESS',
    GET_DEFAULT_RECOMMENDATION_TYPE = '[Recommendations] GET_DEFAULT_RECOMMENDATION_TYPE',
    GET_DEFAULT_RECOMMENDATION_TYPE_SUCCESS = '[Recommendations] GET_DEFAULT_RECOMMENDATION_TYPE_SUCCESS',
    SET_DEFAULT_RECOMMENDATION_TYPE = '[Recommendations] SET_DEFAULT_RECOMMENDATION_TYPE',
    UPDATE_DEFAULT_RECOMMENDATION_TYPE_SUCCESS = '[Recommendations] UPDATE_DEFAULT_RECOMMENDATION_TYPE_SUCCESS',
    UPDATE_DEFAULT_RECOMMENDATION_TYPE = '[Recommendations] UPDATE_DEFAULT_RECOMMENDATION_TYPE',
    SELECTE_DEPENDENCIES_DROPDOWN = '[Recommendations] SELECTE_DEPENDENCIES_DROPDOWN',
    SELECTE_DEPENDENCIES_DROPDOWN_ALL = '[Recommendations] SELECTE_DEPENDENCIES_DROPDOWN_ALL',
    GET_SERIES_PERFORMANCES = '[Recommendations] GET_SERIES_PERFORMANCES',
    GET_SERIES_PERFORMANCES_SUCCESS = '[Recommendations] GET_SERIES_PERFORMANCES_SUCCESS',
    DOWNLOAD_USER_FACTOR = '[Recommendations] DOWNLOAD_USER_FACTOR',
    DOWNLOAD_USER_FACTOR_SUCCESS = '[Recommendations] DOWNLOAD_USER_FACTOR_SUCCESS',
    SAVE_ROW_TABLE = '[Recommendations] SAVE_ROW_TABLE',
    SAVE_ROW_TABLE_SUCCESS = '[Recommendations] SAVE_ROW_TABLE_SUCCESS',
    SELECTED_ALL_ROWS = '[Recommendations] SELECTED_ALL_ROWS',
    SELECTED_ALL_COLUMNS = '[Recommendations] SELECTED_ALL_COLUMNS',
    GET_CELL_COMMENT = '[Recommendations] GET_CELL_COMMENT',
    GET_CELL_COMMENT_SUCCESS = '[Recommendations] GET_CELL_COMMENT_SUCCESS',
    SET_CELL_COMMENT = '[Recommendations] SET_CELL_COMMENT',
    SET_CELL_COMMENT_SUCCESS = '[Recommendations] SET_CELL_COMMENT_SUCCESS',
    CLEAR_CELL_COMMENT = '[Recommendations] CLEAR_CELL_COMMENT',
    SET_ROW_STATUS = '[Recommendations] SET_ROW_STATUS',
    SET_ROW_STATUS_SUCCESS = '[Recommendations] SET_ROW_STATUS_SUCCESS',
    SELECTED_ALL_TABLE = '[Recommendations] SELECTED_ALL_TABLE',
    SWITCH_TABLE_HEADER = '[Recommendations] SWITCH_TABLE_HEADER',
    DOWNLOAD_STEPS = '[Recommendations] DOWNLOAD_STEPS',
    DOWNLOAD_STEPS_SUCCESS = '[Recommendations] DOWNLOAD_STEPS_SUCCESS',
    UPDATE_LAST_CHANGES = '[Recommendations] UPDATE_LAST_CHANGES',
    SET_DEFAULT_STATE = '[Recommendations] SET_DEFAULT_STATE'
}

export class GetComponentSeries implements Action {
    readonly type = RecommendationsActionTypes.GET_COMPONENT_SERIES;
    constructor(public payload: number) {}
}

export class GetComponentSeriesSuccess implements Action {
    readonly type = RecommendationsActionTypes.GET_COMPONENT_SERIES_SUCCESS;
    constructor(public payload: RecommendationsComponent[]) {}
}

export class GetUserFactor implements Action {
    readonly type = RecommendationsActionTypes.GET_USER_FACTOR;
    constructor(public payload: number) {}
}

export class GetUserFactorSuccess implements Action {
    readonly type = RecommendationsActionTypes.GET_USER_FACTOR_SUCCESS;
    constructor(public payload: RecommendationsComponent[]) {}
}

export class GetItemDependencies implements Action {
    readonly type = RecommendationsActionTypes.GET_ITEM_DEPENDENCIES;
    constructor(public payload: {id?: number, type: number}) {}
}

export class GetItemDependenciesSuccess implements Action {
    readonly type = RecommendationsActionTypes.GET_ITEM_DEPENDENCIES_SUCCESS;
    constructor(public payload: {data: RecommendationsComponent[], type: number}) {}
}

export class GetValuesWithStatus implements Action {
    readonly type = RecommendationsActionTypes.GET_VALUES_WITH_STATUS;
    constructor(public payload?: {csId?: number, ufId?: number, type?: number, viewType?: any}) {}
}

export class GetValuesWithStatusSuccess implements Action {
    readonly type = RecommendationsActionTypes.GET_VALUES_WITH_STATUS_SUCCESS;
    constructor(public payload: RecommendationsCalculationsStatus) {}
}

export class GetDimensions implements Action {
    readonly type = RecommendationsActionTypes.GET_DIMENSIONS;
    constructor(public payload: {viewType: number}) {}
}

export class GetDimensionsSuccess implements Action {
    readonly type = RecommendationsActionTypes.GET_DIMENSIONS_SUCCESS;
    constructor(public payload: DimensionsRecommendation) {}
}

export class GetRecommendationView implements Action {
    readonly type = RecommendationsActionTypes.GET_RECOMMENDATION_VIEW;
    constructor(public payload: any) {}
}

export class GetRecommendationViewSuccess implements Action {
    readonly type = RecommendationsActionTypes.GET_RECOMMENDATION_VIEW_SUCCESS;
    constructor(public payload: RecommendationsView) {}
}

export class GetItemDependenciesSeries implements Action {
    readonly type = RecommendationsActionTypes.GET_ITEM_DEPENDENCIES_SERIES;
    constructor(public payload: {id?: number, type: number}) {}
}

export class GetLastChanges implements Action {
    readonly type = RecommendationsActionTypes.GET_LAST_CHANGES;
    constructor(public payload = 1) {}
}

export class GetLastChangesSuccess implements Action {
    readonly type = RecommendationsActionTypes.GET_LAST_CHANGES_SUCCESS;
    constructor(public payload: LastChangesText) {}
}

export class UpdateLastChanges implements Action {
    readonly type = RecommendationsActionTypes.UPDATE_LAST_CHANGES;
    constructor(public payload: LastChangesUpdateModel) {}
}

export class AutoGenerate implements Action {
    readonly type = RecommendationsActionTypes.AUTO_GENERATE;
}

export class AutoGenerateSuccess implements Action {
    readonly type = RecommendationsActionTypes.AUTO_GENERATE_SUCCESS;
}

export class CancelUpdate implements Action {
    readonly type = RecommendationsActionTypes.CANCEL_UPDATE;
}

export class CancelUpdateSuccess implements Action {
    readonly type = RecommendationsActionTypes.CANCEL_UPDATE_SUCCESS;
}

export class SetCSSteps implements Action {
    readonly type = RecommendationsActionTypes.SET_CS_STEPS;
    constructor(public payload: {csId: number, csvId: number}) {}
}

export class SetUFSteps implements Action {
    readonly type = RecommendationsActionTypes.SET_UF_STEPS;
    constructor(public payload: {ufId: number, ufvId: number}) {}
}

export class SetActiveCs implements Action {
    readonly type = RecommendationsActionTypes.SET_ACTIVE_CS;
    constructor(public payload: number) {}
}

export class SetActiveUf implements Action {
    readonly type = RecommendationsActionTypes.SET_ACTIVE_UF;
    constructor(public payload: number) {}
}

export class ExportCalculateTable implements Action {
    readonly type = RecommendationsActionTypes.EXPORT_CALCULATE_TABLE;
    constructor(public payload: any) {}
}

export class ExportCalculateTableSuccess implements Action {
    readonly type = RecommendationsActionTypes.EXPORT_CALCULATE_TABLE_SUCCESS;
}

export class SetCalculateTableModel implements Action {
    readonly type = RecommendationsActionTypes.SET_CALCULATE_TABLE_MODEL;
    constructor(public payload: any) {}
}

export class GetUpdateStatus implements Action {
    readonly type = RecommendationsActionTypes.GET_UPDATE_STATUS;
}

export class GetUpdateStatusSuccess implements Action {
    readonly type = RecommendationsActionTypes.GET_UPDATE_STATUS_SUCCESS;
    constructor(public payload: any) {}
}

export class GetDefaultRecommendationType implements Action {
    readonly type = RecommendationsActionTypes.GET_DEFAULT_RECOMMENDATION_TYPE;
}

export class GetDefaultRecommendationTypeSuccess implements Action {
    readonly type = RecommendationsActionTypes.GET_DEFAULT_RECOMMENDATION_TYPE_SUCCESS;
    constructor(public payload: RecommendationsType) {}
}

export class SetDefaultRecommendationType implements Action {
    readonly type = RecommendationsActionTypes.SET_DEFAULT_RECOMMENDATION_TYPE;
    constructor(public payload: RecommendationsType) {}
}

export class UpdateDefaultRecommendationTypeSuccess implements Action {
    readonly type = RecommendationsActionTypes.UPDATE_DEFAULT_RECOMMENDATION_TYPE_SUCCESS;
}

export class UpdateDefaultRecommendationType implements Action {
    readonly type = RecommendationsActionTypes.UPDATE_DEFAULT_RECOMMENDATION_TYPE;
}

export class SelecteDependenciesDropdown implements Action {
    readonly type = RecommendationsActionTypes.SELECTE_DEPENDENCIES_DROPDOWN;
    constructor(public payload: {id: number, isChecked: boolean, type: number}) {}
}

export class SelecteDependenciesDropdownAll implements Action {
    readonly type = RecommendationsActionTypes.SELECTE_DEPENDENCIES_DROPDOWN_ALL;
    constructor(public payload: {status: boolean, type: number}) {}
}

export class GetSeriesPerformances implements Action {
    readonly type = RecommendationsActionTypes.GET_SERIES_PERFORMANCES;
}

export class GetSeriesPerformancesSuccess implements Action {
    readonly type = RecommendationsActionTypes.GET_SERIES_PERFORMANCES_SUCCESS;
    constructor(public payload: UserFactorConnected[]) {}
}

export class DownloadUserFactor implements Action {
    readonly type = RecommendationsActionTypes.DOWNLOAD_USER_FACTOR;
    constructor(public payload: ExportUserFactor) {}
}

export class DownloadUserFactorSuccess implements Action {
    readonly type = RecommendationsActionTypes.DOWNLOAD_USER_FACTOR_SUCCESS;
}

export class SaveRowTable implements Action {
    readonly type = RecommendationsActionTypes.SAVE_ROW_TABLE;
    constructor(public payload: { data: RecommendationRow, index: any}) {}
}

export class SaveRowTableSuccess implements Action {
    readonly type = RecommendationsActionTypes.SAVE_ROW_TABLE_SUCCESS;
    constructor(public payload: RecommendationRow) {}
}

export class SelectedAllRows implements Action {
    readonly type = RecommendationsActionTypes.SELECTED_ALL_ROWS;
    constructor(public payload: any) {}
}

export class SelectedAllColumns implements Action {
    readonly type = RecommendationsActionTypes.SELECTED_ALL_COLUMNS;
    constructor(public payload: any) {}
}

export class GetCellComment implements Action {
    readonly type = RecommendationsActionTypes.GET_CELL_COMMENT;
    constructor(public payload: {ufvId: number, csvId: number}) {}
}

export class GetCellCommentSuccess implements Action {
    readonly type = RecommendationsActionTypes.GET_CELL_COMMENT_SUCCESS;
    constructor(public payload: RecommendationCellComment) {}
}

export class SetCellCommentSuccess implements Action {
    readonly type = RecommendationsActionTypes.SET_CELL_COMMENT_SUCCESS;
    constructor(public payload: RecommendationCommentRequest) {}
}

export class SetCellComment implements Action {
    readonly type = RecommendationsActionTypes.SET_CELL_COMMENT;
    constructor(public payload: RecommendationCommentRequest) {}
}

export class ClearCellComment implements Action {
    readonly type = RecommendationsActionTypes.CLEAR_CELL_COMMENT;
}

export class SetRowStatus implements Action {
    readonly type = RecommendationsActionTypes.SET_ROW_STATUS;
    constructor(public payload: any) {}
}

export class SetRowStatusSuccess implements Action {
    readonly type = RecommendationsActionTypes.SET_ROW_STATUS_SUCCESS;
    constructor(public payload: any) {}
}

export class SelectedAllTable implements Action {
    readonly type = RecommendationsActionTypes.SELECTED_ALL_TABLE;
}

export class SwitchTableHeader implements Action {
    readonly type = RecommendationsActionTypes.SWITCH_TABLE_HEADER;
}

export class DownloadSteps implements Action {
    readonly type = RecommendationsActionTypes.DOWNLOAD_STEPS;
}

export class DownloadStepsSuccess implements Action {
    readonly type = RecommendationsActionTypes.DOWNLOAD_STEPS_SUCCESS;
}

export class SetDefaultState implements Action {
    readonly type = RecommendationsActionTypes.SET_DEFAULT_STATE;
}

export type RecommendationsActions =
    | GetComponentSeries
    | GetComponentSeriesSuccess
    | GetUserFactor
    | GetUserFactorSuccess
    | GetItemDependencies
    | GetItemDependenciesSuccess
    | GetValuesWithStatus
    | GetValuesWithStatusSuccess
    | GetDimensions
    | GetDimensionsSuccess
    | GetRecommendationView
    | GetRecommendationViewSuccess
    | GetItemDependenciesSeries
    | GetLastChanges
    | GetLastChangesSuccess
    | AutoGenerate
    | AutoGenerateSuccess
    | CancelUpdate
    | CancelUpdateSuccess
    | SetCSSteps
    | SetUFSteps
    | SetActiveCs
    | SetActiveUf
    | SetCalculateTableModel
    | GetUpdateStatus
    | GetUpdateStatusSuccess
    | GetDefaultRecommendationType
    | GetDefaultRecommendationTypeSuccess
    | SetDefaultRecommendationType
    | UpdateDefaultRecommendationTypeSuccess
    | UpdateDefaultRecommendationType
    | SelecteDependenciesDropdown
    | SelecteDependenciesDropdownAll
    | GetSeriesPerformances
    | GetSeriesPerformancesSuccess
    | SaveRowTable
    | SaveRowTableSuccess
    | SelectedAllRows
    | SelectedAllColumns
    | SetCellCommentSuccess
    | SetCellComment
    | GetCellComment
    | GetCellCommentSuccess
    | ClearCellComment
    | SetRowStatus
    | SetRowStatusSuccess
    | SelectedAllTable
    | SwitchTableHeader
    | DownloadSteps
    | DownloadStepsSuccess
    | UpdateLastChanges
    | SetDefaultState;
