import { Store, select } from '@ngrx/store';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatCheckboxChange } from '@angular/material';
import { UniterState } from '../../../store/reducers';
import { getConnectionElements, SetInterfaceConnection } from '../../../store/interfaces-connections';

@Component({
    selector: 'app-interface-conn-modal',
    templateUrl: './interface-conn-modal.component.html',
    styleUrls: [
        './interface-conn-modal.component.scss'
    ]
})
export class InterfaceConnModalComponent {
    public isActiveHint = true;
    public headerTitle = 'Connect Components to Interface';
    public activeList$ = this.store.pipe(
        select(getConnectionElements)
    );
    private connectedElements = [];

    constructor(
        public dialogRef: MatDialogRef<InterfaceConnModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private readonly store: Store<UniterState>
    ) { }

    public confirm(): void {
        this.connectedElements.forEach(({ id, checked }) => {
            this.store.dispatch(new SetInterfaceConnection({ id, checked }));
        });
        this.dialogRef.close(true);
    }

    public onNoClick(value: boolean): void {
        this.dialogRef.close(value);
    }

    public handleSelectChange({ checked }: MatCheckboxChange, { id }: any): void {
        this.connectedElements.push({ id, checked });
    }
}
