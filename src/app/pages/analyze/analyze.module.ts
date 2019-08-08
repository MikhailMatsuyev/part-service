import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AnalyzeComponent } from './analyze.component';
import { MatTableModule, MatCheckboxModule } from '@angular/material';
import { DropdownModule } from '@core/components/dropdown/dropdown.module';
import { ResizableModule } from 'angular-resizable-element';
import { TwoHeadersTableModule } from '../../core/components/two-headers-table/two-headers-table.module';
import { AppScrollbarModule } from '@core/components/scrollbar/scrollbar.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InlineSVGModule } from 'ng-inline-svg';

const components = [
    AnalyzeComponent
];

const routes: Routes = [
    {
        path: '',
        component: AnalyzeComponent
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatTableModule,
        ResizableModule,
        DropdownModule,
        MatCheckboxModule,
        TwoHeadersTableModule,
        AppScrollbarModule,
        MatProgressSpinnerModule,
        InlineSVGModule
    ],
    declarations: [...components],
    exports: [...components]
})
export class AnalyzeModule { }
