import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UniterState } from '@core/store/reducers';
import {
    SetISInterfaceValues,
    SetISInterfaceValueChoosed,
    SetISComponentValueChoosed,
    SetISInterfaceStepValues,
    SetISInterfaceStepValuesConnect,
    getInterfaceValuesSelector,
    getInterfaceValueChoosedSelector,
    getComponentValuesSelector,
    getComponentValueChoosedSelector,
    getComponentStepValues,
    getDirectionSortSelector,
    getDirectionSortComponentSelector,
    getInterfaceStepValuesSelector,
    SetISActiveOneComponentStepValue,
    SetISInterfaceTableSorting,
    SetISComponentTableSorting,
    SetISFalseAllComponentStepValue,
    getComponentStepValuesChoosed
} from '../../core/store/interfaces-steps';
import { MatRadioChange, MatCheckboxChange, MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';
import {
    InterfaceStepModalComponent,
    interfaceStepModalDialog
} from '@core/components/dialogs';

@Component({
    selector: 'app-interfaces-steps',
    templateUrl: './interfaces-steps.component.html',
    styleUrls: ['./interfaces-steps.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InterfacesStepsComponent implements OnInit {
    public interfaceValues$ = this.store$.pipe(select(getInterfaceValuesSelector));
    public interfaceValueChoosed$ = this.store$.pipe(select(getInterfaceValueChoosedSelector));
    public componentValues$ = this.store$.pipe(select(getComponentValuesSelector));
    public componentValuesChoosed$ = this.store$.pipe(select(getComponentValueChoosedSelector));
    public componentStepValues$ = this.store$.pipe(select(getComponentStepValues));
    public componentStepValuesChoosed$ = this.store$.pipe(select(getComponentStepValuesChoosed));
    public sortingClass$ = this.store$.pipe(
        select(getDirectionSortSelector),
        map(this.filterIconRightLeft)
    );

    public sortingComponentClass$ = this.store$
        .pipe(
            select(getDirectionSortComponentSelector),
            map(this.filterIconRightLeft)
        );

    public arrayTrueIntStepCheckBoxes: number[] = [];
    public interfaceStepValues$ = this.store$.pipe(select(getInterfaceStepValuesSelector));

    constructor(
        public dialog: MatDialog,
        private readonly store$: Store<UniterState>
    ) { }

    public ngOnInit(): void {
        this.store$.dispatch(new SetISInterfaceValues());
        this.arrayTrueIntStepCheckBoxes = [];
    }

    public handleClickInterface({ value }: MatRadioChange): void {
        this.store$.dispatch(new SetISInterfaceValueChoosed(value));
        this.arrayTrueIntStepCheckBoxes = [];
    }

    public handleClickComponent({ value }: MatRadioChange): void {
        this.store$.dispatch(new SetISComponentValueChoosed(value));
        this.arrayTrueIntStepCheckBoxes = [];
    }

    public handleClickComponentStepChB({ checked }: MatCheckboxChange, id: number): void {
        if (this.arrayTrueIntStepCheckBoxes.filter(f => f === id).length) {
            this.arrayTrueIntStepCheckBoxes = this.arrayTrueIntStepCheckBoxes.filter(f => f !== id);
        } else {
            this.arrayTrueIntStepCheckBoxes.push(id);
        }

        if (this.arrayTrueIntStepCheckBoxes.length) {
            this.store$.dispatch(new SetISActiveOneComponentStepValue(this.arrayTrueIntStepCheckBoxes));
        } else {
            this.store$.dispatch(new SetISFalseAllComponentStepValue(this.arrayTrueIntStepCheckBoxes));
        }
    }

    public colapseTree(): void {
        this.store$.dispatch(new SetISInterfaceTableSorting());
    }

    public colapseTreeComponent(): void {
        this.store$.dispatch(new SetISComponentTableSorting());
    }

    public trackByFn(index: number, item: any): number {
        return item.id;
    }

    public handleClickInterfaceStepIcon(): void {
        this.store$.dispatch(new SetISInterfaceStepValuesConnect());
        this.dialog.open(InterfaceStepModalComponent, interfaceStepModalDialog);
    }

    private filterIconRightLeft(item: boolean): string {
        return item ? 'filter-icon-right' : 'filter-icon-left';
    }
}
