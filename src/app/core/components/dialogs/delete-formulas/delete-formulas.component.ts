import { UniterState } from '@store/reducers';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { DeleteFormulas } from '@core/store/recommendations-formulas';

@Component({
    selector: 'app-delete-formulas',
    templateUrl: 'delete-formulas.component.html',
    styleUrls: [
        'delete-formulas.component.sass',
        '../new-group/new-group.component.sass'
    ]
})
export class DeleteFormulasComponent {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<DeleteFormulasComponent>,
        private store: Store<UniterState>
    ) { }

    public onDeleteClick(): void {
        this.store.dispatch(new DeleteFormulas(this.mapper(this.data.items)));
        this.onCloseDialog();
    }

    public getRowString(count): string {
        return count === 1 ? `${count} row` : `${count} rows`;
    }

    public onCloseDialog(): void {
        this.dialogRef.close();
    }

    private mapper(arr: any): FormIdentityModel[] {
        return arr.map(({ csId, ufId }) => ({ csId, ufId }));
    }
}
