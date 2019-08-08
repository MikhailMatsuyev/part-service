import { DialogsModule } from '@core/components/dialogs/dialogs.module';
import { AppTreeUserSettingsComponent } from './tree-user-settings/tree-user-settings.component';
import { MatTreeModule } from '@angular/material/tree';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserSettingsComponent } from './user-settings.component';
import { DropdownModule } from '@core/components/dropdown/dropdown.module';
import {
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatExpansionModule
} from '@angular/material';
import { SearchModule } from '@core/components/search/search.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TreeUserSettingsBuilderService } from './tree-user-settings/tree-user-settings.builder.service';
import { UserSettingsCreateUserComponent } from '@core/components/dialogs/user-settings-create-user/user-settings-create-user.component';
import { UserSettingsManageUsersComponent } from '@core/components/dialogs/user-settings-manage-users/user-settings-manage-users.component';
import { UserSettingsRemoveUsersComponent } from '@core/components/dialogs/user-settings-remove-users/user-settings-remove-users.component';

const components = [
    UserSettingsComponent,
    AppTreeUserSettingsComponent
];

const routes: Routes = [
    {
        path: '',
        component: UserSettingsComponent
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        DropdownModule,
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatExpansionModule,
        MatTreeModule,
        MatCheckboxModule,
        SearchModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        DialogsModule
    ],
    declarations: [...components],
    exports: [...components],
    providers: [TreeUserSettingsBuilderService],
    entryComponents: [
        UserSettingsCreateUserComponent,
        UserSettingsManageUsersComponent,
        UserSettingsRemoveUsersComponent
    ]
})
export class UsersSettingsModule { }
