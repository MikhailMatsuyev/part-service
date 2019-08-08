import { Store } from '@ngrx/store';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UniterState } from '@core/store/reducers';
import { SetFormula } from '@core/store/recommendations-formulas';

@Component({
    selector: 'app-new-entry',
    templateUrl: 'new-entry.component.html',
    styleUrls: [
        'new-entry.component.sass',
        '../combine-elements/combine-elements.component.scss'
    ]
})
export class NewEntryComponent implements OnInit {
    public formGroup: FormGroup;

    public headerTitle = 'Create new entry';

    public dropdownCS = this.data.dropdownCS;
    public dropdownUF = this.data.dropdownUF;
    public dropdownOperand = this.data.dropdownOperand;
    public dropdownUserSpans = this.data.dropdownUserSpans;

    public isCreate = true;

    constructor(
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private dialogRef: MatDialogRef<NewEntryComponent>,
        private store: Store<UniterState>
    ) {
    }

    public ngOnInit() {
        this.setupForm();

        if (this.data.form) {
            this.isCreate = false;
            this.formGroup.patchValue(this.data.form);
        }
    }

    public onClose(): void {
        this.dialogRef.close();
    }

    public confirm(): void {
        if (this.formGroup.valid) {
            this.store.dispatch(new SetFormula(this.mapperForBackend(this.formGroup.value)));
            this.onClose();
        }
    }

    public getCreateState(): string {
        return this.isCreate ? 'create' : 'edit';
    }

    private setupForm(): void {
        this.formGroup = this.fb.group({
            enabled: [false, Validators.required],
            generalized: [false, Validators.required],
            generalFormula: ['', Validators.required],
            csId: [0, Validators.required],
            ufId: [0, Validators.required],
            operand: ['>', Validators.required],
            valFormat: ['', Validators.required],
            csFormula: ['', Validators.required],
            ufFormula: ['', Validators.required],
            csSpan: [false, Validators.required],
            ufSpan: ['No Span', Validators.required],
            visible: [false, Validators.required],
            unit: ['', Validators.required],
            order: [0, Validators.required]
        });
    }

    private mapperForBackend(obj: any): FormulaEditFromDialogModel {
        const data = this.data.form;

        return {
            formula: {
                create: !data,
                enabled: obj && obj.enabled,
                generalized: obj && obj.generalized,
                generalFormula: obj && obj.generalFormula,
                csId: obj && obj.csId,
                ufId: obj && obj.ufId,
                operand: obj && obj.operand,
                valFormat: obj && obj.valFormat,
                csFormula: obj && obj.csFormula,
                ufFormula: obj && obj.ufFormula,
                csSpan: obj && obj.csSpan,
                ufSpan: obj && obj.ufSpan,
                visible: obj && obj.visible,
                unit: obj && obj.unit,
                order: obj && obj.order
            },
            csId: data && data.oldCsId,
            ufId: data && data.oldUfId,
            editFromDialog: true
        };
    }
}
