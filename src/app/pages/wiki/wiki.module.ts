import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { WikiComponent } from './wiki.component';

const components = [
    WikiComponent
];

const routes: Routes = [
    {
        path: '',
        component: WikiComponent
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    declarations: [...components],
    exports: [...components]
})
export class WikiModule { }
