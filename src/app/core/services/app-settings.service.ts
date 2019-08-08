import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoreModule } from '../core.module';
import { AppConfig } from '../../app.config';

@Injectable({
    providedIn: CoreModule
})
export class AppSettingsService {
    constructor(
        private readonly appConfig: AppConfig,
        private readonly httpClient: HttpClient
    ) { }

    public getAppSettings(): Observable<AppSettingsResponse> {
        return this.httpClient.get<AppSettingsResponse>(`${this.appConfig.apiUrl}api/Settings/GetSettings`);
    }

    public setNumberType(type: number): Observable<number> {
        return this.httpClient.post<number>(`${this.appConfig.apiUrl}api/Settings/SetNumsType`, type);
    }

    public setVisibilityAnalyzeButtons(analyzeButtonsShow: boolean): Observable<boolean> {
        return this.httpClient.post<boolean>(`${this.appConfig.apiUrl}api/Settings/SetVisibilityAnalysisButtons`, {analyzeButtonsShow});
    }

    public setAnalyzeTimeout(timeoutDelay: number): Observable<number> {
        return this.httpClient.post<number>(`${this.appConfig.apiUrl}api/Settings/SetAnalyzeTimeoutWarn`, {timeoutDelay});
    }
}
