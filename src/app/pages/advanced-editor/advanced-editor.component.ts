import { Store, select } from '@ngrx/store';
import { Component, ChangeDetectionStrategy, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { UniterState } from '@store/reducers';
import * as AdvancedEditor from '@store/advanced-editor';
import { MatRadioChange, MatDialog } from '@angular/material';
import {
    NewSqlModalComponent,
    newSqlModalDialog,
    pushSqlModalDialog,
    PushSqlModalComponent,
    WarningImportModalComponent,
    errorModalDialog
} from '@core/components/dialogs';
import { filter } from 'rxjs/operators';
import 'brace';
import 'brace/ext/language_tools';
import 'brace/mode/sqlserver';
import 'brace/theme/sqlserver';
import 'ace-builds/src-min-noconflict/snippets/sqlserver';
import { pick } from '@utils/utilsfunc';
import { Unsubscribe, untilDestroyed, OnDestroy } from '@core/decorators/unsubscribe';
import { editorOptions } from './config/editor-config';
import { HubConnectionService } from '@core/services/hubconnection.service';
declare let ace: any;

@Component({
    selector: 'app-advanced-editor',
    templateUrl: './advanced-editor.component.html',
    styleUrls: ['./advanced-editor.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@Unsubscribe()
export class AdvancedEditorComponent implements OnInit, AfterViewInit, OnDestroy {
    public content;
    public editorOptions = editorOptions;
    public headerName = 'CUSTOM';
    public componentSql = null;
    public sqlStatements$ = this.store.pipe(select(AdvancedEditor.getSqlStatements));
    public pushSqlStatements$ = this.store.pipe(select(AdvancedEditor.getPushSqlStatements));
    private activeStatement: SqlState;

    @ViewChild('editor') public editor;

    public get isChangesText(): boolean {
        return this.activeStatement && this.activeStatement.text !== this.content;
    }

    constructor(
        public dialog: MatDialog,
        private readonly store: Store<UniterState>,
        private readonly hubConnectionService: HubConnectionService
    ) { }

    public ngOnInit(): void {
        this.hubConnectionService.initConnectionToAdvancedHub();
        this.store
            .pipe(
                select(AdvancedEditor.getActiveSqlStatement),
                untilDestroyed(this)
            )
            .subscribe(item => {
                if (item) {
                    const text = item.text.replace(/↵/g, '\n');
                    this.headerName = item.name;
                    this.content = text;
                    this.activeStatement = {
                        ...item,
                        text
                    };
                } else {
                    this.headerName = '';
                    this.content = '';
                    this.activeStatement = null;
                }
            });
        this.store.dispatch(new AdvancedEditor.GetSqlStatements());
    }

    public ngAfterViewInit(): void {
        this.editor.getEditor().$blockScrolling = Infinity;
    }

    public ngOnDestroy(): void {
    }

    public isActiveStatement(id: number): boolean {
        return this.activeStatement && this.activeStatement.id === id;
    }

    public changeValues({ value }: MatRadioChange): void {
        this.store.dispatch(new AdvancedEditor.SetSqlStatement(value));
    }

    public handleSave(): void {
        const { id } = this.activeStatement;
        this.store.dispatch(new AdvancedEditor.EditSqlStatementText({ id, text: this.content }));
    }

    public handleRefresh(): void {
        this.content = this.activeStatement.text;
    }

    public handleBlank(): void {
        const dialogRef = this.dialog.open(NewSqlModalComponent, newSqlModalDialog);

        dialogRef.afterClosed()
            .pipe(
                filter(Boolean)
            )
            .subscribe(item => {
                this.store.dispatch(new AdvancedEditor.CreateSqlStatement(item));
            });
    }

    public handleExcute(): void {
        this.store.dispatch(new AdvancedEditor.ExecuteSqlStatement([this.activeStatement.id]));
    }

    public handleSqlMenu(): void {
        this.store.dispatch(new AdvancedEditor.ExecuteAllSqlStatement());
    }

    public handleError(message: string): void {
        this.dialog.open(WarningImportModalComponent, {
            ...errorModalDialog,
            data: {
                title: 'Executing errors!',
                text: message,
                withCancel: false
            }
        });
    }

    public handleDataBase(): void {
        const dialogRef = this.dialog.open(PushSqlModalComponent, pushSqlModalDialog);

        dialogRef.afterClosed()
            .pipe(
                filter(Boolean)
            )
            .subscribe(() => {
                this.store.dispatch(new AdvancedEditor.PushSqlStatement());
            });
    }

    public handleOnFileSelected(dataFile: FileList): void {
        const fileUpload = dataFile.item(0);
        const formData: FormData = new FormData();
        formData.append('file', fileUpload, fileUpload.name);
        this.store.dispatch(new AdvancedEditor.StoreSqlTable(formData));
    }

    public handleDone(sqlStatement: SqlState): void {
        const data = {
            ...pick(sqlStatement, ['id', 'name']),
            active: !sqlStatement.active
        };

        this.store.dispatch(new AdvancedEditor.EditSqlStatementStatus(data));
    }

    public handleRemove(sqlStatement: SqlState): void {
        this.store.dispatch(new AdvancedEditor.RemoveSqlStatement(sqlStatement.id));
    }

    public trackByFn(index: number, item: SqlStatements): number {
        return item.id;
    }
}
