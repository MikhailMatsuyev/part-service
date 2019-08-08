import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UserFactorsService } from '../services/userfactors.service';
import { UniterState } from './../store/reducers';
import { exhaustMap, catchError, map, withLatestFrom } from 'rxjs/operators';
import * as AppLayout from '@store/app-layout';
import {
    StepsScopesActionTypes,
    SetStepsScopesRoleTableChoosed,
    SetStepsScopesRoleTableSuccess,
    SetStepsScopesRoleValuesSuccess,
    SetStepsScopesActiveAllComponentSteps,
    SetStepsScopesActiveAllComponentStepsSuccess,
    SetStepsScopesActiveOneComponentStepsSuccess,
    SetStepsScopesActiveAllStepsAllSeriesSuccess,
    SetStepsScopesRoleTable,
    getComponentSeriesValuesSelector,
    getRoleValueChoosedSelector,
    getComponentSeriesValuesChoosedSelector
} from '../store/steps-scopes';
import { of, from } from 'rxjs';
import { EffectError } from './user-factors.effects';
import { Store } from '@ngrx/store';

@Injectable()
export class StepsScopesEffects {
    constructor(
        public actions$: Actions,
        private userFactorsService: UserFactorsService,
        private store$: Store<UniterState>,
    ) { }

    @Effect()
    public getStepsScopesRoleValues$ = this.actions$
        .pipe(
            ofType(StepsScopesActionTypes.SET_STEPS_SCOPES_ROLE_VALUES),
            exhaustMap(() => this.userFactorsService.getAllRoles()
                .pipe(
                exhaustMap((item) => from([new SetStepsScopesRoleValuesSuccess(item), new SetStepsScopesRoleTable(item[0].id)])),
                catchError(() => of(new EffectError()))
                )
            )
        );


    @Effect()
    public getStepsScopesRoleTable$ = this.actions$
        .pipe(
            ofType(StepsScopesActionTypes.SET_STEPS_SCOPES_ROLE_TABLE),
            exhaustMap(({ payload }: IUnsafeAction) => this.userFactorsService.getAllSteps(payload)
                .pipe(
                    exhaustMap((item) => from([new SetStepsScopesRoleTableSuccess(item), new SetStepsScopesRoleTableChoosed(payload)])),
                    catchError(() => of(new EffectError()))
                )
            )
        );

    @Effect()
    public saveStepsScopesActiveAllComponentSteps = this.actions$
        .pipe(
            ofType(StepsScopesActionTypes.SET_STEPS_SCOPES_ACTIVE_ALL_COMPONENT_STEPS),
            withLatestFrom(
                this.store$.select(getComponentSeriesValuesChoosedSelector),
                this.store$.select(getRoleValueChoosedSelector),
            ),
            map(([activeCheckBoxes, componentSeriesChoosed, roleValueChoosed]) => {
                const { payload } = activeCheckBoxes as IUnsafeAction;
                return {
                        roleId: roleValueChoosed,
                        id: componentSeriesChoosed,
                        state: payload.checked,
                        type: payload.type
                };
            }),

            exhaustMap((data: any) =>
                this.userFactorsService.setCompsScope(data)
                    .pipe(
                        map(() => new SetStepsScopesActiveAllComponentStepsSuccess(data)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public saveStepsScopesActiveOneComponentSteps = this.actions$
        .pipe(
            ofType(StepsScopesActionTypes.SET_STEPS_SCOPES_ACTIVE_ONE_COMPONENT_STEPS),
            withLatestFrom(
                this.store$.select(getRoleValueChoosedSelector)
            ),
            map(([activeCheckBox, roleValueChoosed]) => {
                const { payload } = activeCheckBox as IUnsafeAction;
                return {
                        roleId: roleValueChoosed,
                        id: payload.id,
                        state: payload.checked,
                        type: payload.type
                };
            }),
            exhaustMap((data: any) =>
                this.userFactorsService.setCompsScope(data)
                         .pipe(
                                map(() => new SetStepsScopesActiveOneComponentStepsSuccess(data)),
                                catchError(() => of(new EffectError()))
                        )
            )
    );

    @Effect()
    public saveStepsScopesActiveAllStepsAllSeries = this.actions$
        .pipe(
            ofType(StepsScopesActionTypes.SET_STEPS_SCOPES_ACTIVE_All_STEPS_All_SERIES),
            withLatestFrom(
                this.store$.select(getRoleValueChoosedSelector)
            ),
            map(([activeCheckBox, roleValueChoosed]) => {
                const { payload } = activeCheckBox as IUnsafeAction;
                return {
                        roleId: roleValueChoosed,
                        state: payload.checked,
                        type: payload.type
                };
            }),
            exhaustMap((payload: any) =>
                this.userFactorsService.setCompsScope(payload)
                    .pipe(
                        exhaustMap(item => {
                            const data: any[] = [new SetStepsScopesActiveAllStepsAllSeriesSuccess(payload)];
                            if (data) {
                                data.push(new AppLayout.CreateLocalNotificaitonAction({
                                    type: 'success',
                                    text: payload.state ? 'All steps have been added' : 'All steps have been removed'
                                }));
                            }

                             return from(data);
                        }),
                        catchError(() => of(new EffectError()))
                    )
            )
        );
}
