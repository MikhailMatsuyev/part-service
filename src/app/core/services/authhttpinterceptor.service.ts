import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { WebStorage, StorageType } from '../decorators/webstorage';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
    @WebStorage(StorageType.localStorage) public token: string;

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.token) {
            const authReq = req.clone({headers: this.setAuthHeaders(req)});
            return next.handle(authReq);
        }

        return next.handle(req);
    }

    private setAuthHeaders(req: HttpRequest<any>): HttpHeaders {
        const headerSettings: {[name: string]: string | string[]; } = {};
        for (const key of req.headers.keys()) {
            headerSettings[key] = req.headers.getAll(key);
        }
        headerSettings['Authorization'] = `Bearer ${this.token}`;
        return new HttpHeaders(headerSettings);
    }
}
