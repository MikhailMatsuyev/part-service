import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[appDraggablePlaceholder]'
})
export class DraggablePlaceholderDirective {
    constructor( public readonly elementRef: ElementRef) {
    }
}
