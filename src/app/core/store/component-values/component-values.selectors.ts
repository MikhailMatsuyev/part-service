import { createSelector } from 'reselect';
import { UniterState } from '../reducers';

export const getComponentValues = (state: UniterState) => state.componentValues;
export const getComponentValue = createSelector(getComponentValues, ({ componentValues }) => componentValues);
export const getComponentValuesTable = createSelector(getComponentValues, ({ componentValuesTable }) => componentValuesTable);
export const getComponentDirectionSort = createSelector(getComponentValues, ({ directionSort }) => directionSort);
export const getActiveStep = createSelector(getComponentValues, ({ activeComponentStep }) => activeComponentStep);
export const getPerformance = createSelector(getComponentValues, ({ performance }) => performance);
