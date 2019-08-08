import { createSelector } from 'reselect';
import { UniterState } from '../reducers';

export const getAdvancedEditor = (state: UniterState) => state.advancedEditor;
export const getSqlStatements = createSelector(getAdvancedEditor, ({ sqlStatements }) => sqlStatements);
export const getActiveSqlStatement = createSelector(getAdvancedEditor, ({ actvieSqlStatement }) => actvieSqlStatement);
export const getPushSqlStatements = createSelector(getAdvancedEditor, ({ pushSqlStatements }) => pushSqlStatements);
