import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    Input,
    OnChanges,
    SimpleChanges,
    Output,
    EventEmitter,
    OnDestroy
} from '@angular/core';
import { MatCheckboxChange } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { omit } from '@utils/utilsfunc';
import { Unsubscribe, untilDestroyed } from '@core/decorators/unsubscribe';

@Component({
    selector: 'app-unit-pricing',
    templateUrl: './unit-pricing.component.html',
    styleUrls: ['./unit-pricing.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@Unsubscribe()
export class UnitPricingComponent implements OnChanges, OnInit, OnDestroy {
    @Input() public settings: FunctionsSettings;
    public form: FormGroup;
    public activeFunctions = [];
    @Output() public saveForm = new EventEmitter<FunctionsSettingsModel>();
    @Output() public displayChange = new EventEmitter<boolean>();
    @Output() public chooseComponent = new EventEmitter<number>();

    constructor(private readonly fb: FormBuilder) {}

    public ngOnInit(): void {
        this.form = this.fb.group({
            activated: false,
            showField: false,
            factorId: null,
            termId: null
        });

        this.form.get('showField')
            .valueChanges
            .pipe(
                untilDestroyed(this),
            )
            .subscribe(item => {
                this.displayChange.emit(item);
            });
    }

    public ngOnChanges(changes: SimpleChanges): void {
        const settings = changes['settings'];

        if (!settings) {
            return;
        }

        const { previousValue, currentValue } = settings;

        if (previousValue && previousValue.perfId === currentValue.perfId) {
            return;
        }

        if (currentValue) {
            this.form.patchValue({
                factorId: currentValue.factorId,
                termId: currentValue.termId
            });
        }

        if (currentValue && this.form) {
            this.activeFunctions = currentValue.functions;
            this.form.patchValue({
                activated: currentValue.activated,
                showField: currentValue.showField
            }, {emitEvent: false});
        }
    }

    public ngOnDestroy(): void {
    }

    public handleFunctions({ checked }: MatCheckboxChange, functions: Functions): void {
        // TODO: add formArray
        this.activeFunctions = this.activeFunctions.map(item => {
            if (functions.id === item.id) {
                return {
                    ...item,
                    selected: checked
                };
            }

            return item;
        });
    }

    public save(): void {
        let { factorId, termId } = this.form.value;
        factorId = parseFloat(factorId || this.settings.factorId);
        termId = parseFloat(termId || this.settings.termId);
        this.saveForm.emit({
            ...(omit(this.form.value, ['showField'])),
            factorId,
            termId,
            perfId: this.settings.perfId,
            functions: this.activeFunctions
        });
    }

    public chooseComponents(): void {
        this.chooseComponent.emit(this.settings.perfId);
    }
}
