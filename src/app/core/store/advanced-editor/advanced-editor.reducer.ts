import { AdvancedEditorActionTypes } from './advanced-editor.actions';

export interface AdvancedEditorState {
    sqlStatements: SqlStatements[];
    actvieSqlStatement: SqlState;
    pushSqlStatements: PushToRecommendationDoneStatus;
}

export const initialState: AdvancedEditorState = {
    sqlStatements: [],
    actvieSqlStatement: null,
    pushSqlStatements: null
};

export function advancedEditor(state: AdvancedEditorState = initialState, action: IUnsafeAction): AdvancedEditorState {
    const { type, payload } = action;

    switch (type) {

        case AdvancedEditorActionTypes.GET_SQL_STATEMENTS_SUCCESS: {
            return {
                ...state,
                sqlStatements: payload,
                actvieSqlStatement: (payload && payload.length) > 0 ? payload[0] : null
            };
        }

        case AdvancedEditorActionTypes.SET_ACTIVE_SQL_STATEMENT: {
            return {
                ...state,
                actvieSqlStatement: state.sqlStatements.find(item => item.id === payload)
            };
        }

        case AdvancedEditorActionTypes.CREATE_SQL_STATEMENT_SUCCESS: {
            return {
                ...state,
                sqlStatements: [...state.sqlStatements, payload],
                actvieSqlStatement: payload
            };
        }

        case AdvancedEditorActionTypes.EDIT_SQL_STATEMENT_TEXT_SUCCESS: {
            const { id } = payload;
            const sqlStatements = state.sqlStatements.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        ...payload
                    };
                }

                return item;
            });

            return {
                ...state,
                sqlStatements
            };
        }

        case AdvancedEditorActionTypes.EDIT_SQL_STATEMENT_STATUS_SUCCESS: {
            const { id } = payload;
            const sqlStatements = state.sqlStatements.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        ...payload
                    };
                }

                return item;
            });

            return {
                ...state,
                sqlStatements
            };
        }

        case AdvancedEditorActionTypes.REMOVE_SQL_STATEMENT_SUCCESS: {
            return {
                ...state,
                sqlStatements: payload,
                actvieSqlStatement: (payload && payload.length) > 0 ? payload[0] : null
            };
        }

        case AdvancedEditorActionTypes.UPDATE_SQL_STATEMENTS: {
            const { id, duration, inProcess, success, message } = payload;
            const sqlStatements = state.sqlStatements.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        inProcess,
                        Duration: duration,
                        Error: !success,
                        ErrorMessage: message,
                        activiteStatus: {
                            success
                        }
                    };
                }

                return item;
            });

            return {
                ...state,
                sqlStatements
            };
        }

        case AdvancedEditorActionTypes.PUSH_SQL_STATEMENT_STATUS: {
            return {
                ...state,
                pushSqlStatements: payload,
            };
        }

        default: {
            return state;
        }
    }
}
