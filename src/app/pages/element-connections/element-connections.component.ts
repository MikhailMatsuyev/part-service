import { Store, select } from '@ngrx/store';
import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { UniterState } from '@store/reducers';
import { MatCheckboxChange, MatDialog } from '@angular/material';
import * as ComponentConnections from '@store/component-connections';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { map, filter, takeUntil } from 'rxjs/operators';
import { VisEdges, VisNodes } from 'ngx-vis';
import {
    combineElementsDialog,
    combineUFDialog,
    formulasPreviewDialog,
    connectionsDownloadedModalDialog,
    CombineElementsComponent,
    UserFactorCombineComponent,
    FormulasPreviewModalComponent,
    ConnectionsDownloadedModalComponent
} from '@core/components/dialogs';
import { BaseConections } from '@core/models/base-class/base-conectionts';
import { Unsubscribe, untilDestroyed } from '@core/decorators/unsubscribe';

@Component({
    selector: 'app-element-connections',
    templateUrl: './element-connections.component.html',
    styleUrls: ['./element-connections.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@Unsubscribe()
export class ElementConnectionsComponent extends BaseConections implements OnInit, OnDestroy {
    public componentSeries$ = this.store.pipe(select(ComponentConnections.getComponentSeries));
    public allCheckbox$ = this.store.pipe(select(ComponentConnections.getActiveComponents));
    public combinedComponent$ = this.store.pipe(select(ComponentConnections.getCombinedComponents));
    public connectedUserFactor$ = this.store.pipe(select(ComponentConnections.getConnectedUserFactor));
    public hasFactive$ = this.store.pipe(select(ComponentConnections.getFactive));
    public countFormulas$ = this.store.pipe(select(ComponentConnections.getFormulasCount));
    public listFormuls = [];
    public displayComponents = ['All', 'Combined'];
    public defaultItem = 'All';
    public activeSeries = false;

    constructor(
        public dialog: MatDialog,
        private readonly store: Store<UniterState>,
        private readonly cd: ChangeDetectorRef
    ) {
        super();
    }

    public ngOnInit(): void {
        this.store.dispatch(new ComponentConnections.GetComponentSeries());

        combineLatest(
            this.store.pipe(
                select(ComponentConnections.getLinks),
                map(item => item.map(({base, comb}) => ({to: base, from: comb, arrows: 'from'})))
            ),
            this.store.pipe(
                select(ComponentConnections.getNames)
            )
        ).pipe(
            untilDestroyed(this),
        ).subscribe(([edges, nodes]) => {
            this.visNetworkData = { edges: new VisEdges(edges), nodes: new VisNodes(this.mapNodes(nodes)) };
            this.cd.markForCheck();
        });

        this.store
            .pipe(
                select(ComponentConnections.getFormulas),
                untilDestroyed(this),
            )
            .subscribe(item => {
                this.listFormuls = item;
            });

            this.store
            .pipe(
                select(ComponentConnections.getActiveComponentSeries),
                untilDestroyed(this)
            )
            .subscribe(item => {
                this.activeSeries = item;
            });
        }

    public ngOnDestroy(): void {
        this.visNetworkData = null;
        this.store.dispatch(new ComponentConnections.SetDefaultState());
    }

    public changeComponentsSeries(data: any): void {
        this.store.dispatch(new ComponentConnections.GetCombinedComponent(data));
    }

    public handleChange({ checked }: MatCheckboxChange, id: number): void {
        this.store.dispatch(new ComponentConnections.SetActiveComponent({checked, id}));
    }

    public changeHeader({ checked }: MatCheckboxChange): void {
        this.store.dispatch(new ComponentConnections.SetAllActiveComponent(checked));
    }

    public handleFictive({ checked }: MatCheckboxChange): void {
        this.store.dispatch(new ComponentConnections.SetFictiveUserFactor({ state: checked, serieId: this.componentGroup }));
    }

    public connectPerformances(): void {
        this.dialog.open(FormulasPreviewModalComponent, {
            ...formulasPreviewDialog,
            data: {
                listFormuls: this.listFormuls
            }
        });
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
                this.store.dispatch(new ComponentConnections.DownloadComponentConnections(item));
            });
    }

    public handleChangeDepth(value: number): void {
        this.store.dispatch(new ComponentConnections.SetDepthConnection(value));

        if (this.componentGroup) {
            this.store.dispatch(new ComponentConnections.GetNetworkData({id: this.componentGroup, depth: value}));
        }
    }

    public handleCombine(): void {
        const dialogRef = this.dialog.open(CombineElementsComponent, {
            ...combineElementsDialog,
            data: {
                seriesId: this.componentGroup
            }
        });
        dialogRef.afterClosed()
            .pipe(
                filter(item => item)
            )
            .subscribe(() => {
                this.store.dispatch(new ComponentConnections.SetCombinedComponentSeries({id: this.componentGroup}));
            });
    }

    public handleChangeDisplay(value: string): void {
        this.componentGroup = null;
        this.store.dispatch(new ComponentConnections.GetComponentSeries({ combined: value === 'Combined' }));
    }

    public handleCombineUserFactor(): void {
        const dialogRef = this.dialog.open(UserFactorCombineComponent, {
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
                this.store.dispatch(new ComponentConnections.SetUserFactorsImpl({id: this.componentGroup}));
            });
    }

    public trackByFn(index, item): number {
        return item;
    }
}
