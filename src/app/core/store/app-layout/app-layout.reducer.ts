import { AppLayoutActions } from './app-layout.actions';
import { NotificationsLocal } from '@core/components/system-notifications/models/notification.model';
import { uuid } from '@utils/utilsfunc';

// tslint:disable-next-line:no-empty-interface
export interface IAppSettings {
    titlePage: string;
    notifications: Notifications[];
    unreadedNotification: number;
    keyCodes: string;
    projectName: string;
    localNotifications: NotificationsLocal[];
    projectVersion: { code: string, sql: string };
    pages: { pageId: number, pageName: string, hasAccess: true, tabName: string }[];
}

const initialState: IAppSettings = {
    titlePage: '',
    notifications: null,
    unreadedNotification: null,
    keyCodes: null,
    projectName: '',
    localNotifications: [],
    projectVersion: null,
    pages: []
};

export function appLayout(state: IAppSettings = initialState, action: IUnsafeAction): IAppSettings {
    const { type, payload } = action;

    switch (type) {
        case AppLayoutActions.GET_TITLE_SUCCESS: {
            const { title, name } = payload;
            return { ...state, titlePage: title, projectName: name };
        }

        case AppLayoutActions.GET_NOTIFICATIONS_SUCCESS: {
            const { notifications, unreaded } = payload;
            return { ...state, notifications, unreadedNotification: unreaded };
        }

        case AppLayoutActions.TOGGLE_NOTIFICATIONS_SUCCESS: {
            const { notification, unreadedCount } = payload;
            return {
                ...state,
                notifications: state.notifications.map(item => {
                    if (item && notification && item.id === notification.id) {
                        return notification;
                    }
                    return item;
                }),
                unreadedNotification: unreadedCount
            };
        }

        case AppLayoutActions.DELETE_NOTIFICATIONS_SUCCESS: {
            const { id, unreadedCount } = payload;
            return {
                ...state,
                notifications: state.notifications.filter(item => {
                    return item && id && item.id !== id;
                }),
                unreadedNotification: unreadedCount
            };
        }

        case AppLayoutActions.SET_KEY_CODE: {
            return { ...state, keyCodes: payload };
        }

        case AppLayoutActions.SET_TITLE_SUCCESS: {
            const { name, title } = payload;

            return {
                ...state,
                projectName: name,
                titlePage: title
            };
        }

        case AppLayoutActions.CREATE_LOCAL_NOTIFICATIONS: {
            return {
                ...state,
                localNotifications: [...state.localNotifications, {...payload, id: uuid()}]
            };
        }

        case AppLayoutActions.REMOVE_LOCAL_NOTIFICATIONS: {
            const { id } = payload;

            return {
                ...state,
                localNotifications: state.localNotifications.filter(item => item.id !== id)
            };
        }

        case AppLayoutActions.ADD_NOTIFICATION: {
            const { unreaded, ...data } = payload;

            return {
                ...state,
                notifications: [{...data}, ...state.notifications],
                unreadedNotification: unreaded
            };
        }

        case AppLayoutActions.EDIT_NOTIFICATION: {
            const { unreaded, ...data } = payload;

            const notifications = state.notifications.map(item => {
                if (data.id === item.id) {
                    return data;
                }

                return item;
            });

            return {
                ...state,
                notifications,
                unreadedNotification: unreaded
            };
        }

        case AppLayoutActions.GET_PROJECT_VERSION_SUCCESS: {
            return {
                ...state,
                projectVersion: payload
            };
        }

        case AppLayoutActions.SET_PAGES_ACCESS: {
            return {
                ...state,
                pages: payload
            };
        }

        default: {
            return state;
        }
    }
}
