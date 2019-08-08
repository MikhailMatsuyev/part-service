import {
    Component,
    Inject,
    OnInit,
    ChangeDetectionStrategy,
    OnDestroy
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatAutocompleteSelectedEvent } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith, map } from 'rxjs/operators';
import { IDialogForms } from '@core/components/dialogs/new-group/models/form-data.model';
import { UniterState } from '@store/reducers';
import { Store, Selector } from '@ngrx/store';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { setTrimAndLowerCase, sortBy } from '@utils/utilsfunc';
import { untilDestroyed } from '@core/decorators/unsubscribe';

export abstract class SerieModalComponent implements OnInit, OnDestroy {
    public isActiveConfirmButton = false;
    public myControl: FormControl = new FormControl();
    public dialogForms: FormGroup;
    public filteredOptions: Observable<string[]>;
    public maxLength = 100;
    public isActiveGroup = false;
    public seriesGroup: string[] = [];
    public filtersData: any[] = []; // TODO: remove use without async pipe
    public abstract initialModalState;

    public abstract getGroupListDispatch(): void;
    public abstract get getGroupListSelector(): Selector<UniterState, any[]>
    public abstract initDialogForms(obj): void;
    public get isDisableConfirmButton(): boolean {
        const group = this.dialogForms.get('Group').value;
        const serie = this.dialogForms.get('Serie').value;

        return this.dialogForms.invalid
            || this.validatorControl(group)
            || this.validatorControl(serie)
            || this.isActiveMessage;
    }

    public get isActiveMessage(): boolean {
        return this.isActiveConfirmButton &&
               this.dialogForms.get('Group').dirty &&
              !!this.dialogForms.get('Group').value &&
              !this.isActiveGroup &&
              !this.dialogForms.get('Serie').value;
    }

    public get isActiveUserFactorMessage(): boolean {
        const serie = this.dialogForms.get('Serie');
        return serie.invalid && serie.value.trim() !== '';
    }

    constructor(
        public fb: FormBuilder,
        public dialogRef: MatDialogRef<SerieModalComponent>,
        protected readonly store: Store<UniterState>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    public ngOnInit(): void {
        this.getGroupListDispatch();
        const groupList$ = this.store.select(this.getGroupListSelector)
            .pipe(
                untilDestroyed(this),
                map(item => sortBy(item, 'group', true))
            );

        const obj: IDialogForms = (this.data.UFData) ? this.data.UFData : this.initialModalState;

        this.initDialogForms(obj);
        const group$ = this.dialogForms.get('Group').valueChanges
            .pipe(
                untilDestroyed(this),
                startWith(obj.group),
            );

        this.filteredOptions = combineLatest(
            groupList$,
            group$
        ).pipe(
            map(([options, searchField]) => this.filter(options, searchField))
        );
    }

    public ngOnDestroy(): void {
    }


    public onNoClick(): void {
        this.dialogRef.close();
    }

    public validatorControl(value: any): boolean {
        return ((typeof value === 'string' && value.length >= 1) ? value.trim().length === 0 : false);
    }

    public serieValidate(isNewGroup: boolean, activeSerie: string): ValidatorFn {
        return (control: FormControl): { [key: string]: boolean } => {
            const localControl = setTrimAndLowerCase(control.value);
            const isValid = this.seriesGroup.some(item => setTrimAndLowerCase(item) === localControl);

            if (control.value) {
                if (isNewGroup) {
                    return (isValid) ? { isActiveGroup: true } : null;
                }
                return ((isValid && activeSerie.toLowerCase() !== localControl) || (!isValid && localControl === ''))
                    ? { isActiveGroup: true } : null;
            }
            return { isActiveGroup: true };
        };
    }

    public filter(array: any[], val: any): string[] {
        const data = typeof val === 'string' ? val : ((val && val.group) || '');
        const filterData = array.filter(({ group }) => setTrimAndLowerCase(group).indexOf(setTrimAndLowerCase(data)) === 0);
        this.isActiveConfirmButton = filterData.length > 0;
        this.filtersData = array;
        this.seriesGroup = array.reduce((acc, { series }) => {
            const item = (series && series.length) > 0 ? series.map(({serie}) => serie) : undefined;
            return item ? [...acc, ...item] : acc;
        }, []);

        this.dialogForms.get('Serie').updateValueAndValidity();

        return array.filter(({groupId}) => groupId !== -1);
    }

    public displayFn(options): string {
        return options
            ? options.group || options
            : '';
    }

    public handleSelected(obj: MatAutocompleteSelectedEvent, inputComplete: HTMLInputElement): void {
        inputComplete.blur();
        this.dialogForms.get('Serie').updateValueAndValidity();
    }

    public blurPriority(fieldName: string): void {
        const { value } = this.dialogForms.get(fieldName);
        if (value.trim() === '' || !parseInt(value, 10)) {
            this.dialogForms.get(fieldName).setValue(0);
        }
    }

    public handleExpand(inputComplete: HTMLInputElement): void {
        setTimeout(() => inputComplete.focus(), 0);
    }

    public abstract handleConfirm(): void;
}
