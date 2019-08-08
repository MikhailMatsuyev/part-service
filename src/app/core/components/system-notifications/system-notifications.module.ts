import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSystemNotificationsComponent } from './system-notifications.component';
import { AppLocalNotificationComponent } from './local-notification/local-notification.component';
import { MatIconModule } from '@angular/material';

const components = [
    AppSystemNotificationsComponent,
    AppLocalNotificationComponent
];

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        BrowserAnimationsModule
    ],
    declarations: [...components],
    exports: [...components]
})
export class SystemNotificationsModule {
}
