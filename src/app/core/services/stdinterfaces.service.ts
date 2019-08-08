import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';
import { AppConfig } from '../../app.config';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: CoreModule
})
export class StdInterfacesService {

    private apiUrl = `${this.appConfig.apiUrl}StdInterfaces`;

    constructor(
        private readonly appConfig: AppConfig,
        private readonly httpClient: HttpClient
    ) { }

    public getInterfaceGroups(): Observable<InterfaceGroups[]> {
        return this.httpClient.post<InterfaceGroups[]>(`${this.apiUrl}/GetInterfaceGroups`, null);
    }

    public getStdInterFaces(): Observable<StdInterfaces[]> {
        return this.httpClient.post<StdInterfaces[]>(`${this.apiUrl}/GetStdInterFaces`, null);
    }

    public editStdInterFaces(data: EditStdInterfaces | RemoveStdInterfaces): Observable<StdInterfaces[]> {
        return this.httpClient.post<StdInterfaces[]>(`${this.apiUrl}/ResponseEditStdInterFaces`, data);
    }

    public saveStdInterFaces(data: ResponseInterfaceGroup): Observable<InterfaceGroups[]> {
        return this.httpClient.post<InterfaceGroups[]>(`${this.apiUrl}/ResponseInterfaceGroups`, data);
    }

    public rowCopy(data: RowCopyModel): Observable<void> {
        return this.httpClient.post<void>(`${this.apiUrl}/RowCopy`, data);
    }

    public getStdSteps({sortGroups, sortSeries, toggleColumns}: any): Observable<StdInterFacesSteps[]> {
        const url = `${this.apiUrl}/GetSteps?sortGroups=${sortGroups}&sortSeries=${sortSeries}&toggleColumns=${toggleColumns}`;
        return this.httpClient.get<StdInterFacesSteps[]>(`${url}`);
    }

    public getStdInterFacesImpl(): Observable<StdInterfaces[]> {
        return this.httpClient.post<StdInterfaces[]>(`${this.apiUrl}/GetStdInterFacesIMPL`, null);
    }

    public getConnectedComponents(interfaceId: number): Observable<ConnectedComponents[]> {
        return this.httpClient.get<ConnectedComponents[]>(`${this.apiUrl}/GetConnectedComponents?interfaceId=${interfaceId}`);
    }

    public getInterfaceNetwork(interfaceId: number): Observable<InterfaceNetwork> {
        return this.httpClient.get<InterfaceNetwork>(`${this.apiUrl}/GetInterfaceNetwork?interfaceId=${interfaceId}`);
    }
}
