import {
    Component,
    ChangeDetectionStrategy,
    Input,
    EventEmitter,
    Output
} from '@angular/core';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppNotificationComponent {
    @Input() public notification: Notifications = null;
    @Output() public changeStatus = new EventEmitter<IToggleNotification>();
    @Output() public closeNotification = new EventEmitter<IDeleteNotification>();

    public handleStatus(): void {
        const { id, readed } = this.notification;
        this.changeStatus.emit({id, isReaded: !readed});
    }

    public handleClose(): void {
        this.closeNotification.emit({ id: this.notification.id});
    }
}
