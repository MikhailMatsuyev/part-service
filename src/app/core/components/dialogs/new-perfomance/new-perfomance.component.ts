import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
    selector: 'app-new-perfomance',
    templateUrl: './new-perfomance.component.html',
    styleUrls: ['./new-perfomance.component.scss', '../new-group/new-group.component.sass']
})
export class NewPerfomanceComponent implements OnInit {
    public forms: FormGroup;
    public isActiveError = false;
    private timerId: any;

    constructor(
        public dialogRef: MatDialogRef<NewPerfomanceComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private readonly fb: FormBuilder
    ) { }

    public ngOnInit(): void {
        this.forms = this.fb.group({
            name: ['', Validators.required],
            unit: '',
            description: '',
            calculate: false,
            display: false,
            displayText: false,
            highlight: false,
            order: 0
        });
    }

    public onNoClick(value: boolean): void {
        this.dialogRef.close(value);
    }

    public createPerfomance(): void {
        if (this.validateDepend()) {
            this.dialogRef.close(this.forms.value);
        }
    }

    public validateDepend(): boolean {
        if (!this.data.validateName) {
            return true;
        }

        const name = this.forms.get('name').value.trim();

        if (this.data.validateName.some(item => name === item)) {
            this.isActiveError = true;

            if (this.timerId) {
                clearTimeout(this.timerId);
            }

            this.timerId = setTimeout(() => {
                this.isActiveError = false;
            }, 3000);

            return false;
        }

        return true;
    }
}
