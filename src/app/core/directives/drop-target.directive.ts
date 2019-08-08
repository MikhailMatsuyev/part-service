import {
    Directive,
    Input,
    Output,
    EventEmitter,
    Renderer2,
    ElementRef,
    NgZone,
    OnDestroy,
    ContentChild,
    AfterViewInit
} from '@angular/core';
import { DraggableService } from './dragable/draggable.service';
import { DraggablePlaceholderDirective } from './dragable-placeholder.directive';

export function getDirectChildElement(parentElement: Element, childElement: Element): Element | null {
    let directChild: Node = childElement;
    while ( directChild.parentNode !== parentElement ) {
        if (!directChild.parentNode ) {
            return null;
        }

        directChild = directChild.parentNode;
    }
    return directChild as Element;
}

export function shouldPositionPlaceholderBeforeElement(event: DragEvent, element: Element) {
    const bounds = element.getBoundingClientRect();
    return (event.clientX < bounds.left + bounds.width / 2) && (event.clientY < bounds.top + bounds.height / 2);
}

@Directive({
    selector: '[appDropTarget]'
})
export class DropTargetDirective implements AfterViewInit, OnDestroy {
    @Input()
    set appDropTarget(options: any) {
      if (options) {
        this.options = options;
      }
    }

    @Input() dropZone: string;
    @Input() needGhostNode = true;

    @Output() public dropEvent = new EventEmitter();

    @ContentChild(DraggablePlaceholderDirective)
    private readonly dndPlaceholderRef?: DraggablePlaceholderDirective;

    private options: any = {};
    private listenersFn: any[] = [];
    private placeholder: Element | null = null;

    constructor(
        private readonly dragService: DraggableService,
        private readonly zone: NgZone,
        private readonly element: ElementRef,
        private readonly renderer: Renderer2
    ) {
    }

    public ngAfterViewInit(): void {
        if (this.needGhostNode) {
            this.placeholder = this.getPlaceholderElement();
        }

        if (this.placeholder !== null) {
            this.placeholder.remove();
        }

        this.initListeners();
    }

    public ngOnDestroy(): void {
        this.listenersFn.forEach(itemFn => itemFn());
    }

    public onDragOver = (event): void => {
        if (this.dragService.accepts(this.dropZone)) {
            event.preventDefault();
            this.renderer.addClass(this.element.nativeElement, 'dropzone');

            if (this.needGhostNode) {
                this.checkAndUpdatePlaceholderPosition(event);
            }
        }
    }

    public onDragLeave = (e): void => {
        const rect = this.element.nativeElement.getBoundingClientRect();
        if (e.clientY < rect.top || e.clientY >= rect.bottom || e.clientX < rect.left || e.clientX >= rect.right) {
            this.renderer.removeClass(this.element.nativeElement, 'dropzone');

            if (this.needGhostNode && this.placeholder) {
                this.placeholder.remove();
            }
        }
    }

    public onDrop = (event): void => {
        const data = JSON.parse(event.dataTransfer.getData('Text'));

        if (data.zone !== this.dropZone) {
            return;
        }

        const dropIndex = this.getPlaceholderIndex();
        this.dropEvent.emit({
            data,
            index: dropIndex,
            cordsPage: {
                x: event.clientX,
                y: event.clientY,
                offsetX: event.offsetX + event.target.offsetLeft,
                offsetY: event.offsetY + event.target.offsetTop
            }
        });
        this.renderer.removeClass(this.element.nativeElement, 'dropzone');

        if (this.needGhostNode && this.placeholder) {
            this.placeholder.remove();
        }
    }

    private initListeners(): void {
        this.zone.runOutsideAngular(() => {
            this.listenersFn.push(
                this.renderer.listen(
                    this.element.nativeElement,
                    'dragenter',
                    this.onDragOver
                )
            );

            this.listenersFn.push(
                this.renderer.listen(
                    this.element.nativeElement,
                    'dragover',
                    this.onDragOver
                )
            );

            this.listenersFn.push(
                this.renderer.listen(
                    this.element.nativeElement,
                    'dragleave',
                    this.onDragLeave
                )
            );

            this.listenersFn.push(
                this.renderer.listen(
                    this.element.nativeElement,
                    'drop',
                    this.onDrop
                )
            );
        });
    }

    private getPlaceholderElement(): Element | null {
        if ( typeof this.dndPlaceholderRef !== 'undefined' ) {
            return this.dndPlaceholderRef.elementRef.nativeElement as Element;
        }

        return this.element.nativeElement.querySelector('[appDraggablePlaceholder]');
    }

    private checkAndUpdatePlaceholderPosition(event: DragEvent): void {
        if (this.placeholder === null) {
          return;
        }

        // make sure the placeholder is in the DOM
        const counts = this.dragService.sizeCurrentDrag.count;
        if (this.placeholder.parentNode !== this.element.nativeElement) {
            for (let i = 0; i < counts; i++) {
                (<HTMLElement>this.placeholder).style.width = `${this.dragService.sizeCurrentDrag.width}px`;
                (<HTMLElement>this.placeholder).style.height = `${this.dragService.sizeCurrentDrag.height}px`;
                this.renderer.appendChild(this.element.nativeElement, this.placeholder);
            }
        }

        // update the position if the event originates from a child element of the dropzone
        const directChild = getDirectChildElement(this.element.nativeElement, event.target as Element );

        // early exit if no direct child or direct child is placeholder
        if (directChild === null || directChild === this.placeholder) {
            return;
        }

        const positionPlaceholderBeforeDirectChild = shouldPositionPlaceholderBeforeElement(event, directChild);
        if (positionPlaceholderBeforeDirectChild && directChild.previousSibling !== this.placeholder) {
            for (let i = 0; i < counts; i++) {
                this.renderer.insertBefore( this.element.nativeElement, this.placeholder, directChild );
            }
        } else if (directChild.nextSibling !== this.placeholder) {
            for (let i = 0; i < counts; i++) {
                this.renderer.insertBefore( this.element.nativeElement, this.placeholder, directChild.nextSibling );
            }
        }
    }

    private getPlaceholderIndex(): number | undefined {
        if (this.placeholder === null) {
          return undefined;
        }
        const element = this.element.nativeElement as HTMLElement;
        return Array.from(element.children).indexOf(this.placeholder);
    }
}
