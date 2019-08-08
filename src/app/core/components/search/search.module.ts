import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search.component';
import { MatIconModule } from '@angular/material/icon';

const components = [
    SearchComponent
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatIconModule
    ],
    declarations: [...components],
    exports: [...components]
})
export class SearchModule { }
