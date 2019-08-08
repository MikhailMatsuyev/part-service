import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../app.config';
import { CoreModule } from '../core.module';

@Injectable({
    providedIn: CoreModule
})
export class RecommendationsService {
    constructor(
        private readonly appConfig: AppConfig,
        private readonly httpClient: HttpClient
    ) {
    }

    public getCsMainDropDown(id: number): Observable<RecommendationsComponent[]> {
        return this.httpClient.get<RecommendationsComponent[]>(`${this.appConfig.apiUrl}api/Recommendations/GetCsMainDropDown?id=${id}`);
    }

    public getUfMainDropDown(id: number): Observable<RecommendationsComponent[]> {
        return this.httpClient.get<RecommendationsComponent[]>(`${this.appConfig.apiUrl}api/Recommendations/GetUfMainDropDown?id=${id}`);
    }

    public getItemDependencies({id, type}: {id: number, type: number}): Observable<RecommendationsComponent[]> {
        const url = `${this.appConfig.apiUrl}api/Recommendations/GetItemDependencies?id=${id}&type=${type}`;
        return this.httpClient.get<RecommendationsComponent[]>(url);
    }

    public getValuesWithStatus({ csId, ufId}: {csId: number, ufId: number}): Observable<RecommendationsCalculationsStatus> {
        const url = `${this.appConfig.apiUrl}api/Recommendations/GetValuesWithStatus?csId=${csId}&ufId=${ufId}`;
        return this.httpClient.get<RecommendationsCalculationsStatus>(url);
    }

    public getDimensionsRecommendation(data: any): Observable<DimensionsRecommendation> {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<DimensionsRecommendation>(`${this.appConfig.apiUrl}api/Recommendations/GetDimensionsRecommendation`, data);
    }

    public getRecommendationView(data: any): Observable<RecommendationView> {
        return this.httpClient.post<RecommendationView>(`${this.appConfig.apiUrl}api/Recommendations/GetCalculationView`, data);
    }

    public getRecommendationViewMain(data: any): Observable<RecommendationsView> {
        return this.httpClient.post<RecommendationsView>(`${this.appConfig.apiUrl}api/Recommendations/GetRecommendationView`, data);
    }

    public lastChanges(type: number): Observable<LastChangesText> {
        return this.httpClient.get<LastChangesText>(`${this.appConfig.apiUrl}api/Recommendations/LastChanges?type=${type}`);
    }

    public exportCalculationsTable(data: RecommendationView): Observable<void> {
        return this.httpClient.post<void>(`${this.appConfig.apiUrl}api/Recommendations/ExportCalculationsTable`, data);
    }

    public autoGenerate(): Observable<void> {
        return this.httpClient.post<void>(`${this.appConfig.apiUrl}api/Recommendations/AutoGenerate`, null);
    }

    public killUpdates(data: number): Observable<void> {
        return this.httpClient.post<void>(`${this.appConfig.apiUrl}api/Recommendations/KillUpdates`, {type: data});
    }

    public getUpdateStatus(): Observable<StatusCalculate> {
        return this.httpClient.get<StatusCalculate>(`${this.appConfig.apiUrl}api/Recommendations/GetUpdateStatus`);
    }

    public updateRecommendationsTable(): Observable<void> {
        return this.httpClient.post<void>(`${this.appConfig.apiUrl}api/Recommendations/UpdateRecommendationsTable`, null);
    }

    public getDefaultRecommendation(): Observable<RecommendationsType> {
        return this.httpClient.get<RecommendationsType>(`${this.appConfig.apiUrl}api/Recommendations/GetDefaultRecommendation`);
    }

    public setDefaultRecommendation(data: RecommendationsType): Observable<void> {
        return this.httpClient.post<void>(`${this.appConfig.apiUrl}api/Recommendations/SetDefaultRecommendation`, {state: data});
    }

    public getAllIdsForTable(data: RecommendationView): Observable<TableIds> {
        return this.httpClient.post<TableIds>(`${this.appConfig.apiUrl}api/Recommendations/GetAllIdsForTable`, data);
    }

    public downloadStepsCsUf(data: {csId: number, ufId: number}): Observable<void> {
        return this.httpClient.post<void>(`${this.appConfig.apiUrl}api/Recommendations/DownloadStepsCsUf`, data);
    }

    public download(data: {csId: number, ufIds: number[]}): Observable<void> {
        return this.httpClient.post<void>(`${this.appConfig.apiUrl}api/Recommendations/Download`, data);
    }

    public downloadUserFactors(data: ExportUserFactor): Observable<void> {
        return this.httpClient.post<void>(`${this.appConfig.apiUrl}api/Recommendations/DownloadUserFactors`, data);
    }

    public saveRecommendationRow(data: RecommendationRow): Observable<void> {
        return this.httpClient.post<void>(`${this.appConfig.apiUrl}api/Recommendations/SaveRecommendationRow`, data);
    }

    public getCommentOfCell({ csvId, ufvId }: {ufvId: number, csvId: number}): Observable<RecommendationCellComment> {
        const url = `${this.appConfig.apiUrl}api/Recommendations/GetCommentOfCell?ufvId=${ufvId}&csvId=${csvId}`;
        return this.httpClient.get<RecommendationCellComment>(url);
    }

    public setCommentToCell(data: RecommendationCommentRequest): Observable<void> {
        return this.httpClient.post<void>(`${this.appConfig.apiUrl}api/Recommendations/SetCommentToCell`, data);
    }

    public saveManyRecommendations(data: RecommendationCommentsRequest): Observable<void> {
        return this.httpClient.post<void>(`${this.appConfig.apiUrl}api/Recommendations/SaveManyRecommendations`, data);
    }

    public setAllStepStatus(data: any): Observable<void> {
        return this.httpClient.post<void>(`${this.appConfig.apiUrl}api/Recommendations/SetAllStepStatus`, data);
    }
}
