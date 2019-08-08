import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CadrsModule } from '@core/components/cards/cards.component.module';
import { MatButtonModule } from '@angular/material/button';
import { SearchModule } from '@core/components/search/search.module';
import { PipeModule } from '@core/pipe/pipe.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatMenuModule, MatIconModule } from '@angular/material';
import { DialogsModule } from '@core/components/dialogs/dialogs.module';
import { TableTreeModule } from '@core/components/table-tree/table-tree.module';
import { InlineSVGModule } from 'ng-inline-svg';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppScrollbarModule } from '@core/components/scrollbar/scrollbar.module';
import { ElementComponent } from '@pages/element/element.component';

const components = [
    ElementComponent
];

const routes: Routes = [
    {
        path: '',
        component: ElementComponent
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        CadrsModule,
        MatButtonModule,
        SearchModule,
        PipeModule,
        ReactiveFormsModule,
        MatDialogModule,
        DialogsModule,
        TableTreeModule,
        InlineSVGModule,
        FlexLayoutModule,
        MatMenuModule,
        MatIconModule,
        AppScrollbarModule
    ],
    declarations: [...components],
    exports: [...components]
})
export class ElementModule { }
