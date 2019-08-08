import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../app.config';
import { CoreModule } from '../core.module';

@Injectable({
    providedIn: CoreModule
})
export class AnalyzeService {
    constructor(
        private readonly appConfig: AppConfig,
        private readonly httpClient: HttpClient
    ) {
    }

    public getComponentSeries(): Observable<AnalyzeComponent[]> {
        return this.httpClient.get<AnalyzeComponent[]>(`${this.appConfig.apiUrl}api/Analyze/GetComponentSeries`);
    }

    public getComponentsSteps(id: number): Observable<AnalyzeSteps> {
        return this.httpClient.get<AnalyzeSteps>(`${this.appConfig.apiUrl}api/Analyze/GetComponentsSteps?id=${id}`);
    }

    public getCsUfStepsAnalyze(id: number): Observable<AnalyzeCsUfSteps> {
        return this.httpClient.get<AnalyzeCsUfSteps>(`${this.appConfig.apiUrl}api/Analyze/GetCsUfStepsAnalyze?id=${id}`);
    }

    public getValueCounts(data: AnalyzeValueCount): Observable<AnalyzeStepModel[]> {
        return this.httpClient.post<AnalyzeStepModel[]>(`${this.appConfig.apiUrl}api/Analyze/GetValueCounts`, data);
    }
}
