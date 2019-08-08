import { NgModule } from '@angular/core';
import { ScrollbarModule } from 'ngx-scrollbar';
import { CommonModule } from '@angular/common';
import { AppScrollbarComponent } from './scrollbar.component';

const components = [
    AppScrollbarComponent
];

@NgModule({
    imports: [
        CommonModule,
        ScrollbarModule
    ],
    declarations: components,
    exports: components
})
export class AppScrollbarModule { }
