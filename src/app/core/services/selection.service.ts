import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoreModule } from '../core.module';
import { AppConfig } from '../../app.config';

@Injectable({
    providedIn: CoreModule
})
export class SelectionService {
    constructor(
        private readonly appConfig: AppConfig,
        private readonly httpClient: HttpClient
    ) { }

    public exportUfDataToExcel(data: ExportType): Observable<void> {
        return this.httpClient.post<void>(`${this.appConfig.apiUrl}api/Selection/ExportUfDataToExcel`, {exportType: data});
    }

    public getInfo({ id, type }: { id: number, type: SelectionInfoType }): Observable<SelectionGetInfo> {
        const url = `${this.appConfig.apiUrl}api/Selection/GetInfo?id=${id}&type=${type}`;
        return this.httpClient.get<SelectionGetInfo>(url);
    }

    public getSpecifications(): Observable<Specification[]> {
        return this.httpClient.get<Specification[]>(`${this.appConfig.apiUrl}api/Specification/GetSpecifications`);
    }

    public saveSpecification(id: number): Observable<{data: {accessOnSave: boolean}, message: string}> {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<{data: {accessOnSave: boolean}, message: string}>(`${this.appConfig.apiUrl}api/Specification/SaveSpecification`, {id});
    }

    public saveDefaultSpecification(id: number): Observable<boolean> {
        return this.httpClient.post<boolean>(`${this.appConfig.apiUrl}api/Specification/SaveDefaultSpecification`, {id});
    }

    public loadSpecification(id: number): Observable<LoadSpecification> {
        return this.httpClient.post<LoadSpecification>(`${this.appConfig.apiUrl}api/Specification/LoadSpecification`, {id});
    }

    public getSpecInformation(id: number): Observable<SpecInformation> {
        return this.httpClient.get<SpecInformation>(`${this.appConfig.apiUrl}api/Specification/GetSpecInformation?id=${id}`);
    }

    public createSpecification(data: {specName: string, specCategory: string}): Observable<number> {
        return this.httpClient.post<number>(`${this.appConfig.apiUrl}api/Specification/CreateSpecification`, data);
    }

    public createBackgroundInformation(data: SpecInformation): Observable<void> {
        return this.httpClient.post<void>(`${this.appConfig.apiUrl}api/Specification/CreateBackgroundInformation`, data);
    }

    public deleteSpecificationInformation(id: number): Observable<void> {
        return this.httpClient.post<void>(`${this.appConfig.apiUrl}api/Specification/DeleteSpecificationInformation`, {id});
    }

    public saveSpecInformation(data: SpecInformation): Observable<void> {
        return this.httpClient.post<void>(`${this.appConfig.apiUrl}api/Specification/SaveSpecInformation`, data);
    }

    public createCategory(category: string): Observable<number> {
        return this.httpClient.post<number>(`${this.appConfig.apiUrl}api/Specification/CreateCategory`, {category});
    }

    public saveAs(data: SpecificationsSaveAsModel): Observable<number> {
        return this.httpClient.post<number>(`${this.appConfig.apiUrl}api/Specification/SaveAs`, data);
    }

    public renameNode(data: RenameNodeModel): Observable<void> {
        return this.httpClient.post<void>(`${this.appConfig.apiUrl}api/Specification/Rename`, data);
    }

    public deleteNode(data: DeleteNodeModel): Observable<void> {
        return this.httpClient.post<void>(`${this.appConfig.apiUrl}api/Specification/Delete`, data);
    }

    public moveNode(data: {specId: number, categoryId: number}): Observable<void> {
        return this.httpClient.post<void>(`${this.appConfig.apiUrl}api/Specification/Move`, data);
    }

    public downloadBackgroundInformations(ids: number[]): Observable<void> {
        return this.httpClient.post<void>(`${this.appConfig.apiUrl}api/Specification/DownloadBackgroundInformations`, {ids});
    }

    public getUfTree(init: boolean): Observable<UfTree[]> {
        return this.httpClient.get<UfTree[]>(`${this.appConfig.apiUrl}api/Selection/GetUfTree?init=${init}`);
    }

    public saveUserFactorValues(ids: number[]): Observable<void> {
        return this.httpClient.post<void>(`${this.appConfig.apiUrl}api/Selection/SaveUserFactorValues`, {ids});
    }

    public revertUserFactorValues(): Observable<UfTree[]> {
        return this.httpClient.post<UfTree[]>(`${this.appConfig.apiUrl}api/Selection/RevertUserFactorValues`, null);
    }

    public getCsTree({ reverted, notificationsOff } = {reverted: false, notificationsOff: true}): Observable<CSTree> {
        const url = `${this.appConfig.apiUrl}api/Selection/GetCsTree?reverted=${reverted}&notificationsOff=${notificationsOff}`;
        return this.httpClient.get<CSTree>(url);
    }

