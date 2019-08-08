import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionModule } from './selection/selection.module';
import { LoginModule } from './login/login.module';
import { PagesRoutingModule } from './pages.routing';
import { PagesComponent } from './pages.component';
import { ToolbarModule } from '../core/components/toolbar/toolbar.module';
import { CadrsModule } from '../core/components/cards/cards.component.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NotificationModule } from '../core/components/notification/notification.module';
import { MatListModule } from '@angular/material/list';
import { DialogsModule } from '../core/components/dialogs/dialogs.module';
import { SystemNotificationsModule } from '@core/components/system-notifications/system-notifications.module';

@NgModule({
    declarations: [
        PagesComponent
    ],
    imports: [
        CommonModule,
        SelectionModule,
        LoginModule,
        PagesRoutingModule,
        ToolbarModule,
        CadrsModule,
        MatSidenavModule,
        NotificationModule,
        MatListModule,
        DialogsModule,
        SystemNotificationsModule
    ],
    exports: [
        SelectionModule,
        LoginModule,
        PagesRoutingModule
    ]
})
export class PagesModule { }
