import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMenuSliderComponent } from './menu-slider.component';

const components = [
    AppMenuSliderComponent
];

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [...components],
    exports: [...components]
})
export class MenuSliderModule { }
