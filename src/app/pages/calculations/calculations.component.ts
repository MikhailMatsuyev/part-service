import { MatDialog, MatTableDataSource } from '@angular/material';
import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UniterState } from '@core/store/reducers';
import * as RecommendationsCalculations from '@store/recommendations-calculations';
import { HelpModalComponent, helpModalDialog, WarningImportModalComponent, errorModalDialog } from '@core/components/dialogs';
import { map, filter, tap } from 'rxjs/operators';
import { Unsubscribe, untilDestroyed } from '@core/decorators/unsubscribe';
import { HubConnectionService } from '@core/services/hubconnection.service';

@Component({
    selector: 'app-calculations',
    templateUrl: './calculations.component.html',
    styleUrls: ['./calculations.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@Unsubscribe()
export class CalculationsComponent implements OnInit, OnDestroy {
    public userFactor$ = this.store.pipe(select(RecommendationsCalculations.getUserFactor));
    public componentSeries$ = this.store.pipe(select(RecommendationsCalculations.getComponentSeries));
    public valuesWithStatusCS$ = this.store.pipe(select(RecommendationsCalculations.getValuesWithStatusCS));
    public valuesWithStatusUF$ = this.store.pipe(select(RecommendationsCalculations.getValuesWithStatusUF));
    public defaulItemSeries$ = this.store.pipe(
        select(RecommendationsCalculations.getActiveComponentSeries),
        map(item => (item && item.id) || null)
    );
    public defaultItemUserFactor$ = this.store.pipe(
        select(RecommendationsCalculations.getActiveUserFactor),
        map(item => (item && item.id) || null)
    );
    public textChanges$ = this.store.pipe(
        select(RecommendationsCalculations.getLastChangesText),
        filter(Boolean),
        tap(item => {
            if (item && item.updates && item.updates.done && this.isDisabledUpdateButton) {
                this.isDisabledUpdateButton = false;
            }
        })
    );
    public isDisabledUpdateButton = false;
    public dataSource: MatTableDataSource<any> = new MatTableDataSource();
    public componentName: string = null;
    public userFactorName: string = null;
    public displayedColumns = [
        'csv',
        'ufv',
        'rec',
        'csvVal',
        'csvMinPos',
        'csvMaxPos',
        'csvMinRec',
        'csvMaxRec',
        'ufvVal',
        'ufvMinPos',
        'ufvMaxPos',
        'ufvMinRec',
        'ufvMaxRec'
    ];

    constructor(
        public dialog: MatDialog,
        private readonly store: Store<UniterState>,
        private readonly cd: ChangeDetectorRef,
        private readonly hubConnectionService: HubConnectionService
    ) { }

    public ngOnInit(): void {
        this.store.pipe(
            select(RecommendationsCalculations.getRecommendationView),
            filter(Boolean),
            untilDestroyed(this)
        ).subscribe(({rows, cs, uf}) => {
            this.dataSource.data = rows;
            this.componentName = cs;
            this.userFactorName = uf;
            this.cd.markForCheck();
        });

        this.store.pipe(
            select(RecommendationsCalculations.getUpdateStatus),
            filter(Boolean),
            untilDestroyed(this)
        ).subscribe(({calculationsInProgress}) => {
            this.isDisabledUpdateButton = calculationsInProgress;
            this.cd.markForCheck();
        });

        this.store.dispatch(new RecommendationsCalculations.GetUpdateStatus());
        this.store.dispatch(new RecommendationsCalculations.GetLastChanges());
        this.store.dispatch(new RecommendationsCalculations.GetComponentSeries(-1));
        this.hubConnectionService.initConnectionToRecommendationsHub();
    }

    public ngOnDestroy(): void {
        this.store.dispatch(new RecommendationsCalculations.SetDefaultState());
    }

    public handleChangeComponent({ position, value }: {position: boolean, value: number}): void {
        if (position) {
            this.store.dispatch(new RecommendationsCalculations.GetValuesWithStatus({csId: value, type: 0}));
        } else {
            this.store.dispatch(new RecommendationsCalculations.GetItemDependencies({ type: 0, id: value }));
        }
    }

    public handleChangeUserFactor({ position, value }: {position: boolean, value: number}): void {
        if (position) {
            this.store.dispatch(new RecommendationsCalculations.GetItemDependenciesSeries({type: 1, id: value}));
        } else {
            this.store.dispatch(new RecommendationsCalculations.GetValuesWithStatus({ufId: value, type: 1}));
        }
    }

    public updateManual(): void {
        this.isDisabledUpdateButton = true;
        this.store.dispatch(new RecommendationsCalculations.AutoGenerate());
    }

    public cancelUpdating(): void {
        this.isDisabledUpdateButton = false;
        this.store.dispatch(new RecommendationsCalculations.CancelUpdate());
    }

    public handleChangeComponentStep(item: { csId: number, csvId: number }): void {
        this.store.dispatch(new RecommendationsCalculations.SetCSSteps(item));
    }

    public handleChangeUserFactorStep(item: { ufId: number, ufvId: number }): void {
        this.store.dispatch(new RecommendationsCalculations.SetUFSteps(item));
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

        if (value) {
            this.store.dispatch(new RecommendationsCalculations.GetUserFactor(-1));
        } else {
            this.store.dispatch(new RecommendationsCalculations.GetComponentSeries(-1));
        }
    }

    public syncCalculations(value: {viewType: number}): void {
        this.store.dispatch(new RecommendationsCalculations.GetDimensions(value));
    }

    public setRecommendationsText(element: any): string {
        return (element.rec && element.pos) ? 'Recommended' : (!element.rec && element.pos) ? 'Possible' : 'Not possible';
    }

    public setRecommendationsStatus(element: any): string {
        return (element.rec && element.pos) ? 'recommended' : (!element.rec && element.pos) ? 'possible' : 'not-possible';
    }

    public handleBlankX(value: boolean): void {
        this.store.dispatch(new RecommendationsCalculations.ExportCalculateTable(Number(!value)));
    }
}
