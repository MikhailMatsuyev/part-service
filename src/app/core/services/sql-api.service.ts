import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../app.config';
import { CoreModule } from '../core.module';

@Injectable({
    providedIn: CoreModule
})
export class SqlApiService {
    constructor(
        private readonly appConfig: AppConfig,
        private readonly httpClient: HttpClient
    ) {
    }

    public getSqlStatements(): Observable<SqlStatements[]> {
        return this.httpClient.get<SqlStatements[]>(`${this.appConfig.apiUrl}api/CustomSql/GetSqlStatements`);
    }

    public getSqlStatement(id: number): Observable<SqlState> {
        return this.httpClient.get<SqlState>(`${this.appConfig.apiUrl}api/CustomSql/GetSqlStatement?id=${id}`);
    }

    public createSqlStatement(name: string): Observable<SqlState> {
        return this.httpClient.post<SqlState>(`${this.appConfig.apiUrl}api/CustomSql/CreateSqlStatement`, {name});
    }

    public editSqlStatementState(data: SqlState): Observable<SqlState> {
        return this.httpClient.post<SqlState>(`${this.appConfig.apiUrl}api/CustomSql/EditSqlStatementState`, data);
    }

    public editSqlStatementText(data: {id: number, text: string}): Observable<SqlState> {
        return this.httpClient.post<SqlState>(`${this.appConfig.apiUrl}api/CustomSql/EditSqlStatementText`, data);
    }

    public deleteStatement(id: number): Observable<SqlStatements[]> {
        return this.httpClient.post<SqlStatements[]>(`${this.appConfig.apiUrl}api/CustomSql/DeleteStatement`, {id});
    }

    public executeCustomSqlStatement(ids: number[]): Observable<void> {
        return this.httpClient.post<void>(`${this.appConfig.apiUrl}api/CustomSql/ExecuteCustomSqlStatements`, { ids});
    }

    public pushStatementResults(): Observable<void> {
        return this.httpClient.post<void>(`${this.appConfig.apiUrl}api/CustomSql/PushStatementResults`, null);
    }

    public storeExcelTable(data: any): Observable<void> {
        return this.httpClient.post<void>(`${this.appConfig.apiUrl}api/CustomSql/StoreExcelTable`, data);
    }

    public exportUsersData(): Observable<void> {
        return this.httpClient.post<void>(`${this.appConfig.apiUrl}api/CustomSql/ExportUsersData`, null);
    }

    public importUsersData(data: any): Observable<string[]> {
        return this.httpClient.post<string[]>(`${this.appConfig.apiUrl}api/CustomSql/ImportUsersData`, data);
    }

    public сheckUserName(name: string): Observable<string[]> {
        return this.httpClient.post<string[]>(`${this.appConfig.apiUrl}api/CustomSql/CheckUserName`, {name});
    }

    public applyImportUsersData(data: UsersChanges[]): Observable<void> {
        return this.httpClient.post<void>(`${this.appConfig.apiUrl}api/CustomSql/ApplyImportUsersData`, data);
    }
}
