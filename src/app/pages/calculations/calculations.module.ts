import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CalculationsComponent } from './calculations.component';
import { CadrsModule } from '@core/components/cards/cards.component.module';
import { DropdownModule } from '@core/components/dropdown/dropdown.module';
import { MatButtonModule, MatTableModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InlineSVGModule } from 'ng-inline-svg';
import { AppScrollbarModule } from '@core/components/scrollbar/scrollbar.module';
import { CalculationsHeaderModule } from '@core/components/calculations-header/calculations-header.module';

const components = [
    CalculationsComponent
];

const routes: Routes = [
    {
        path: '',
        component: CalculationsComponent
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        CadrsModule,
        DropdownModule,
        MatButtonModule,
        MatTableModule,
        MatIconModule,
        MatToolbarModule,
        FlexLayoutModule,
        InlineSVGModule,
        AppScrollbarModule,
        CalculationsHeaderModule
    ],
    declarations: [...components],
    exports: [...components]
})
export class CalculationsModule { }
