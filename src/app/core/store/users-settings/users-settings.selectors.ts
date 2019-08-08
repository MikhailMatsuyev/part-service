import { createSelector } from 'reselect';
import { UniterState } from '../reducers';

export const getUserSettings = (state: UniterState) => state.usersSettings;
export const getUserRoles = createSelector(getUserSettings, ({ usersRoles }) => usersRoles);
export const getUsers = createSelector(getUserSettings, ({ users }) => users);
export const getRolesTree = createSelector(getUserSettings, ({ rolesTree }) => rolesTree);
