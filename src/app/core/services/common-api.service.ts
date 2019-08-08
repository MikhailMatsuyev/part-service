import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoreModule } from '../core.module';
import { AppConfig } from '../../app.config';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: CoreModule
})
export class CommonApiService {
    constructor(
        private readonly appConfig: AppConfig,
        private readonly httpClient: HttpClient
    ) { }

    public downloadExcel(data: DownloadExcel): Observable<void> {
        return this.httpClient.post<void>(`${this.appConfig.apiUrl}api/Xlsx/DownloadExcel`, data);
    }

    public getUserNotifications(batchSize: number, batchPart: number): Observable<GroupNotifications> {
        const url = `${this.appConfig.apiUrl}api/Notifications/GetUserNotifications?batchSize=${batchSize}&batchPart=${batchPart}`;
        return this.httpClient.get<GroupNotifications>(url);
    }

    public toggleNotification(data: IToggleNotification): Observable<any> {
        return this.httpClient.post<any>(`${this.appConfig.apiUrl}api/Notifications/ToggleNotification`, data);
    }

    public removeNotification(data: IDeleteNotification): Observable<any> {
        return this.httpClient.post<any>(`${this.appConfig.apiUrl}api/Notifications/DeleteNotification`, data);
    }

    public getProjectInfo(): Observable<{title: string, name: string}> {
        return this.httpClient.get<{title: string, name: string}>(`${this.appConfig.apiUrl}api/Home/GetProjectInfo`);
    }

    public setProjectInfo(data: {name: string, title: string}): Observable<void> {
        return this.httpClient.post<void>(`${this.appConfig.apiUrl}api/Home/SetProjectInfo`, data);
    }

    public getUsersOnline(): Observable<OnlineUsers[]> {
        return this.httpClient.get<OnlineUsers[]>(`${this.appConfig.apiUrl}api/Users/OnlineUsers`);
    }

    public login(data: ILogin): Observable<IResponse> {
        return this.httpClient.post<IResponse>(`${this.appConfig.apiUrl}api/Home/Login`, data);
    }

    public logout(): Observable<void> {
        return this.httpClient.get<void>(`${this.appConfig.apiUrl}api/Home/Logout`);
    }

    public importStep(data: any): Observable<any> {
        return this.httpClient.post<void>(`${this.appConfig.apiUrl}api/Import/Steps`, data);
    }

    public applyImportStep(data: any): Observable<any> {
        return this.httpClient.post<void>(`${this.appConfig.apiUrl}api/Import/ApplySteps`, data);
    }

    public downloadConnections(data: DownloadConnections): Observable<void> {
        return this.httpClient.post<void>(`${this.appConfig.apiUrl}api/Xlsx/DownloadConnections`, data);
    }

    public getProjectVersion(): Observable<{code: string, sql: string}> {
        return this.httpClient.get<{code: string, sql: string}>(`${this.appConfig.apiUrl}api/Selection/GetProjectVersion`);
    }

    public getPagesByUser(): Observable<any[]> {
        return this.httpClient.get<any[]>(`${this.appConfig.apiUrl}api/Users/GetPagesByUser`);
    }
}
