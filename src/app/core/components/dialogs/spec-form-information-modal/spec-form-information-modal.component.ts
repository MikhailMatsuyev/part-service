import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UniterState } from '@core/store/reducers';
import * as AppLayout from '@store/app-layout';
import { filter } from 'rxjs/operators';
import { WarningImportModalComponent } from '../warning-import-modal/warning-import-modal.component';
import { deletedInfoDialog } from '../new-group/constants/dialog-init.data';
import { whitespacesValidator } from '@utils/validatorBuilder';

@Component({
    selector: 'app-spec-information',
    templateUrl: './spec-form-information-modal.component.html',
    styleUrls: [
        './spec-form-information-modal.component.sass',
        '../combine-elements/combine-elements.component.scss',
    ]
})
export class SpecInformaionComponent implements OnInit {
    public forms: FormGroup;
    public maxLength = 1000;
    public isCreateMode = true;

    constructor(
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<SpecInformaionComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private readonly fb: FormBuilder,
        private readonly store: Store<UniterState>
    ) { }

    public ngOnInit(): void {
        this.isCreateMode = !this.data.customer;
        this.forms = this.fb.group({
            segment: [this.data.segment || '', [Validators.required, whitespacesValidator]],
            customer: [this.data.customer || '', [Validators.required, whitespacesValidator]],
            application: [this.data.application || '', [Validators.required, whitespacesValidator]],
            product: [this.data.product || '', [Validators.required, whitespacesValidator]],
            description: [this.data.description || '', [Validators.required, whitespacesValidator]],
            feedback: [this.data.feedback || '', [Validators.required, whitespacesValidator]],
            price: [this.data.price || '', [Validators.required, whitespacesValidator]]
        });
    }

    public getLength(nameField: string): number {
        return this.forms.get(nameField).value.length;
    }

    public deleteInfo(): void {
        const dialogRef = this.dialog.open(WarningImportModalComponent, {
            ...deletedInfoDialog,
            data: {
                title: 'Background info is deleted',
                text: 'Are you sure?',
                withCancel: true
            }
        });
        dialogRef.afterClosed()
            .pipe(
                filter(Boolean)
            )
            .subscribe(() => {
                this.dialogRef.close({ isDeleted: this.data.specId });
            });
    }

    public saveInfo(): void {
        if (this.forms.invalid) {
            this.store.dispatch(new AppLayout.CreateLocalNotificaitonAction({
                type: 'danger',
                text: 'Please fill all required fields'
            }));
            return;
        }

        this.dialogRef.close({
            ...this.normalizeFields(this.forms.value),
            specId: this.data.specId,
            isCreated: this.isCreateMode
        });
    }

    public onNoClick(value: boolean): void {
        this.dialogRef.close(value);
    }

    private normalizeFields(obj: any): any {
        return Object.keys(obj).reduce((acc, key) => ({...acc, [key]: obj[key].trim()}), {});
    }
}
