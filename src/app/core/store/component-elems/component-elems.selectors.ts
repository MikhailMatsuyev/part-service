import { createSelector } from 'reselect';
import { UniterState } from '@core/store/reducers';

export const getComponents = (state: UniterState) => state.components;
export const getComponentsGroups = createSelector(getComponents, ({ seriesGroup }) => seriesGroup);
export const getComponentSelection = createSelector(getComponents, ({ seriesSelection }) => seriesSelection);
export const getComponentGroupList = createSelector(getComponents, ({ groupList }) => groupList);
export const getComponentGroupSelection = createSelector(getComponents, ({ groupsSelection }) => groupsSelection);
export const getDirections = createSelector(getComponents, ({ direction }) => direction);
export const getCollapse = createSelector(getComponents, ({ isCollapsed }) => isCollapsed);
export const getImportConflict = createSelector(getComponents, ({importConflict}) => importConflict);
