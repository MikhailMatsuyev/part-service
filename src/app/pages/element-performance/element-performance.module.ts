import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ElementPerformanceComponent } from './element-performance.component';
import { DialogsModule } from '../../core/components/dialogs/dialogs.module';
import { MatTableModule, MatCheckboxModule, MatRadioModule, MatSortModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg';
import { PerformanceInputComponent } from './performance-input/performance-input.component';
import { UnitPricingComponent } from './unit-pricing/unit-pricing.component';
import { DropdownModule } from '../../core/components/dropdown/dropdown.module';
import { PerformanceModule } from '@pages/element-performance/performance-input/performance.module';

const components = [
    ElementPerformanceComponent,
    UnitPricingComponent
];

const routes: Routes = [
    {
        path: '',
        component: ElementPerformanceComponent
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatButtonModule,
        DialogsModule,
        MatTableModule,
        MatCheckboxModule,
        MatRadioModule,
        FormsModule,
        InlineSVGModule,
        MatSortModule,
        ReactiveFormsModule,
        DropdownModule,
        PerformanceModule
    ],
    declarations: [...components],
    exports: [...components]
})
export class ElementPerformanceModule { }
