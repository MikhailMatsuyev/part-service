import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { VisEdges, VisNodes, VisNetworkService } from 'ngx-vis';
import { networkOptions } from './model';
import { filter } from 'rxjs/operators';
import { Unsubscribe, untilDestroyed, OnDestroy } from '@core/decorators/unsubscribe';

@Component({
    selector: 'app-cards-connections',
    templateUrl: './cards-connections.component.html',
    styleUrls: ['./cards-connections.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@Unsubscribe()
export class CardsConnectionsComponent implements OnDestroy {
    @Input() public withDepth = true;
    @Input() public depth = [2, 3, 4];
    @Input() public headerName = '';
    @Input() public activeZoomControl = false;
    @Input() public visNetworkData: { nodes: VisNodes, edges: VisEdges };
    @Input() public visNetwork = 'networkId1';
    @Input() public defaultItemDepth = 2;
    @Input() public disabledFullscreen = false;
    @Input() public visNetworkOptions = networkOptions;

    @Output() public netWorkClick = new EventEmitter<any>();
    @Output() public netWorkDoubleClick = new EventEmitter<any>();
    @Output() public changeFullScreen = new EventEmitter<boolean>();
    @Output() public changeDepth = new EventEmitter<any>();

    private fullScreen = false;

    private filterEvents = ([item]: any[]): boolean => {
        return item === this.visNetwork;
    }

    constructor(private readonly visNetworkService: VisNetworkService) { }

    public ngOnDestroy(): void {
        this.visNetworkService.off(this.visNetwork, 'click');
        this.visNetworkService.off(this.visNetwork, 'doubleClick');
    }

    public handleChangeDepth(value: any): void {
        this.changeDepth.emit(value);
    }

    public handleFullScreen(): void {
        this.fullScreen = !this.fullScreen;
        this.changeFullScreen.emit(this.fullScreen);
    }

    public networkInitialized(obj: HTMLElement): void {
        this.visNetworkService.on(this.visNetwork, 'click');
        this.visNetworkService.on(this.visNetwork, 'doubleClick');

        this.visNetworkService.click
            .pipe(
                filter(this.filterEvents),
                untilDestroyed(this)
            )
            .subscribe(([, data]: any[]) => {
                this.netWorkClick.emit(data);
            });

        this.visNetworkService.doubleClick
            .pipe(
                filter(this.filterEvents),
                untilDestroyed(this)
            )
            .subscribe(([, data]: any[]) => {
                this.netWorkDoubleClick.emit(data);
            });

        this.setAttibuteTitle(obj, 'vis-zoomIn', 'Zoom in');
        this.setAttibuteTitle(obj, 'vis-zoomOut', 'Zoom out');
    }

    private setAttibuteTitle(obj: HTMLElement, classNames: string, title: string): void {
        // TODO: remove after found new solution. add dynamic renders buttons around canvas.
        const elements = obj.getElementsByClassName(classNames);

        if (elements) {
            Array.from(elements).forEach(item => {
                item.setAttribute('title', title);
            });
        }
    }
}
