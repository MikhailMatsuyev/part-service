import { Action } from '@ngrx/store';

export enum AnalyzeActionTypes {
    GET_COMPONENT_SERIES            = '[Analyze] GET_COMPONENT_SERIES',
    GET_COMPONENT_SERIES_SUCCESS    = '[Analyze] GET_COMPONENT_SERIES_SUCCESS',
    GET_COMPONENT_STEPS             = '[Analyze] GET_COMPONENT_STEPS',
    GET_COMPONENT_STEPS_SUCCESS     = '[Analyze] GET_COMPONENT_STEPS_SUCCESS',
    GET_STEPS_ANALYZE               = '[Analyze] GET_STEPS_ANALYZE',
    GET_STEPS_ANALYZE_SUCCESS       = '[Analyze] GET_STEPS_ANALYZE_SUCCESS',
    GET_VALUE_COUNT                 = '[Analyze] GET_VALUE_COUNT',
    GET_VALUE_COUNT_SUCCESS         = '[Analyze] GET_VALUE_COUNT_SUCCESS',
    SET_COMPONENT_SERIES            = '[Analyze] SET_COMPONENT_SERIES',
    SET_DEPEND_GROUP_MODE           = '[Analyze] SET_DEPEND_GROUP_MODE',
    SET_MODE                        = '[Analyze] SET_MODE',
    SET_ONE_STEP_CHOOSED            = '[Analyze] SET_ONE_STEP_CHOOSED',
    SET_SHOWING_TABLE_HORIZONTAL    = '[Analyze] SET_SHOWING_TABLE_HORIZONTAL',
    SET_CAN_CHANGE_POSITION_TABLE   = '[Analyze] SET_CAN_CHANGE_POSITION_TABLE'
}

export class GetComponentSeries implements Action {
    readonly type = AnalyzeActionTypes.GET_COMPONENT_SERIES;
}

export class GetComponentSeriesSuccess implements Action {
    readonly type = AnalyzeActionTypes.GET_COMPONENT_SERIES_SUCCESS;
    constructor(public payload: AnalyzeComponent[]) {}
}

export class GetComponentSteps implements Action {
    readonly type = AnalyzeActionTypes.GET_COMPONENT_STEPS;
    constructor(public payload?: number) {}
}

export class GetComponentStepsSuccess implements Action {
    readonly type = AnalyzeActionTypes.GET_COMPONENT_STEPS_SUCCESS;
    constructor(public payload: AnalyzeSteps) {}
}

export class GetStepsAnalyze implements Action {
    readonly type = AnalyzeActionTypes.GET_STEPS_ANALYZE;
    constructor(public payload?: number) {}
}

export class GetStepsAnalyzeSuccess implements Action {
    readonly type = AnalyzeActionTypes.GET_STEPS_ANALYZE_SUCCESS;
    constructor(public payload: AnalyzeCsUfSteps) {}
}

export class GetValueCounts implements Action {
    readonly type = AnalyzeActionTypes.GET_VALUE_COUNT;
    constructor(public payload?: number) {}
}

export class GetValueCountsSuccess implements Action {
    readonly type = AnalyzeActionTypes.GET_VALUE_COUNT_SUCCESS;
    constructor(public payload: AnalyzeStepModel[]) {}
}

export class SetComponentSeries implements Action {
    readonly type = AnalyzeActionTypes.SET_COMPONENT_SERIES;
    constructor(public payload: number) {}
}

export class SetDependGroupMode implements Action {
    readonly type = AnalyzeActionTypes.SET_DEPEND_GROUP_MODE;
    constructor(public payload: boolean) {}
}

export class SetMode implements Action {
    readonly type = AnalyzeActionTypes.SET_MODE;
    constructor(public payload: boolean) { }
}

export class SetOneStepChoosed implements Action {
    readonly type = AnalyzeActionTypes.SET_ONE_STEP_CHOOSED;
    constructor(public payload: { checked: boolean, id: number } ) { }
}

export class SetShowingTableHorizontal implements Action {
    readonly type = AnalyzeActionTypes.SET_SHOWING_TABLE_HORIZONTAL;
}

export class SetCanChangePositionTable implements Action {
    readonly type = AnalyzeActionTypes.SET_CAN_CHANGE_POSITION_TABLE;
    constructor(public payload: boolean) { }
}

export type AnalyzeEditorActions =
    | GetComponentSeries
    | GetComponentSeriesSuccess
    | GetComponentSteps
    | GetComponentStepsSuccess
    | GetStepsAnalyze
    | GetStepsAnalyzeSuccess
    | GetValueCounts
    | GetValueCountsSuccess
    | SetComponentSeries
    | SetDependGroupMode
    | SetMode
    | SetOneStepChoosed
    | SetShowingTableHorizontal
    | SetCanChangePositionTable;
