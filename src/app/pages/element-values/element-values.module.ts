import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ElementValuesComponent } from './element-values.component';
import { CadrsModule } from '../../core/components/cards/cards.component.module';
import { ResizableModule } from 'angular-resizable-element';
import { InlineSVGModule } from 'ng-inline-svg';
import { MatRadioModule, MatIconModule, MatButtonModule, MatMenuModule } from '@angular/material';
import { AppScrollbarModule } from '../../core/components/scrollbar/scrollbar.module';
import { FormsModule } from '@angular/forms';
import { DialogsModule } from '../../core/components/dialogs/dialogs.module';
import { TwoHeadersTableModule } from '../../core/components/two-headers-table/two-headers-table.module';
import { PipeModule } from '../../core/pipe/pipe.module';

const components = [
    ElementValuesComponent
];

const routes: Routes = [
    {
        path: '',
        component: ElementValuesComponent
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        CadrsModule,
        InlineSVGModule,
        MatRadioModule,
        ResizableModule,
        MatIconModule,
        AppScrollbarModule,
        MatButtonModule,
        MatMenuModule,
        FormsModule,
        DialogsModule,
        TwoHeadersTableModule,
        PipeModule
    ],
    declarations: [...components],
    exports: [...components]
})
export class ElementValuesModule { }
