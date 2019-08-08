import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UniterState } from '@store/reducers';
import { Store, select } from '@ngrx/store';
import { map, first, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import * as Applayout from '@store/app-layout';
import { CommonApiService } from '@core/services/common-api.service';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PermissionGuard implements CanActivateChild {
    constructor(
        private store: Store<UniterState>,
        private commonApiService: CommonApiService
    ) { }

    public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.store.pipe(
            select(Applayout.getPagesAccess),
            switchMap(item => {
                if (item.length > 0) {
                    return of(item);
                }

                return this.commonApiService.getPagesByUser()
                    .pipe(
                        tap(items => this.store.dispatch(new Applayout.SetPagesAccess(items)))
                    );
            }),
            map(item => {
                if (childRoute && childRoute.data && item.length > 0) {
                    const { pageName, tabName } = childRoute.data;
                    return item.some(({ pageName: pageNameAccess, tabName: tabNameAccess, hasAccess }) => {
                        return (pageNameAccess === pageName && tabName === tabNameAccess) ? hasAccess : false;
                    });
                }

                return true;
            }),
            first()
        );
    }
}
