import { createSelector } from 'reselect';
import { UniterState } from '../reducers';

export const getAppSettings = (state: UniterState) => state.appSettings;
export const getNumberDisplayType = createSelector(getAppSettings, ({ numberDisplayType }) => numberDisplayType);
export const getDisplayAnalyzeButton = createSelector(getAppSettings, ({ displayAnalyzeButtons }) => displayAnalyzeButtons);
export const getTimeoutDuration = createSelector(getAppSettings, ({ timeoutDuration }) => timeoutDuration);
