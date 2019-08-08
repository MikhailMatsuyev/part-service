import { flattenDeep } from 'lodash';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { exhaustMap, catchError, map, share, withLatestFrom, filter } from 'rxjs/operators';
import { of, from, empty, Observable } from 'rxjs';
import { EffectError } from './user-factors.effects';
import { SelectionService } from '@core/services/selection.service';
import {
    SelectionActionTypes,
    GetSpecificationsSuccess,
    CreateSpecificationsSuccess,
    SaveDefaultSpecificationSuccess,
    GetSpecificationInformationSuccess,
    GetSpecificationInformationFailure,
    RemoveBackgroundInformationSuccess,
    RemoveNodeSuccess,
    getActiveSpecifications,
    RenameNodeSuccess,
    DublicateNodeSuccess,
    AddCategorySuccess,
    DeleteCategorySuccess,
    GetPerformanceOrderSuccess,
    LoadSpecificationActionSuccess,
    LoadSpecificationAction,
    GetUserFactorTreeSuccess,
    GetUserFactorTree,
    GetComponentsTreeSuccess,
    getShowAll,
    GetAllComponentsTree,
    GetComponentsTree,
    GetAllComponentsTreeSuccess,
    GetInfoNodeSuccess,
    GetTypeKeySettingsSuccess,
    getAutoReload,
    SaveUserFactorValuesSuccess,
    GetActiveComponentsTree,
    GetRecommendationsCountSuccess,
    GetImpossibleComponentsSuccess,
    GetAvailableUFValuesSuccess,
    GetAvailableUFValues,
    GetComponentsInterfacesSuccess,
    GetFullyImpossibleComponentsSuccess,
    GetFullyImpossibleComponentsFailure,
    GetFormulaValueSuccess,
    GetFormulaValue,
    SetCSTreeSpinner,
    SetUFTreeSpinner,
    GetTypeKeySuccess,
    GetTypeKeyFailure,
    GetTypeKey,
    getCSActiveSteps,
    AnalyzeStepsSuccess,
    GetComponentsStateSuccess,
    GetComponentsState,
    UncompatableUserFactorValuesSuccess,
    SaveSelectComponentsSuccess,
    SaveUnSelectComponentsSuccess,
    GetSpecifications,
    GetPerformanceOrder,
    GetTypeKeySettings,
    SetManyUserFactorsSuccess,
    getComponentTree,
    getAvailableUF,
    LoadingAnalyzeTools
} from '@core/store/selection';
import * as AppLayout from '@store/app-layout';
import { WebStorage, StorageType } from '@core/decorators/webstorage';
import { User, getAuthUser } from '@core/store/auth';
import { Store } from '@ngrx/store';
import { UniterState } from '@core/store/reducers';
import { omit } from '@utils/utilsfunc';
import { TypeKeySettingsService } from '@core/services/type-key-settings.service';
import { MatDialog } from '@angular/material';
import { WarningImportModalComponent, deletedInfoDialog } from '@core/components/dialogs';
import { getRouterState } from '@store/app-layout';

@Injectable()
export class SelectionEffects {
    @WebStorage(StorageType.localStorage) public user: User;
    public dialogId: string;

    constructor(
        public actions$: Actions,
        private readonly dialog: MatDialog,
        private readonly selectionService: SelectionService,
        private readonly store$: Store<UniterState>,
        private readonly typeKeySettingsService: TypeKeySettingsService
    ) {
    }

