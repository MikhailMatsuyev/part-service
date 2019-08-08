import { DialogsModule } from '@core/components/dialogs/dialogs.module';
import { DropdownModule } from '@core/components/dropdown/dropdown.module';
import { DirectivesModule } from '@core/directives/directives.module';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/';
import { InlineSVGModule } from 'ng-inline-svg';
import { MatTableModule, MatButtonModule, MatRadioModule, MatSortModule, MatDialogModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormulasComponent } from './formulas.component';
import { FormsModule } from '@angular/forms';
import { NewEntryComponent } from '@core/components/dialogs/new-entry/new-entry.component';
import { AppScrollbarModule } from '@core/components/scrollbar/scrollbar.module';
import { AutosizeDirective } from '@core/directives/autosize.directive';
import { TextareaModule } from '@core/components/textarea/textarea.module';
import { DeleteFormulasComponent } from '@core/components/dialogs/delete-formulas/delete-formulas.component';

const components = [
    FormulasComponent
];

const routes: Routes = [
    {
        path: '',
        component: FormulasComponent
    },
];

@NgModule({
    imports: [
        CommonModule,
        MatTableModule,
        MatButtonModule,
        MatCheckboxModule,
        MatRadioModule,
        MatInputModule,
        MatSortModule,
        InlineSVGModule,
        DirectivesModule,
        DropdownModule,
        DialogsModule,
        FormsModule,
        AppScrollbarModule,
        MatDialogModule,
        TextareaModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ...components,
        AutosizeDirective
    ],
    exports: [...components],
    entryComponents: [
        NewEntryComponent,
        DeleteFormulasComponent
    ]
})
export class FormulasModule { }
