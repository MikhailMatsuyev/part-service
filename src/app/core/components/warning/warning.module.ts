import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WarningComponent } from './warning.component';
import { InlineSVGModule } from 'ng-inline-svg';

@NgModule({
    imports: [
        CommonModule,
        InlineSVGModule
    ],
    declarations: [WarningComponent],
    exports: [WarningComponent]
})
export class WarningModule { }
