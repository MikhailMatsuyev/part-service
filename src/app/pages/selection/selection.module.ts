import { TreeElementsBuilderService } from './tree-elements/tree-elements.builder.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionComponent } from './selection.component';
import { CadrsModule } from '../../core/components/cards/cards.component.module';
import { InlineSVGModule } from 'ng-inline-svg';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ResizableModule } from 'angular-resizable-element';
import {
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTreeModule,
    MatRadioModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTableModule
} from '@angular/material';
import { DialogsModule } from '@core/components/dialogs/dialogs.module';
import { AppTreeSpecificationComponent } from './tree-specification/tree-specification.component';
import { AppScrollbarModule } from '@core/components/scrollbar/scrollbar.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from '@core/components/dropdown/dropdown.module';
import { PerformanceNumberComponent } from './performance-number/performance-number.component';
import { PerformanceSelectionComponent } from './performance-selection/performance-selection.component';
import { TreeUserFactorBuilderService } from './tree-userfactor/tree-userfactor-builder.service';
import { AppTreeUserFactorComponent } from './tree-userfactor/tree-userfactor.component';
import { TreeSpecificationBuilderService } from './tree-specification/tree-specification-builder.service';
import { AppTreeElementsComponent } from './tree-elements/tree-elements.component';
import { AppCustomDialogComponent } from './custom-dialog/custom-dialog.component';

const components = [
    SelectionComponent,
    AppTreeSpecificationComponent,
    PerformanceNumberComponent,
    PerformanceSelectionComponent,
    AppTreeUserFactorComponent,
    AppTreeElementsComponent,
    AppCustomDialogComponent
];

@NgModule({
    imports: [
        CommonModule,
        CadrsModule,
        MatToolbarModule,
        MatSlideToggleModule,
        MatButtonModule,
        MatMenuModule,
        InlineSVGModule,
        FlexLayoutModule,
        ResizableModule,
        MatIconModule,
        MatSidenavModule,
        DialogsModule,
        MatTreeModule,
        AppScrollbarModule,
        FormsModule,
        DropdownModule,
        ReactiveFormsModule,
        MatRadioModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatTableModule
    ],
    declarations: [...components],
    exports: [...components],
    providers: [
        TreeSpecificationBuilderService,
        TreeUserFactorBuilderService,
        TreeElementsBuilderService
    ]
})
export class SelectionModule { }
