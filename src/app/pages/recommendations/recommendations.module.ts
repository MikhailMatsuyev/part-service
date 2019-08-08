import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RecommendationsComponent } from './recommendations.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { MatButtonModule, MatTableModule, MatCardModule, MatIconModule, MatListModule } from '@angular/material';
import { CalculationsHeaderModule } from '@core/components/calculations-header/calculations-header.module';
import { AppScrollbarModule } from '@core/components/scrollbar/scrollbar.module';
import { MdePopoverModule } from '@material-extended/mde';
import { ReactiveFormsModule } from '@angular/forms';

const components = [
    RecommendationsComponent
];

const routes: Routes = [
    {
        path: '',
        component: RecommendationsComponent
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        InlineSVGModule,
        CalculationsHeaderModule,
        MatButtonModule,
        MatTableModule,
        AppScrollbarModule,
        MdePopoverModule,
        MatCardModule,
        ReactiveFormsModule,
        MatIconModule,
        MatListModule
    ],
    declarations: [...components],
    exports: [...components]
})
export class RecommendationsModule { }