    @Effect({dispatch: false})
    public downloadSpecXLSX$ = this.actions$
        .pipe(
            ofType(SelectionActionTypes.DOWNLOAD_SPEC_XLSX),
            exhaustMap(() =>
                this.selectionService.exportUfDataToExcel(ExportType.excel)
                    .pipe(
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect({dispatch: false})
    public downloadPdf$ = this.actions$
        .pipe(
            ofType(SelectionActionTypes.DOWNLOAD_PDF),
            exhaustMap(({payload}: IUnsafeAction) =>
                this.selectionService.downloadPDF(payload)
                    .pipe(
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect({dispatch: false})
    public downloadSpecXLSXExpand$ = this.actions$
        .pipe(
            ofType(SelectionActionTypes.DOWNLOAD_EXPANDED_XLSX),
            exhaustMap(() =>
                this.selectionService.exportUfDataToExcel(ExportType.excelExpanded)
                    .pipe(
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect({dispatch: false})
    public downloadBackgroundInformation$ = this.actions$
        .pipe(
            ofType(SelectionActionTypes.DOWNLOAD_BACKGROUND_INFORMATION),
            exhaustMap(({payload}: IUnsafeAction) =>
                this.selectionService.downloadBackgroundInformations(payload)
                    .pipe(
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public getSpecifications$ = this.actions$
        .pipe(
            ofType(SelectionActionTypes.GET_SPECIFICATIONS),
            withLatestFrom(this.store$.select(getAuthUser)),
            map(([action, {userId}]) => userId),
            exhaustMap(userId =>
                this.selectionService.getSpecifications()
                    .pipe(
                        exhaustMap(item => from([
                            new GetSpecificationsSuccess({ data: item, userId }),
                            new LoadSpecificationAction()
                        ])),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public saveSpecifications$ = this.actions$
        .pipe(
            ofType(SelectionActionTypes.SAVE_SPECIFICATIONS),
            withLatestFrom(this.store$.select(getActiveSpecifications)),
            map(([action, {specId}]) => specId),
            exhaustMap(item =>
                this.selectionService.saveSpecification(item)
                    .pipe(
                        map(({ data: { accessOnSave }, message}) => {
                            if (accessOnSave) {
                                return this.createNotifications('success', message);
                            }

                            return this.createNotifications('success', 'Specification\'s data saved');
                        }),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public createSpecifications$ = this.actions$
        .pipe(
            ofType(SelectionActionTypes.CREATE_SPECIFICATIONS),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.selectionService.createSpecification(omit(payload, ['userId']))
                    .pipe(
                        exhaustMap(item => from([
                            new CreateSpecificationsSuccess({
                                specId: item,
                                spec: payload.specName,
                                categoryId: payload.specCategory === 0 ? -1 : payload.specCategory,
                                userId: payload.userId || this.user.userId
                            }),
                            this.createNotifications('success', 'Specification is successfully created')
                        ])),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public saveDefaultSpecifications$ = this.actions$
        .pipe(
            ofType(SelectionActionTypes.SAVE_DEFAULT_SPECIFICATION),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.selectionService.saveDefaultSpecification(payload)
                    .pipe(
                        exhaustMap(item => {
                            const data: any[] = [new SaveDefaultSpecificationSuccess(payload)];
                            if (item) {
                                data.push(this.createNotifications('success', 'Specification set as default'));
                            }

                            return from(data);
                        }),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public getSpecificationsInformation$ = this.actions$
        .pipe(
            ofType(SelectionActionTypes.GET_SPECIFICATION_INFORMATION),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.selectionService.getSpecInformation(payload)
                    .pipe(
                        map(item => new GetSpecificationInformationSuccess(item)),
                        catchError(() => of(new GetSpecificationInformationFailure(payload)))
                    )
            ),
            share()
        );

    @Effect()
    public createInformation$ = this.actions$
        .pipe(
            ofType(SelectionActionTypes.CREATE_BACKGROUND_INFORMATION),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.selectionService.createBackgroundInformation(payload)
                    .pipe(
                        map(() => this.createNotifications('success', 'Information successfully added')),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public editInformation$ = this.actions$
        .pipe(
            ofType(SelectionActionTypes.EDIT_BACKGROUND_INFORMATION),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.selectionService.saveSpecInformation(payload)
                    .pipe(
                        map(() => this.createNotifications('success', 'Information successfully added')),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public removeInformation$ = this.actions$
        .pipe(
            ofType(SelectionActionTypes.REMOVE_BACKGROUND_INFORMATION),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.selectionService.deleteSpecificationInformation(payload)
                    .pipe(
                        map(() => new RemoveBackgroundInformationSuccess()),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public deleteNode$ = this.actions$
        .pipe(
            ofType(SelectionActionTypes.REMOVE_NODE),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.selectionService.deleteNode(payload)
                    .pipe(
                        exhaustMap(() => from([
                            new RemoveNodeSuccess({...payload, userId: this.user.userId}),
                            this.createNotifications('success', 'Specification deleted')
                        ])),
                        catchError(() => of(this.createNotifications('warning', 'Nothing changes')))
                    )
            )
        );

    @Effect()
    public renameNode$ = this.actions$
        .pipe(
            ofType(SelectionActionTypes.RENAME_NODE),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.selectionService.renameNode(payload)
                    .pipe(
                        exhaustMap(() => from([
                            new RenameNodeSuccess(payload),
                            this.createNotifications('success', 'Specification renamed')
                        ])),
                        catchError(() => of(new EffectError()))
                    )
            )
    );

    @Effect()
    public dublicateNode$ = this.actions$
        .pipe(
            ofType(SelectionActionTypes.DUBLICATE_NODE),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.selectionService.saveAs(payload)
                    .pipe(
                        exhaustMap(item => from([
                            new DublicateNodeSuccess({
                                ...payload,
                                newId: item,
                                userId: this.user.userId
                            }),
                            this.createNotifications('success', 'Specification\'s data saved')
                        ])),
                        catchError(() => of(new EffectError()))
                    )
            )
    );

    @Effect()
    public addCategory$ = this.actions$
        .pipe(
            ofType(SelectionActionTypes.ADD_CATEGORY),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.selectionService.createCategory(payload)
                    .pipe(
                        exhaustMap(item => from([
                            new AddCategorySuccess({ categoryId: item, category: payload, userId: this.user.userId }),
                            this.createNotifications('success', 'Folder is successfully created')
                        ])),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public deleteCategory$ = this.actions$
        .pipe(
            ofType(SelectionActionTypes.DELETE_CATEGORY),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.selectionService.deleteNode(payload)
                    .pipe(
                        exhaustMap(() => from([
                            new DeleteCategorySuccess({...payload, userId: this.user.userId}),
                            this.createNotifications('success', 'Category deleted')
                        ])),
                        catchError(() => of(this.createNotifications('warning', 'Nothing changes')))
                    )
            )
        );

    @Effect()
    public getPerformance$ = this.actions$
        .pipe(
            ofType(SelectionActionTypes.GET_PERFORMANCE_ORDER),
            exhaustMap(() =>
                this.selectionService.getPerformancesForOrder()
                    .pipe(
                        map(item => new GetPerformanceOrderSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public loadSpecification$ = this.actions$
        .pipe(
            ofType(SelectionActionTypes.LOAD_SPECIFICATION),
            withLatestFrom(
                this.store$.select(getActiveSpecifications)
            ),
            exhaustMap(([action, item]) => {
                const defaultData = [
                    new SetUFTreeSpinner(true),
                    new GetUserFactorTree()
                ];

                if (item && !!item.specId) {
                    const { specId } = item;
                    return this.selectionService.loadSpecification(specId)
                        .pipe(
                            exhaustMap(load => from([
                                new LoadSpecificationActionSuccess(load),
                                ...defaultData
                            ])),
                            catchError(() => of(new EffectError()))
                        );
                }

                return from(defaultData);
            }),
            share()
        );

    @Effect()
    public getUfTree$ = this.actions$
        .pipe(
            ofType(SelectionActionTypes.GET_USERFACTOR_TREE),
            withLatestFrom(this.store$.select(getActiveSpecifications)),
            map(([, item]) => !item),
            exhaustMap(data =>
                this.selectionService.getUfTree(data)
                    .pipe(
                        exhaustMap(item => from([
                            new SetCSTreeSpinner(true),
                            new GetUserFactorTreeSuccess(item),
                            new SetUFTreeSpinner(false),
                            new GetActiveComponentsTree({ reverted: false, notificationsOff: true })
                        ])),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public getCSTree$ = this.actions$
        .pipe(
            ofType(SelectionActionTypes.GET_COMPONENTS_TREE),
            exhaustMap(({payload}: IUnsafeAction) =>
                this.selectionService.getCsTree(payload)
                    .pipe(
                        exhaustMap(item => from([
                            new GetComponentsTreeSuccess(item),
                            new SetCSTreeSpinner(false),
                            new GetTypeKey()
                        ])),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public getCSAllTree$ = this.actions$
        .pipe(
            ofType(SelectionActionTypes.GET_ALL_COMPONENTS_TREE),
            exhaustMap(() =>
                this.selectionService.getAllComponents()
                    .pipe(
                        exhaustMap(item => from([
                            new GetAllComponentsTreeSuccess(item),
                            new SetCSTreeSpinner(false),
                            new GetTypeKey()
                        ])),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public getActiveCSTree$ = this.actions$
        .pipe(
            ofType(SelectionActionTypes.GET_ACTIVE_COMPONENTS_TREE),
            withLatestFrom(this.store$.select(getShowAll)),
            map(([action, item]) => ({ data: (<IUnsafeAction>action).payload, showAll: item})),
            exhaustMap(({ data, showAll }) => {
                const dataArray = showAll ? new GetAllComponentsTree() : new GetComponentsTree(data);
                const arrayFrom = [new GetFormulaValue(), dataArray];

                return from(arrayFrom);
            })
        );

    @Effect()
    public getTypeKeySettings$ = this.actions$
        .pipe(
            ofType(SelectionActionTypes.GET_TYPE_KEY_SETTINGS),
            exhaustMap(() =>
                this.typeKeySettingsService.getTypeKeySettings()
                    .pipe(
                        map(item => new GetTypeKeySettingsSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public getInfoNode$ = this.actions$
        .pipe(
            ofType(SelectionActionTypes.GET_INFO_NODE),
            exhaustMap(({payload}: IUnsafeAction) =>
                this.selectionService.getInfo(payload)
                    .pipe(
                        map(item => new GetInfoNodeSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            ),
            share()
        );

    @Effect()
    public saveUserFactorValues$ = this.actions$
        .pipe(
            ofType(SelectionActionTypes.SAVE_USER_FACTOR_VALUES),
            withLatestFrom(this.store$.select(getAutoReload)),
            map(([action, item]) => {
                const { payload } = action as IUnsafeAction;
                const isArray = payload && Array.isArray(payload);
                return {
                    data: payload,
                    autoReload: item,
                    id: isArray ? payload.map(({ id }) => id) : [payload.id]
                };
            }),
            exhaustMap(({ data, autoReload, id }) =>
                this.selectionService.saveUserFactorValues(id)
                    .pipe(
                        exhaustMap(() => {
                            const fromArray: any[] = [new SaveUserFactorValuesSuccess(data)];

                            if (autoReload) {
                                fromArray.push(new SetCSTreeSpinner(true));
                                fromArray.push(new GetActiveComponentsTree({reverted: false, notificationsOff: true}));
                            }

                            return from(fromArray);
                        }),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public getReccomendationCount$ = this.actions$
        .pipe(
            ofType(SelectionActionTypes.GET_RECOMMENDATIONS_COUNT),
            exhaustMap(({ payload: { name, ...data }}: IUnsafeAction) =>
                this.selectionService.getRecommendationsCount(data)
                    .pipe(
                        map(item => new GetRecommendationsCountSuccess({count: item, name, id: data.csId })),
                        catchError(() => of(new EffectError()))
                    )
            ),
            share()
        );

    @Effect()
    public getImpossibleComponents$ = this.actions$
        .pipe(
            ofType(SelectionActionTypes.GET_IMPOSSIBLE_COMPONENTS),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.selectionService.getImpossibleComponents(omit(payload, ['name', 'isActiveModal']))
                    .pipe(
                        exhaustMap(item => from([
                            new GetImpossibleComponentsSuccess({data: item, name: payload.name}),
                            new GetAvailableUFValues({
                                data: this.collectSelectedSteps(item),
                                isActiveModal: payload.isActiveModal,
                                csData: payload
                            })
                        ])),
                        catchError(() => of(new LoadingAnalyzeTools({ data: { id: payload.csId }, status: false })))
                    )
            ),
            share()
        );

    @Effect()
    public getAvailableUFValues$ = this.actions$
        .pipe(
            ofType(SelectionActionTypes.GET_AVAILABLE_UF_VALUES),
            exhaustMap(({ payload: { data, isActiveModal, csData} }: IUnsafeAction) =>
                this.selectionService.getAvailableUserFactorValuesForAnalyse(data)
                    .pipe(
                        exhaustMap(item => from([
                            new GetAvailableUFValuesSuccess({data: item, isActiveModal }),
                            new GetComponentsState({
                                data: { csvIds: data, ufvIds: item.preselected },
                                isActiveModal,
                                csData
                            })
                        ])),
                        catchError(() => of(new LoadingAnalyzeTools({ data: { id: csData.csId }, status: false })))
                    )
            ),
            share()
        );

    @Effect()
    public getComponentState$: Observable<any> = this.actions$
        .pipe(
            ofType(SelectionActionTypes.GET_COMPONENTS_STATE),
            withLatestFrom(this.store$.select(getAvailableUF)),
            map(([action, item]) => {
                const { data: { csvIds, ufvIds }, isActiveModal, csData } = (<IUnsafeAction>action).payload;
                const preselected = item && item.data ? item.data.preselected : [];

                return {
                    payload: {
                        data: {
                            csvIds,
                            ufvIds: (ufvIds && ufvIds.length > 0) ? ufvIds : preselected
                        },
                        isActiveModal,
                        csData
                    }
                };
            }),
            exhaustMap(({ payload: { data, isActiveModal, csData } }: IUnsafeAction) =>
                this.selectionService.componentsState(data)
                    .pipe(
                        exhaustMap(item => {
                            const fromData: any[] = [new GetComponentsStateSuccess({ data: item, isActiveModal })];

                            if (isActiveModal && csData && csData.csId) {
                                fromData.push(new LoadingAnalyzeTools({ data: { id: csData.csId }, status: false }));
                            }

                            return from(fromData);
                        }),
                        catchError(() => of(new LoadingAnalyzeTools({ data: { id: csData.csId }, status: false })))
                )
            ),
            share()
        );

    @Effect()
    public getComponentsInterfaces$ = this.actions$
        .pipe(
            ofType(SelectionActionTypes.GET_COMPONENTS_INTERFACES),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.selectionService.getComponentsInterfaces(payload)
                    .pipe(
                        exhaustMap(item => from([
                            new GetComponentsInterfacesSuccess(item),
                            new LoadingAnalyzeTools({ data: { id: payload }, status: false })
                        ])),
                        catchError(() => of(new LoadingAnalyzeTools({ data: { id: payload }, status: false })))
                    )
            ),
            share()
        );

    @Effect()
    public getFullyImpossibleComponents$ = this.actions$
        .pipe(
            ofType(SelectionActionTypes.GET_FULLY_IMPOSSIBLE_COMPONENTS),
            exhaustMap(({ payload: { id, name } }: IUnsafeAction) =>
                this.selectionService.getFullyImpossibleComponents(id)
                    .pipe(
                        map(item => new GetFullyImpossibleComponentsSuccess({data: item, id})),
                        catchError(({ error: { Message } }) =>
                            of(new GetFullyImpossibleComponentsFailure({ data: { message: Message, name }, id })
                        ))
                    )
            ),
            share()
        );

    @Effect()
    public getFormulaValue$ = this.actions$
        .pipe(
            ofType(SelectionActionTypes.GET_FORMULA_VALUE),
            exhaustMap(() =>
                this.selectionService.getFormulaValue()
                    .pipe(
                        map(item => new GetFormulaValueSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public getTypeKey$ = this.actions$
        .pipe(
            ofType(SelectionActionTypes.GET_TYPE_KEY),
            withLatestFrom(
                this.store$.select(getCSActiveSteps),
                this.store$.select(getComponentTree)
            ),
            map(([action, item, csTree]) => {
                const { payload } = action as IUnsafeAction;
                const data = flattenDeep(csTree.map(({ series }) =>
                    series.map(({ steps }) => steps.filter(({ selected }) => selected).map(({ csvId }) => csvId))));
                const newData = data.length > 0 ? data : item;
                return newData || payload;
            }),
            exhaustMap(data =>
                this.selectionService.getTypeKey(data)
                    .pipe(
                        map(item => new GetTypeKeySuccess(item)),
                        catchError(({ error: { Message } }) => of(new GetTypeKeyFailure(Message)))
                    )
            )
        );

    @Effect()
    public analyzeSteps$ = this.actions$
        .pipe(
            ofType(SelectionActionTypes.ANALYZE_STEPS),
            exhaustMap(({ payload: { headerName, ...data } }: IUnsafeAction) =>
                this.selectionService.analyseComponentState(data)
                    .pipe(
                        map(item => new AnalyzeStepsSuccess({data: item, headerName})),
                        catchError(() => of(new EffectError()))
                    )
            ),
            share()
        );

    @Effect()
    public getUncompatableUF$ = this.actions$
        .pipe(
            ofType(SelectionActionTypes.UNCOMPATABLE_USER_FACTOR_VALUES),
            withLatestFrom(this.store$.select(getAvailableUF)),
            map(([action, item]) => {
                const { csvIds, ufvIds } = (<IUnsafeAction>action).payload;
                const { data: { preselected } } = item;
                return {
                    payload: {
                        csvIds,
                        ufvIds: (ufvIds && ufvIds.length > 0) || preselected
                    }
                };
            }),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.selectionService.uncompatableUserFactorValues(payload)
                    .pipe(
                        map(item => new UncompatableUserFactorValuesSuccess(item)),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public saveSelectComponents$ = this.actions$
        .pipe(
            ofType(SelectionActionTypes.SAVE_SELECT_COMPONENTS),
            exhaustMap(({ payload: { activeSteps, data } }: IUnsafeAction) =>
                this.selectionService.saveSelectComponent(data)
                    .pipe(
                        exhaustMap(item => from([
                            new SaveSelectComponentsSuccess({data: item, activeSteps, selectMode: true }),
                            new GetFormulaValue(),
                            new GetTypeKey([data])
                        ])),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public saveUnSelectComponents$ = this.actions$
        .pipe(
            ofType(SelectionActionTypes.SAVE_UNSELECT_COMPONENTS),
            exhaustMap(({ payload: { activeSteps, data } }: IUnsafeAction) =>
                this.selectionService.saveUnselectComponent(data)
                    .pipe(
                        exhaustMap(item => from([
                            new SaveUnSelectComponentsSuccess({data: item, activeSteps, selectMode: false }),
                            new GetFormulaValue(),
                            new GetTypeKey()
                        ])),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    @Effect()
    public openRecomendationsDialog$ = this.actions$
        .pipe(
            ofType(SelectionActionTypes.OPEN_RECOMENDATIONS_DIALOG),
            withLatestFrom(this.store$.select(getRouterState)),
            map(([action, { state: { url } }]) => url),
            exhaustMap(url => {
                if (url === '/home') {
                    const dialogRef = this.dialogId
                        ? this.dialog.getDialogById(this.dialogId)
                        : this.dialog.open(WarningImportModalComponent, {
                        ...deletedInfoDialog,
                        data: {
                            title: 'Warning!',
                            text: 'In recommendations were some changes. Do you want to reload page for seeing changes?',
                            withCancel: true,
                            buttonConfirmText: 'Reload'
                        }
                    });
                    this.dialogId = dialogRef.id;
                    return dialogRef.afterClosed();
                }

                return empty();
            }),
            exhaustMap((result: any) => {
                this.dialogId = null;
                if (result) {
                    return from([
                        new GetSpecifications(),
                        new GetPerformanceOrder(),
                        new GetTypeKeySettings()
                    ]);
                }

                return of(new EffectError());
            })
        );

    @Effect()
    public setManyUserFactors$ = this.actions$
        .pipe(
            ofType(SelectionActionTypes.SET_MANY_USER_FACTORS),
            exhaustMap(({ payload }: IUnsafeAction) =>
                this.selectionService.setManyUserFactors(payload)
                    .pipe(
                        map(() => new SetManyUserFactorsSuccess()),
                        catchError(() => of(new EffectError()))
                    )
            )
        );

    private createNotifications(type: any, text: string): AppLayout.CreateLocalNotificaitonAction {
        return new AppLayout.CreateLocalNotificaitonAction({
            type,
            text
        });
    }

    private collectSelectedSteps(data: ImpossibleComponents): number[] {
        return data.cs.map(({ steps }) => (steps && steps.length > 0) ? steps[0].stepId : null)
            .filter(item => item !== null);
    }
}
