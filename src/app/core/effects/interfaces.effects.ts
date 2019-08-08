import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { exhaustMap, map, pluck, catchError, withLatestFrom } from 'rxjs/operators';
import {
    InterfacesActionTypes,
    GetInterfacesSuccess,
    ChangeGroupInfoSuccess,
    SaveInterfacesStepSuccess,
    EditInterfacesStepSuccess,
    SwapStepSuccess,
    InsertStepSuccess,
    GetGroupListSuccess,
    RemoveInterfaceStepsSuccess,
    CreateGroupSuccess,
    RemoveGroupSuccess,
    ChangeGroupPlaceSuccess,
    ClearSelectStep,
    CollapseInterfacesGroups,
    ImportStepSuccess,
    CollapseGroup
} from '@core/store/interfaces';
import { InterfaceService } from '@core/services/interface.service';
import { CommonApiService } from '@core/services/common-api.service';
import { Store } from '@ngrx/store';
import { of, from } from 'rxjs';
import { LevelRemove } from '@core/models/generic';
import { UniterState } from '@core/store/reducers';
import { omit } from '@utils/utilsfunc';
import { EffectError } from './user-factors.effects';

@Injectable()
export class InterfacesEffects {
    constructor(
        public actions$: Actions,
        private store$: Store<UniterState>,
        private interfaceService: InterfaceService,
        private commonApiService: CommonApiService
    ) {
    }

    @Effect()
    public getInterfaces$ = this.actions$
        .pipe(
        ofType(InterfacesActionTypes.GET_INTERFACES),
        exhaustMap(() =>
            this.interfaceService.getInterfacesData()
            .pipe(
                exhaustMap((item) => from([new GetInterfacesSuccess(item), new CollapseInterfacesGroups(true)])),
                catchError(() => of(new EffectError()))
            )
        )
    );

    @Effect()
    public editUserFactors$ = this.actions$
        .pipe(
            ofType(InterfacesActionTypes.CHANGE_GROUP_INFO),
            exhaustMap(({payload}: IUnsafeAction) =>
                this.interfaceService.editInterfaces(payload)
                    .pipe(
                        pluck('data'),
                        map((item) => new ChangeGroupInfoSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public addNewStep$ = this.actions$
        .pipe(
            ofType(InterfacesActionTypes.SAVE_INTERFACES_STEP),
            exhaustMap(({payload}: IUnsafeAction) =>
                this.interfaceService.saveStep(payload)
                    .pipe(
                        map((item) => new SaveInterfacesStepSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public editStepGroups$ = this.actions$
        .pipe(
            ofType(InterfacesActionTypes.EDIT_INTERFACES_STEP),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.interfaceService.editStep(payload)
                    .pipe(
                        map((item) => new EditInterfacesStepSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect({dispatch: false})
    public downloadsExcelGroup$ = this.actions$
        .pipe(
            ofType(InterfacesActionTypes.DOWNLOAD_EXCEL),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.commonApiService.downloadExcel({ level: payload })
                    .pipe(
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public dropSteps$ = this.actions$
        .pipe(
            ofType(InterfacesActionTypes.DROP_STEPS),
            withLatestFrom(this.store$.select(state => state.interfaces.seriesSelection)),
            map(([action, interfaces]) => {
                const { payload } = action as IUnsafeAction;

                return {
                    payload: {
                        ...(omit(payload, ['index', 'groupId', 'stepsId'])),
                        order: payload.index,
                        selected: Array.from(new Set([...interfaces.map(({ stepId }) => stepId), ...payload.stepsId]))
                    }
                };
            }),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.interfaceService.stepsCopy(payload)
                    .pipe(
                        exhaustMap((item) => from([new ClearSelectStep(), new SwapStepSuccess(item)])),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public swapSteps$ = this.actions$
        .pipe(
            ofType(
                InterfacesActionTypes.SWAP_STEP_LEFT,
                InterfacesActionTypes.SWAP_STEP_RIGHT
            ),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.interfaceService.stepsCopy(payload.data)
                    .pipe(
                        map((item) => new SwapStepSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public insertSteps$ = this.actions$
        .pipe(
            ofType(InterfacesActionTypes.INSERT_STEP),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.interfaceService.insertStep(payload)
                    .pipe(
                        map((item) => new InsertStepSuccess({data: item, payload})),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public groupList$ = this.actions$
        .pipe(
            ofType(InterfacesActionTypes.GET_GROUP_LIST),
            exhaustMap(() =>
                this.interfaceService.getInterfacesGroup()
                    .pipe(
                        map((item) => new GetGroupListSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
    );

    @Effect()
    public removeGroupSteps$ = this.actions$
        .pipe(
            ofType(InterfacesActionTypes.REMOVE_INTERFACES_STEP_CELL),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.interfaceService.deleteInterfaces(payload)
                    .pipe(
                        exhaustMap((item) => from([new ClearSelectStep(), new RemoveInterfaceStepsSuccess(item)])),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public removeGroup$ = this.actions$
        .pipe(
            ofType(InterfacesActionTypes.REMOVE_INTERFACES_GROUP),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.interfaceService.deleteInterfaces(payload)
                    .pipe(
                        exhaustMap((item: any) => {
                            if (payload.every(payloadItem => payloadItem.level === LevelRemove.Step)) {
                                return from([new ClearSelectStep(), new RemoveInterfaceStepsSuccess(item)]);
                            }

                            return from([new ClearSelectStep(), new RemoveGroupSuccess(item)]);
                        }),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public createGroup$ = this.actions$
        .pipe(
            ofType(InterfacesActionTypes.CREATE_GROUP),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.interfaceService.editInterfaces(payload)
                    .pipe(
                        pluck('data'),
                        exhaustMap((item: any) => {
                            let data: any = [new ClearSelectStep(), new CreateGroupSuccess({ data: item, payload })];

                            if (item) {
                                const groupId = (item.group && item.group.groupId)
                                    ? item.group.groupId
                                    : (payload.serie && payload.serie.idGroup) ? payload.serie.idGroup : -1;
                                data = [...data, (new CollapseGroup({ groupId, isCollapsed: true, isCreateGroup: true }))];

                            }

                            return from(data);
                        }),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public changeGroupPlace$ = this.actions$
        .pipe(
            ofType(InterfacesActionTypes.CHANGE_GROUP_PLACE),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.interfaceService.changeInterfaceGroup(payload)
                    .pipe(
                        map((item) => new ChangeGroupPlaceSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public importStep$ = this.actions$
        .pipe(
            ofType(InterfacesActionTypes.IMPORT_STEP),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.commonApiService.importStep(payload)
                    .pipe(
                        map((item) => new ImportStepSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public getStep$ = this.actions$
        .pipe(
            ofType(InterfacesActionTypes.GET_STEP),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.interfaceService.getStep(payload)
                    .pipe(
                        map((item) => new EditInterfacesStepSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );
    }
