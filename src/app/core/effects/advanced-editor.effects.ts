import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { exhaustMap, catchError, map, withLatestFrom, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { EffectError } from './user-factors.effects';
import {
    AdvancedEditorActionTypes,
    GetSqlStatementsSuccess,
    CreateSqlStatementSuccess,
    EditSqlStatementTextSuccess,
    ExecuteSqlStatementSuccess,
    ExecuteSqlStatement,
    PushSqlStatementSuccess,
    EditSqlStatementStatusSuccess,
    RemoveSqlStatementSuccess,
    getSqlStatements,
    StoreSqlTableSuccess
} from '../store/advanced-editor';
import { SqlApiService } from '../services/sql-api.service';
import { UniterState } from '../store/reducers';

@Injectable()
export class AdvancedEditorEffects {
    constructor(
        public actions$: Actions,
        private sqlApiService: SqlApiService,
        private store$: Store<UniterState>,
    ) {
    }

    @Effect()
    public getSqlStatements$ = this.actions$
        .pipe(
            ofType(AdvancedEditorActionTypes.GET_SQL_STATEMENTS),
            exhaustMap(() =>
                this.sqlApiService.getSqlStatements()
                    .pipe(
                        map((item) => new GetSqlStatementsSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public createSqlStatements$ = this.actions$
        .pipe(
            ofType(AdvancedEditorActionTypes.CREATE_SQL_STATEMENT),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.sqlApiService.createSqlStatement(payload)
                    .pipe(
                        map((item) => new CreateSqlStatementSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public editSqlStatementText$ = this.actions$
        .pipe(
            ofType(AdvancedEditorActionTypes.EDIT_SQL_STATEMENT_TEXT),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.sqlApiService.editSqlStatementText(payload)
                    .pipe(
                        map((item) => new EditSqlStatementTextSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public executeSqlStatement$ = this.actions$
        .pipe(
            ofType(AdvancedEditorActionTypes.EXECUTE_SQL_STATEMENT),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.sqlApiService.executeCustomSqlStatement(payload)
                    .pipe(
                        map(() => new ExecuteSqlStatementSuccess()),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public executeAllSqlStatement$ = this.actions$
        .pipe(
            ofType(AdvancedEditorActionTypes.EXECUTE_ALL_SQL_STATEMENT),
            withLatestFrom(this.store$.select(getSqlStatements)),
            map(([action, item]) => item.map(items => items.id)),
            exhaustMap((item: number[]) => of(new ExecuteSqlStatement(item)))
        );

    @Effect()
    public pushSqlStatement$ = this.actions$
        .pipe(
            ofType(AdvancedEditorActionTypes.PUSH_SQL_STATEMENT),
            exhaustMap(() =>
                this.sqlApiService.pushStatementResults()
                    .pipe(
                        map(() => new PushSqlStatementSuccess()),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public editSqlStatementStatus$ = this.actions$
        .pipe(
            ofType(AdvancedEditorActionTypes.EDIT_SQL_STATEMENT_STATUS),
            exhaustMap(({payload}: IUnsafeAction) =>
                this.sqlApiService.editSqlStatementState(payload)
                    .pipe(
                        map((item) => new EditSqlStatementStatusSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public removeSqlStatement$ = this.actions$
        .pipe(
            ofType(AdvancedEditorActionTypes.REMOVE_SQL_STATEMENT),
            exhaustMap(({payload}: IUnsafeAction) =>
                this.sqlApiService.deleteStatement(payload)
                    .pipe(
                        map((item) => new RemoveSqlStatementSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public storeSqlTable$ = this.actions$
        .pipe(
            ofType(AdvancedEditorActionTypes.STORE_SQL_TABLE),
            exhaustMap(({payload}: IUnsafeAction) =>
                this.sqlApiService.storeExcelTable(payload)
                    .pipe(
                        map(() => new StoreSqlTableSuccess()),
                        catchError(() => of(new EffectError()))
                    )
            )
        );
}
