import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { map, exhaustMap, catchError, filter, pluck } from 'rxjs/operators';
import { AppLayoutActions } from '@store/app-layout/app-layout.actions';
import * as AppLayout from '@store/app-layout';
import { UniterState } from '@store/reducers';
import { CommonApiService } from '../services/common-api.service';
import { of } from 'rxjs';
import { EffectError } from './user-factors.effects';

@Injectable()
export class AppLayoutEffects {
    constructor(
        public actions$: Actions,
        public store: Store<UniterState>,
        private commonApiService: CommonApiService
    ) {
    }

    @Effect()
    public create$ = this.actions$
        .pipe(
            ofType(AppLayoutActions.GET_TITLE),
            exhaustMap(() =>
                this.commonApiService.getProjectInfo()
                .pipe(
                    map((item) => new AppLayout.GetTitleSuccessAction(item)),
                    catchError(() => of(new EffectError()))
                )
            )
        );

    @Effect()
    public notifications$ = this.actions$
        .pipe(
            ofType(AppLayoutActions.GET_NOTIFICATIONS),
            map(({ payload }: IUnsafeAction) => payload),
            exhaustMap(({ batchSize, batchPart }) =>
                this.commonApiService.getUserNotifications(batchSize, batchPart)
                .pipe(
                    map(item => new AppLayout.GetNotificationsSuccessAction(item)),
                    catchError(() => of(new EffectError()))
                )
            )
        );

    @Effect()
    public toggleNotifications$ = this.actions$
        .pipe(
            ofType(AppLayoutActions.TOGGLE_NOTIFICATIONS),
            map(({ payload }: IUnsafeAction) => payload),
            exhaustMap((data: IToggleNotification) =>
                this.commonApiService.toggleNotification(data)
                .pipe(
                    filter(item => item && !item.error),
                    pluck('data'),
                    map(item => new AppLayout.ToggleNotificationSuccessAction(item)),
                    catchError(() => of(new EffectError()))
                )
            )
        );

    @Effect()
    public deleteNotifications$ = this.actions$
        .pipe(
            ofType(AppLayoutActions.DELETE_NOTIFICATIONS),
            map(({ payload }: IUnsafeAction) => payload),
            exhaustMap((data: IDeleteNotification) =>
                this.commonApiService.removeNotification(data)
                .pipe(
                    filter(item => item && !item.error),
                    pluck('data'),
                    map(item => new AppLayout.DeleteNotificationSucessAction({...data, ...item})),
                    catchError(() => of(new EffectError()))
                )
            )
        );

    @Effect()
    public setTitle$ = this.actions$
        .pipe(
            ofType(AppLayoutActions.SET_TITLE),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.commonApiService.setProjectInfo(payload)
                    .pipe(
                        map(() => new AppLayout.SetTitleSuccessAction(payload)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public getProjectVersion$ = this.actions$
        .pipe(
            ofType(AppLayoutActions.GET_PROJECT_VERSION),
            exhaustMap(() =>
                this.commonApiService.getProjectVersion()
                    .pipe(
                        map(item => new AppLayout.GetProjectVersionSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );
}
