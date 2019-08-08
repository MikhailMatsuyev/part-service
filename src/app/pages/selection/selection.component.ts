import { AppTreeElementsComponent } from './tree-elements/tree-elements.component';
import { UserFactorFlatNode } from './tree-userfactor/tree-userfactor-builder.service';
import { AppTreeUserFactorComponent } from './tree-userfactor/tree-userfactor.component';
import {
    Component,
    ChangeDetectionStrategy,
    ViewChild,
    OnInit,
    OnDestroy,
    ChangeDetectorRef,
    HostListener,
    Inject
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UniterState } from '../../core/store/reducers';
import { ResizeEvent } from 'angular-resizable-element';
import * as Selections from '@store/selection';
import { MatDialog, MatSlideToggleChange } from '@angular/material';
import {
    newSpecificationModalDialog,
    NewSpecificationComponent,
    SpecificationInformaionComponent,
    specificationInfoModalDialog,
    SpecInformaionComponent,
    specificationFormInfoModalDialog,
    WarningImportModalComponent,
    deletedInfoDialog,
    AnalyzeElementsComponent,
    analyzeComponentsDialog,
    InterfacesLinksComponent,
    RemovedStepsModalComponent,
    errorModalDialog,
    interfacesLinksDialog,
    removedStepsDialog,
    fullImpossibleDialog,
    FullImpossibleModalComponent,
    fullImpossibleErrorDialog,
    AnalyzeStepComponent,
    analyzeStepDialog
} from '@core/components/dialogs';
import { filter, pluck, map } from 'rxjs/operators';
import { SelectionEffects } from '@core/effects/selection.effects';
import { Unsubscribe, untilDestroyed } from '@core/decorators/unsubscribe';
import { SelectionActionTypes } from '@store/selection';
import { omit } from '@utils/utilsfunc';
import * as AppLayout from '@store/app-layout';
import * as Auth from '@core/store/auth';
import { DOCUMENT } from '@angular/platform-browser';
import { HubConnectionService } from '@core/services/hubconnection.service';

const maxCountFilters = 10;
const minCountFilters = 3;
const maxRecommendationsCount = 300000;

