import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UniterState } from '../store/reducers';
import { Store, select } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { getLoggedIn } from '../store/auth';
import * as Auth from '../store/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private store: Store<UniterState>
    ) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.store.pipe(
            select(getLoggedIn),
            map(authed => {
              if (!authed) {
                this.store.dispatch(new Auth.LoginRedirect());
                return false;
              }

              return true;
            }),
            take(1)
          );
    }
}
