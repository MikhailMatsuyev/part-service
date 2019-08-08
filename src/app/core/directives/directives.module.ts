import { NgModule } from '@angular/core';
import { ResizeInputDirective } from './resize-input.directive';
import { DraggableDirective } from './dragable.directive';
import { DraggableService } from './dragable/draggable.service';
import { DropTargetDirective } from './drop-target.directive';
import { DraggablePlaceholderDirective } from './dragable-placeholder.directive';
import { InputPatternDirective } from './input-pattern.directive';

const directives = [
    ResizeInputDirective,
    DraggableDirective,
    DropTargetDirective,
    DraggablePlaceholderDirective,
    InputPatternDirective
];

@NgModule({
    declarations: directives,
    providers: [
        DraggableService
    ],
    exports: directives
})
export class DirectivesModule { }
