

import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';
import { AppConfig } from '../../app.config';

@Injectable({
    providedIn: CoreModule
})
export class SettingsService {
    constructor(
        private readonly appConfig: AppConfig,
        private readonly httpClient: HttpClient
    ) {
    }

    public getUnitPricingConnectedComponents(perfId: number): Observable<UnitPricing> {
        const url = `${this.appConfig.apiUrl}api/Settings/GetUnitPricingConnectedComponents?perfId=${perfId}`;
        return this.httpClient.get<UnitPricing>(url);
    }

    public getFunctionsSettings(id: number): Observable<FunctionsSettings> {
        const url = `${this.appConfig.apiUrl}api/Settings/GetFunctionsSettings?id=${id}`;
        return this.httpClient.get<FunctionsSettings>(url);
    }

    public saveFunctionsSettings(data: FunctionsSettingsModel): Observable<FunctionsSettings> {
        return this.httpClient.post<FunctionsSettings>(`${this.appConfig.apiUrl}api/Settings/SaveFunctionsSettings`, data);
    }

    public setUnitPricingConnectedComponents(data: UnitPricingConnectedModel): Observable<void> {
        return this.httpClient.post<void>(`${this.appConfig.apiUrl}api/Settings/SetUnitPricingConnectedComponents`, data);
    }

    public showHideFunctionValuesField(show: boolean): Observable<void> {
        return this.httpClient.post<void>(`${this.appConfig.apiUrl}api/Settings/ShowHideFunctionValuesField`, {show});
    }
}
