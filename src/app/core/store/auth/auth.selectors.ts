import { UniterState } from '../reducers';
import { createSelector } from 'reselect';

export const getUsersState = (state: UniterState) => state.auth;
export const getLoggedIn = createSelector(getUsersState, ({ loggedIn }) => loggedIn);
export const getAuthUser = createSelector(getUsersState, ({ user }) => user);
export const getIsActiveGuestMode = createSelector(getUsersState, ({ isActiveGuestMode }) => isActiveGuestMode);
