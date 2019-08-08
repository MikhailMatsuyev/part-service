import { IAppSettings } from './app-layout.reducer';
import { UniterState } from '../reducers';
import { createSelector } from 'reselect';
import * as fromRouter from '@ngrx/router-store';

export const getAppLayout: any = (state: UniterState): IAppSettings => state.appLayout;
export const getTitle = createSelector(getAppLayout, (options: IAppSettings) => options.titlePage);
export const getProjectInfo = createSelector(getAppLayout, ({ titlePage, projectName }: IAppSettings) => ({titlePage,  projectName}));
export const getRouterState = (state: UniterState): any => state.router;
export const getCurrentUrl = createSelector(getRouterState, (state: fromRouter.RouterReducerState) => state.state && state.state.url);
export const getNotification = createSelector(getAppLayout, (state: IAppSettings) => state.notifications);
export const getUnreadNotification = createSelector(getAppLayout,  (state: IAppSettings) => state.unreadedNotification);
export const getKeyCodeActive = createSelector(getAppLayout, (options: IAppSettings) => options.keyCodes);
export const getLocalNotification = createSelector(getAppLayout, (options: IAppSettings) => options.localNotifications);
export const getProjectVersion = createSelector(getAppLayout, ({ projectVersion }: IAppSettings) => projectVersion);
export const getPagesAccess = createSelector(getAppLayout, ({pages}: IAppSettings) => pages);
