import { Action } from '@ngrx/store';

export enum StepsScopesActionTypes {
    SET_STEPS_SCOPES_ROLE_VALUES = '[StepsScopes] SET_STEPS_SCOPES_ROLE_VALUES',
    SET_STEPS_SCOPES_ROLE_VALUES_SUCCESS = '[StepsScopes] SET_STEPS_SCOPES_ROLE_VALUES_SUCCESS',
    SET_STEPS_SCOPES_ROLE_TABLE = '[StepsScopes] SET_STEPS_SCOPES_ROLE_TABLE',
    SET_STEPS_SCOPES_ROLE_TABLE_SUCCESS = '[StepsScopes] SET_STEPS_SCOPES_ROLE_TABLE_SUCCESS',
    SET_STEPS_SCOPES_ROLE_TABLE_CHOOSED = '[StepsScopes] SET_STEPS_SCOPES_ROLE_TABLE_CHOOSED',
    SET_STEPS_SCOPES_COMPONENT_SERIES_TABLE_CHOOSED = '[StepsScopes] SET_STEPS_SCOPES_COMPONENT_SERIES_TABLE_CHOOSED',
    SET_STEPS_SCOPES_ACTIVE_ALL_COMPONENT_STEPS = '[StepsScopes] SET_STEPS_SCOPES_ACTIVE_ALL_COMPONENT_STEPS',
    SET_STEPS_SCOPES_ACTIVE_ALL_COMPONENT_STEPS_SUCCESS = '[StepsScopes] SET_STEPS_SCOPES_ACTIVE_ALL_COMPONENT_STEPS_SUCCESS',
    SET_STEPS_SCOPES_ACTIVE_ONE_COMPONENT_STEPS  = '[StepsScopes] SET_STEPS_SCOPES_ACTIVE_ONE_COMPONENT_STEPS',
    SET_STEPS_SCOPES_ACTIVE_ONE_COMPONENT_STEPS_SUCCESS = '[StepsScopes] SET_STEPS_SCOPES_ACTIVE_ONE_COMPONENT_STEPS_SUCCESS',
    SET_STEPS_SCOPES_ACTIVE_All_STEPS_All_SERIES = '[StepsScopes] SET_STEPS_SCOPES_ACTIVE_All_STEPS_All_SERIES',
    SET_STEPS_SCOPES_ACTIVE_All_STEPS_All_SERIES_SUCCESS= '[StepsScopes] SET_STEPS_SCOPES_ACTIVE_All_STEPS_All_SERIES_SUCCESS',
    SET_STEPS_SCOPES_COMPONENT_SERIES_VALUES_TABLE = '[StepsScopes] SET_STEPS_SCOPES_COMPONENT_SERIES_VALUES_TABLE',
    SET_DEFAULT_STATE = '[StepsScopes] SET_DEFAULT_STATE'
}

export class SetStepsScopesRoleValues implements Action {
    readonly type = StepsScopesActionTypes.SET_STEPS_SCOPES_ROLE_VALUES;
}

export class SetStepsScopesRoleValuesSuccess implements Action {
    readonly type = StepsScopesActionTypes.SET_STEPS_SCOPES_ROLE_VALUES_SUCCESS;
    constructor(public payload: any[]) { }
}

export class SetStepsScopesRoleTable implements Action {
    readonly type = StepsScopesActionTypes.SET_STEPS_SCOPES_ROLE_TABLE;
    constructor(public payload: number) { }
}

export class SetStepsScopesRoleTableSuccess implements Action {
    readonly type = StepsScopesActionTypes.SET_STEPS_SCOPES_ROLE_TABLE_SUCCESS;
    constructor(public payload: any[]) { }
}

export class SetStepsScopesComponentSeriesValuesGetTable implements Action {
    readonly type = StepsScopesActionTypes.SET_STEPS_SCOPES_COMPONENT_SERIES_VALUES_TABLE;
    constructor(public payload: number) { }
}

export class SetStepsScopesRoleTableChoosed implements Action {
    readonly type = StepsScopesActionTypes.SET_STEPS_SCOPES_ROLE_TABLE_CHOOSED;
    constructor(public payload: number) { }
}

export class SetStepsScopesComponentSeriesTableChoosed implements Action {
    readonly type = StepsScopesActionTypes.SET_STEPS_SCOPES_COMPONENT_SERIES_TABLE_CHOOSED;
    constructor(public payload: number) { }
}

export class SetStepsScopesActiveAllComponentSteps implements Action {
    readonly type = StepsScopesActionTypes.SET_STEPS_SCOPES_ACTIVE_ALL_COMPONENT_STEPS;
    constructor(public payload: { checked: boolean, type: number } ) { }
}

export class SetStepsScopesActiveAllComponentStepsSuccess implements Action {
    readonly type = StepsScopesActionTypes.SET_STEPS_SCOPES_ACTIVE_ALL_COMPONENT_STEPS_SUCCESS;
    constructor(public payload: any) { }
}

export class SetStepsScopesActiveOneComponentSteps implements Action {
    readonly type = StepsScopesActionTypes.SET_STEPS_SCOPES_ACTIVE_ONE_COMPONENT_STEPS;
    constructor(public payload: { checked: boolean, id: number, type: number }) { }
}

export class SetStepsScopesActiveOneComponentStepsSuccess implements Action {
    readonly type = StepsScopesActionTypes.SET_STEPS_SCOPES_ACTIVE_ONE_COMPONENT_STEPS_SUCCESS;
    constructor(public payload: any) { }
}

export class SetStepsScopesActiveAllStepsAllSeries implements Action {
    readonly type = StepsScopesActionTypes.SET_STEPS_SCOPES_ACTIVE_All_STEPS_All_SERIES;
    constructor(public payload: { checked: boolean, type: number }) { }
}

export class SetStepsScopesActiveAllStepsAllSeriesSuccess implements Action {
    readonly type = StepsScopesActionTypes.SET_STEPS_SCOPES_ACTIVE_All_STEPS_All_SERIES_SUCCESS;
    constructor(public payload: boolean) { }
}

export class SetDefaultState implements Action {
    readonly type = StepsScopesActionTypes.SET_DEFAULT_STATE;
}

export type StepsScopesActions =
    | SetStepsScopesRoleValues
    | SetStepsScopesRoleValuesSuccess
    | SetStepsScopesRoleTableSuccess
    | SetStepsScopesComponentSeriesValuesGetTable
    | SetStepsScopesRoleTableChoosed
    | SetStepsScopesActiveAllComponentSteps
    | SetStepsScopesActiveAllComponentStepsSuccess
    | SetStepsScopesActiveOneComponentSteps
    | SetStepsScopesActiveOneComponentStepsSuccess
    | SetStepsScopesActiveAllStepsAllSeries
    | SetStepsScopesActiveAllStepsAllSeriesSuccess
    | SetDefaultState;
