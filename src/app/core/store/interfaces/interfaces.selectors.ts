import { createSelector } from 'reselect';
import { UniterState } from '@core/store/reducers';

export const getInterfaces = (state: UniterState) => state.interfaces;
export const getInterfacesGroups = createSelector(getInterfaces, ({ seriesGroup }) => seriesGroup);
export const getInterfaceSelection = createSelector(getInterfaces, ({ seriesSelection }) => seriesSelection);
export const getInterfaceGroupList = createSelector(getInterfaces, ({ groupList }) => groupList);
export const getInterfaceGroupSelection = createSelector(getInterfaces, ({ groupsSelection }) => groupsSelection);
export const getDirections = createSelector(getInterfaces, ({ direction }) => direction);
export const getCollapse = createSelector(getInterfaces, ({ isCollapsed }) => isCollapsed);
export const getImportConflict = createSelector(getInterfaces, ({ importConflict }) => importConflict);
