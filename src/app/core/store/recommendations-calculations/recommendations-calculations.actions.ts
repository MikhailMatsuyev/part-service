import { Action } from '@ngrx/store';

export enum RecommendationsCalculationsActionTypes {
    GET_COMPONENT_SERIES = '[Recommendations Calculations] GET_COMPONENT_SERIES',
    GET_COMPONENT_SERIES_SUCCESS = '[Recommendations Calculations] GET_COMPONENT_SERIES_SUCCESS',
    GET_USER_FACTOR = '[Recommendations Calculations] GET_USER_FACTOR',
    GET_USER_FACTOR_SUCCESS = '[Recommendations Calculations] GET_USER_FACTOR_SUCCESS',
    GET_ITEM_DEPENDENCIES = '[Recommendations Calculations] GET_ITEM_DEPENDENCIES',
    GET_ITEM_DEPENDENCIES_SUCCESS = '[Recommendations Calculations] GET_ITEM_DEPENDENCIES_SUCCESS',
    GET_VALUES_WITH_STATUS = '[Recommendations Calculations] GET_VALUES_WITH_STATUS',
    GET_VALUES_WITH_STATUS_SUCCESS = '[Recommendations Calculations] GET_VALUES_WITH_STATUS_SUCCESS',
    GET_DIMENSIONS = '[Recommendations Calculations] GET_DIMENSIONS',
    GET_DIMENSIONS_SUCCESS = '[Recommendations Calculations] GET_DIMENSIONS_SUCCESS',
    GET_RECOMMENDATION_VIEW = '[Recommendations Calculations] GET_RECOMMENDATION_VIEW',
    GET_RECOMMENDATION_VIEW_SUCCESS = '[Recommendations Calculations] GET_RECOMMENDATION_VIEW_SUCCESS',
    GET_ITEM_DEPENDENCIES_SERIES = '[Recommendations Calculations] GET_ITEM_DEPENDENCIES_SERIES',
    GET_LAST_CHANGES = '[Recommendations Calculations] GET_LAST_CHANGES',
    GET_LAST_CHANGES_SUCCESS = '[Recommendations Calculations] GET_LAST_CHANGES_SUCCESS',
    AUTO_GENERATE = '[Recommendations Calculations] AUTO_GENERATE',
    AUTO_GENERATE_SUCCESS = '[Recommendations Calculations] AUTO_GENERATE_SUCCESS',
    CANCEL_UPDATE = '[Recommendations Calculations] CANCEL_UPDATE',
    CANCEL_UPDATE_SUCCESS = '[Recommendations Calculations] CANCEL_UPDATE_SUCCESS',
    SET_CS_STEPS = '[Recommendations Calculations] SET_CS_STEPS',
    SET_UF_STEPS = '[Recommendations Calculations] SET_UF_STEPS',
    SET_ACTIVE_CS = '[Recommendations Calculations] SET_ACTIVE_CS',
    SET_ACTIVE_UF = '[Recommendations Calculations] SET_ACTIVE_UF',
    SET_CALCULATE_TABLE_MODEL = '[Recommendations Calculations] SET_CALCULATE_TABLE_MODEL',
    EXPORT_CALCULATE_TABLE = '[Recommendations Calculations] EXPORT_CALCULATE_TABLE',
    EXPORT_CALCULATE_TABLE_SUCCESS = '[Recommendations Calculations] EXPORT_CALCULATE_TABLE_SUCCESS',
    GET_UPDATE_STATUS = '[Recommendations Calculations] GET_UPDATE_STATUS',
    GET_UPDATE_STATUS_SUCCESS = '[Recommendations Calculations] GET_UPDATE_STATUS_SUCCESS',
    UPDATE_LAST_CHANGES = '[Recommendations Calculations] UPDATE_LAST_CHANGES',
    UPDATE_LAST_CHANGES_POSTFIX_MESSAGE = '[Recommendations Calculations] UPDATE_LAST_CHANGES_POSTFIX_MESSAGE',
    SET_DEFAULT_STATE = '[Recommendations Calculations] SET_DEFAULT_STATE'
}

export class GetComponentSeries implements Action {
    readonly type = RecommendationsCalculationsActionTypes.GET_COMPONENT_SERIES;
    constructor(public payload: number) {}
}

export class GetComponentSeriesSuccess implements Action {
    readonly type = RecommendationsCalculationsActionTypes.GET_COMPONENT_SERIES_SUCCESS;
    constructor(public payload: RecommendationsComponent[]) {}
}

export class GetUserFactor implements Action {
    readonly type = RecommendationsCalculationsActionTypes.GET_USER_FACTOR;
    constructor(public payload: number) {}
}

export class GetUserFactorSuccess implements Action {
    readonly type = RecommendationsCalculationsActionTypes.GET_USER_FACTOR_SUCCESS;
    constructor(public payload: RecommendationsComponent[]) {}
}

export class GetItemDependencies implements Action {
    readonly type = RecommendationsCalculationsActionTypes.GET_ITEM_DEPENDENCIES;
    constructor(public payload: {id?: number, type: number}) {}
}

