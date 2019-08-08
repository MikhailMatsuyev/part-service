import { InlineSVGModule } from 'ng-inline-svg';
import { ResizableModule } from 'angular-resizable-element';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ElementConnectionsComponent } from './element-connections.component';
import { MatIconModule, MatRadioModule, MatCheckboxModule, MatButtonModule } from '@angular/material';
import { AppScrollbarModule } from '../../core/components/scrollbar/scrollbar.module';
import { CadrsModule } from '../../core/components/cards/cards.component.module';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from '../../core/components/dropdown/dropdown.module';
import { DialogsModule } from '../../core/components/dialogs/dialogs.module';

const components = [
    ElementConnectionsComponent
];

const routes: Routes = [
    {
        path: '',
        component: ElementConnectionsComponent
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
        FormsModule,
        MatCheckboxModule,
        MatButtonModule,
        DropdownModule,
        DialogsModule
    ],
    declarations: [...components],
    exports: [...components]
})
export class ElementConnectionsModule { }
