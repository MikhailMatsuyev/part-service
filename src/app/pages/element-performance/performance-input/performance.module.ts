import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PerformanceInputComponent } from '@pages/element-performance/performance-input/performance-input.component';

const components = [
    PerformanceInputComponent
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
    declarations: [...components],
    exports: [...components]
})
export class PerformanceModule { }