export class GetItemDependenciesSuccess implements Action {
    readonly type = RecommendationsCalculationsActionTypes.GET_ITEM_DEPENDENCIES_SUCCESS;
    constructor(public payload: {data: RecommendationsComponent[], type: number}) {}
}

export class GetValuesWithStatus implements Action {
    readonly type = RecommendationsCalculationsActionTypes.GET_VALUES_WITH_STATUS;
    constructor(public payload?: {csId?: number, ufId?: number, type?: number}) {}
}

export class GetValuesWithStatusSuccess implements Action {
    readonly type = RecommendationsCalculationsActionTypes.GET_VALUES_WITH_STATUS_SUCCESS;
    constructor(public payload: RecommendationsCalculationsStatus) {}
}

export class GetDimensions implements Action {
    readonly type = RecommendationsCalculationsActionTypes.GET_DIMENSIONS;
    constructor(public payload: {viewType: number}) {}
}

export class GetDimensionsSuccess implements Action {
    readonly type = RecommendationsCalculationsActionTypes.GET_DIMENSIONS_SUCCESS;
    constructor(public payload: DimensionsRecommendation) {}
}

export class GetRecommendationView implements Action {
    readonly type = RecommendationsCalculationsActionTypes.GET_RECOMMENDATION_VIEW;
    constructor(public payload: any) {}
}

export class GetRecommendationViewSuccess implements Action {
    readonly type = RecommendationsCalculationsActionTypes.GET_RECOMMENDATION_VIEW_SUCCESS;
    constructor(public payload: RecommendationView) {}
}

export class GetItemDependenciesSeries implements Action {
    readonly type = RecommendationsCalculationsActionTypes.GET_ITEM_DEPENDENCIES_SERIES;
    constructor(public payload: {id?: number, type: number}) {}
}

export class GetLastChanges implements Action {
    readonly type = RecommendationsCalculationsActionTypes.GET_LAST_CHANGES;
    constructor(public payload = 1) {}
}

export class GetLastChangesSuccess implements Action {
    readonly type = RecommendationsCalculationsActionTypes.GET_LAST_CHANGES_SUCCESS;
    constructor(public payload: LastChangesText) {}
}

export class AutoGenerate implements Action {
    readonly type = RecommendationsCalculationsActionTypes.AUTO_GENERATE;
}

export class AutoGenerateSuccess implements Action {
    readonly type = RecommendationsCalculationsActionTypes.AUTO_GENERATE_SUCCESS;
}

export class CancelUpdate implements Action {
    readonly type = RecommendationsCalculationsActionTypes.CANCEL_UPDATE;
}

export class CancelUpdateSuccess implements Action {
    readonly type = RecommendationsCalculationsActionTypes.CANCEL_UPDATE_SUCCESS;
}

export class SetCSSteps implements Action {
    readonly type = RecommendationsCalculationsActionTypes.SET_CS_STEPS;
    constructor(public payload: {csId: number, csvId: number}) {}
}

export class SetUFSteps implements Action {
    readonly type = RecommendationsCalculationsActionTypes.SET_UF_STEPS;
    constructor(public payload: {ufId: number, ufvId: number}) {}
}

export class SetActiveCs implements Action {
    readonly type = RecommendationsCalculationsActionTypes.SET_ACTIVE_CS;
    constructor(public payload: number) {}
}

export class SetActiveUf implements Action {
    readonly type = RecommendationsCalculationsActionTypes.SET_ACTIVE_UF;
    constructor(public payload: number) {}
}

export class ExportCalculateTable implements Action {
    readonly type = RecommendationsCalculationsActionTypes.EXPORT_CALCULATE_TABLE;
    constructor(public payload: any) {}
}

export class ExportCalculateTableSuccess implements Action {
    readonly type = RecommendationsCalculationsActionTypes.EXPORT_CALCULATE_TABLE_SUCCESS;
}

export class SetCalculateTableModel implements Action {
    readonly type = RecommendationsCalculationsActionTypes.SET_CALCULATE_TABLE_MODEL;
    constructor(public payload: any) {}
}

export class GetUpdateStatus implements Action {
    readonly type = RecommendationsCalculationsActionTypes.GET_UPDATE_STATUS;
}

export class GetUpdateStatusSuccess implements Action {
    readonly type = RecommendationsCalculationsActionTypes.GET_UPDATE_STATUS_SUCCESS;
    constructor(public payload: any) {}
}

export class UpdateLastChanges implements Action {
    readonly type = RecommendationsCalculationsActionTypes.UPDATE_LAST_CHANGES;
    constructor(public payload: LastChangesUpdateModel) {}
}

export class UpdateLastChangesPostfixMessage implements Action {
    readonly type = RecommendationsCalculationsActionTypes.UPDATE_LAST_CHANGES_POSTFIX_MESSAGE;
    constructor(public payload: string) {}
}

export class SetDefaultState implements Action {
    readonly type = RecommendationsCalculationsActionTypes.SET_DEFAULT_STATE;
}

export type RecommendationsCalculationsActions =
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
    | UpdateLastChanges
    | UpdateLastChangesPostfixMessage
    | SetDefaultState;
