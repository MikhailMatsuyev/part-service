import { Input, AfterViewInit, ElementRef, HostListener, Directive, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'textarea[autosize]',
  exportAs: 'autosize'
})
export class AutosizeDirective implements AfterViewInit, OnChanges {

    private el: HTMLElement;
    private _minHeight: string;
    private _maxHeight: string;
    private _lastHeight: number;
    private _clientWidth: number;

    @Input('minHeight')
    get minHeight(): string {
        return this._minHeight;
    }
    set minHeight(val: string) {
        this._minHeight = val;
        this.updateMinHeight();
    }

    @Input('maxHeight')
    get maxHeight(): string {
        return this._maxHeight;
    }
    set maxHeight(val: string) {
        this._maxHeight = val;
        this.updateMaxHeight();
    }

    @HostListener('window:resize', ['$event.target'])
    public onResize(textArea: HTMLTextAreaElement): void {
        if (this.el.clientWidth === this._clientWidth) {
            return;
        }

        this._clientWidth = this.element.nativeElement.clientWidth;
        this.adjust();
    }

    @HostListener('input', ['$event.target'])
    public onInput(textArea: HTMLTextAreaElement): void {
        this.adjust();
    }

    constructor(public element: ElementRef) {
        this.el = element.nativeElement;
        this._clientWidth = this.el.clientWidth;
    }

    public ngAfterViewInit(): void {
        const style = window.getComputedStyle(this.el, null);

        if (style.resize === 'both') {
            this.el.style.resize = 'horizontal';
        } else if (style.resize === 'vertical') {
            this.el.style.resize = 'none';
        }

        this.adjust();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        const value = changes['value'];

        if (value && value.currentValue) {
            this.adjust();
        }
    }

    public adjust(): void {
        if (this.el.style.height === `${this.element.nativeElement.scrollHeight}px`) {
            return;
        }

        this.el.style.overflow = 'hidden';
        this.el.style.height = 'auto';
        this.el.style.height = `${this.el.scrollHeight}px`;
    }

    public updateMinHeight(): void {
        this.el.style.minHeight = `${this._minHeight}px`;
    }

    public updateMaxHeight(): void {
        this.el.style.maxHeight = `${this._maxHeight}px`;
    }

}
