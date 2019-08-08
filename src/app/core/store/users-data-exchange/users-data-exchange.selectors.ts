import { createSelector } from 'reselect';
import { UniterState } from '../reducers';

export const getUsersDataExchange = (state: UniterState) => state.usersDataExchange;
export const getDataExchange = createSelector(getUsersDataExchange, ({ dataExchange }) => dataExchange);
export const getDataExchangeNotTaken = createSelector(getDataExchange, item => item && item.find(items => items.action === -1));
