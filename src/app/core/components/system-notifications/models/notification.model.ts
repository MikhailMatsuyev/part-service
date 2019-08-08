
export enum NotificationsPosition {
    leftTop = 'leftTop',
    leftCenter = 'leftCenter',
    leftBottom = 'leftBottom',
    rightTop = 'rightTop',
    rightCenter = 'rightCenter',
    rightBottom = 'rightBottom',
}

export interface NotificationConfig {
    timeout: number;
}

export interface NotificationsLocal {
    type: 'success' | 'danger' | 'warning';
    text: string;
    id?: number;
}
