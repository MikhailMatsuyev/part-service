import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../app.config';
import { CoreModule } from '../core.module';

// tslint:disable:max-line-length

@Injectable({
    providedIn: CoreModule
})
export class InfoService {
    constructor(
        private readonly appConfig: AppConfig,
        private readonly httpClient: HttpClient
    ) {
    }

    public getInformation({ id, level }: { id: number, level: number }): Observable<any> {
        const url = `${this.appConfig.apiUrl}api/Info/GetInformation?id=${id}&type=${level}`;
        return this.httpClient.get<any>(url);
    }

    public uploadFiles(data: any): Observable<any> {
        return this.httpClient.post<any>(`${this.appConfig.apiUrl}api/Info/UploadFiles`, data);
    }

    public saveInformation(data: any): Observable<any> {
        return this.httpClient.post<any>(`${this.appConfig.apiUrl}api/Info/SaveInformation`, data);
    }

    public сancelInformation(data: any): Observable<any> {
        return this.httpClient.post<any>(`${this.appConfig.apiUrl}api/Info/CancelInformation`, data);
    }
}
