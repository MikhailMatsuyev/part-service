import { createSelector } from 'reselect';
import { UniterState } from '../reducers';

export const getAnalyze = (state: UniterState) => state.analyze;
export const getComponentSeries = createSelector(getAnalyze, ({ componentSeries }) => componentSeries);
export const getActiveSeries = createSelector(getAnalyze, ({ activeSeries }) => activeSeries);
export const getDependetMode = createSelector(getAnalyze, ({ dependGroupMode }) => dependGroupMode);
export const getActiveSteps = createSelector(getAnalyze, ({ activeSteps }) => activeSteps);
export const getAllInvalid = createSelector(getAnalyze, ({ allInvalid }) => allInvalid);
export const getComponentStep = createSelector(getAnalyze, ({ componentStep }) => componentStep);
export const getComponentStepSeries = createSelector(getComponentStep, ({ series }) => series);
export const getSeries = createSelector(getAnalyze, ({ series }) => series);
export const getForTable = createSelector(getAnalyze, ({ forTable }) => forTable);
export const getColumnsName = createSelector(getAnalyze, ({ columnsName }) => columnsName);
export const getDisplayedColumns = createSelector(getAnalyze, ({ displayedColumns }) => displayedColumns);
export const getShowingTablePosition = createSelector(getAnalyze, ({ isTablePositionHorizontal }) => isTablePositionHorizontal);
export const getArrayForTableTopRow = createSelector(getAnalyze, ({ arrayForTableTopRow }) => arrayForTableTopRow);
export const getUserFactorStep = createSelector(getAnalyze, ({ userFactorStep }) => userFactorStep);
