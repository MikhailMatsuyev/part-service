import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../app.config';
import { CoreModule } from '../core.module';
import { of, from, empty } from 'rxjs';

// tslint:disable:max-line-length

@Injectable({
    providedIn: CoreModule
})
export class UserFactorsService {
    constructor(
        private readonly appConfig: AppConfig,
        private readonly httpClient: HttpClient
    ) {
    }

    public getUserFactorsIMPL({ combinedOnly, withoutConnections }: RequestFactorsImpl = {combinedOnly: false, withoutConnections: false}): Observable<UserFactorValuesImpl[]> {
        const url = `${this.appConfig.apiUrl}api/UserFactors/GetUserFactorsImpl?combinedOnly=${combinedOnly}&withoutConnections=${withoutConnections}`;
        return this.httpClient.get<UserFactorValuesImpl[]>(url);
    }

    public editFactorsImpl(data: RepsonseEditFactorsImpl): Observable<boolean> {
        return this.httpClient.post<boolean>(`${this.appConfig.apiUrl}api/UserFactors/RepsonseEditFactorsImpl`, data);
    }

    public editUserFactors(data: any): Observable<any> {
        return this.httpClient.post<any>(`${this.appConfig.apiUrl}api/UserFactors/EditData`, data);
    }

    public getUserFactorGroupsImpl(ufNo: number): Observable<FactorsGroupsImpl> {
        return this.httpClient.get<FactorsGroupsImpl>(`${this.appConfig.apiUrl}api/UserFactors/GetUserFactorGroupsImpl?ufNo=${ufNo}`);
    }

    public saveStep(data: any): Observable<any> {
        return this.httpClient.post<any>(`${this.appConfig.apiUrl}api/UserFactors/StepCreate`, data);
    }

    public editStep(data: any): Observable<any> {
        return this.httpClient.post<any>(`${this.appConfig.apiUrl}api/UserFactors/StepEdit`, data);
    }

    public getUserFactorsData(): Observable<UsersFactors[]> {
        return this.httpClient.get<UsersFactors[]>(`${this.appConfig.apiUrl}api/UserFactors/GetData`);
    }

    public getUserFactors(): Observable<UsersFactors[]> {
        return this.httpClient.get<UsersFactors[]>(`${this.appConfig.apiUrl}api/UserFactors/GetUserFactors`);
    }

    public getUserFactorsGroup(withSeries = true): Observable<UsersFactors[]> {
        return this.httpClient.get<UsersFactors[]>(`${this.appConfig.apiUrl}api/UserFactors/GetGroups?withSeries=${withSeries}`);
    }

    public deleteUserFactors(data: any): Observable<UsersFactors[]> {
        return this.httpClient.post<UsersFactors[]>(`${this.appConfig.apiUrl}api/UserFactors/DeleteData`, data);
    }

    public stepsCopy(data: StepSelectCopy): Observable<any> {
        return this.httpClient.post<any>(`${this.appConfig.apiUrl}api/UserFactors/StepsCopy`, data);
    }

    public insertStep(data: any): Observable<any> {
        return this.httpClient.post<any>(`${this.appConfig.apiUrl}api/UserFactors/StepInsert`, data);
    }

    public changeUserFactorGroup(data: any): Observable<any> {
        return this.httpClient.post<any>(`${this.appConfig.apiUrl}api/UserFactors/ChangeGroup`, data);
    }

    public getUserFactorValues(id: number): Observable<UserFactorValues[]> {
        const url = `${this.appConfig.apiUrl}api/UserFactors/GetUserFactorValues?id=${id}`;
        return this.httpClient.get<UserFactorValues[]>(url);
    }

    public saveUserFactorValue(data: UserFactorValues): Observable<UserFactorValues> {
        return this.httpClient.post<UserFactorValues>(`${this.appConfig.apiUrl}api/UserFactors/SaveUserFactorValue`, data);
    }

    public getConnectedUserFactors(id: number): Observable<UserFactorConnected[]> {
        return this.httpClient.get<UserFactorConnected[]>(`${this.appConfig.apiUrl}api/UserFactors/GetConnectedUserFactors?id=${id}`);
    }

    public getConnectedComponentSeries(id: number): Observable<UserFactorConnected[]> {
        return this.httpClient.get<UserFactorConnected[]>(`${this.appConfig.apiUrl}api/UserFactors/GetConnectedComponentSeries?id=${id}`);
    }

