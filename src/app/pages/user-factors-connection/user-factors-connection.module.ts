import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserFactorsConnectionComponent } from './user-factors-connection.component';
import { MatButtonModule, MatCheckboxModule, MatRadioModule, MatTableModule } from '@angular/material';
import { InlineSVGModule } from 'ng-inline-svg';
import { DropdownModule } from '../../core/components/dropdown/dropdown.module';
import { CadrsModule } from '../../core/components/cards/cards.component.module';
import { FormsModule } from '@angular/forms';
import { AppScrollbarModule } from '@core/components/scrollbar/scrollbar.module';
import { PerformanceModule } from '@pages/element-performance/performance-input/performance.module';

const components = [
    UserFactorsConnectionComponent
];

const routes: Routes = [
    {
        path: '',
        component: UserFactorsConnectionComponent
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatButtonModule,
        MatCheckboxModule,
        MatRadioModule,
        InlineSVGModule,
        DropdownModule,
        CadrsModule,
        MatTableModule,
        FormsModule,
        AppScrollbarModule,
        PerformanceModule
    ],
    declarations: [...components],
    exports: [...components]
})
export class UserFactorsConnectionModule { }
