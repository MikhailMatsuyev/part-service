import { createSelector } from 'reselect';
import { UniterState } from '../reducers';

export const getTypeKeySettings = (state: UniterState) => state.typeKeySettings;
export const getPrimaryTypeKeySettings = createSelector(getTypeKeySettings, ({ primaryTypeKeySettings }) => primaryTypeKeySettings);
export const getTypeKeyErrorResponse = createSelector(getTypeKeySettings, ({ errorResponse }) => errorResponse);
export const getSelectedPerfId = createSelector(getPrimaryTypeKeySettings, ({ perfId }) => perfId);
export const getFreeTextList = createSelector(getPrimaryTypeKeySettings, ({ textList }) => textList);
export const getUserFactorList = createSelector(getPrimaryTypeKeySettings, ({ ufList }) => ufList);
export const getTypeKeyErrorMessage = createSelector(getTypeKeyErrorResponse, ({ message }) => message);
export const getPrimaryTypeKeyPerformances = createSelector(getPrimaryTypeKeySettings, ({ perfList }) => perfList);
export const getPrimaryTypeKeyUserFactors = createSelector(getPrimaryTypeKeySettings, ({ ufList }) => ufList);
export const getPrimaryTypeKeyFreeTexts = createSelector(getPrimaryTypeKeySettings, ({ textList }) => textList);
export const getTypeKeyTable = createSelector(getTypeKeySettings, ({ tableData }) => tableData);
