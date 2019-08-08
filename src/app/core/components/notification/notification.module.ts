import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AppNotificationComponent } from './notification.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NotificationFileComponent } from './notification-file/notification-file.component';
import { MatButtonModule } from '@angular/material/button';
import { NotificationInfoComponent } from './notification-info/notification-info.component';

const components = [
    AppNotificationComponent,
    NotificationFileComponent,
    NotificationInfoComponent
];

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        FlexLayoutModule,
        MatButtonModule
    ],
    declarations: [...components],
    exports: [...components]
})
export class NotificationModule { }
