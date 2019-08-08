import {
    HttpHandler,
    HttpEvent,
    HttpRequest,
    HttpErrorResponse,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router) {}

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap(ev => {}, err => {
                if (err instanceof HttpErrorResponse && err.status === 401) {
                    this.clearToken();
                    this.router.navigate(['/login']);
                }
            })
        );
    }

    private clearToken(): void {
        // TODO: move in service
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
}