    public getAllComponents(): Observable<csgList> {
        return this.httpClient.get<csgList>(`${this.appConfig.apiUrl}api/Selection/GetAllComponents`);
    }

    public getRecommendationsCount({ csId, categoryId }: { categoryId: number, csId: number }): Observable<number> {
        const url = `${this.appConfig.apiUrl}api/Selection/GetRecommendationsCount?csId=${csId}&categoryId=${categoryId}`;
        return this.httpClient.get<number>(url);
    }

    public getImpossibleComponents({ csId, categoryId }: { categoryId: number, csId: number }): Observable<ImpossibleComponents> {
        const url = `${this.appConfig.apiUrl}api/Selection/GetImpossibleComponents?csId=${csId}&categoryId=${categoryId}`;
        return this.httpClient.get<ImpossibleComponents>(url);
    }

    public getFullyImpossibleComponents(csId: number): Observable<FullyImpossibleComponent[]> {
        const url = `${this.appConfig.apiUrl}api/Selection/GetFullyImpossibleComponents?csId=${csId}`;
        return this.httpClient.get<FullyImpossibleComponent[]>(url);
    }

    public getComponentsInterfaces(csId: number): Observable<SelectionComponentsInterfaces> {
        const url = `${this.appConfig.apiUrl}api/Selection/GetComponentsInterfaces?csId=${csId}`;
        return this.httpClient.get<SelectionComponentsInterfaces>(url);
    }

    public saveSelectComponent(csvId: number): Observable<SelectComponentModel> {
        return this.httpClient.post<SelectComponentModel>(`${this.appConfig.apiUrl}api/Selection/SaveSelectComponent`, {csvId});
    }

    public saveUnselectComponent(csvId: number): Observable<SelectComponentModel> {
        return this.httpClient.post<SelectComponentModel>(`${this.appConfig.apiUrl}api/Selection/SaveUnselectComponent`, {csvId});
    }

    public getTypeKey(stepIds: number[]): Observable<string> {
        return this.httpClient.post<string>(`${this.appConfig.apiUrl}api/Selection/GetTypeKey`, {stepIds});
    }

    public getFormulaValue(): Observable<string> {
        return this.httpClient.get<string>(`${this.appConfig.apiUrl}api/Selection/GetFormulaValue`);
    }

    public getPerformancesForOrder(): Observable<UserFactorConnected[]> {
        return this.httpClient.get<UserFactorConnected[]>(`${this.appConfig.apiUrl}api/Selection/GetPerformancesForOrder`);
    }

    public componentsState(data: { csvIds: number[], ufvIds: number[] }): Observable<Array<{csvId: boolean, rec: boolean}>> {
        return this.httpClient.post<Array<{csvId: boolean, rec: boolean}>>(`${this.appConfig.apiUrl}api/Selection/ComponentsState`, data);
    }

    public componentPosAnalyse(data: { csvIds: number[], ufvIds: number[], csvId: number }): Observable<PosAnalyse[]> {
        return this.httpClient.post<PosAnalyse[]>(`${this.appConfig.apiUrl}api/Selection/ComponentPosAnalyse`, data);
    }

    public uncompatableUserFactorValues(data: { csvIds: number[], ufvIds: number[] }): Observable<Array<{ ufId: number, ufvId: number }>> {
        const url = `${this.appConfig.apiUrl}api/Selection/UncompatableUserFactorValues`;
        return this.httpClient.post<Array<{ufId: number, ufvId: number}>>(url, data);
    }

    public getAvailableUserFactorValuesForAnalyse(csvIds: number[]): Observable<AvailableUserFactor> {
        const url = `${this.appConfig.apiUrl}api/Selection/GetAvailableUserFactorValuesForAnalyse`;
        return this.httpClient.post<AvailableUserFactor>(url, {csvIds});
    }

    public analyseComponentState({ csId, csvId }: {csId: number, csvId: number}): Observable<AnalyzeComponentState> {
        const url = `${this.appConfig.apiUrl}api/Selection/AnalyseComponentState?csId=${csId}&csvId=${csvId}`;
        return this.httpClient.get<AnalyzeComponentState>(url);
    }

    public downloadPDF(indexStyle: number): Observable<LoadSpecification> {
        return this.httpClient.post<LoadSpecification>(`${this.appConfig.apiUrl}api/Pdf/DownloadFile`, {indexStyle});
    }

    public setManyUserFactors(ids: number[]): Observable<void> {
        return this.httpClient.post<void>(`${this.appConfig.apiUrl}api/Selection/SetManyUserFactors`, {ids});
    }
}
