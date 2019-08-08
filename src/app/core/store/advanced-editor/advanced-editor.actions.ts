import { Action } from '@ngrx/store';

export enum AdvancedEditorActionTypes {
    GET_SQL_STATEMENTS = '[Advanced Editor] GET_SQL_STATEMENTS',
    GET_SQL_STATEMENTS_SUCCESS = '[Advanced Editor] GET_SQL_STATEMENTS_SUCCESS',
    SET_ACTIVE_SQL_STATEMENT = '[Advanced Editor] SET_ACTIVE_SQL_STATEMENT',
    CREATE_SQL_STATEMENT = '[Advanced Editor] CREATE_SQL_STATEMENT',
    CREATE_SQL_STATEMENT_SUCCESS = '[Advanced Editor] CREATE_SQL_STATEMENT_SUCCESS',
    EDIT_SQL_STATEMENT_TEXT = '[Advanced Editor] EDIT_SQL_STATEMENT_TEXT',
    EDIT_SQL_STATEMENT_TEXT_SUCCESS = '[Advanced Editor] EDIT_SQL_STATEMENT_TEXT_SUCCESS',
    EXECUTE_SQL_STATEMENT = '[Advanced Editor] EXECUTE_SQL_STATEMENT',
    EXECUTE_SQL_STATEMENT_SUCCESS = '[Advanced Editor] EXECUTE_SQL_STATEMENT_SUCCESS',
    EXECUTE_ALL_SQL_STATEMENT = '[Advanced Editor] EXECUTE_ALL_SQL_STATEMENT',
    PUSH_SQL_STATEMENT = '[Advanced Editor] PUSH_SQL_STATEMENT',
    PUSH_SQL_STATEMENT_SUCCESS = '[Advanced Editor] PUSH_SQL_STATEMENT_SUCCESS',
    EDIT_SQL_STATEMENT_STATUS = '[Advanced Editor] EDIT_SQL_STATEMENT_STATUS',
    EDIT_SQL_STATEMENT_STATUS_SUCCESS = '[Advanced Editor] EDIT_SQL_STATEMENT_STATUS_SUCCESS',
    REMOVE_SQL_STATEMENT = '[Advanced Editor] REMOVE_SQL_STATEMENT',
    REMOVE_SQL_STATEMENT_SUCCESS = '[Advanced Editor] REMOVE_SQL_STATEMENT_SUCCESS',
    STORE_SQL_TABLE = '[Advanced Editor] STORE_SQL_TABLE',
    STORE_SQL_TABLE_SUCCESS = '[Advanced Editor] STORE_SQL_TABLE_SUCCESS',
    UPDATE_SQL_STATEMENTS = '[Advanced Editor] UPDATE_SQL_STATEMENTS',
    PUSH_SQL_STATEMENT_STATUS = '[Advanced Editor] PUSH_SQL_STATEMENT_STATUS',
}

export class GetSqlStatements implements Action {
    readonly type = AdvancedEditorActionTypes.GET_SQL_STATEMENTS;
}

export class GetSqlStatementsSuccess implements Action {
    readonly type = AdvancedEditorActionTypes.GET_SQL_STATEMENTS_SUCCESS;
    constructor(public payload: SqlStatements[]) {}
}

export class SetSqlStatement implements Action {
    readonly type = AdvancedEditorActionTypes.SET_ACTIVE_SQL_STATEMENT;
    constructor(public payload: number) {}
}

export class CreateSqlStatement implements Action {
    readonly type = AdvancedEditorActionTypes.CREATE_SQL_STATEMENT;
    constructor(public payload: string) {}
}

export class CreateSqlStatementSuccess implements Action {
    readonly type = AdvancedEditorActionTypes.CREATE_SQL_STATEMENT_SUCCESS;
    constructor(public payload: SqlState) {}
}

export class EditSqlStatementText implements Action {
    readonly type = AdvancedEditorActionTypes.EDIT_SQL_STATEMENT_TEXT;
    constructor(public payload: {id: number, text: string}) {}
}

export class EditSqlStatementTextSuccess implements Action {
    readonly type = AdvancedEditorActionTypes.EDIT_SQL_STATEMENT_TEXT_SUCCESS;
    constructor(public payload: SqlState) {}
}

export class ExecuteSqlStatement implements Action {
    readonly type = AdvancedEditorActionTypes.EXECUTE_SQL_STATEMENT;
    constructor(public payload: number[]) {}
}

export class ExecuteSqlStatementSuccess implements Action {
    readonly type = AdvancedEditorActionTypes.EXECUTE_SQL_STATEMENT_SUCCESS;
}

export class ExecuteAllSqlStatement implements Action {
    readonly type = AdvancedEditorActionTypes.EXECUTE_ALL_SQL_STATEMENT;
}

export class PushSqlStatement implements Action {
    readonly type = AdvancedEditorActionTypes.PUSH_SQL_STATEMENT;
}

export class PushSqlStatementSuccess implements Action {
    readonly type = AdvancedEditorActionTypes.PUSH_SQL_STATEMENT_SUCCESS;
}

export class EditSqlStatementStatus implements Action {
    readonly type = AdvancedEditorActionTypes.EDIT_SQL_STATEMENT_STATUS;
    constructor(public payload: SqlState) {}
}

export class EditSqlStatementStatusSuccess implements Action {
    readonly type = AdvancedEditorActionTypes.EDIT_SQL_STATEMENT_STATUS_SUCCESS;
    constructor(public payload: SqlState) {}
}

export class RemoveSqlStatement implements Action {
    readonly type = AdvancedEditorActionTypes.REMOVE_SQL_STATEMENT;
    constructor(public payload: number) {}
}

export class RemoveSqlStatementSuccess implements Action {
    readonly type = AdvancedEditorActionTypes.REMOVE_SQL_STATEMENT_SUCCESS;
    constructor(public payload: SqlStatements[]) {}
}

export class StoreSqlTable implements Action {
    readonly type = AdvancedEditorActionTypes.STORE_SQL_TABLE;
    constructor(public payload: any) {}
}

export class StoreSqlTableSuccess implements Action {
    readonly type = AdvancedEditorActionTypes.STORE_SQL_TABLE_SUCCESS;
}

export class UpdateSqlStatements implements Action {
    readonly type = AdvancedEditorActionTypes.UPDATE_SQL_STATEMENTS;
    constructor(public payload: AdvancedStatus) {}
}

export class PushSqlStatementsStatus implements Action {
    readonly type = AdvancedEditorActionTypes.PUSH_SQL_STATEMENT_STATUS;
    constructor(public payload: PushToRecommendationDoneStatus) {}
}

export type AdvancedEditorActions =
    | GetSqlStatements
    | GetSqlStatementsSuccess
    | SetSqlStatement
    | CreateSqlStatement
    | CreateSqlStatementSuccess
    | EditSqlStatementText
    | EditSqlStatementTextSuccess
    | ExecuteSqlStatement
    | ExecuteSqlStatementSuccess
    | ExecuteAllSqlStatement
    | PushSqlStatement
    | PushSqlStatementSuccess
    | EditSqlStatementStatus
    | EditSqlStatementStatusSuccess
    | RemoveSqlStatement
    | RemoveSqlStatementSuccess
    | StoreSqlTable
    | StoreSqlTableSuccess
    | UpdateSqlStatements
    | PushSqlStatementsStatus;
