import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from './cards.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { CardsTreeComponent } from './cards-tree/cards-tree.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { DirectivesModule } from '../../directives/directives.module';
import { VisModule } from 'ngx-vis';
import { CardsConnectionsComponent } from './cards-connections/cards-connections.component';
import { DropdownModule } from '../dropdown/dropdown.module';

const components = [
    CardsComponent,
    CardsTreeComponent,
    CardsConnectionsComponent
];

@NgModule({
    imports: [
        CommonModule,
        MatToolbarModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatIconModule,
        InlineSVGModule,
        DirectivesModule,
        VisModule,
        DropdownModule
    ],
    declarations: [...components],
    exports: [...components]
})
export class CadrsModule { }
