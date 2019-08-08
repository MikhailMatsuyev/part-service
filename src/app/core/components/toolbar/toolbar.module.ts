import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MenuSliderModule } from '../menu-slider/menu-slider.module';
import { MatBadgeModule } from '@angular/material/badge';

const components = [
    ToolbarComponent
];

@NgModule({
    imports: [
        CommonModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        RouterModule,
        FlexLayoutModule,
        MenuSliderModule,
        MatBadgeModule
    ],
    declarations: [...components],
    exports: [...components]
})
export class ToolbarModule { }
