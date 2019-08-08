import { MatDialog } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { UniterState } from '@store/reducers';
import { filter } from 'rxjs/operators';
import {
    NewUsernameModalComponent,
    WarningImportModalComponent,
    warningGroupDialog,
    warningImportGroupDialog
} from '@core/components/dialogs';
import * as UserDataExchange from '@store/users-data-exchange';

@Component({
    selector: 'app-users-data-exchange',
    templateUrl: './users-data-exchange.component.html',
    styleUrls: ['./users-data-exchange.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersDataExchangeComponent implements OnDestroy {
    public importingData = null;
    public fileName: string = null;
    public dataExchange$ = this.store.pipe(select(UserDataExchange.getDataExchange));
    public dataExchangeNotTaken$ = this.store.pipe(select(UserDataExchange.getDataExchangeNotTaken));
    public get importingHeader(): string {
        let header = 'Importing';

        if (this.fileName) {
            header += `: ${this.fileName}`;
        }

        return header;
    }
    constructor(
        public dialog: MatDialog,
        private readonly store: Store<UniterState>,
    ) { }

    public ngOnDestroy(): void {
        this.store.dispatch(new UserDataExchange.SetDefaultState());
    }

    public export(): void {
        this.store.dispatch(new UserDataExchange.ExportUserData());
    }

    public handleOnFileSelected(dataFile: FileList): void {
        const fileUpload = dataFile.item(0);
        const formData: FormData = new FormData();
        formData.append('file', fileUpload, fileUpload.name);
        this.importingData = formData;
        this.fileName = fileUpload.name;
    }

    public import(): void {
        if (!this.importingData) {
            this.dialog.open(WarningImportModalComponent, {
                ...warningImportGroupDialog,
                data: {
                    title: 'Warning',
                    text: 'Please choose file for import',
                    withCancel: false
                }
            });
            return;
        }

        // tslint:disable:max-line-length
        const dialogRef = this.dialog.open(WarningImportModalComponent, {
            ...warningGroupDialog,
            data: {
                title: 'Warning',
                text: 'If you import specification data then some data in the database may be overwritten! This will be permanent and this cannot be undone. Any existing specifications in the database will be deleted. Are you sure you want to proceed?',
                withCancel: true
            }
        });
        dialogRef.afterClosed()
            .pipe(
                filter(Boolean)
            )
            .subscribe(() => {
                this.store.dispatch(new UserDataExchange.ImportUserData(this.importingData));
            });
    }

    public submit(): void {
        this.store.dispatch(new UserDataExchange.ApplyImportUsers());
    }

    public textBadge(data: any): string {
        if (data.action === UsersActionStatus.new) {
            return 'new';
        } else if (data.action === UsersActionStatus.merge) {
            return 'merge';
        }

        return 'ignore';
    }

    public handleTableActions(obj: any, actionType: string): void {
        if (actionType === 'merge') {
            this.store.dispatch(new UserDataExchange.ChangeUserName({ ...obj, action: UsersActionStatus.merge }));
        } else if (actionType === 'new') {
            // tslint:disable:max-line-length
            const dialogRef = this.dialog.open(NewUsernameModalComponent, {
                ...warningGroupDialog,
                data: {
                    nameOld: obj.nameOld
                }
            });
            dialogRef.afterClosed()
                .pipe(
                    filter(Boolean)
                )
                .subscribe(result => {
                    this.store.dispatch(new UserDataExchange.ChangeUserName({ ...obj, nameNew: result, action: UsersActionStatus.new }));
                });
        } else if (actionType === 'ignore') {
            this.store.dispatch(new UserDataExchange.ChangeUserName({ ...obj, action: 2 }));
        } else {
            this.store.dispatch(new UserDataExchange.ChangeUserName({ ...obj, nameNew: obj.nameOld, action: -1 }));
        }
    }
}
