import { DraggableService } from './dragable/draggable.service';
import {
    Directive,
    Input,
    HostBinding,
    ElementRef,
    Renderer2,
    NgZone,
    OnDestroy,
    AfterViewInit,
    EventEmitter,
    Output
} from '@angular/core';

@Directive({
    selector: '[appDraggable]'
})
export class DraggableDirective implements AfterViewInit, OnDestroy {
    @Input()
    public set appDraggable(options) {
        if (options) {
            this.options = options;
        }
    }

    @Input() public draggableZone: string;

    @Input() public multiplyDraggable;

    @Input() public validateDraggable = false;

    @Output() public dragStart = new EventEmitter<any>();

    @HostBinding('draggable')
    public get draggable() {
        return true;
    }

    private options: any = {};
    private listenerFn: any = [];

    constructor(
        private readonly zone: NgZone,
        private readonly draggableService: DraggableService,
        private readonly element: ElementRef,
        private readonly renderer: Renderer2
    ) { }

    public ngAfterViewInit(): void {
        this.initListeners();
    }

    public ngOnDestroy(): void {
        this.listenerFn.forEach(itemFn => itemFn());
    }

    public onDragStart = (event) => {
        if (this.validateDraggable) {
            event.preventDefault();
            return;
        }

        const data = (this.multiplyDraggable && this.multiplyDraggable.length > 0)
            ? this.multiplyDraggable
            : this.options;

        this.dragStart.emit(data);
        const computedStyle = getComputedStyle(this.element.nativeElement);
        this.draggableService.sizeCurrentDrag = {
            width: parseFloat(computedStyle.width),
            height: parseFloat(computedStyle.height),
            count: Array.isArray(data) ? data.length : 1
        };

        this.draggableService.startDrag(this.draggableZone);
        event.dataTransfer.setData('Text', JSON.stringify({ data, zone: this.draggableZone }));
        event.dataTransfer.effectAllowed = 'move';
        this.renderer.setStyle(this.element.nativeElement, 'opacity', .3);
    }

    public onDragEnd = () => {
        this.renderer.setStyle(this.element.nativeElement, 'opacity', 1);
    }

    private initListeners(): void {
        this.zone.runOutsideAngular(() => {
            this.listenerFn.push(
                this.renderer.listen(
                    this.element.nativeElement,
                    'dragstart',
                    this.onDragStart
                )
            );

            this.listenerFn.push(
                this.renderer.listen(
                    this.element.nativeElement,
                    'dragend',
                    this.onDragEnd
                )
            );
        });
    }
}
