import { createSelector } from 'reselect';
import { UniterState } from '../reducers';

export const getStateStepScopes = (state: UniterState) => state.stepsScopes;
export const getRoleValuesSelector = createSelector(getStateStepScopes, ({ stateScopesRoleValues }) => stateScopesRoleValues);
export const getRoleValueChoosed = createSelector(getStateStepScopes, ({ stateScopesRoleValueChoosed }) => stateScopesRoleValueChoosed);
export const getComponentSeriesValuesSelector = createSelector(getStateStepScopes,
    ({ stateScopesComponentSeriesValue }) => stateScopesComponentSeriesValue);
export const getComponentSeriesValuesChoosedSelector = createSelector(getStateStepScopes,
    ({ stateScopesComponentValueChoosed }) => stateScopesComponentValueChoosed);
export const getComponentStepsCheckBoxesValuesSelector = createSelector(getStateStepScopes,
    ({ stateScopesComponentSeriesIsAllActive }) => stateScopesComponentSeriesIsAllActive);
export const getRoleValueChoosedSelector = createSelector(getStateStepScopes,
    ({ stateScopesRoleValueChoosed }) => stateScopesRoleValueChoosed);
export const getScopesComponentStepsValues = createSelector(getStateStepScopes,
    ({ stateScopesComponentStepsValues }) => stateScopesComponentStepsValues);
export const getComponentStepsCheckBoxesAllSelector = createSelector(getScopesComponentStepsValues,
     item => item.every(items => items.available));
