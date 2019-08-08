import {
    Directive,
    ElementRef,
    Renderer2,
    NgZone,
    AfterViewInit,
    Input,
    OnDestroy
} from '@angular/core';

@Directive({
    selector: 'input[appPatternControl]'
})
export class InputPatternDirective implements AfterViewInit, OnDestroy {

    @Input() patternControl: RegExp = /[^0-9]/g;
    private listenerFn: () => void;

    constructor(
        private readonly element: ElementRef,
        private readonly zone: NgZone,
        private readonly renderer: Renderer2
    ) { }

    public ngAfterViewInit(): void {
        this.zone.runOutsideAngular(() => {
            this.listenerFn = this.renderer.listen(
                this.element.nativeElement,
                'input',
                this.onInput
            );
        });
    }

    public ngOnDestroy(): void {
        this.listenerFn();
    }

    private onInput = ({ currentTarget: { value } }: any): void => {
        this.element.nativeElement.value = value.replace(this.patternControl, '');
    }
}
