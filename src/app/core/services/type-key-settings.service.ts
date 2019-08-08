import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoreModule } from '../core.module';
import { AppConfig } from '../../app.config';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: CoreModule
})

export class TypeKeySettingsService {
    constructor(
        private readonly appConfig: AppConfig,
        private readonly httpClient: HttpClient
    ) { }

    public getTypeKeySettings(): Observable<PrimaryKeySettingsModel> {
        return this.httpClient.get<PrimaryKeySettingsModel>(`${this.appConfig.apiUrl}api/Settings/TypeKeySettings`);
    }

    public saveTypeKeySettings(model: PrimaryKeySettingsModel): Observable<any> {
        return this.httpClient.post<any>(`${this.appConfig.apiUrl}api/Settings/TypeKeySettings`, model);
    }

    public getTypeKeyGeneration(perfId: number): Observable<TypeKeySettingsRow[]> {
        return this.httpClient.get<TypeKeySettingsRow[]>(`${this.appConfig.apiUrl}api/Settings/GetVariantCodeSettings?id=${perfId}`);
    }

    public saveTypeKeyRow(row: TypeKeySettingsRow): Observable<any> {
        return this.httpClient.post<any>(`${this.appConfig.apiUrl}api/Settings/EditTypeKeyItem`, row);
    }

    public editUfTypeKey(item: TypeKeySettingsUfItem): Observable<any> {
        return this.httpClient.post<any>(`${this.appConfig.apiUrl}api/Settings/EditUfTypeKey`, item);
    }

    public addFreeTextToTypeKey(item: FreeTextItem): Observable<any> {
        return this.httpClient.post<any>(`${this.appConfig.apiUrl}api/Settings/AddFreeTextToTypeKey`, item);
    }

    public removeFreeTextFromTypeKey(item: FreeTextItem): Observable<any> {
        return this.httpClient.post<any>(`${this.appConfig.apiUrl}api/Settings/RemoveFreeTextFromTypeKey`, item);
    }
}
