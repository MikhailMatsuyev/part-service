import { createSelector } from 'reselect';
import { UniterState } from '../reducers';

export const getUserFactorConnections = (state: UniterState) => state.userFactorConnections;
export const getUserFactorsConnections = createSelector(getUserFactorConnections, ({ userFactors }) => userFactors);
export const getUserFactorsDepth = createSelector(getUserFactorConnections, ({ depth }) => depth);
export const getNetworkData = createSelector(getUserFactorConnections, ({ netWorkData }) => netWorkData);
export const getFormulas = createSelector(getUserFactorConnections, ({ formulas }) => formulas);
export const getConnectedComponents = createSelector(getUserFactorConnections, ({ connectedComponents }) => connectedComponents);
export const getComponentSeriesDimImpl = createSelector(getUserFactorConnections, ({ componentSeriesDimImpl }) => componentSeriesDimImpl);
export const getConnectedUserFactor = createSelector(getUserFactorConnections, ({ connectedUserFactor }) => connectedUserFactor);
export const getFormulasCount = createSelector(getFormulas, (item) => item.length);
export const getActiveComponentSeries = createSelector(getUserFactorsConnections, item => item.some(items => items.isChecked));
export const getActiveComponents = createSelector(getUserFactorConnections, ({ isAllActive }) => isAllActive);
export const getActiveConnectedUserFactor = createSelector(getUserFactorConnections,
    ({ activeConnectedUserFactor }) => activeConnectedUserFactor
);
export const getActiveSeriesList = createSelector(getUserFactorConnections, ({ activeComponentSeriesList }) => activeComponentSeriesList);

