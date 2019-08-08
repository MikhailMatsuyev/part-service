import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UniterState } from '@core/store/reducers';
import * as AppLayout from '@store/app-layout';
import { whitespacesValidator } from '@utils/validatorBuilder';
import { setTrimAndLowerCase } from '@utils/utilsfunc';

@Component({
    selector: 'app-new-specification',
    templateUrl: './new-specification.component.html',
    styleUrls: [
        './new-specification.component.sass',
        '../combine-elements/combine-elements.component.scss',
    ]
})
export class NewSpecificationComponent implements OnInit {
    public specName: FormControl;
    public textField = 'specification';
    public placeholder = 'Enter specification name';
    constructor(
        public dialogRef: MatDialogRef<NewSpecificationComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private readonly store: Store<UniterState>
    ) { }

    public ngOnInit(): void {
        this.specName = new FormControl('', [Validators.required, whitespacesValidator]);

        if (this.data && this.data.textField) {
            this.textField = this.data.textField;
        }

        if (this.data && this.data.placeholder) {
            this.placeholder = this.data.placeholder;
        }
    }

    public confirm(): void {
        const value = setTrimAndLowerCase(this.specName.value);

        if (this.data && this.data.specificationNames && this.data.specificationNames.some(item => value === setTrimAndLowerCase(item))) {
            this.store.dispatch(new AppLayout.CreateLocalNotificaitonAction({
                type: 'danger',
                text: 'Specification with the same name already exists'
            }));
        } else if (this.data && this.data.categoryName && this.data.categoryName.some(item => value === setTrimAndLowerCase(item))) {
            this.store.dispatch(new AppLayout.CreateLocalNotificaitonAction({
                type: 'danger',
                text: 'Folder with the same name already exists'
            }));
        } else {
            this.dialogRef.close(value);
        }
    }

    public onNoClick(value: boolean): void {
        this.dialogRef.close(value);
    }
}
