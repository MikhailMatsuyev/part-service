import { VisEdges, VisNodes } from 'ngx-vis';
import { Store, select } from '@ngrx/store';
import { MatDialog, MatTableDataSource, MatCheckboxChange } from '@angular/material';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { UniterState } from '@store/reducers';
import { BaseConections } from '@core/models/base-class/base-conectionts';
import * as UserConnections from '@store/user-connections';
import { map, filter } from 'rxjs/operators';
import {
    connectionsDownloadedModalDialog,
    ConnectionsDownloadedModalComponent,
    combineElementsDialog,
    UserFactorCombineConnectedComponent,
    FormulasPreviewModalComponent,
    formulasPreviewDialog,
    combineUFDialog,
    ComponentDimensioningModalComponent
} from '@core/components/dialogs';
import { Unsubscribe, untilDestroyed } from '@core/decorators/unsubscribe';

@Component({
    selector: 'app-user-factors-connection',
    templateUrl: './user-factors-connection.component.html',
    styleUrls: ['./user-factors-connection.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@Unsubscribe()
export class UserFactorsConnectionComponent extends BaseConections implements OnInit, OnDestroy {
    public displayComponents = ['All user factors', 'Combined user factors', 'User factors without connections'];
    public defaultItem = 'All user factors';
    public displayedColumns = [
        'id',
        'isChecked',
        'name',
        'dimEnabled',
        'maxDim',
        'formula'
    ];
    public userFactorsImpl$ = this.store.pipe(
        select(UserConnections.getUserFactorsConnections),
        map(item => new MatTableDataSource(item))
    );
    public countFormulas$ = this.store.pipe(select(UserConnections.getFormulasCount));
    public connectedComponent$ = this.store.pipe(select(UserConnections.getConnectedComponents));
    public connectedUserFactor$ = this.store.pipe(select(UserConnections.getConnectedUserFactor));
    public componentSerisDimImpl$ = this.store.pipe(select(UserConnections.getComponentSeriesDimImpl));
    public allCheckbox$ = this.store.pipe(select(UserConnections.getActiveComponents));
    public activeSeries = false;
    public componentNames: any;
    public listFormuls: any[];

    constructor(
        public dialog: MatDialog,
        private readonly store: Store<UniterState>,
        private readonly cd: ChangeDetectorRef
    ) {
        super();
    }

    public ngOnInit(): void {
        this.store.dispatch(new UserConnections.GetUserFactor());
        this.store.dispatch(new UserConnections.GetComponentSeriesImpl());
        this.store.dispatch(new UserConnections.GetUserFactorsList(-1));

        this.store.pipe(
            select(UserConnections.getNetworkData),
            filter(item => !!item),
            map(({links, names}) => ({edges: links.map(({base, comb}) => ({to: base, from: comb, arrows: 'from'})), nodes: names})),
            untilDestroyed(this),
        ).subscribe(({ edges, nodes }) => {
            this.visNetworkData = { edges: new VisEdges(edges), nodes: new VisNodes(this.mapNodes(nodes)) };
            this.cd.markForCheck();
        });

        this.store
            .pipe(
                select(UserConnections.getActiveComponentSeries),
                untilDestroyed(this),
            )
            .subscribe(item => {
                this.activeSeries = item;
                this.cd.markForCheck();
            });

        this.store
            .pipe(
                select(UserConnections.getFormulas),
                untilDestroyed(this)
            )
            .subscribe(item => {
                this.listFormuls = item;
            });
    }

    public ngOnDestroy(): void {
        this.store.dispatch(new UserConnections.SetDefaultState());
    }

    public handleChangeDisplay(value: string): void {
        this.componentGroup = null;
        this.store.dispatch(new UserConnections.GetUserFactor({
            combinedOnly: value === 'Combined user factors',
            withoutConnections: value === 'User factors without connections'
        }));
    }

    public handleChangeDepth(value: number): void {
        this.store.dispatch(new UserConnections.SetDepthConnection(value));

        if (this.componentGroup) {
            this.store.dispatch(new UserConnections.GetNetworkData({id: this.componentGroup, depth: value}));
        }
    }

    public changeValues(value: number, obj: any): void {
        this.componentNames = obj.name;
        this.store.dispatch(new UserConnections.GetCombinedComponent(value));
    }

    public handleDownload(): void {
        const dialogRef = this.dialog.open(ConnectionsDownloadedModalComponent, {
            ...connectionsDownloadedModalDialog,
            data: {
                isNotSelected: this.activeSeries
            }
        });

        dialogRef.afterClosed()
            .pipe(
                filter(item => item)
            )
            .subscribe(item => {
                this.store.dispatch(new UserConnections.DownloadComponentConnections({...item, type: 0}));
            });
    }

    public connectPerformances(): void {
        this.dialog.open(FormulasPreviewModalComponent, {
            ...formulasPreviewDialog,
            data: {
                listFormuls: this.listFormuls
            }
        });
    }

    public handleCombineUserFactor(): void {
        const dialogRef = this.dialog.open(UserFactorCombineConnectedComponent, {
            ...combineElementsDialog,
            data: {
                name: this.componentNames,
                seriesId: this.componentGroup
            }
        });
        dialogRef.afterClosed()
            .pipe(
                filter(item => item)
            )
            .subscribe(() => {
                this.store.dispatch(new UserConnections.SetUserFactorsImpl({id: this.componentGroup}));
            });
    }

    public handleCombineComponent(): void {
        const dialogRef = this.dialog.open(ComponentDimensioningModalComponent, {
            ...combineUFDialog,
            data: {
                seriesId: this.componentGroup
            }
        });
        dialogRef.afterClosed()
            .pipe(
                filter(item => item)
            )
            .subscribe(() => {
                this.store.dispatch(new UserConnections.SetCombinedComponentSeries({id: this.componentGroup}));
            });
    }

    public handleChangeValue(value: string | number, obj: any, nameField: string): void {
        this.store.dispatch(new UserConnections.UpdateUserFactorImpl({...obj, [nameField]: value, isNeedUpdate: false}));
    }

    public handleCheckTable({ checked }: MatCheckboxChange, obj: any): void {
        this.store.dispatch(new UserConnections.UpdateUserFactorImpl({...obj, dimEnabled: checked, isNeedUpdate: true}));
    }

    public handleCheck({ checked }: MatCheckboxChange, obj: any): void {
        this.store.dispatch(new UserConnections.SetActiveComponent({id: obj.id, checked}));
    }

    public changeComponentsSeries(data: any): void {
        this.store.dispatch(new UserConnections.GetCombinedComponent(data));
    }

    public handleSelectAllChange({ checked }: MatCheckboxChange): void {
        this.store.dispatch(new UserConnections.SetAllActiveComponent(checked));
    }
}
