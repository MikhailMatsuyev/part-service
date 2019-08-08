import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AppSettingsComponent } from './app-settings.component';
import { WarningModule } from '../../core/components/warning/warning.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';

const components = [
    AppSettingsComponent
];

const routes: Routes = [
    {
        path: '',
        component: AppSettingsComponent
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        WarningModule,
        MatRadioModule,
        MatCheckboxModule,
        MatInputModule
    ],
    declarations: [...components],
    exports: [...components]
})
export class AppSettingsModule { }
