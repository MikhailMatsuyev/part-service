import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserFactorsValuesComponent } from './user-factors-values.component';
import { CadrsModule } from '../../core/components/cards/cards.component.module';
import { InlineSVGModule } from 'ng-inline-svg';
import { MatRadioModule } from '@angular/material/radio';
import { ResizableModule } from 'angular-resizable-element';
import { TwoHeadersTableModule } from '../../core/components/two-headers-table/two-headers-table.module';
import { AppScrollbarModule } from '../../core/components/scrollbar/scrollbar.module';

const components = [
    UserFactorsValuesComponent
];

const routes: Routes = [
    {
        path: '',
        component: UserFactorsValuesComponent
    },
];

@NgModule({
    imports: [
        CommonModule,
        CadrsModule,
        InlineSVGModule,
        MatRadioModule,
        RouterModule.forChild(routes),
        ResizableModule,
        TwoHeadersTableModule,
        AppScrollbarModule
    ],
    declarations: [...components],
    exports: [...components]
})
export class UserFactorsValuesModule { }
