import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { exhaustMap, map, pluck, catchError, withLatestFrom } from 'rxjs/operators';
import {
    ComponentsActionTypes,
    GetComponentsSuccess,
    ChangeGroupInfoSuccess,
    SaveComponentsStepSuccess,
    EditComponentsStepSuccess,
    SwapStepSuccess,
    InsertStepSuccess,
    GetGroupListSuccess,
    RemoveComponentstepsSuccess,
    CreateGroupSuccess,
    RemoveGroupSuccess,
    ChangeGroupPlaceSuccess,
    ClearSelectStep,
    CollapseComponentsGroups,
    ImportStepSuccess,
    CollapseGroup
} from '@core/store/component-elems';
import { ComponentService } from '@core/services/component.service';
import { CommonApiService } from '@core/services/common-api.service';
import { Store } from '@ngrx/store';
import { of, from } from 'rxjs';
import { LevelRemove } from '@core/models/generic';
import { UniterState } from '@core/store/reducers';
import { omit } from '@utils/utilsfunc';
import { EffectError } from './user-factors.effects';

@Injectable()
export class ComponentsEffects {
    constructor(
        public actions$: Actions,
        private store$: Store<UniterState>,
        private componentService: ComponentService,
        private commonApiService: CommonApiService
    ) {
    }

    @Effect()
    public getComponents$ = this.actions$
        .pipe(
        ofType(ComponentsActionTypes.GET_COMPONENTS),
        exhaustMap(() =>
            this.componentService.getComponentData()
            .pipe(
                exhaustMap((item) => from([new GetComponentsSuccess(item), new CollapseComponentsGroups(true)])),
                catchError(() => of(new EffectError()))
            )
        )
    );

    @Effect()
    public editUserFactors$ = this.actions$
        .pipe(
            ofType(ComponentsActionTypes.CHANGE_GROUP_INFO),
            exhaustMap(({payload}: IUnsafeAction) =>
                this.componentService.editComponents(payload)
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
            ofType(ComponentsActionTypes.SAVE_COMPONENTS_STEP),
            exhaustMap(({payload}: IUnsafeAction) =>
                this.componentService.saveStep(payload)
                    .pipe(
                        map((item) => new SaveComponentsStepSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public editStepGroups$ = this.actions$
        .pipe(
            ofType(ComponentsActionTypes.EDIT_COMPONENTS_STEP),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.componentService.editStep(payload)
                    .pipe(
                        map((item) => new EditComponentsStepSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect({dispatch: false})
    public downloadsExcelGroup$ = this.actions$
        .pipe(
            ofType(ComponentsActionTypes.DOWNLOAD_EXCEL),
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
            ofType(ComponentsActionTypes.DROP_STEPS),
            withLatestFrom(this.store$.select(state => state.components.seriesSelection)),
            map(([action, Components]) => {
                const { payload } = action as IUnsafeAction;

                return {
                    payload: {
                        ...(omit(payload, ['index', 'groupId', 'stepsId'])),
                        order: payload.index,
                        selected: Array.from(new Set([...Components.map(({ stepId }) => stepId), ...payload.stepsId]))
                    }
                };
            }),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.componentService.stepsCopy(payload)
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
                ComponentsActionTypes.SWAP_STEP_LEFT,
                ComponentsActionTypes.SWAP_STEP_RIGHT
            ),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.componentService.stepsCopy(payload.data)
                    .pipe(
                        map((item) => new SwapStepSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public insertSteps$ = this.actions$
        .pipe(
            ofType(ComponentsActionTypes.INSERT_STEP),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.componentService.insertStep(payload)
                    .pipe(
                        map((item) => new InsertStepSuccess({data: item, payload})),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public groupList$ = this.actions$
        .pipe(
            ofType(ComponentsActionTypes.GET_GROUP_LIST),
            exhaustMap(() =>
                this.componentService.getComponentsGroup()
                    .pipe(
                        map((item) => new GetGroupListSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
    );

    @Effect()
    public removeGroupSteps$ = this.actions$
        .pipe(
            ofType(ComponentsActionTypes.REMOVE_COMPONENTS_STEP_CELL),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.componentService.deleteComponents(payload)
                    .pipe(
                        exhaustMap((item) => from([new ClearSelectStep(), new RemoveComponentstepsSuccess(item)])),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public removeGroup$ = this.actions$
        .pipe(
            ofType(ComponentsActionTypes.REMOVE_COMPONENTS_GROUP),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.componentService.deleteComponents(payload)
                    .pipe(
                        exhaustMap((item: any) => {
                            if (payload.every(payloadItem => payloadItem.level === LevelRemove.Step)) {
                                return from([new ClearSelectStep(), new RemoveComponentstepsSuccess(item)]);
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
            ofType(ComponentsActionTypes.CREATE_GROUP),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.componentService.editComponents(payload)
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
            ofType(ComponentsActionTypes.CHANGE_GROUP_PLACE),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.componentService.changeComponentGroup(payload)
                    .pipe(
                        map((item) => new ChangeGroupPlaceSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public importStep$ = this.actions$
        .pipe(
            ofType(ComponentsActionTypes.IMPORT_STEP),
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
            ofType(ComponentsActionTypes.GET_STEP),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.componentService.getStep(payload)
                    .pipe(
                        map((item) => new EditComponentsStepSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );
    }
