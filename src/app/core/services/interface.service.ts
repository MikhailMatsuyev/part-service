import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreModule } from '@core/core.module';
import { AppConfig } from '../../app.config';

@Injectable({
    providedIn: CoreModule
})

export class InterfaceService {
    constructor(
        private readonly appConfig: AppConfig,
        private readonly httpClient: HttpClient
    ) {}

    public getInterfacesData(): Observable<UsersFactors[]> {
        return this.httpClient.get<UsersFactors[]>(`${this.appConfig.apiUrl}api/StdInterfaces/GetData`);
    }

    public editInterfaces(data: any): Observable<any> {
        return this.httpClient.post<any>(`${this.appConfig.apiUrl}api/StdInterfaces/EditData`, data);
    }

    public saveStep(data: any): Observable<any> {
        return this.httpClient.post<any>(`${this.appConfig.apiUrl}api/StdInterfaces/StepCreate`, data);
    }

    public editStep(data: any): Observable<any> {
        return this.httpClient.post<any>(`${this.appConfig.apiUrl}api/StdInterfaces/StepEdit`, data);
    }

    public deleteInterfaces(data: any): Observable<UsersFactors[]> {
        return this.httpClient.post<UsersFactors[]>(`${this.appConfig.apiUrl}api/StdInterfaces/DeleteData`, data);
    }

    public stepsCopy(data: StepSelectCopy): Observable<any> {
        return this.httpClient.post<any>(`${this.appConfig.apiUrl}api/StdInterfaces/StepsCopy`, data);
    }

    public insertStep(data: any): Observable<any> {
        return this.httpClient.post<any>(`${this.appConfig.apiUrl}api/StdInterfaces/StepInsert`, data);
    }

    public changeInterfaceGroup(data: any): Observable<any> {
        return this.httpClient.post<any>(`${this.appConfig.apiUrl}api/StdInterfaces/ChangeGroup`, data);
    }

    public getStep(id: number): Observable<any> {
        const url = `${this.appConfig.apiUrl}api/StdInterfaces/Step?id=${id}`;
        return this.httpClient.get<any[]>(url);
    }

    public getInterfacesGroup(withSeries = true): Observable<UsersFactors[]> {
        return this.httpClient.get<UsersFactors[]>(`${this.appConfig.apiUrl}api/StdInterfaces/GetGroups?withSeries=${withSeries}`);
    }

    public getStdInterFaces(): Observable<InterfacesImp[]> {
        const url = `${this.appConfig.apiUrl}api/StdInterfaces/GetStdInterFaces`;
        return this.httpClient.get<InterfacesImp[]>(url);
    }

    public getConnectedComponents(intId: number): Observable<InterfacesImp[]> {
        const url = `${this.appConfig.apiUrl}api/StdInterfaces/GetConnectedComponents?id=${intId}`;
        return this.httpClient.get<InterfacesImp[]>(url);
    }

    public getInterfaceNetwotk(intId: number): Observable<InterfaceNetwork> {
        const url = `${this.appConfig.apiUrl}api/StdInterfaces/GetInterfaceNetwork?id=${intId}`;
        return this.httpClient.get<InterfaceNetwork>(url);
    }

    public getConnectionElements(): Observable<any[]> {
        const url = `${this.appConfig.apiUrl}api/Components/GetComponentSeriesList?serieId=-1`;
        return this.httpClient.get<any[]>(url);
    }

    public saveConnectionElemenst(id: number, values: number[]): Observable<any[]> {
        const url = `${this.appConfig.apiUrl}api/StdInterfaces/SaveCsStdInterFaceImpl`;
        return this.httpClient.post<any[]>(url, { id, values });
    }

    public downloadInterfaceConnections(id: number): Observable<any> {
        const url = `${this.appConfig.apiUrl}api/StdInterfaces/DownloadConnections`;
        return this.httpClient.post<any>(url, { id });
    }
}
