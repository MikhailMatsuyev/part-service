import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppDropdownComponent } from './dropdown.component';
import { MatCheckboxModule } from '@angular/material';

const components = [
    AppDropdownComponent
];

@NgModule({
    imports: [
        CommonModule,
        NgSelectModule,
        ReactiveFormsModule,
        MatCheckboxModule
    ],
    declarations: [...components],
    exports: [...components]
})
export class DropdownModule { }
