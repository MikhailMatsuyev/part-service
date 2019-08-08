import { Store, select } from '@ngrx/store';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatCheckboxChange } from '@angular/material';
import { UniterState } from '@store/reducers';
import {
    SetModalOneItemChecked,
    SetModalSaveItemsChecked,
    getInterfaceStepValuesConnectSelector,
    getInterfaceStepValuesSelector
} from '@store/interfaces-steps';

@Component({
    selector: 'app-interface-step-modal',
    templateUrl: './interface-step-modal.component.html',
    styleUrls: [
        '../../../../pages/interfaces-steps/interfaces-steps.component.sass',
        './interface-step-modal.component.sass'
    ]
})
export class InterfaceStepModalComponent {
    public interfaceStepValuesConnect$ = this.store.pipe(
        select(getInterfaceStepValuesConnectSelector)
    );

    public interfaceStepValues$ = this.store.pipe(
        select(getInterfaceStepValuesSelector)
    );

    constructor(
        public dialogRef: MatDialogRef<InterfaceStepModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private readonly store: Store<UniterState>
    ) { }

    public confirm(): void {
        this.store.dispatch(new SetModalSaveItemsChecked());
        this.dialogRef.close(true);
    }

    public onNoClick(value: boolean): void {
        this.dialogRef.close(value);
    }

    public handleClickChB({ checked }: MatCheckboxChange, id: number): void {
        this.store.dispatch(new SetModalOneItemChecked({ id, checked }));
    }

    public trackByFn(index: number, item: any): number {
        return item.id;
    }
}
