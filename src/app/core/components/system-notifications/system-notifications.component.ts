import {
    Component,
    ChangeDetectionStrategy,
    Input,
    EventEmitter,
    Output
} from '@angular/core';
import { NotificationsPosition, NotificationConfig, NotificationsLocal } from './models/notification.model';
import { notificationsInOut } from './animations/notification.animation';

@Component({
    selector: 'app-system-notifications',
    templateUrl: './system-notifications.component.html',
    styleUrls: ['./system-notifications.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: notificationsInOut
})
export class AppSystemNotificationsComponent {
    @Input() public notifications: NotificationsLocal[];
    @Input() public position = NotificationsPosition.rightTop;
    @Input() public backdrop = -1;
    @Input() public configNotification: NotificationConfig = {
        timeout: 3000
    };

    @Output() public closeNotification = new EventEmitter<NotificationsLocal>();

    public handleCloseNotificaions(notification: NotificationsLocal): void {
        this.closeNotification.emit(notification);
    }

    public trackByFn(index: number, item: NotificationsLocal): number {
        return item.id;
    }
}
