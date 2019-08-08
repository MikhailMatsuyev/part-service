import { createSelector } from 'reselect';
import { UniterState } from '../reducers';

export const getUserValues = (state: UniterState) => state.userValues;
export const getValues = createSelector(getUserValues, ({ userValues }) => userValues);
export const getValuesTable = createSelector(getUserValues, ({ userValuesTable }) => userValuesTable);
export const getDirectionSort = createSelector(getUserValues, ({ directionSort }) => directionSort);
export const getActiveUserValue = createSelector(getUserValues, ({ isActiveUserValue }) => isActiveUserValue);
