import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../app.config';
import { CoreModule } from '../core.module';

@Injectable({
    providedIn: CoreModule
})
export class UsersService {
    constructor(
        private readonly appConfig: AppConfig,
        private readonly httpClient: HttpClient
    ) {
    }

    public getOnline(): Observable<OnlineStatus[]> {
        return this.httpClient.get<OnlineStatus[]>(`${this.appConfig.apiUrl}api/Users/Online`);
    }

    public changePassword(data: {oldPassword: string, newPassword: string}): Observable<string> {
        return this.httpClient.post<string>(`${this.appConfig.apiUrl}api/Users/ChangePassword`, data);
    }

    public checkGuest(): Observable<boolean> {
        return this.httpClient.get<boolean>(`${this.appConfig.apiUrl}api/Users/CheckGuest`);
    }

    public setGuest(enable: boolean): Observable<boolean> {
        return this.httpClient.post<boolean>(`${this.appConfig.apiUrl}api/Users/SetGuest`, {enable});
    }

    public getRoles(): Observable<UserRoles[]> {
        return this.httpClient.get<UserRoles[]>(`${this.appConfig.apiUrl}api/Users/GetRoles`);
    }

    public getUsers(roleId: number): Observable<UsersModel[]> {
        return this.httpClient.get<UsersModel[]>(`${this.appConfig.apiUrl}api/Users/GetUsers?roleId=${roleId}`);
    }

    public editRole(data: {id: number, name: string}): Observable<UserRoles> {
        return this.httpClient.post<UserRoles>(`${this.appConfig.apiUrl}api/Users/EditRole`, data);
    }

    public deleteRole(id: number): Observable<boolean> {
        return this.httpClient.post<boolean>(`${this.appConfig.apiUrl}api/Users/DeleteRole`, {id});
    }

    public editUser(data: UserResponseModel): Observable<boolean> {
        return this.httpClient.post<boolean>(`${this.appConfig.apiUrl}api/Users/EditUser`, data);
    }

    public deleteUsers(ids: number[]): Observable<void> {
        return this.httpClient.post<void>(`${this.appConfig.apiUrl}api/Users/DeleteUsers`, {ids});
    }

    public manageUsersInRole(data: {roleId: number, users: number[]}): Observable<void> {
        return this.httpClient.post<void>(`${this.appConfig.apiUrl}api/Users/ManageUsersInRole`, data);
    }

    public getRolesTree(): Observable<any[]> {
        return this.httpClient.get<any[]>(`${this.appConfig.apiUrl}api/Users/GetAvailablePages`);
    }
}
