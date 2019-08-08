import { CoreModule } from './../core.module';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from './../../app.config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: CoreModule
})
export class RecommendationsFormulasService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly appConfig: AppConfig,
  ) { }

  public getFormulas(): Observable<FormulaResponseModel[]> {
    const url = `${this.appConfig.apiUrl}api/Formulas/GetFormulas`;
    return this.httpClient.get<FormulaResponseModel[]>(url);
  }

  public setFormula(data: FormulaEditModel): Observable<FormulaResponseModel[]> {
    const url = `${this.appConfig.apiUrl}api/Formulas/EditFormula`;
    return this.httpClient.post<FormulaResponseModel[]>(url, data);
  }

  public getDropdownCS(): Observable<any> {
    const url = `${this.appConfig.apiUrl}api/Components/GetComponentSeriesImpl`;
    return this.httpClient.get(url);
  }

  public getDropdownUF(): Observable<any> {
    const url = `${this.appConfig.apiUrl}api/UserFactors/GetUserFactorsImpl`;
    return this.httpClient.get(url);
  }

  public deleteFormulas(arr: FormIdentityModel[]): Observable<any> {
    const url = `${this.appConfig.apiUrl}api/Formulas/DeleteFormulas`;
    return this.httpClient.post(url, { ids: arr });
  }

  public enableFormulas(obj: EnableFormulaModel): Observable<any> {
    const url = `${this.appConfig.apiUrl}api/Formulas/EnableFormulas`;
    return this.httpClient.post(url, obj);
  }

  public downloadXLSX(): Observable<any> {
    const url = `${this.appConfig.apiUrl}api/Formulas/DownloadXlsx`;
    return this.httpClient.post(url, null);
  }

  public verifyFormulaValuesUF(ufId: number): Observable<any> {
    const url = `${this.appConfig.apiUrl}api/UserFactors/UserFactorStepsValuesList`;
    return this.httpClient.get(`${url}?ufId=${ufId}`);
  }

  public verifyFormulaValuesCS(csId: number, ufId: number): Observable<any> {
    const url = `${this.appConfig.apiUrl}api/Components/ValidateCsValues`;
    return this.httpClient.get(`${url}?csId=${csId}&ufId=${ufId}`);
  }
}
