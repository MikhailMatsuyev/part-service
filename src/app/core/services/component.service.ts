import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';
import { AppConfig } from '../../app.config';

@Injectable({
    providedIn: CoreModule
})
export class ComponentService {
    constructor(
        private readonly appConfig: AppConfig,
        private readonly httpClient: HttpClient
    ) {
    }

    public getComponentIMPL({ combined } = {combined: false}): Observable<UserFactorValuesImpl[]> {
        const url = `${this.appConfig.apiUrl}api/Components/GetComponentSeriesImpl?combined=${combined}`;
        return this.httpClient.get<UserFactorValuesImpl[]>(url);
    }

    public getComponentValues(ufId: number): Observable<UserFactorValues[]> {
        const url = `${this.appConfig.apiUrl}api/Components/GetUserFactorValues?ufId=${ufId}`;
        return this.httpClient.get<UserFactorValues[]>(url);
    }

    public saveComponentValue(data: UserFactorValues): Observable<void> {
        return this.httpClient.post<void>(`${this.appConfig.apiUrl}api/Components/SaveUserFactorValue`, data);
    }

    public getComponentStepsImpl(serieId: number): Observable<any> {
        const url = `${this.appConfig.apiUrl}api/Components/GetComponentStepsImpl?serieId=${serieId}`;
        return this.httpClient.get<any>(url);
    }

    public getPerformancesComponentImpl(stepId: number): Observable<any> {
        const url = `${this.appConfig.apiUrl}api/Components/GetPerformancesComponentImpl?stepId=${stepId}`;
        return this.httpClient.get<any>(url);
    }

    public getPerformancesImpl(): Observable<any> {
        return this.httpClient.get<any>(`${this.appConfig.apiUrl}api/Components/GetPerformancesImpl`);
    }

    public savePerformancesSeriesImpl(data: any): Observable<any> {
        return this.httpClient.post<any>(`${this.appConfig.apiUrl}api/Components/SavePerformancesSeriesImpl`, data);
    }

    public savePerformancesComponentImpl(data: UserFactorValues): Observable<UserFactorValues> {
        return this.httpClient.post<UserFactorValues>(`${this.appConfig.apiUrl}api/Components/SavePerformancesComponentImpl`, data);
    }

    public getPerformancesSeriesImpl(serieId: number): Observable<any> {
        const url = `${this.appConfig.apiUrl}api/Components/GetPerformancesSeriesImpl?serieId=${serieId}`;
        return this.httpClient.get<any>(url);
    }

    public getCombinedComponentSeriesImpl(serieId: number): Observable<any> {
        const url = `${this.appConfig.apiUrl}api/Components/GetCombinedComponentSeriesImpl?serieId=${serieId}`;
        return this.httpClient.get<any>(url);
    }

    public getConnectedUfImpl(serieId: number): Observable<any> {
        const url = `${this.appConfig.apiUrl}api/Components/GetConnectedUfImpl?serieId=${serieId}`;
        return this.httpClient.get<any>(url);
    }

    public getConnectedFormulas(serieId: number): Observable<any> {
        const url = `${this.appConfig.apiUrl}api/Components/GetConnectedFormulas?serieId=${serieId}`;
        return this.httpClient.get<any>(url);
    }

    public getNetworkData({ id, depth }: {id: number, depth: number}): Observable<any> {
        const url = `${this.appConfig.apiUrl}api/Components/GetNetworkData?id=${id}&depth=${depth}`;
        return this.httpClient.get<any>(url);
    }

    public setFictiveUserFactor(data: {serieId: number, state: boolean}): Observable<any> {
        return this.httpClient.post<any>(`${this.appConfig.apiUrl}api/Components/SetFictiveUserFactor`, data);
    }

    public getComponentSeriesList(serieId: number): Observable<any> {
        const url = `${this.appConfig.apiUrl}api/Components/GetComponentSeriesList?serieId=${serieId}`;
        return this.httpClient.get<any>(url);
    }

