import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UsersDataExchangeComponent } from './users-data-exchange.component';
import { CadrsModule } from '../../core/components/cards/cards.component.module';
import { MatButtonModule } from '@angular/material';
import { ExchangeBadgeComponent } from './exchange-badge/exchange-badge.component';

const components = [
    UsersDataExchangeComponent,
    ExchangeBadgeComponent
];

const routes: Routes = [
    {
        path: '',
        component: UsersDataExchangeComponent
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        CadrsModule,
        MatButtonModule
    ],
    declarations: [...components],
    exports: [...components]
})
export class UsersDataExchangeModule { }
