import { MatDialog, MatTableDataSource } from '@angular/material';
import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UniterState } from '@core/store/reducers';
import * as Recommendations from '@store/recommendations';
import {
    HelpModalComponent,
    helpModalDialog,
    WarningImportModalComponent,
    errorModalDialog,
    RecommendationTypeModalComponent,
    UserFactorXlsxModalComponent,
    userFactorXlsxModalDialog
} from '@core/components/dialogs';
import { map, filter, delay, debounceTime, tap } from 'rxjs/operators';
import { Unsubscribe, untilDestroyed } from '@core/decorators/unsubscribe';
import { FormControl } from '@angular/forms';
import { union } from '@utils/utilsfunc';
import { MdePopoverTrigger } from '@material-extended/mde';
import { Subject } from 'rxjs';
import { HubConnectionService } from '@core/services/hubconnection.service';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
    selector: 'app-recommendations',
    templateUrl: './recommendations.component.html',
    styleUrls: ['./recommendations.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@Unsubscribe()
export class RecommendationsComponent implements OnInit, OnDestroy {
    public userFactor$ = this.store.pipe(select(Recommendations.getUserFactor));
    public componentSeries$ = this.store.pipe(select(Recommendations.getComponentSeries));
    public valuesWithStatusCS$ = this.store.pipe(select(Recommendations.getValuesWithStatusCS));
    public valuesWithStatusUF$ = this.store.pipe(select(Recommendations.getValuesWithStatusUF));
    public defaulItemSeries$ = this.store.pipe(
        select(Recommendations.getActiveComponentSeries),
        map(item => (item && item.id) || null)
    );
    public defaultItemUserFactor$ = this.store.pipe(
        select(Recommendations.getActiveUserFactor),
        map(item => (item && item.id) || null)
    );
    public textChanges$ = this.store.pipe(
        select(Recommendations.getLastChangesText),
        filter(item => !!item),
        tap(item => {
            if (item && item.updates && item.updates.done) {
                this.isDisabledUpdateButton = false;
            }
        })
    );
    public isDisableCopy$ = this.store.pipe(
        select(Recommendations.getUserFactorSelected),
        map(item => this.componentPosition ? false : item.length > 0)
    );
    public mouseEnter$ = new Subject<any>();

    public isDisabledUpdateButton = false;
    public dataSource: MatTableDataSource<any> = new MatTableDataSource();
    public componentName: string = null;
    public userFactorName: string = null;
    public componentPosition = false;
    public displayedColumns = ['ufvRows'];
    public colums = [];
    public activeContextComment = false;
    public activeTooltip = null;
    public comment: FormControl = new FormControl();
    public activeComment: any = null;
    public activMenuContext: any = null;
    public activePopover = false;
    public curMdeRef: MdePopoverTrigger = null;
    public firstCellHeader = '';
    public firstTableCellHeader = '';
    public isActiveSwitchMode = false;
    public tableHeight: string;

    @ViewChild('tableRef', { read: ElementRef }) public tableRef: ElementRef;

    private defaultDisplayedColumns = ['ufvRows'];
    private activeViewType: any = null;
    private heightColumn = 78;

    public get actvieUserFactorName(): string {
        return this.userFactorName || 'User Factor name';
    }

    public get actvieComponentName(): string {
        return this.componentName || 'Component name';
    }

    constructor(
        public dialog: MatDialog,
        private readonly store: Store<UniterState>,
        private readonly cd: ChangeDetectorRef,
        private readonly hubConnectionService: HubConnectionService,
        private readonly mediaMatcher: MediaMatcher
    ) {
    }

    public ngOnInit(): void {
        const mediaQueryList = this.mediaMatcher.matchMedia('(max-height: 700px)');
        this.hubConnectionService.initConnectionToRecommendationsHub();
        this.store.pipe(
            select(Recommendations.getRecommendationView),
            untilDestroyed(this)
        ).subscribe(item => {
            if (!item) {
                this.colums = [];
                this.dataSource.data = [];
                this.displayedColumns = this.defaultDisplayedColumns;
            } else {
                const { rows, columns, cs, uf } = item;
                this.colums = columns;
                this.dataSource.data = rows;
                this.displayedColumns = union(this.defaultDisplayedColumns, columns.map(({ name }) => name));
                this.componentName = cs;
                this.userFactorName = uf;
                setTimeout(() => {
                    // for dynamic height https://github.com/MurhafSousli/ngx-scrollbar/issues/17
                    const { children: [{ clientHeight }] } = this.tableRef.nativeElement;
                    const columnCount = mediaQueryList.matches ? 2.5 : 6;
                    const dynamicHeight = rows.length > columnCount ? this.heightColumn * columnCount : this.heightColumn * rows.length;
                    this.tableHeight = `${dynamicHeight + clientHeight}px`;
                });
            }

            if (this.activeViewType) {
                this.setHeaders(this.activeViewType.viewType === 0);
            }
            this.cd.markForCheck();
        });

        this.store.pipe(
            select(Recommendations.getUpdateStatus),
            filter(Boolean),
            untilDestroyed(this)
        ).subscribe(({recommendationsInProgress}) => {
            this.isDisabledUpdateButton = recommendationsInProgress;
            this.cd.markForCheck();
        });

        this.store.pipe(
            select(Recommendations.getActiveComment),
            untilDestroyed(this)
        ).subscribe(item => {
            if (item) {
                this.comment.setValue(item.comment, { emitEvent: false });
                this.activePopover = true;
                this.curMdeRef.openPopover();
            }

            this.activeComment = item;
            this.cd.markForCheck();
        });

        this.store.pipe(
            select(Recommendations.getSwapHeader),
            untilDestroyed(this),
            delay(0)
        ).subscribe(item => {
            this.setHeaders(item);
            this.cd.markForCheck();
        });

        this.store.dispatch(new Recommendations.GetUpdateStatus());
        this.store.dispatch(new Recommendations.GetLastChanges(0));
        this.store.dispatch(new Recommendations.GetComponentSeries(-1));

        this.mouseEnter$.pipe(
            debounceTime(500),
            filter(item => item && !this.activeContextComment),
            untilDestroyed(this)
        ).subscribe(item => {
            this.activeCell(item);
        });
    }

    public ngOnDestroy(): void {
        this.store.dispatch(new Recommendations.SetDefaultState());
    }

    public handleChangeComponent({ position, value }: {position: boolean, value: number}): void {
        if (position) {
            this.store.dispatch(new Recommendations.GetValuesWithStatus({ csId: value, type: 0, viewType: this.activeViewType }));
        } else {
            this.store.dispatch(new Recommendations.GetItemDependencies({ type: 0, id: value }));
        }
    }

    public handleChangeUserFactor({ position, value }: {position: boolean, value: number}): void {
        if (position) {
            this.store.dispatch(new Recommendations.GetItemDependenciesSeries({type: 1, id: value}));
        } else {
            this.store.dispatch(new Recommendations.GetValuesWithStatus({ ufId: value, type: 1, viewType: this.activeViewType }));
        }
    }

    public handleDownloadRecommendations(): void {
        this.store.dispatch(new Recommendations.DownloadSteps());
    }

    public updateManual(): void {
        this.isDisabledUpdateButton = true;
        this.store.dispatch(new Recommendations.AutoGenerate());
    }

    public cancelUpdating(): void {
        this.isDisabledUpdateButton = false;
        this.store.dispatch(new Recommendations.CancelUpdate());
    }

    public handleChangeComponentStep(item: { csId: number, csvId: number }): void {
        this.store.dispatch(new Recommendations.SetCSSteps(item));

        if (this.activeViewType) {
            this.store.dispatch(new Recommendations.GetDimensions(this.activeViewType));
        }
    }

    public handleChangeUserFactorStep(item: { ufId: number, ufvId: number }): void {
        this.store.dispatch(new Recommendations.SetUFSteps(item));

        if (this.activeViewType) {
            this.store.dispatch(new Recommendations.GetDimensions(this.activeViewType));
        }
    }

    public handleHelp(): void {
        this.dialog.open(HelpModalComponent, helpModalDialog);
    }

    public handleError(message: string): void {
        this.dialog.open(WarningImportModalComponent, {
            ...errorModalDialog,
            data: {
                title: 'Executing errors!',
                text: message,
                withCancel: false
            }
        });
    }

    public swapHeader(value: boolean): void {
        this.dataSource.data = [];
        this.componentName = null;
        this.userFactorName = null;
        this.componentPosition = value;

        if (value) {
            this.store.dispatch(new Recommendations.GetUserFactor(-1));
        } else {
            this.store.dispatch(new Recommendations.GetComponentSeries(-1));
        }
    }

    public syncCalculations(value: {viewType: number}): void {
        this.store.dispatch(new Recommendations.GetDimensions(value));
        this.activeViewType = value;
    }

    public setRecommendationsText(element: any): string {
        if (!element) {
            return '';
        }

        const data = (element.rec && element.pos) ? 'Recommended' : (!element.rec && element.pos) ? 'Possible' : 'Not possible';
        return this.isActiveSwitchMode ? data[0] : data;
    }

    public setRecommendationsStatus(element: any): string {
        if (this.isActiveSwitchMode || !element) {
            return '';
        }

        return (element.rec && element.pos) ? 'recommended' : (!element.rec && element.pos) ? 'possible' : 'not-possible';
    }

    public handleBlankX(value: boolean): void {
        this.store.dispatch(new Recommendations.ExportCalculateTable(Number(!value)));
    }

    public switchMode(): void {
        this.isActiveSwitchMode = !this.isActiveSwitchMode;
        this.cd.markForCheck();
    }

    public switchHeadersTable(): void {
        this.store.dispatch(new Recommendations.SwitchTableHeader());
    }

    public handleMouseEnter(cell: any, ref: MdePopoverTrigger): void {
        if (this.activePopover) {
            this.handleClosePopover();
        }

        this.mouseEnter$.next({ ...cell, ref });
    }

    public handleMouseLeave(): void {
        this.mouseEnter$.next(null);
    }

    public handleContextMenu(event: MouseEvent, cell: any, ref: MdePopoverTrigger): void {
        event.preventDefault();

        this.activePopover = false;
        this.activeContextComment = true;

        this.activeCell({ ...cell, ref });
    }

    public activeCell({ hasChanges, hasComment, csId, ufId, csvId, ufvId, ref }: any): void {
        this.activeTooltip = { csvId, ufvId, csId, ufId };

        let isNeedShowPopover = false;

        if (!hasChanges && !hasComment) {
            this.activeComment = null;

            if (!this.activeContextComment) {
                return;
            }

            isNeedShowPopover = true;
        } else {
            isNeedShowPopover = this.activeComment && this.curMdeRef === ref;
        }

        if (this.curMdeRef) {
            this.curMdeRef.closePopover();
        }

        this.curMdeRef = ref;

        if (isNeedShowPopover) {
            this.activePopover = true;
            this.cd.markForCheck();
            ref.openPopover();
            return;
        }

        this.store.dispatch(new Recommendations.GetCellComment({ csvId, ufvId }));
    }

    public handleClosePopover(): void {
        this.store.dispatch(new Recommendations.ClearCellComment());
        this.activeContextComment = false;
        this.activePopover = false;
        this.activeTooltip = null;
        this.comment.reset();
    }

    public handleCloseContext(): void {
        this.activMenuContext = false;
        this.curMdeRef.closePopover();
        this.cd.markForCheck();
    }

    public onNoClick(): void {
        this.comment.reset();
        this.activeContextComment = false;
        this.cd.markForCheck();
        this.curMdeRef.closePopover();
    }

    public saveComment(): void {
        this.activeContextComment = false;
        this.store.dispatch(new Recommendations.SetCellComment({
            ...this.activeTooltip,
            comment: this.comment.value
        }));
        this.cd.markForCheck();
    }

    public setDefaultMode(): void {
        this.dialog.open(RecommendationTypeModalComponent, errorModalDialog);
    }

    public allSelect(): void {
        this.store.dispatch(new Recommendations.SelectedAllTable());
    }

    public handleCopy(): void {
        this.dialog.open(UserFactorXlsxModalComponent, userFactorXlsxModalDialog);
    }

    public handleSelectedItemDropdown(obj: { id: number, isChecked: boolean, type: number }): void {
        this.store.dispatch(new Recommendations.SelecteDependenciesDropdown(obj));
    }

    public handleClickCell(element: any, columnName: any): void {
        const elementRow = element[columnName.name];
        const data = {
            quick: true,
            ...elementRow,
            ...this.setStatusMode(elementRow)
        };

        this.store.dispatch(new Recommendations.SaveRowTable({
            data, index: {
                name: columnName.name,
                csvRows: element.csvRows,
                ufvRows: element.ufvRows,
            }
        }));
    }

    public handleSelectedAllDropdown(value: {status: boolean, type: number}): void {
        this.store.dispatch(new Recommendations.SelecteDependenciesDropdownAll(value));
    }

    public handleContextMenuFirstCell(event: MouseEvent, element: HTMLElement, obj: any): void {
        this.activMenuContext = obj;
        event.preventDefault();
        element.click();
    }

    public firstCellContext(value: boolean): string {
        return (value && this.activMenuContext) ? 'click' : 'none';
    }

    public handleSetStatusRow(value: RecommendationsType): void {
        this.store.dispatch(new Recommendations.SetRowStatus({
            status: value,
        }));
        this.activMenuContext = null;
        this.cd.markForCheck();
    }

    public handleFirstCellClick(element: any): void {
        if (this.activMenuContext && element.isActiveRow) {
            // if (element.isActiveRow) {
            //     return;
            // }

            // this.store.dispatch(new Recommendations.SelectedAllRows({ data: element, status: true }));
            return;
        }

        this.store.dispatch(new Recommendations.SelectedAllRows({data: element}));
    }

    public handleClickHeader({ header, name }: any): void {
        // another way for render header(material -table)
        const cell = this.colums.find(item => item.header === header && item.name === name);
        this.store.dispatch(new Recommendations.SelectedAllColumns(cell));
    }

    public activeHeaderCell({ header, name }: any): string {
        // another way for render header(material -table)
        const cell = this.colums.find(item => item.header === header && item.name === name);
        return (cell && cell.isActiveColumn) ? 'table-cells-active' : '';
    }

    public closeSwitchMode(): void {
        this.isActiveSwitchMode = false;
        this.cd.markForCheck();
    }

    public trackByFn(index: number, item: any): number {
        return item;
    }

    private setHeaders(item: any): void {
        this.firstCellHeader = item
                ? this.actvieComponentName
                : this.actvieUserFactorName;
        this.firstTableCellHeader = item
            ? this.actvieUserFactorName
            : this.actvieComponentName;
    }

    private setStatusMode(element: any): any {
        switch (this.setRecommendationsText(element)) {
            case 'N':
            case 'Not possible': {
                return {
                    rec: false,
                    pos: true,
                };
            }

            case 'P':
            case 'Possible': {
                return {
                    rec: true,
                    pos: true,
                };
            }

            default: {
                return {
                    rec: false,
                    pos: false,
                };
            }
        }
    }
}
