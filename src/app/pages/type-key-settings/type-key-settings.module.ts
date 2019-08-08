import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TypeKeySettingsComponent } from './type-key-settings.component';
import { MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTableModule,
    MatInputModule,
    MatSortModule } from '@angular/material';
import { InlineSVGModule } from 'ng-inline-svg';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadrsModule } from '../../core/components/cards/cards.component.module';
import { AppScrollbarModule } from '@core/components/scrollbar/scrollbar.module';
import { DialogsModule } from '../../core/components/dialogs/dialogs.module';
import { DropdownModule } from '../../core/components/dropdown/dropdown.module';
import { PerformanceModule } from '@pages/element-performance/performance-input/performance.module';

const components = [
    TypeKeySettingsComponent
];

const routes: Routes = [
    {
        path: '',
        component: TypeKeySettingsComponent
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        CadrsModule,
        FormsModule,
        AppScrollbarModule,
        MatCheckboxModule,
        MatRadioModule,
        MatTableModule,
        InlineSVGModule,
        MatInputModule,
        MatButtonModule,
        DropdownModule,
        DialogsModule,
        MatSortModule,
        ReactiveFormsModule,
        PerformanceModule
    ],
    declarations: [...components],
    exports: [...components]
})
export class TypeKeySettingsModule { }
