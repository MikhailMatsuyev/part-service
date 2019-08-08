import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UserFactorsService } from '../services/userfactors.service';
import { UniterState } from './../store/reducers';
import { exhaustMap, catchError, map, withLatestFrom, filter, switchMap } from 'rxjs/operators';
import {
    InterfacesStepsActionTypes,
    SetISInterfaceValues,
    SetISInterfaceValuesSuccess,
    SetISInterfaceValueChoosed,
    SetISInterfaceValueChoosedSuccess,
    SetISComponentValueChoosed,
    SetISComponentValueChoosedSuccess,
    SetISComponentValues,
    SetISComponentStepValues,
    SetISInterfaceStepValues,
    SetISInterfaceStepValuesConnectSuccess,
    SetISInterfaceStepValuesConnect,
    SetISComponentStepTrueCheckBoxes,
    getInterfaceValueChoosedSelector,
    getInterfaceStepValuesConnectSelector,
    getComponentStepValues,
    getTrueCheckboxesComponentStepSelector
} from '../store/interfaces-steps';
import { of, from, Observable, empty } from 'rxjs';
import { EffectError } from './user-factors.effects';
import { Store } from '@ngrx/store';

@Injectable()
export class InterfacesStepsEffects {
    constructor(
        public actions$: Actions,
        private userFactorsService: UserFactorsService,
        private store$: Store<UniterState>,
    ) { }

    @Effect()
    public getStdInterFaces$ = this.actions$
        .pipe(
            ofType(InterfacesStepsActionTypes.SET_IS_INTERFACE_VALUES),
            exhaustMap(() => this.userFactorsService.getStdInterfaces()
                .pipe(
                exhaustMap((item) => (from([
                    new SetISInterfaceValuesSuccess(item),
                    new SetISInterfaceValueChoosed(item[0] ? item[0].id : null)]) )),
                    catchError(() => of(new EffectError()))
                )
            )
        );

    @Effect()
    public getCsInInt$ = this.actions$
        .pipe(
            ofType(InterfacesStepsActionTypes.SET_IS_INTERFACE_VALUES_CHOOSED),
            exhaustMap(({ payload }: IUnsafeAction) => this.userFactorsService.getCsInInt(payload)
                .pipe(
                exhaustMap((item) => {
                    const list: any[] = [new SetISInterfaceValueChoosedSuccess(payload), new SetISComponentValues(item)];
                    if (item[0]) {
                        list.push(new SetISComponentValueChoosed(item[0].id));
                    }

                    return from(list);
                }
            ),
                    catchError(() => of(new EffectError()))
                )
            )
    );

    @Effect()
    public getComponentStepsImpl$ = this.actions$
        .pipe(
            ofType(InterfacesStepsActionTypes.SET_IS_COMPONENT_VALUE_CHOOSED),
            exhaustMap(({ payload }: IUnsafeAction) => this.userFactorsService.getComponentStepsImpl(payload)
                .pipe(
                    exhaustMap((item) => (from([new SetISComponentValueChoosedSuccess(payload), new SetISComponentStepValues(item)])
                )),
                    catchError(() => of(new EffectError()))
                )
            )
        );

    @Effect()
    public getStdStepsComponentImpl$ = this.actions$
        .pipe(
            ofType(InterfacesStepsActionTypes.SET_IS_ACTIVE_ONE_COMPONENT_STEP_VALUE),
            withLatestFrom(
                this.store$.select(getInterfaceValueChoosedSelector),
                this.store$.select(getComponentStepValues),
            ),
            map(([activeCheckBoxes, interfaceValueChoosed]) => {
                const { payload } = activeCheckBoxes as IUnsafeAction;
                return {
                    csvIds: payload,
                    intId: interfaceValueChoosed
                };
            }),

            exhaustMap((data) => this.userFactorsService.getStdStepsComponentImpl(data)
                .pipe(
                    exhaustMap((item) => (from([new SetISInterfaceStepValues(item), new SetISComponentStepTrueCheckBoxes(data.csvIds)]))),
                    catchError(() => of(new EffectError()))
                )
            )
    );

    @Effect()
    public getIntStepsInSerie$ = this.actions$
        .pipe(
            ofType(InterfacesStepsActionTypes.SET_IS_INTERFACE_STEP_VALUES_CONNECT),
            withLatestFrom(
                this.store$.select(getInterfaceValueChoosedSelector),
            ),
            map(([activeCheckBoxes, interfaceValueChoosed]) => {
                return interfaceValueChoosed;
            }),
            exhaustMap((data: any) => this.userFactorsService.getIntStepsInSerie(data)
                .pipe(
                    exhaustMap((item) => (from([new SetISInterfaceStepValuesConnectSuccess(item)]))),
                    catchError(() => of(new EffectError()))
                )
            )
        );

    @Effect()
    public saveStdStepsForCsvImpl$ = this.actions$
            .pipe(
                ofType(InterfacesStepsActionTypes.SET_MODAL_SAVE_ITEMS_CHECKED),
            withLatestFrom(
                this.store$.select(getInterfaceStepValuesConnectSelector),
                this.store$.select(getInterfaceValueChoosedSelector),
                this.store$.select(getTrueCheckboxesComponentStepSelector)
            ),
            map(([activeCheckBoxes, stepValuesConnect, interfaceValueChoosed, trueCheckboxesComponentStep]) => {
                const itemChecked = stepValuesConnect.filter(item => item.checked);
                const arrayTrueStepValuesConnect = itemChecked.map(item => item.id);
                const arrayTrueStepValuesConnectForAction = itemChecked;


                return {
                    req: {
                        intId: interfaceValueChoosed,
                        csvIds: trueCheckboxesComponentStep,
                        intStepIds: arrayTrueStepValuesConnect
                    },
                    forAction: {
                        arrayTrueStepValuesConnectForAction
                    }
                };
            }),
            exhaustMap(({ req, forAction }) => this.userFactorsService.saveStdStepsForCsvImpl(req)
                .pipe(
                    exhaustMap(() => (from([new SetISInterfaceStepValues(forAction.arrayTrueStepValuesConnectForAction)]))),
                    catchError(() => of(new EffectError())
                    )
                )
            )
        );
}