    public getComponentSeriesDimImpl(id: number): Observable<UserFactorConnected[]> {
        return this.httpClient.get<UserFactorConnected[]>(`${this.appConfig.apiUrl}api/UserFactors/GetComponentSeriesDimImpl?id=${id}`);
    }

    public getConnectedFormulas(id: number): Observable<Formulas[]> {
        return this.httpClient.get<Formulas[]>(`${this.appConfig.apiUrl}api/UserFactors/GetConnectedFormulas?id=${id}`);
    }

    public getNetworkData({ id, depth }: {id: number, depth: number}): Observable<UserFactorNetwork> {
        return this.httpClient.get<UserFactorNetwork>(`${this.appConfig.apiUrl}api/UserFactors/GetNetworkData?id=${id}&depth=${depth}`);
    }

    public editUserFactorImpl(data: UserFactorValuesImpl): Observable<UserFactorValuesImpl> {
        return this.httpClient.post<UserFactorValuesImpl>(`${this.appConfig.apiUrl}api/UserFactors/EditUserFactorImpl`, data);
    }

    public getUserFactorsList(data: number): Observable<UserFactorConnected[]> {
        let url = `${this.appConfig.apiUrl}api/UserFactors/GetUserFactorsList`;
        if (data) {
            url += `?id=${data}`;
        }
        return this.httpClient.get<UserFactorConnected[]>(url);
    }

    public saveConnectedUserFactors(data: {id: number, values: number[]}): Observable<UserFactorConnected[]> {
        return this.httpClient.post<UserFactorConnected[]>(`${this.appConfig.apiUrl}api/UserFactors/SaveConnectedUserFactors`, data);
    }

    public saveComponentSeriesDimImpl(data: {id: number, values: number[]}): Observable<UserFactorConnected[]> {
        return this.httpClient.post<UserFactorConnected[]>(`${this.appConfig.apiUrl}api/UserFactors/SaveComponentSeriesDimImpl`, data);
    }

    public getAllRoles(): Observable<AllRoles[]> {
        const url = `${this.appConfig.apiUrl}api/Components/GetAllRoles`;
        return this.httpClient.get<AllRoles[]>(url);
    }

    public getAllSteps(ufId: number): Observable<AllSteps[]> {
        const url = `${this.appConfig.apiUrl}api/Components/GetAllSteps?roleId=${ufId}`;
        return this.httpClient.get<AllSteps[]>(url);
    }

    public setCompsScope(data: { type: number, roleId: number, state: boolean, id?: number }): Observable<any> {
        return this.httpClient.post<any>(`${this.appConfig.apiUrl}api/Components/SetCompsScope`, data);
    }

    public getStdInterfaces(): Observable<ISInterfaces[]> {
        const url = `${this.appConfig.apiUrl}api/StdInterfaces/GetStdInterFaces`;
        return this.httpClient.get<ISInterfaces[]>(url);
    }

    public getCsInInt(id: number): Observable<ISSteps[]> {
        const url = `${this.appConfig.apiUrl}api/StdInterfaces/GetCsInInt?id=${id}`;
        return this.httpClient.get<ISSteps[]>(url);
    }

    public getComponentStepsImpl(id: number): Observable<ISSteps[]> {
        const url = `${this.appConfig.apiUrl}api/Components/GetComponentStepsImpl?serieId=${id}`;
        return this.httpClient.get<any[]>(url);
    }

    public getStdStepsComponentImpl(data: any): Observable<any[]> {
        return this.httpClient.post<any[]>(`${this.appConfig.apiUrl}api/StdInterfaces/GetStdStepsComponentImpl`, data);
    }

    public getIntStepsInSerie(id: number): Observable<any> {
        const url = `${this.appConfig.apiUrl}api/StdInterfaces/GetIntStepsInSerie?intId=${id}`;
        return this.httpClient.get<any[]>(url);
    }

    public saveStdStepsForCsvImpl(data: any): Observable<any> {
        return this.httpClient.post<any[]>(`${this.appConfig.apiUrl}api/StdInterfaces/SaveStdStepsForCsvImpl`, data);
    }

    public getStep(id: number): Observable<any> {
        const url = `${this.appConfig.apiUrl}api/UserFactors/Step?id=${id}`;
        return this.httpClient.get<any[]>(url);
    }
}
