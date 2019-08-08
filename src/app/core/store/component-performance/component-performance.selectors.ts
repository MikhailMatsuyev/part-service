import { createSelector } from 'reselect';
import { UniterState } from '../reducers';

export const getComponentPerformance = (state: UniterState) => state.componentPerformance;
export const getPerformances = createSelector(getComponentPerformance, ({ performances }) => performances);
export const getPerformancesSelected = createSelector(getComponentPerformance, ({ performancesSelected }) => performancesSelected);
export const getFunctionsSettings = createSelector(getComponentPerformance, ({ functionsSettings }) => functionsSettings);
export const getUnitPricing = createSelector(getComponentPerformance, ({ unitPricing }) => unitPricing);
