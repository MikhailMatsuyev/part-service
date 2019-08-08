import { NgModule } from '@angular/core';
import { InlineSVGModule } from 'ng-inline-svg';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { InterfacesConnectionsComponent } from './interfaces-connections.component';
import { MatIconModule, MatRadioModule, MatCheckboxModule, MatButtonModule } from '@angular/material';
import { AppScrollbarModule } from '../../core/components/scrollbar/scrollbar.module';
import { CadrsModule } from '../../core/components/cards/cards.component.module';
import { FormsModule } from '@angular/forms';

const components = [
    InterfacesConnectionsComponent
];

const routes: Routes = [
    {
        path: '',
        component: InterfacesConnectionsComponent
    },
];

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatRadioModule,
        MatCheckboxModule,
        MatButtonModule,
        AppScrollbarModule,
        InlineSVGModule,
        FormsModule,
        CadrsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [...components],
    exports: [...components]
})
export class InterfacesConnectionsModule { }
