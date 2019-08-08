import { NgModule } from '@angular/core';
import { TableTreeComponent } from './table-tree.component';
import { CommonModule } from '@angular/common';
import { StepsComponent } from './steps/steps.component';
import { StepsGroupComponent } from './steps-group/steps-group.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DirectivesModule } from '../../directives/directives.module';
import { TableTreeHeaderComponent } from './table-tree-header/table-tree-header.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SubGroupHeaderComponent } from './sub-group-header/sub-group-header.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { PipeModule } from '../../pipe/pipe.module';
import { MatMenuModule } from '@angular/material';
import { ResizableModule } from 'angular-resizable-element';
import { AppScrollbarModule } from '../scrollbar/scrollbar.module';

const components = [
    TableTreeComponent,
    TableTreeHeaderComponent,
    StepsComponent,
    StepsGroupComponent,
    SubGroupHeaderComponent
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatIconModule,
        DirectivesModule,
        FlexLayoutModule,
        MatCheckboxModule,
        InlineSVGModule,
        PipeModule,
        MatMenuModule,
        DirectivesModule,
        ResizableModule,
        AppScrollbarModule
    ],
    declarations: [...components],
    exports: [...components]
})
export class TableTreeModule { }
