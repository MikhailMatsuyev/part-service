import { createSelector } from 'reselect';
import { UniterState } from '../reducers';

export const getUserFactors = (state: UniterState) => state.userFactors;
export const getUserFactorsGroups = createSelector(getUserFactors, ({ seriesGroup }) => seriesGroup);
export const getUserSelection = createSelector(getUserFactors, ({ seriesSelection }) => seriesSelection);
export const getUsetGroupList = createSelector(getUserFactors, ({ groupList }) => groupList);
export const getUserGroupSelection = createSelector(getUserFactors, ({ groupsSelection }) => groupsSelection);
export const getDirections = createSelector(getUserFactors, ({ direction }) => direction);
export const getCollapse = createSelector(getUserFactors, ({ isCollapsed }) => isCollapsed);
export const getImportConflict = createSelector(getUserFactors, ({importConflict}) => importConflict);
