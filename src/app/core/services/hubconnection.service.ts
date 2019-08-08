import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';
import { AppConfig } from '../../app.config';
import { SignalR, BroadcastEventListener } from 'ng2-signalr';
import { WebStorage, StorageType } from '@core/decorators/webstorage';
import { User } from '@core/store/auth';
import { Store } from '@ngrx/store';
import { UniterState } from '@core/store/reducers';
import * as AppLayout from '@store/app-layout';
import * as Selections from '@store/selection';
import * as AdvancedEditor from '@store/advanced-editor';
import * as Recommendations from '@store/recommendations';
import * as RecommendationsCalculatioons from '@store/recommendations-calculations';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
    providedIn: CoreModule
})
export class HubConnectionService {
    @WebStorage(StorageType.localStorage) public user: User;

    private hubConnection: any;
    private advancedHub: any;
    private selectionHub: any;
    private recommendationsHub: any;
    private signalROptions: any;
    private usersHub: any;

    constructor(
        private readonly appConfig: AppConfig,
        private readonly _signalR: SignalR,
        private readonly store: Store<UniterState>,
        private readonly router: Router) {
    }

    public async initConnect(): Promise<any> {
        // TODO: found new solutions. https://github.com/HNeukermans/ng2-signalr/issues/42
        this.signalROptions = {
            url: this.appConfig.socketUrl
        };

        await this.connectorToHubs('NotificationsHub', 'hubConnection', this.signalROptions, true);

        this.connectToHub('newNotification', 'hubConnection')
            .subscribe(({ notifications: [item], unreaded }) => {
                this.store.dispatch(new AppLayout.AddNotificaitonAction({ ...item, unreaded }));
            });

        this.connectToHub('editNotification', 'hubConnection')
            .subscribe(({ notifications: [item], unreaded }) => {
                this.store.dispatch(new AppLayout.EditNotificaitonAction({ ...item, unreaded }));
            });

        this.connectToHub('deleteNotification', 'hubConnection')
            .subscribe(data => {
                console.log(data);
            });

        await this.connectorToHubs('UsersHub', 'usersHub', this.signalROptions, true);

        this.connectToHub('UsersPages', 'usersHub')
            .subscribe(data => {
                this.store.dispatch(new AppLayout.SetPagesAccess(data));
            });
    }

    public async initConnectionToAdvancedHub(): Promise<any> {
        // TODO: Add unsubscribe after change route.
        if (this.advancedHub) {
            return;
        }

        await this.connectorToHubs('AdvancedHub', 'advancedHub', this.signalROptions, true);

        this.connectToHub('advancedDoneStatus', 'advancedHub')
            .pipe(filter(() => '/home/advanced-editor' === this.router.url))
            .subscribe((data: AdvancedStatus) => {
                this.store.dispatch(new AdvancedEditor.UpdateSqlStatements(data));
            });

        this.connectToHub('pushToRecommendationDoneStatus', 'advancedHub')
            .pipe(filter(() => '/home/advanced-editor' === this.router.url))
            .subscribe((data: PushToRecommendationDoneStatus) => {
                this.store.dispatch(new AdvancedEditor.PushSqlStatementsStatus(data));
            });

        this.connectToHub('showMessage', 'advancedHub')
            .pipe(filter(() => '/home/advanced-editor' === this.router.url))
            .subscribe((data: string) => {
                this.store.dispatch(new AppLayout.CreateLocalNotificaitonAction({
                    type: 'danger',
                    text: data
                }));
            });
    }

    public async initConnectionToSelectionHub(): Promise<any> {
        if (this.selectionHub) {
            return;
        }

        await this.connectorToHubs('SelectionHub', 'selectionHub', this.signalROptions, false);

        this.connectToHub('displayChangesMessage', 'selectionHub')
            .subscribe(() => {
                this.store.dispatch(new Selections.OpenRecomendationsDialog());
            });
    }

    public async initConnectionToRecommendationsHub(): Promise<any> {
        if (this.recommendationsHub) {
            return;
        }

        await this.connectorToHubs('RecommendationsHub', 'recommendationsHub', this.signalROptions, true);
        this.connectToHub('executionManualUpdateTime', 'recommendationsHub')
            .pipe(filter(() => '/home/recommendations' === this.router.url))
            .subscribe((data: LastChangesUpdateModel) => {
                this.store.dispatch(new Recommendations.UpdateLastChanges(data));
            });

        this.connectToHub('executionAutoUpdateTime', 'recommendationsHub')
            .pipe(filter(() => '/home/calculations' === this.router.url))
            .subscribe((data: LastChangesUpdateModel) => {
                this.store.dispatch(new RecommendationsCalculatioons.UpdateLastChanges(data));
            });

        this.connectToHub('executionMesage', 'recommendationsHub')
            .pipe(filter(() => '/home/calculations' === this.router.url))
            .subscribe((data: string) => {
                this.store.dispatch(new RecommendationsCalculatioons.UpdateLastChangesPostfixMessage(data));
            });
    }

    private connectToHub(nameHub: string, connectorName: string): BroadcastEventListener<any> {
        // add unsubscribe connection
        const stream = new BroadcastEventListener<any>(nameHub);
        this[connectorName].listen(stream);
        return stream;
    }

    private async connectorToHubs(name: string, hubsName: string, options?: any, withUserId?: boolean): Promise<any> {
        this[hubsName] = this._signalR.createConnection({ hubName: name, ...options });
        this[hubsName].status.subscribe((s) => console.warn(s.name));
        const hub = await this[hubsName].start();
        if (this.user !== null  && this.user.userId && withUserId) {
            hub.invoke('AssignUserId', this.user.userId);
        }

        return hub;
    }
}