@Component({
    selector: 'app-selection',
    templateUrl: './selection.component.html',
    styleUrls: ['./selection.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@Unsubscribe()
export class SelectionComponent implements OnInit, OnDestroy {
    public styleLeftSide = { width: '430px' };
    public styleTable = { width: '890px' };
    public opened = false;
    public specificationDownloadMode = false;
    public performanceSelectors$ = this.store.pipe(select(Selections.getPerformanceFiltres));
    public specifications$ = this.store.pipe(select(Selections.getSpecifications));
    public activeSpecifications$ = this.store.pipe(select(Selections.getActiveSpecifications));
    public user$ = this.store.pipe(select(Auth.getAuthUser));
    public performance$ = this.store.pipe(select(Selections.getPerformances));
    public userFactorTree$ = this.store.pipe(select(Selections.getUserFactorTree));
    public showAll$ = this.store.pipe(select(Selections.getShowAll));
    public autoReload$ = this.store.pipe(select(Selections.getAutoReload));
    public isActiveReloadedBlock$ = this.store.pipe(select(Selections.getActiveReloadedBlock));
    public isActiveOrderingKey$ = this.store.pipe(select(Selections.getOrderingKey));
    public componentsTree$ = this.store.pipe(select(Selections.getComponentTree));
    public activeFormula$ = this.store.pipe(select(Selections.getActiveFormula));
    public csTreeSpinner$ = this.store.pipe(select(Selections.getCSSpinner));
    public ufTreeSpinner$ = this.store.pipe(select(Selections.getUFSpinner));
    public orderKeyModel$ = this.store.pipe(select(Selections.getOrderKeyModel));
    public performanceLength: number = null;
    public activeDownloadSpec: any[] = [];
    public orderingKey: string = null;
    public isOrderingCopy = false;
    public isSelectedCopy = false;
    public minPerformance = minCountFilters;
    @ViewChild('userFactorTree') public treeUserFactor: AppTreeUserFactorComponent;
    @ViewChild(AppTreeElementsComponent) public treeComponents: AppTreeElementsComponent;

    public get isActivePerformanceFilter(): boolean {
        return this.performanceLength === maxCountFilters;
    }

    private specificationNames: string[] = [];
    private categoryName: string[] = [];
    private imposibleModel = null;

    constructor(
        private readonly dialog: MatDialog,
        private readonly store: Store<UniterState>,
        private readonly selectionEffects: SelectionEffects,
        private readonly cd: ChangeDetectorRef,
        @Inject(DOCUMENT) private readonly document: Document,
        private readonly hubConnectionService: HubConnectionService
    ) { }

    public ngOnInit(): void {
        this.hubConnectionService.initConnectionToSelectionHub();
        this.listenerSpecifications();
        this.store.pipe(
            select(Selections.getPerformanceFiltresLength),
            untilDestroyed(this)
        ).subscribe(item => {
            this.performanceLength = item;
            this.cd.markForCheck();
        });

        this.selectionEffects.getReccomendationCount$
            .pipe(
                untilDestroyed(this),
                filter(item => item.type === SelectionActionTypes.GET_RECOMMENDATIONS_COUNT_SUCCESS),
                pluck('payload')
            )
            .subscribe(({ count, name, id }) => {
                if (count === 0) {
                    this.createNotification('warning', 'No data to analyze');
                    this.store.dispatch(new Selections.LoadingAnalyzeTools({data: {id}, status: false}));
                } else if (count < maxRecommendationsCount) {
                    this.imposibleModel = { csId: id };
                    this.store.dispatch(new Selections.GetImpossibleComponents({ csId: id, categoryId: 0, name, isActiveModal: true }));
                } else {
                    this.analyzeWarningDialog({ id, name });
                    this.store.dispatch(new Selections.LoadingAnalyzeTools({data: {id}, status: false}));
                }
            });

        this.selectionEffects.getComponentState$
            .pipe(
                untilDestroyed(this),
                filter(item => item.type === SelectionActionTypes.GET_COMPONENTS_STATE_SUCCESS),
                pluck('payload', 'isActiveModal'),
                filter(item => !!item)
            ).subscribe(() => {
                this.analyzeDialog();
            });

        this.selectionEffects.getComponentsInterfaces$
            .pipe(
                untilDestroyed(this),
                filter(item => item.type === SelectionActionTypes.GET_COMPONENTS_INTERFACES_SUCCESS),
                pluck('payload')
            )
            .subscribe(data => {
                this.dialog.open(InterfacesLinksComponent, {
                    ...interfacesLinksDialog,
                    data: {
                        ...data
                    }
                });
            });

        this.selectionEffects.getFullyImpossibleComponents$
            .pipe(
                untilDestroyed(this),
            )
            .subscribe(({ type, payload: {data , id} }) => {
                if (type === SelectionActionTypes.GET_FULLY_IMPOSSIBLE_COMPONENTS_SUCCESS) {
                    this.dialog.open(FullImpossibleModalComponent, {
                        ...fullImpossibleDialog,
                        data: {
                            impossible: data
                        }
                    });
                } else {
                    const { message, name } = data as { message: string, name: string };
                    this.createNotification('danger', message);
                    this.dialog.open(WarningImportModalComponent, {
                        ...fullImpossibleErrorDialog,
                        data: {
                            title: `Fully not possible Components for "${name}"`,
                            text: message,
                            withCancel: false
                        }
                    });
                }

                this.store.dispatch(new Selections.LoadingAnalyzeTools({
                    data: { id },
                    status: false
                }));
            });

        this.store.pipe(
            select(Selections.getOrderKeyModel)
        ).subscribe(item => {
            this.orderingKey = item && item.message;
            this.cd.markForCheck();
        });

        this.selectionEffects.analyzeSteps$
            .pipe(
                untilDestroyed(this),
                filter(item => item.type === SelectionActionTypes.ANALYZE_STEPS_SUCCESS),
                pluck('payload')
            ).subscribe((data: {data: AnalyzeComponentState, headerName: string}) => {
                this.analyzeStepsDialog(data);
            });

        this.store.dispatch(new Selections.GetSpecifications());
        this.store.dispatch(new Selections.GetPerformanceOrder());
        this.store.dispatch(new Selections.GetTypeKeySettings());
    }

    public ngOnDestroy(): void {
        this.store.dispatch(new Selections.SetDefaultState());
    }

    public onResizeEnd({ rectangle: { width } }: ResizeEvent): void {
        // TODO: calculate width
        const leftWidth = 430 + width;
        this.styleLeftSide = {
            ...this.styleLeftSide,
            width: `${leftWidth}px`
        };
        this.styleTable = {
            ...this.styleTable,
            width: `calc(100% - ${leftWidth}px)`
        };
    }

    public handleChangeShow({ checked }: MatSlideToggleChange): void {
        this.store.dispatch(new Selections.SetShowAll(checked));
        this.store.dispatch(new Selections.GetActiveComponentsTree({reverted: false, notificationsOff: true}));
    }

    public handleChangeAutoReload({ checked }: MatSlideToggleChange): void {
        // TODO: add ngrx-storage libs
        localStorage.setItem('autoReload', JSON.stringify(`${checked}`));
        this.store.dispatch(new Selections.SetAutoReload(checked));
    }

    public handleSaveValue(obj: UserFactorFlatNode): void {
        this.store.dispatch(new Selections.SaveUserFactorValues(obj));
    }

    public colapseUFTree(): void {
        this.treeUserFactor.collapseAll();
    }

    public handleAnalyzeElements({ id, name, ...allData }: any): void {
        this.store.dispatch(new Selections.LoadingAnalyzeTools({
            data: { ...allData, id, name },
            status: true
        }));
        this.store.dispatch(new Selections.GetRecommendationsCount({ csId: id, name, categoryId: 0 }));
    }

    public handleAnalyzeInterfaces({ id, ...allData }: any): void {
        this.store.dispatch(new Selections.LoadingAnalyzeTools({
            data: { ...allData, id },
            status: true
        }));
        this.store.dispatch(new Selections.GetComponentsInterfaces(id));
    }

    public copySelectedComponents(): void {
        this.isSelectedCopy = true;
        this.document.execCommand('copy');
    }

    public copyTypeKey(): void {
        this.isOrderingCopy = true;
        this.document.execCommand('copy');
    }

    public downloadExcel(): void {
        this.store.dispatch(new Selections.DownloadSpecXLSX());
    }

    public downloadPDF(): void {
        this.store.dispatch(new Selections.DownloadPDF());
    }

    public handleAddSpecification({ specCategory, userId }: {specCategory: number, userId: number}): void {
        this.createSpecifications(specCategory, userId);
    }

    public handleAddSpec(): void {
        this.createSpecifications();
    }

    public handleAddFolder(): void {
        this.handleCategory();
    }

    public handleSelected(value: number): void {
        this.store.dispatch(new Selections.SetActiveSpecifications(value));
        this.store.dispatch(new Selections.LoadSpecificationAction());
    }

    public handleSave(): void {
        this.store.dispatch(new Selections.SaveSpecifications());
    }

    public handleSetDefault(value: number): void {
        this.store.dispatch(new Selections.SaveDefaultSpecification(value));
    }

    public handleInfoClick(value: number): void {
        this.store.dispatch(new Selections.GetSpecificationInformation(value));
    }

    public informationSpecQuestion(value: number): void {
        const dialogRef = this.dialog.open(SpecificationInformaionComponent, specificationInfoModalDialog);
        dialogRef.afterClosed()
            .pipe(
                filter(Boolean),
            ).subscribe(() => {
                this.informationSpecs(value);
            });
    }

    public handleAnalyzeState(obj: {csId: number, csvId: number, headerName: string}): void {
        this.store.dispatch(new Selections.AnalyzeSteps(obj));
    }

    public informationSpecs(value?: number, data?: any): void {
        const dialogRef = this.dialog.open(SpecInformaionComponent, {
            ...specificationFormInfoModalDialog,
            data: {
                specId: value,
                ...data
            }
        });
        dialogRef.afterClosed()
            .pipe(
                filter(Boolean),
            )
            .subscribe(({ isDeleted, isCreated, ...item }) => {
                if (isDeleted) {
                    this.store.dispatch(new Selections.RemoveBackgroundInformation(isDeleted));
                    return;
                }

                if (isCreated) {
                    this.store.dispatch(new Selections.CreateBackgroundInformation(item));
                } else {
                    this.store.dispatch(new Selections.EditBackgroundInformation(item));
                }
            });
    }

    public handleDelete(value: DeleteNodeModel): void {
        const isNode = value.type === RenameSchema.spec;
        const text = isNode
            ? `Do you really want to delete ${value.name} specification?`
            // tslint:disable-next-line:max-line-length
            : `You are going to delete the category ${value.name}. After this all the specifications in this category will also be deleted. Do you want to continue?`;
        const dialogRef = this.dialog.open(WarningImportModalComponent, {
            ...deletedInfoDialog,
            data: {
                title: 'Delete?',
                text,
                withCancel: true
            }
        });

        dialogRef.afterClosed()
            .pipe(
                filter(Boolean)
            )
            .subscribe(() => {
                const data = omit(value, ['name']);

                if (isNode) {
                    this.store.dispatch(new Selections.RemoveNode(data));
                } else {
                    this.store.dispatch(new Selections.DeleteCategory(data));
                }
            });
    }

    public handleRenameSpecification({ error, ...data }: RenameNodeModel): void {
        if (error) {
            return;
        }

        this.store.dispatch(new Selections.RenameNode(data));
    }

    public handleDublicateSpecification(obj: {specId: number, categoryId: number}): void {
        const dialogRef = this.dialog.open(NewSpecificationComponent, newSpecificationModalDialog);
        dialogRef.afterClosed()
            .pipe(
                filter(Boolean)
            ).subscribe(item => {
                this.store.dispatch(new Selections.DublicateNode({ spec: item, ...obj }));
            });
    }

    public handleCategory(): void {
        const dialogRef = this.dialog.open(NewSpecificationComponent, {
            ...newSpecificationModalDialog,
            data: {
                textField: 'folder\'s',
                categoryName: this.categoryName,
                placeholder: 'Enter folder\'s name'
            }
        });
        dialogRef.afterClosed()
            .pipe(
                filter(Boolean)
            ).subscribe(item => {
                this.store.dispatch(new Selections.AddCategory(item));
            });
    }

    public createSpecifications(specCategory = 0, userId = null): void {
        const dialogRef = this.dialog.open(NewSpecificationComponent, {
            ...newSpecificationModalDialog,
            data: {
                specificationNames: this.specificationNames
            }
        });
        dialogRef.afterClosed()
            .pipe(
                filter(Boolean)
            ).subscribe(item => {
                this.store.dispatch(new Selections.CreateSpecifications({specName: item, specCategory, userId}));
            });
    }

    public downloadExpandedExcel(): void {
        this.store.dispatch(new Selections.DownloadExpandedXLSX());
    }

    public downloadBackgroundInfo(): void {
        this.specificationDownloadMode = true;
        this.opened = true;
    }

    public handleCloseStart(): void {
        this.specificationDownloadMode = false;
        this.activeDownloadSpec = [];
    }

    public cancelDownload(): void {
        this.opened = false;
    }

    public handleDownloadStatus(data: any[]): void {
        this.activeDownloadSpec = data.map(({ specId }) => specId);
    }

    public downloadSpecifications(): void {
        this.opened = false;
        this.store.dispatch(new Selections.DownloadBackgroundInformation(this.activeDownloadSpec));
    }

    public handleClickList(event: MouseEvent): void {
        event.stopPropagation();
    }

    public handleChangeFilter(obj: any, index: number, { id }: any): void {
        this.store.dispatch(new Selections.UpdatePerformanceFilter({ data: {...obj, id}, index }));
    }

    public handleRemovePerformance({ id }: any): void {
        this.store.dispatch(new Selections.RemovePerformanceFilter(id));
    }

    public handleClickInfo(obj: {id: number, type: number}): void {
        this.store.dispatch(new Selections.GetInfoNode(obj));
    }

    public handleClickAdd(event: MouseEvent): void {
        event.stopPropagation();

        if (this.isActivePerformanceFilter) {
            return;
        }

        this.store.dispatch(new Selections.AddPerformanceFilter());
    }

    public changeActiveReloaded(): void {
        this.store.dispatch(new Selections.SetAutoReloadBlock(false));
        this.store.dispatch(new Selections.GetActiveComponentsTree({ reverted: false, notificationsOff: true }));
    }

    public handleTroubleShooting({ id, name, ...allData }: any): void {
        this.store.dispatch(new Selections.LoadingAnalyzeTools({
            data: { ...allData, id },
            status: true
        }));
        this.store.dispatch(new Selections.GetFullyImpossibleComponents({id, name}));
    }

    @HostListener('document:copy', ['$event']) public copyEvent(event: any): void {
        if (this.isOrderingCopy) {
            this.isOrderingCopy = false;
            event.preventDefault();

            if (this.orderingKey) {
                event.clipboardData.setData('text/plain', this.orderingKey);
                this.createNotification('success', 'Copied to clipboard');
            } else {
                this.createNotification('warning', 'Type key is not selected');
            }
        } else if (this.isSelectedCopy) {
            event.preventDefault();
            this.isSelectedCopy = false;

            if (this.treeComponents.selectedStepsName.length === 0) {
                this.createNotification('warning', 'No component is selected');
            } else {
                const data = this.treeComponents.selectedStepsName.join('; ');
                event.clipboardData.setData('text/plain', data);
                this.createNotification('success', 'Copied to clipboard');
            }
        }
    }

    public handleChangeStatusNode(node: any): void {
        const { checked, id } = node;

        if (checked) {
            this.store.dispatch(new Selections.SaveSelectComponents({data: id, activeSteps: node}));
        } else {
            this.store.dispatch(new Selections.SaveUnSelectComponents({data: id, activeSteps: node}));
        }
    }

    public trackByFn(index: number, item: any): number {
        return item.id;
    }

    private analyzeStepsDialog({ data, headerName }: {data: AnalyzeComponentState, headerName: string}): void {
        this.dialog.open(AnalyzeStepComponent, {
            ...analyzeStepDialog,
            data: {
                analyzeData: data,
                headerName
            }
        });
    }

    private analyzeDialog(): void {
        const dialogRef = this.dialog.open(AnalyzeElementsComponent, {
            ...analyzeComponentsDialog,
            data: {
                imposibleModel: this.imposibleModel
            }
        });
        dialogRef.afterClosed()
            .pipe(
                filter(Boolean),
            ).subscribe(data => {
                this.imposibleModel = null;
                this.store.dispatch(new Selections.SetManyUserFactors(data));
                this.store.dispatch(new Selections.SaveUserFactorValues(data.map(item => ({id: item}))));
            });
    }

    private analyzeWarningDialog({id, name}: any): void {
        const dialogRef = this.dialog.open(WarningImportModalComponent, {
            ...errorModalDialog,
            data: {
                title: 'Executing errors!',
                text: 'Calculating may take a long time because of high complexity of the component. Do you want to continue?',
                withCancel: true
            }
        });

        dialogRef.afterClosed()
            .pipe(
                filter(Boolean),
            ).subscribe(() => {
                this.store.dispatch(new Selections.GetImpossibleComponents({ csId: id, categoryId: 0, name }));
            });
    }

    private listenerSpecifications(): void {
        this.selectionEffects.getSpecificationsInformation$
            .pipe(
                untilDestroyed(this)
            )
            .subscribe(({type, payload}) => {
                if (type === SelectionActionTypes.GET_SPECIFICATION_INFORMATION_SUCCESS) {
                    this.informationSpecs(0, payload);
                } else {
                    this.informationSpecQuestion(payload);
                }
            });

        this.selectionEffects.loadSpecification$
            .pipe(
                untilDestroyed(this),
                filter(item => item.type === SelectionActionTypes.LOAD_SPECIFICATION_SUCCESS),
                pluck('payload'),
                filter(({removedSteps}) => removedSteps && removedSteps.length > 0)
            )
            .subscribe(({removedSteps}) => {
                this.dialog.open(RemovedStepsModalComponent, {
                    ...removedStepsDialog,
                    data: {
                        removedSteps
                    }
                });
            });

        this.store.pipe(
            select(Selections.getSpecficationsNames),
            untilDestroyed(this)
        ).subscribe(item => this.specificationNames = item);

        this.store.pipe(
            select(Selections.getCategoryName),
            untilDestroyed(this)
        ).subscribe(item => this.categoryName = item);
    }

    private createNotification(type: any, text: string): void {
        this.store.dispatch(new AppLayout.CreateLocalNotificaitonAction({
            type,
            text
        }));
    }
}
