import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'app-notification-info',
    templateUrl: './notification-info.component.html',
    styleUrls: ['./notification-info.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationInfoComponent {
    @Input() public notification: Notifications = null;
}
