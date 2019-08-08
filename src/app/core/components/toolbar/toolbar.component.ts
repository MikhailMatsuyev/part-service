import {
    Component,
    ChangeDetectionStrategy,
    ViewChildren,
    QueryList,
    ElementRef,
    AfterViewInit,
    ChangeDetectorRef,
    Output,
    EventEmitter
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UniterState } from '@store/reducers';
import * as AppLayout from '@store/app-layout';
import { delay } from 'rxjs/operators';
import { Unsubscribe, untilDestroyed, OnDestroy } from '@core/decorators/unsubscribe';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@Unsubscribe()
export class ToolbarComponent implements AfterViewInit, OnDestroy {
    @Output() public openedNotifications = new EventEmitter<boolean>();
    @Output() public openPersonMenu = new EventEmitter<void>();
    public hoverElemWidth: number;
    public navElemLeft: number;
    public currentUrl = '';
    public currentElement: ElementRef = null;
    public countNotifications$ = this.store.pipe(select(AppLayout.getUnreadNotification));
    public isActiveNotification = false;
    @ViewChildren('sliders',  { read: ElementRef }) public sliders: QueryList<ElementRef>;

    constructor(
        private readonly store: Store<UniterState>,
        private readonly cd: ChangeDetectorRef
    ) { }

    public ngAfterViewInit(): void {
        this.store.select(AppLayout.getCurrentUrl)
            .pipe(
                delay(0),
                untilDestroyed(this)
            )
            .subscribe(item => {
                this.currentUrl = item;
                this.currentElement = this.sliders.find(({ nativeElement }) => {
                    const link = nativeElement.getAttribute('slid-link');
                    return link && this.isActiveUrl(link);
                });

                this.setDefaultSize();
                this.cd.markForCheck();
            });
    }

    public ngOnDestroy(): void {
    }

    public isActiveUrl(url: string): boolean {
        const arrayUrl = url.split(' ');
        return arrayUrl.some(item => this.currentUrl.includes(item));
    }

    public hoverItem({ currentTarget: { offsetWidth, offsetLeft} }): void {
        this.setSize({ width: offsetWidth, left: offsetLeft });
    }

    public leaveItem(): void {
        this.setDefaultSize();
    }

    public handleNotification(): void {
        this.isActiveNotification = !this.isActiveNotification;
        this.openedNotifications.emit(this.isActiveNotification);
    }

    public clickPersonMenu(): void {
        this.openPersonMenu.emit();
    }

    private setDefaultSize(): void {
        if (!this.currentElement) {
            return;
        }

        const { nativeElement: { offsetWidth, offsetLeft } } = this.currentElement;
        this.setSize({ width: offsetWidth, left: offsetLeft });
    }

    private setSize({width, left }): void {
        this.hoverElemWidth = width;
        this.navElemLeft = left;
    }
}
