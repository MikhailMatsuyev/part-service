import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdvancedEditorComponent } from './advanced-editor.component';
import { AceEditorModule } from 'ng2-ace-editor';
import { CadrsModule } from '../../core/components/cards/cards.component.module';
import { InlineSVGModule } from 'ng-inline-svg';
import { MatRadioModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';

const components = [
    AdvancedEditorComponent
];

const routes: Routes = [
    {
        path: '',
        component: AdvancedEditorComponent
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        AceEditorModule,
        CadrsModule,
        InlineSVGModule,
        MatRadioModule,
        MatIconModule,
        MatProgressSpinnerModule
    ],
    declarations: [...components],
    exports: [...components]
})
export class AdvancedEditorModule { }
