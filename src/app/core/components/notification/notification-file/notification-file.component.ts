import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { AppConfig } from '../../../../app.config';

@Component({
    selector: 'app-notification-file',
    templateUrl: './notification-file.component.html',
    styleUrls: ['./notification-file.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationFileComponent {
    @Input() public notification: Notifications = null;

    constructor(public readonly appConfig: AppConfig) { }

    public getUrl(link: string): string {
        return `${this.appConfig.apiUrl}Files/Download/?id=${link}`;
    }
}
