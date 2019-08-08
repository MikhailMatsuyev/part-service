import { createSelector } from 'reselect';
import { UniterState } from '../reducers';

export const getComponentConnections = (state: UniterState) => state.componentConnections;
export const getComponentSeries = createSelector(getComponentConnections, ({ componentSeries }) => componentSeries);
export const getActiveComponentSeries = createSelector(getComponentSeries, item => item.some(items => items.checked));
export const getActiveComponents = createSelector(getComponentConnections, ({ isAllActive }) => isAllActive);
export const getCombinedComponents = createSelector(getComponentConnections, ({ combinedComponent }) => combinedComponent);
export const getConnectedUserFactor = createSelector(getComponentConnections, ({ connectedUserFactor }) => connectedUserFactor);
export const getFactive = createSelector(getComponentConnections, ({ hasFictive }) => hasFictive);
export const getLinks = createSelector(getComponentConnections, ({ links }) => links);
export const getNames = createSelector(getComponentConnections, ({ names }) => names);
export const getFormulas = createSelector(getComponentConnections, ({ formulas }) => formulas);
export const getFormulasCount = createSelector(getFormulas, (item) => item.length);
export const getActiveSeriesList = createSelector(getComponentConnections, ({activeComponentSeriesList}) => activeComponentSeriesList);
export const getActiveConnectedUserFactor = createSelector(getComponentConnections,
    ({ activeConnectedUserFactor }) => activeConnectedUserFactor
);
