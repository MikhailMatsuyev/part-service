import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { exhaustMap, map, pluck, catchError, withLatestFrom } from 'rxjs/operators';
import {
    UserFactorsActionTypes,
    UserFactorsGetSuccess,
    ChangeGroupInfoSuccess,
    SaveUsersGroupStepSuccess,
    EditUsersGroupStepSuccess,
    SwapStepSuccess,
    InsertStepSuccess,
    GetGroupListSuccess,
    RemoveUsersGroupStepsSuccess,
    CreateGroupSuccess,
    RemoveGroupSuccess,
    ChangeGroupPlaceSuccess,
    ClearSelectStep,
    CollapseUserFactorsGroups,
    ImportStepSuccess,
    CollapseGroup,
    UserFactorsGet,
    ApplyStepsImportSuccess
} from '../store/user-factors';
import { UserFactorsService } from '../services/userfactors.service';
import { CommonApiService } from '../services/common-api.service';
import { Action, Store } from '@ngrx/store';
import { of, from } from 'rxjs';
import { LevelRemove } from '../models/generic';
import { UniterState } from '../store/reducers';
import { omit } from '@utils/utilsfunc';
import * as AppLayout from '@store/app-layout';

export class EffectError implements Action {
    readonly type = '[Error] Effect Error';
}


@Injectable()
export class UserFactorsEffects {
    constructor(
        public actions$: Actions,
        private store$: Store<UniterState>,
        private userFactorsService: UserFactorsService,
        private commonApiService: CommonApiService
    ) {
    }

    @Effect()
    public getUserFactors$ = this.actions$
        .pipe(
        ofType(UserFactorsActionTypes.GET_USER_FACTORS),
        exhaustMap(() =>
            this.userFactorsService.getUserFactorsData()
            .pipe(
                exhaustMap((item) => from([new UserFactorsGetSuccess(item), new CollapseUserFactorsGroups(true)])),
                catchError(() => of(new EffectError()))
            )
        )
    );

    @Effect()
    public editUserFactors$ = this.actions$
        .pipe(
            ofType(UserFactorsActionTypes.CHANGE_GROUP_INFO),
            exhaustMap(({payload}: IUnsafeAction) =>
                this.userFactorsService.editUserFactors(payload)
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
            ofType(UserFactorsActionTypes.SAVE_USERS_GROUP_STEP),
            exhaustMap(({payload}: IUnsafeAction) =>
                this.userFactorsService.saveStep(payload)
                    .pipe(
                        map((item) => new SaveUsersGroupStepSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public editStepGroups$ = this.actions$
        .pipe(
            ofType(UserFactorsActionTypes.EDIT_USERS_GROUP_STEP),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.userFactorsService.editStep(payload)
                    .pipe(
                        map((item) => new EditUsersGroupStepSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect({dispatch: false})
    public downloadsExcelGroup$ = this.actions$
        .pipe(
            ofType(UserFactorsActionTypes.DOWNLOAD_EXCEL),
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
            ofType(UserFactorsActionTypes.DROP_STEPS),
            withLatestFrom(this.store$.select(state => state.userFactors.seriesSelection)),
            map(([action, userFactor]) => {
                const { payload } = action as IUnsafeAction;

                return {
                    payload: {
                        ...(omit(payload, ['index', 'groupId', 'stepsId'])),
                        order: payload.index,
                        selected: Array.from(new Set([...userFactor.map(({ stepId }) => stepId), ...payload.stepsId]))
                    }
                };
            }),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.userFactorsService.stepsCopy(payload)
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
                UserFactorsActionTypes.SWAP_STEP_LEFT,
                UserFactorsActionTypes.SWAP_STEP_RIGHT
            ),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.userFactorsService.stepsCopy(payload.data)
                    .pipe(
                        map((item) => new SwapStepSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public insertSteps$ = this.actions$
        .pipe(
            ofType(UserFactorsActionTypes.INSERT_STEP),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.userFactorsService.insertStep(payload)
                    .pipe(
                        map((item) => new InsertStepSuccess({data: item, payload})),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public groupList$ = this.actions$
        .pipe(
            ofType(UserFactorsActionTypes.GET_GROUP_LIST),
            exhaustMap(() =>
                this.userFactorsService.getUserFactorsGroup()
                    .pipe(
                        map((item) => new GetGroupListSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
    );

    @Effect()
    public removeGroupSteps$ = this.actions$
        .pipe(
            ofType(UserFactorsActionTypes.REMOVE_USERS_GROUP_STEP_CELL),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.userFactorsService.deleteUserFactors(payload)
                    .pipe(
                        exhaustMap((item) => from([new ClearSelectStep(), new RemoveUsersGroupStepsSuccess(item)])),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public removeGroup$ = this.actions$
        .pipe(
            ofType(UserFactorsActionTypes.REMOVE_USERS_GROUP),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.userFactorsService.deleteUserFactors(payload)
                    .pipe(
                        exhaustMap((item: any) => {
                            if (payload.every(payloadItem => payloadItem.level === LevelRemove.Step)) {
                                return from([new ClearSelectStep(), new RemoveUsersGroupStepsSuccess(item)]);
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
            ofType(UserFactorsActionTypes.CREATE_GROUP),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.userFactorsService.editUserFactors(payload)
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
            ofType(UserFactorsActionTypes.CHANGE_GROUP_PLACE),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.userFactorsService.changeUserFactorGroup(payload)
                    .pipe(
                        map((item) => new ChangeGroupPlaceSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public importStep$ = this.actions$
        .pipe(
            ofType(UserFactorsActionTypes.IMPORT_STEP),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.commonApiService.importStep(payload)
                    .pipe(
                        exhaustMap((item) => {
                            const data: any[] = [new ImportStepSuccess(item)];
                            const { addedSeries, mergedSeries, removedSeries } = item;
                            if (addedSeries.length === 0 && mergedSeries.length === 0 && removedSeries.length === 0) {
                                data.push(new AppLayout.CreateLocalNotificaitonAction({
                                    type: 'danger',
                                    text: 'No changes for import'
                                }));
                            } else {
                                data.push(new AppLayout.CreateLocalNotificaitonAction({
                                    type: 'success',
                                    text: 'The file is successfully imported'
                                }));
                            }
                            return from(data);
                        }),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public applyImportSteps$ = this.actions$
        .pipe(
            ofType(UserFactorsActionTypes.APPLY_STEPS_IMPORT),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.commonApiService.applyImportStep(payload)
                    .pipe(
                        exhaustMap(() => from([
                            new ApplyStepsImportSuccess(),
                            new UserFactorsGet()
                        ])),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public getStep$ = this.actions$
        .pipe(
            ofType(UserFactorsActionTypes.GET_STEP),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.userFactorsService.getStep(payload)
                    .pipe(
                        map((item) => new EditUsersGroupStepSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );
}
