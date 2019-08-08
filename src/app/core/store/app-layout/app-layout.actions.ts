import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { NotificationsLocal } from '@core/components/system-notifications/models/notification.model';

@Injectable()
export class AppLayoutActions {
    public static GET_TITLE = '[APP LAYOUT] GET_TITLE';
    public static GET_TITLE_SUCCESS = '[APP LAYOUT] GET_TITLE_SUCCESS';
    public static GET_NOTIFICATIONS = '[APP LAYOUT] GET_NOTIFICATIONS';
    public static GET_NOTIFICATIONS_SUCCESS = '[APP LAYOUT] GET_NOTIFICATIONS_SUCCESS';
    public static TOGGLE_NOTIFICATIONS = '[APP LAYOUT] TOGGLE_NOTIFICATIONS';
    public static DELETE_NOTIFICATIONS = '[APP LAYOUT] DELETE_NOTIFICATIONS';
    public static TOGGLE_NOTIFICATIONS_SUCCESS = '[APP LAYOUT] TOGGLE_NOTIFICATIONS_SUCCESS';
    public static DELETE_NOTIFICATIONS_SUCCESS = '[APP LAYOUT] DELETE_NOTIFICATIONS_SUCCESS';
    public static SET_KEY_CODE = '[APP LAYOUT] SET_KEY_CODE';
    public static SET_TITLE = '[APP LAYOUT] SET_TITLE';
    public static SET_TITLE_SUCCESS = '[APP LAYOUT] SET_TITLE_SUCCESS';
    public static CREATE_LOCAL_NOTIFICATIONS = '[APP LAYOUT] CREATE_LOCAL_NOTIFICATIONS';
    public static REMOVE_LOCAL_NOTIFICATIONS = '[APP LAYOUT] REMOVE_LOCAL_NOTIFICATIONS';
    public static ADD_NOTIFICATION = '[APP LAYOUT] ADD_NOTIFICATION';
    public static EDIT_NOTIFICATION = '[APP LAYOUT] EDIT_NOTIFICATION';
    public static GET_PROJECT_VERSION = '[APP LAYOUT] GET_PROJECT_VERSION';
    public static GET_PROJECT_VERSION_SUCCESS = '[APP LAYOUT] GET_PROJECT_VERSION_SUCCESS';
    public static SET_PAGES_ACCESS = '[APP LAYOUT] SET_PAGES_ACCESS';
}

export class GetTitleAction implements Action {
    public readonly type: string = AppLayoutActions.GET_TITLE;
}

export class GetNotificationsAction implements Action {
    constructor(public payload: any) { }
    public readonly type: string = AppLayoutActions.GET_NOTIFICATIONS;
}

export class GetNotificationsSuccessAction implements Action {
    constructor(public payload: GroupNotifications) { }
    public readonly type: string = AppLayoutActions.GET_NOTIFICATIONS_SUCCESS;
}

export class GetTitleSuccessAction implements Action {
    constructor(public payload: {title: string, name: string}) { }
    public readonly type: string = AppLayoutActions.GET_TITLE_SUCCESS;
}

export class DeleteNotificationAction implements Action {
    constructor(public payload: IDeleteNotification) { }
    public readonly type: string = AppLayoutActions.DELETE_NOTIFICATIONS;
}

export class DeleteNotificationSucessAction implements Action {
    constructor(public payload: any) { }
    public readonly type: string = AppLayoutActions.DELETE_NOTIFICATIONS_SUCCESS;
}

export class ToggleNotificationAction implements Action {
    constructor(public payload: IToggleNotification) { }
    public readonly type: string = AppLayoutActions.TOGGLE_NOTIFICATIONS;
}

export class ToggleNotificationSuccessAction implements Action {
    constructor(public payload: any) { }
    public readonly type: string = AppLayoutActions.TOGGLE_NOTIFICATIONS_SUCCESS;
}

export class SetKeyCodeAction implements Action {
    constructor(public payload: string) { }
    public readonly type: string = AppLayoutActions.SET_KEY_CODE;
}

export class SetTitleAction implements Action {
    public readonly type: string = AppLayoutActions.SET_TITLE;
    constructor(public payload: {name: string, title: string}) { }
}

export class SetTitleSuccessAction implements Action {
    public readonly type: string = AppLayoutActions.SET_TITLE_SUCCESS;
    constructor(public payload: {name: string, title: string}) { }
}

export class CreateLocalNotificaitonAction implements Action {
    public readonly type: string = AppLayoutActions.CREATE_LOCAL_NOTIFICATIONS;
    constructor(public payload: NotificationsLocal) { }
}

export class RemoveLocalNotificaitonAction implements Action {
    public readonly type: string = AppLayoutActions.REMOVE_LOCAL_NOTIFICATIONS;
    constructor(public payload: NotificationsLocal) { }
}

export class AddNotificaitonAction implements Action {
    public readonly type: string = AppLayoutActions.ADD_NOTIFICATION;
    constructor(public payload: any) { }
}

export class EditNotificaitonAction implements Action {
    public readonly type: string = AppLayoutActions.EDIT_NOTIFICATION;
    constructor(public payload: any) { }
}

export class GetProjectVersion implements Action {
    public readonly type: string = AppLayoutActions.GET_PROJECT_VERSION;
}

export class GetProjectVersionSuccess implements Action {
    public readonly type: string = AppLayoutActions.GET_PROJECT_VERSION_SUCCESS;
    constructor(public payload: {code: string, sql: string}) { }
}

export class SetPagesAccess implements Action {
    public readonly type: string = AppLayoutActions.SET_PAGES_ACCESS;
    constructor(public payload: { pageId: number, pageName: string, hasAccess: true }[]) { }
}

export type Actions =
    | GetTitleAction
    | GetTitleSuccessAction
    | GetNotificationsAction
    | GetNotificationsSuccessAction
    | DeleteNotificationAction
    | ToggleNotificationAction
    | ToggleNotificationSuccessAction
    | DeleteNotificationSucessAction
    | CreateLocalNotificaitonAction
    | RemoveLocalNotificaitonAction
    | AddNotificaitonAction
    | EditNotificaitonAction
    | GetProjectVersion
    | GetProjectVersionSuccess
    | SetPagesAccess;
