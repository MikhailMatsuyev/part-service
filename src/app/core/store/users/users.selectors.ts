import { createSelector } from 'reselect';
import { UniterState } from '../reducers';

export const getUsers = (state: UniterState) => state.users;
export const getOnlineStatus = createSelector(getUsers, ({ usersOnline }) => usersOnline);
export const getOnlineStatusCount = createSelector(getOnlineStatus, item => item.length);
export const getChangePasswordMessage = createSelector(getUsers, ({ changePasswordMessage }) => changePasswordMessage);
