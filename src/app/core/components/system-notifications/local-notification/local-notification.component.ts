import {
    Component,
    ChangeDetectionStrategy,
    Input,
    EventEmitter,
    Output,
    OnInit,
    OnDestroy
} from '@angular/core';
import { NotificationConfig, NotificationsLocal } from '../models/notification.model';

@Component({
    selector: 'app-local-notification',
    templateUrl: './local-notification.component.html',
    styleUrls: ['./local-notification.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppLocalNotificationComponent implements OnInit, OnDestroy {
    @Input() public notification: NotificationsLocal;
    @Input() public configNotification: NotificationConfig;
    @Output() public closeNotification = new EventEmitter<void>();

    private timeId: any;

    public ngOnInit(): void {
        this.timeId = setTimeout(() => {
            this.closeNotification.emit();
        }, this.configNotification.timeout);
    }

    public ngOnDestroy(): void {
        clearTimeout(this.timeId);
    }

    public onClick(): void {
        this.closeNotification.emit();
    }
}
