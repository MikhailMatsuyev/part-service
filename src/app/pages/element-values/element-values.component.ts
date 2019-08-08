import { ResizeEvent } from 'angular-resizable-element';
import { Store, select } from '@ngrx/store';
import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import * as ComponentValues from '@store/component-values';
import { UniterState } from '@store/reducers';
import { map, filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { ConnectionComponent, connectionDialog } from '@core/components/dialogs';
import { Unsubscribe, untilDestroyed } from '@core/decorators/unsubscribe';

@Component({
    selector: 'app-element-values',
    templateUrl: './element-values.component.html',
    styleUrls: ['./element-values.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@Unsubscribe()
export class ElementValuesComponent implements OnInit, OnDestroy {
    public componentValues = [];
    public componentValuesTable$ = this.store.pipe(
        select(ComponentValues.getComponentValuesTable)
    );
    public sortingClass$ = this.store.pipe(
        select(ComponentValues.getComponentDirectionSort),
        map(item => item ? 'filter-icon-right' : 'filter-icon-left')
    );
    public styleLeftSide: any = { width: '350px' };
    public styleTable: any = { width: '100%' };
    public componentGroup: string;
    public componentStep: number;
    public infoText = 'No matching records found';

    constructor(
        private readonly store: Store<UniterState>,
        private readonly cd: ChangeDetectorRef,
        private readonly dialog: MatDialog,
    ) { }

    public ngOnInit(): void {
        this.store.dispatch(new ComponentValues.ComponentValuesGet());
        this.store
            .pipe(
                select(ComponentValues.getActiveStep),
                untilDestroyed(this)
            )
            .subscribe(item => {
                this.componentStep = item;
                this.cd.markForCheck();

                if (item) {
                    this.store.dispatch(new ComponentValues.ComponentValuesGetTable(this.componentStep));
                }
            });

        this.store
            .pipe(
                select(ComponentValues.getComponentValue),
                untilDestroyed(this)
            )
            .subscribe(item => {
                this.componentValues = item;

                if (!this.componentGroup && item && item.length > 0) {
                    this.componentGroup = item[0].id;

                    this.store.dispatch(new ComponentValues.ComponentStepsGet({
                        serieId: this.componentGroup,
                        collapse: {id: this.componentGroup, isCollapse: true, isNeedCollapse: false},
                        withActiveMode: false})
                    );
                }

                this.cd.markForCheck();
            });
    }

    public ngOnDestroy(): void {
        this.store.dispatch(new ComponentValues.SetDefaultState());
    }

    public changeValues(): void {
        const element = this.componentValues.find(item =>
            item && item.steps && item.steps.some(stepItem => stepItem.id === this.componentStep)
        );

        if (element && this.componentGroup !== element.id) {
            this.componentGroup = element.id;
        }
        this.store.dispatch(new ComponentValues.ComponentValuesGetTable(this.componentStep));
    }

    public colapseTree(): void {
        this.store.dispatch(new ComponentValues.ComponentValuesSorting());
    }

    public collapse({ isCollapse, id }: any): void {
        const isNeedCollapse = this.componentGroup === id;
        this.componentGroup = id;
        this.store.dispatch(new ComponentValues.ComponentStepsGet({ serieId: id, collapse: {id, isCollapse, isNeedCollapse}}));
    }

    public handleCollapse(event: MouseEvent, { isCollapse, id }: any): void {
        event.stopPropagation();
        this.store.dispatch(new ComponentValues.ComponentStepsGet({
            serieId: id,
            collapse: { id, isCollapse, isNeedCollapse: true },
            withActiveMode: true
        }));
    }

    public handleConnect(event: MouseEvent, id: number): void {
        event.stopPropagation();
        this.openConnectModal(id);
    }

    public downloadExcel(element: string): void {
        this.store.dispatch(new ComponentValues.DownloadPerformances(element));
    }

    public connectPerformances(): void {
        this.openConnectModal();
    }

    public handleClickSteps(event: MouseEvent): void {
        event.stopPropagation();
    }

    public trackByFn(index, item): number {
        return item.id;
    }

    public handleChangeElement(obj: UserFactorValues): void {
        this.store.dispatch(new ComponentValues.SaveUserFactorValue(obj));
    }

    public onResizeEnd({ rectangle: { width } }: ResizeEvent): void {
        const leftWidth = 350 + width;
        this.styleLeftSide = {
            width: `${leftWidth}px`,
            maxWidth: '525px'
        };
        this.styleTable = {
            width: `calc(100% - ${leftWidth}px)`,
            minWidth: `calc(100% - 525px)`
        };
    }

    private openConnectModal(id?: number): void {
        const dialogRef = this.dialog.open(ConnectionComponent, {
            ...connectionDialog,
            data: {
                groupId: id || this.componentGroup
            }
        });

        dialogRef.afterClosed()
            .pipe(
                filter(item => item)
            ).subscribe((item) => {
                this.store.dispatch(new ComponentValues.SavePerformance({data: item, stepId: this.componentStep}));
            });
    }
}
