import { NgModule } from '@angular/core';

import { TextareaComponent } from './textarea.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResizableModule } from 'angular-resizable-element';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ResizableModule
    ],
    exports: [TextareaComponent],
    declarations: [TextareaComponent]
})
export class TextareaModule { }
