import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { InlineSVGModule } from 'ng-inline-svg';
import { MatButtonModule } from '@angular/material';
import { AppCalculationsHeaderComponent } from './calculations-header.component';
import { AppScrollbarModule } from '@core/components/scrollbar/scrollbar.module';
import { DropdownModule } from '@core/components/dropdown/dropdown.module';

const components = [
    AppCalculationsHeaderComponent
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
        DropdownModule,
        MatButtonModule,
        AppScrollbarModule
    ],
    declarations: [...components],
    exports: [...components]
})
export class CalculationsHeaderModule { }
