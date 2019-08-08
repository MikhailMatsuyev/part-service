import {
    Directive,
    Input,
    Renderer2,
    ElementRef,
    AfterViewInit,
    NgZone,
    OnInit,
    OnDestroy
} from '@angular/core';

@Directive({
    selector: 'input[appResize]'
})
export class ResizeInputDirective implements OnInit, AfterViewInit, OnDestroy {
    @Input() public sizeWordWidth = 8;
    @Input() public needRecalulateInput = false;
    @Input() public set widthCalculate(value: string) {
        this.setWith(value);
    }

    private listenerFn: () => void;

    constructor(
        private readonly render: Renderer2,
        private readonly element: ElementRef,
        private readonly zone: NgZone
    ) {
    }

    public ngOnInit(): void {
        this.initListener();
    }

    public ngOnDestroy(): void {
        this.listenerFn();
    }

    public ngAfterViewInit(): void {
        this.setWith(this.element.nativeElement.value);
    }

    public onKeyDown = ({ target: { value } }: any) => {
        if (!this.needRecalulateInput) {
            return;
        }

        this.setWith(value);
    }

    private setWith(value: string): void {
        const widthContainer = value ? (value.length + 1) * this.sizeWordWidth : this.sizeWordWidth;
        this.render.setStyle(this.element.nativeElement, 'width', `${widthContainer}px`);
    }

    private initListener(): void {
        this.zone.runOutsideAngular(() => {
            this.listenerFn = this.render.listen(
                this.element.nativeElement,
                'keyup',
                this.onKeyDown
            );
        });
    }
}
