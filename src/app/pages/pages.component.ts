import { dialogInOut } from './selection/custom-dialog/animations/custom-animations';
import { Store, select } from '@ngrx/store';
import { Component, ChangeDetectionStrategy, OnInit, NgZone } from '@angular/core';
import { UniterState } from '@store/reducers';
import * as AppLayout from '@store/app-layout';
import * as Users from '@store/users';
import * as Auth from '@store/auth';
import { MatDialog } from '@angular/material';
import {
    ProjectModalComponent,
    UsersOnlineModalComponent,
    ChangePasswordComponent,
    projectModalDialog,
    usersOnlineModalDialog,
    changePasswordModalDialog
} from '@core/components/dialogs';
import { filter } from 'rxjs/operators';
import { NotificationsLocal } from '@core/components/system-notifications/models/notification.model';
import { HubConnectionService } from '@core/services/hubconnection.service';
import * as Selections from '@store/selection';

export const KeysCodes = {
    MetaLeft: 'ctrl',
    ControlLeft: 'ctrl',
    ControlRight: 'ctrl',
};

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: dialogInOut
})
export class PagesComponent implements OnInit {
    public opened = false;
    public keyCodes: string;
    public notification$ = this.store.pipe(select(AppLayout.getNotification));
    public onlineStatus$ = this.store.pipe(select(Users.getOnlineStatusCount));
    public isActiveNodeInfo$ = this.store.pipe(select(Selections.getActiveNodeInfo));
    public activePersonMenu = false;
    public projectInfo = null;
    public systemNotifications$ = this.store.pipe(select(AppLayout.getLocalNotification));
    public projectVersion$ = this.store.pipe(select(AppLayout.getProjectVersion));

    constructor(
        public dialog: MatDialog,
        private readonly store: Store<UniterState>,
        private readonly ngZone: NgZone,
        private readonly hubConnectionService: HubConnectionService) {
    }

    public ngOnInit(): void {
        this.hubConnectionService.initConnect();
        this.store.dispatch(new AppLayout.GetNotificationsAction({ batchSize: 30, batchPart: 1 }));
        this.addListener();
        this.store.pipe(select(AppLayout.getProjectInfo))
            .subscribe(item => {
                this.projectInfo = item;
            });
    }

    public handleCloseDialog(): void {
        this.store.dispatch(new Selections.ClearInfoBlock());
    }

    public changeStatusNotification(obj: IToggleNotification): void {
        this.store.dispatch(new AppLayout.ToggleNotificationAction(obj));
    }

    public closeNotification(obj: IDeleteNotification): void {
        this.store.dispatch(new AppLayout.DeleteNotificationAction(obj));
    }

    public handleProject(): void {
        const dialogRef = this.dialog.open(ProjectModalComponent, {
            ...projectModalDialog,
            data: {
                projectInfo: this.projectInfo
            }
        });

        dialogRef.afterClosed()
            .pipe(
                filter(item => item)
            )
            .subscribe(({projectName, titlePage}) => {
                this.store.dispatch(new AppLayout.SetTitleAction({ name: projectName, title: titlePage }));
            });
    }

    public handleOnline(): void {
        this.dialog.open(UsersOnlineModalComponent, usersOnlineModalDialog);
    }

    public handleChangePassword(): void {
        this.dialog.open(ChangePasswordComponent, changePasswordModalDialog);
    }

    public handlePersonMenu(): void {
        this.activePersonMenu = !this.activePersonMenu;

        if (this.activePersonMenu) {
            this.store.dispatch(new Users.GetUsersOnline());
            this.store.dispatch(new AppLayout.GetProjectVersion());
        }
    }

    public handleLogout(): void {
        this.store.dispatch(new Auth.Logout());
    }

    public handleCloseNotification(element: NotificationsLocal): void {
        this.store.dispatch(new AppLayout.RemoveLocalNotificaitonAction(element));
    }

    private addListener(): void {
        this.ngZone.runOutsideAngular(() => {
            window.addEventListener('keydown', this.listener);
        });
    }

    private listener = (event) => {
        if (event.ctrlKey && this.keyCodes !== KeysCodes[event.code]) {
            this.ngZone.runOutsideAngular(() => {
                // TODO: can add renderer2
                window.addEventListener('keyup', this.keyUpListener);
                window.removeEventListener('keydown', this.listener);
            });

            this.store.dispatch(new AppLayout.SetKeyCodeAction(KeysCodes[event.code]));
        }
    }

    private keyUpListener = () => {
        this.store.dispatch(new AppLayout.SetKeyCodeAction(null));

        this.ngZone.runOutsideAngular(() => {
            window.removeEventListener('keyup', this.keyUpListener);
            window.addEventListener('keydown', this.listener);
        });
    }

    public trackByFn(index: number, item: Notifications): number {
        return item.id;
    }
}
