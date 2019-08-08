import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { InterfacesStepsComponent } from './interfaces-steps.component';
import { CadrsModule } from '../../core/components/cards/cards.component.module';
import { InlineSVGModule } from 'ng-inline-svg';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/';
import { MatButtonModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { AppScrollbarModule } from '@core/components/scrollbar/scrollbar.module';

const components = [
    InterfacesStepsComponent
];

const routes: Routes = [
    {
        path: '',
        component: InterfacesStepsComponent
    },
];

@NgModule({
    imports: [
        CommonModule,
        CadrsModule,
        InlineSVGModule,
        MatButtonModule,
        MatRadioModule,
        MatCheckboxModule,
        RouterModule.forChild(routes),
        FormsModule,
        AppScrollbarModule
    ],
    declarations: [...components],
    exports: [...components]
})
export class InterfacesStepsModule { }