    public saveCombinedComponentSeriesImpl(data: {id: number, values: number[]}): Observable<any> {
        return this.httpClient.post<any>(`${this.appConfig.apiUrl}api/Components/SaveCombinedComponentSeriesImpl`, data);
    }

    public getUserFactorsList(id: number): Observable<any> {
        const url = `${this.appConfig.apiUrl}api/Components/GetUserFactorsList?id=${id}`;
        return this.httpClient.get<any>(url);
    }

    public saveUserFactorsImpl(data: {id: number, values: number[]}): Observable<any> {
        return this.httpClient.post<any>(`${this.appConfig.apiUrl}api/Components/SaveUserFactorsImpl`, data);
    }

    public downloadPerformancesForComponents(data: number | null): Observable<any> {
        return this.httpClient.post<any>(`${this.appConfig.apiUrl}api/Components/DownloadPerformancesForComponents?serieId=${data}`, null);
    }

    public getPerformances(): Observable<Performance> {
        return this.httpClient.get<Performance>(`${this.appConfig.apiUrl}api/Components/GetPerformances`);
    }

    public createPerformances(data: Performance): Observable<Performance> {
        return this.httpClient.post<Performance>(`${this.appConfig.apiUrl}api/Components/EditPerformance`, data);
    }

    public deletePerformances(ids: number[]): Observable<Performance> {
        return this.httpClient.post<Performance>(`${this.appConfig.apiUrl}api/Components/DeletePerformances`, {ids});
    }

    public downloadPerformances(id: number[] | null): Observable<Performance> {
        return this.httpClient.post<Performance>(`${this.appConfig.apiUrl}api/Components/DownloadPerformances?id=${id}`, null);
    }

    public componentSeriesPerformances(csId: number): Observable<UserFactorConnected[]> {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get<UserFactorConnected[]>(`${this.appConfig.apiUrl}api/Components/ComponentSeriesPerformances?csId=${csId}`);
    }

    public getComponentData(): Observable<UsersFactors[]> {
        return this.httpClient.get<UsersFactors[]>(`${this.appConfig.apiUrl}api/Components/GetData`);
    }

    public editComponents(data: any): Observable<any> {
        return this.httpClient.post<any>(`${this.appConfig.apiUrl}api/Components/EditData`, data);
    }

    public saveStep(data: any): Observable<any> {
        return this.httpClient.post<any>(`${this.appConfig.apiUrl}api/Components/StepCreate`, data);
    }

    public editStep(data: any): Observable<any> {
        return this.httpClient.post<any>(`${this.appConfig.apiUrl}api/Components/StepEdit`, data);
    }

    public deleteComponents(data: any): Observable<UsersFactors[]> {
        return this.httpClient.post<UsersFactors[]>(`${this.appConfig.apiUrl}api/Components/DeleteData`, data);
    }

    public stepsCopy(data: StepSelectCopy): Observable<any> {
        return this.httpClient.post<any>(`${this.appConfig.apiUrl}api/Components/StepsCopy`, data);
    }

    public insertStep(data: any): Observable<any> {
        return this.httpClient.post<any>(`${this.appConfig.apiUrl}api/Components/StepInsert`, data);
    }

    public changeComponentGroup(data: any): Observable<any> {
        return this.httpClient.post<any>(`${this.appConfig.apiUrl}api/Components/ChangeGroup`, data);
    }

    public getStep(id: number): Observable<any> {
        const url = `${this.appConfig.apiUrl}api/Components/Step?id=${id}`;
        return this.httpClient.get<any[]>(url);
    }

    public getComponentsGroup(withSeries = true): Observable<UsersFactors[]> {
        return this.httpClient.get<UsersFactors[]>(`${this.appConfig.apiUrl}api/Components/GetGroups?withSeries=${withSeries}`);
    }

}

