import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StepsScopesComponent } from './steps-scopes.component';
import { CadrsModule } from '../../core/components/cards/cards.component.module';
import { InlineSVGModule } from 'ng-inline-svg';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/';
import { MatButtonModule } from '@angular/material';
import { AppScrollbarModule } from '../../core/components/scrollbar/scrollbar.module';


const components = [
    StepsScopesComponent
];

const routes: Routes = [
    {
        path: '',
        component: StepsScopesComponent
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
        AppScrollbarModule
    ],
    declarations: [...components],
    exports: [...components]
})
export class StepsScopesModule { }
