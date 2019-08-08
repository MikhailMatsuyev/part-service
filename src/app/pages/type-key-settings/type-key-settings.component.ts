import { Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UniterState } from '../../core/store/reducers';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { whitespacesValidator } from '../../utils/validatorBuilder';
import { MatCheckboxChange, Sort } from '@angular/material';
import {
    getPrimaryTypeKeyUserFactors,
    getPrimaryTypeKeyPerformances,
    GetTypeKeySettings,
    GetVariantCodeSettings,
    getTypeKeyTable,
    getFreeTextList,
    getUserFactorList,
    getPrimaryTypeKeySettings,
    getTypeKeyErrorMessage,
    getPrimaryTypeKeyFreeTexts,
    SaveTypeKeySettings,
    RemoveFreeTextFromTypeKey,
    SaveTypeKeyRow,
    EditUserFactorTypeKey,
    AddFreeTextToTypeKey,
    AddSortTypeKey,
    SelectPerformance
} from '@core/store/type-key-settings';
import { Unsubscribe, untilDestroyed, OnDestroy } from '@core/decorators/unsubscribe';
import { map, filter } from 'rxjs/operators';

@Component({
    selector: 'app-type-key-settings',
    templateUrl: './type-key-settings.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./type-key-settings.component.sass']
})
@Unsubscribe()
export class TypeKeySettingsComponent implements OnInit, OnDestroy {
    public performances$ = this.store.pipe(select(getPrimaryTypeKeyPerformances));
    public userFactors$ = this.store.pipe(select(getPrimaryTypeKeyUserFactors));
    public freeTexts$ = this.store.pipe(select(getPrimaryTypeKeyFreeTexts));
    public tableData$ = this.store.pipe(select(getTypeKeyTable));
    public errorMessage$ = this.store.pipe(select(getTypeKeyErrorMessage));
    public form: FormGroup;
    public activeSort: Sort;
    public displayedColumns = [
        'name',
        'position',
        'length',
        'showDelimiter',
        'showDefaultValue',
        'type'
    ];

    public get selectedUserFactorId(): number {
        return parseInt(this.form.controls.userFactorsForm.value.UserFactorId, null);
    }

    public get textControl(): AbstractControl {
        return this.form.controls.freeTextsForm.get('Text');
    }

    public get selectedFreeTextId(): number {
        return parseInt(this.form.controls.freeTextsForm.value.FreeTextId, null);
    }

    constructor(
        private readonly store: Store<UniterState>,
        private readonly fb: FormBuilder
    ) { }

    public ngOnInit(): void {
        this.form = this.fb.group({
            primaryKeyForm: this.fb.group({
                perfId: null,
                delimiter: null,
                fixed: false,
                digitsOnly: false,
                displayField: false,
                defaultValue: null
            }),
            userFactorsForm: this.fb.group({
                UserFactorId: null
            }),
            freeTextsForm: this.fb.group({
                Text: ['', [Validators.required, Validators.maxLength(255), whitespacesValidator]],
                VariantCodePos: null,
                ShowDelimiter: false,
                FreeTextId: null
            })
        });

        this.store.pipe(
            select(getPrimaryTypeKeySettings),
            untilDestroyed(this)
        ).subscribe((item) => {
            this.form.controls.primaryKeyForm.patchValue(item);
        });

        this.store.pipe(
            select(getFreeTextList),
            filter(item => item && item.length > 0 )
        )
        .subscribe(list => {
            this.form.controls.freeTextsForm.get('FreeTextId').setValue(list[0].Value);
        });

        this.store.pipe(
            select(getUserFactorList),
            filter(item => item && item.length > 0 )
        )
        .subscribe(list => {
            this.form.controls.userFactorsForm.get('UserFactorId').setValue(list[0].Value);
        });

        this.store.dispatch(new GetTypeKeySettings());
    }

    public ngOnDestroy(): void {
    }

    public handleCheckTable({ checked }: MatCheckboxChange, element: TypeKeySettingsRow, fieldChange: string): void {
        this.store.dispatch(new SaveTypeKeyRow({ ...element, [fieldChange]: checked }));
    }

    public saveSettings() {
        this.store.dispatch(new SaveTypeKeySettings(
            this.form.controls.primaryKeyForm.value
        ));
    }

    public resetSettings() {
        this.store.dispatch(new GetTypeKeySettings());
    }

    public addUserFactor() {
        this.store.dispatch(new EditUserFactorTypeKey({
            ufId: this.selectedUserFactorId,
            add: true
        }));
    }

    public deleteUserFactor() {
        this.store.dispatch(new EditUserFactorTypeKey({
            ufId: this.selectedUserFactorId,
            add: false
        }));
    }

    public handleChangePerformance(id) {
        this.store.dispatch(new GetVariantCodeSettings(id));
    }

    public addFreeText() {
        const { Text, VariantCodePos, ShowDelimiter } = this.form.controls.freeTextsForm.value;

        this.store.dispatch(new AddFreeTextToTypeKey({
            freeText: Text,
            freeTextPos: VariantCodePos,
            separator: ShowDelimiter,
        }));
        this.form.controls.freeTextsForm.reset();
    }

    public deleteFreeText() {
        this.store.dispatch(new RemoveFreeTextFromTypeKey({
            freeTextId: this.selectedFreeTextId
        }));
    }

    public handleChangeValue(value: string | number, element: TypeKeySettingsRow, fieldName: string): void {
        this.store.dispatch(new SaveTypeKeyRow({ ...element, [fieldName]: value }));
    }

    public sortData(sort: Sort) {
        this.activeSort = sort;
        this.store.dispatch(new AddSortTypeKey(sort));
    }

    public setFilterClass(nameField: string): string {
        if (!this.activeSort || !this.activeSort.active || this.activeSort.active !== nameField || !this.activeSort.direction) {
            return '';
        }

        const { direction } = this.activeSort;

        return direction === 'asc' ? 'filter-icon-left' : 'filter-icon-right';
    }
 }
