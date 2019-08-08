import { TreeUserSettingsBuilderService } from './tree-user-settings/tree-user-settings.builder.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UniterState } from '@store/reducers';
import * as UserSettings from '@store/users-settings';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange, MatSlideToggleChange, MatTableDataSource, Sort, MatDialog } from '@angular/material';
import * as Auth from '@store/auth';
import { Unsubscribe, untilDestroyed } from '@core/decorators/unsubscribe';
import { UserSettingsCreateUserComponent } from '@core/components/dialogs/user-settings-create-user/user-settings-create-user.component';
import { UserSettingsRemoveUsersComponent } from '@core/components/dialogs/user-settings-remove-users/user-settings-remove-users.component';
import { UserSettingsManageUsersComponent } from '@core/components/dialogs/user-settings-manage-users/user-settings-manage-users.component';
import { GetRolesTree } from '@store/users-settings';

@Component({
    selector: 'app-user-settings',
    templateUrl: './user-settings.component.html',
    styleUrls: ['./user-settings.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@Unsubscribe()
export class UserSettingsComponent implements OnInit, OnDestroy {
    public roles$ = this.store.pipe(select(UserSettings.getUserRoles));
    public isActiveGuest$ = this.store.pipe(select(Auth.getIsActiveGuestMode));
    public searchControl: FormControl;
    public rolesDefaultItem: number;
    public checkedAllSteps: boolean;
    public displayedColumns = [
        'isChecked',
        'userName',
        'roleName'
    ];

    public dataSource = new MatTableDataSource<UsersModel>();
    public selection = new SelectionModel<UsersModel>(true, []);

    public nodes: any;

    public treeControl: any;
    public treeData: any;

    private tableConnection = this.dataSource.connect();


    constructor(
        private readonly store: Store<UniterState>,
        private treeBuilder: TreeUserSettingsBuilderService,
        private dialog: MatDialog,
        private cd: ChangeDetectorRef
    ) { }

    public ngOnInit(): void {
        this.searchControl = new FormControl('');

        this.store.dispatch(new UserSettings.GetRoles());
        this.store.dispatch(new UserSettings.GetUsers(-1));
        this.store.dispatch(new GetRolesTree());

        this.initLiseteners();
    }

    public ngOnDestroy(): void {}

    public handleChangeGuestMode({ checked }: MatSlideToggleChange): void {
        this.store.dispatch(new Auth.SetGuest(checked));
    }

    public handleSelectAllChange({ checked }: MatCheckboxChange): void {
        if (checked) {
            this.selection.select(...this.tableConnection.getValue());
        } else {
            this.selection.clear();
        }
    }

    public sort(sort: Sort): void {
    }

    public handleCollapse(event): void {
    }

    public manageUsers(): void {
        this.dialog.open(UserSettingsManageUsersComponent, {
            data: {
                title: 'Manage users',
                items: [1, 2, 3]
            }
        });
    }

    public createUser(): void {
        this.dialog.open(UserSettingsCreateUserComponent, {
            data: {
                isCreate: true,
                title: 'Create user'
            }
        });
    }

    public editUser(): void {
        this.dialog.open(UserSettingsCreateUserComponent, {
            data: {
                isCreate: false,
                title: 'Edit user'
            }
        });
    }

    public removeUser(): void {
        this.dialog.open(UserSettingsRemoveUsersComponent, {
            data: {
                title: 'Remove users'
            }
        });
    }

    public renameRole(): void {
    }

    public removeRole(): void {
    }



    public onChangeRole(id: number): void {
        this.store.dispatch(new UserSettings.GetUsers(id));
    }

    public onCheckUser(checked: MatCheckboxChange, id: number): void {

    }

    private initLiseteners(): void {
        this.store
            .pipe(
                select(UserSettings.getUsers),
                untilDestroyed(this)
            )
            .subscribe(data => {
                this.tableConnection.next(data);
            });

        this.store
            .pipe(
                select(UserSettings.getRolesTree),
                untilDestroyed(this)
            )
            .subscribe(tree => {
                this.treeData = this.treeBuilder.initialize(tree);
                this.cd.markForCheck();
            });
    }

}
