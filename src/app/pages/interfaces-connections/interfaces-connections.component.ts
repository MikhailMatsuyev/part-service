import { Store, select } from '@ngrx/store';
import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { UniterState } from '@store/reducers';
import { MatDialog, MatRadioChange } from '@angular/material';
import * as InterfaceConnections from '@store/interfaces-connections';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { map, filter, first } from 'rxjs/operators';
import { InterfaceConnectionsOptions } from '@core/models/generic';
import { VisEdges, VisNodes, VisNetworkOptions } from 'ngx-vis';
import {
    combineElementsDialog,
    InterfaceConnModalComponent,
} from '@core/components/dialogs';
import { BaseConections } from '@core/models/base-class/base-conectionts';
import { Unsubscribe, untilDestroyed } from '@core/decorators/unsubscribe';

@Component({
    selector: 'app-interfaces-connections',
    templateUrl: './interfaces-connections.component.html',
    styleUrls: ['./interfaces-connections.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@Unsubscribe()
export class InterfacesConnectionsComponent extends BaseConections implements OnInit, OnDestroy  {
    public interfaces: any[];
    public connectedComponents$ = this.store.pipe(select(InterfaceConnections.getConnectedComponents));
    public networkOptions: VisNetworkOptions = InterfaceConnectionsOptions;

    constructor(
        public dialog: MatDialog,
        private readonly store: Store<UniterState>,
        private readonly cd: ChangeDetectorRef
    ) {
        super();
    }

    public ngOnInit(): void {
        this.store.dispatch(new InterfaceConnections.GetInterfaces());
        this.store.dispatch(new InterfaceConnections.GetConnectionElements());

        this.store.pipe(
            select(InterfaceConnections.getInterfaces),
            filter(array => array.length > 0),
            first()
        ).subscribe(array => {
            this.interfaces = array;
            this.componentGroup = array[0].id;
            this.store.dispatch(new InterfaceConnections.GetConnectionInfo(this.componentGroup));
            this.cd.markForCheck();
        });

        combineLatest(
            this.store.pipe(
                select(InterfaceConnections.getInterfaceNetworkLinks),
                map(item => item.map(({ intId, compId }) => ({
                    id: `${intId}-${compId}`,
                    to: `comp-${compId}`,
                    from: `int-${intId}`,
                    arrows: 'to'
                })))
            ),
            this.store.pipe(
                select(InterfaceConnections.getInterfaceNetworkInterfaceNodes)
            ),
            this.store.pipe(
                select(InterfaceConnections.getInterfaceNetworkComponentNodes)
            )
        ).pipe(
            untilDestroyed(this),
        ).subscribe(([edges, interfaces, components]) => {
            this.visNetworkData = { edges: new VisEdges(edges), nodes: new VisNodes(this.mapInterfaceNodes(interfaces, components)) };
            this.cd.markForCheck();
        });
    }

    public ngOnDestroy(): void {
    }

    public changeComponentsSeries(data: any): void {
    }

    public changeInterface({ value }: MatRadioChange): void {
        this.store.dispatch(new InterfaceConnections.GetConnectionInfo(value));
    }

    public handleCombine(): void {
        const dialogRef = this.dialog.open(InterfaceConnModalComponent, {
            ...combineElementsDialog,
            data: {
                seriesId: this.componentGroup
            }
        });
        dialogRef.afterClosed()
            .pipe(
                filter(Boolean)
            )
            .subscribe(() => {
                this.store.dispatch(new InterfaceConnections.SaveInterfaceConnections(this.componentGroup));
            });
    }

    public handleDownload(): void {
        this.store.dispatch(new InterfaceConnections.DownloadInterfaceConnections(this.componentGroup));
    }

    public handleNetWorkClick(e: any): void {
        this.selectedNode = e.nodes[0];
        const data = this.mapNodes(this.visNetworkData.nodes.getAll(), this.selectedNode);
        this.visNetworkData.nodes.update(data);
    }

    public mapNodes(obj: any[], selected?: number): any[] {
        return obj.map(item => this.mapNode(item, selected));
    }

    public mapNode({ id, name, label }: any, selected?: number): any {
        return {
            id,
            label: name || label,
            color: (!selected || selected === id) ? this.setColorGroup(id) : this.setColorTransparentGroup(id),
            widthConstraint: { minimum: 300, maximum: 300 },
        };
    }

    public trackByFn(index: number, item: any): any {
        return item;
    }
 }
