import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import {
    Component,
    ChangeDetectionStrategy,
    OnDestroy,
    OnInit,
    forwardRef,
    Input
} from '@angular/core';
import { Unsubscribe, untilDestroyed } from '@core/decorators/unsubscribe';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-performance-number',
    templateUrl: './performance-number.component.html',
    styleUrls: ['./performance-number.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PerformanceNumberComponent),
            multi: true
        }
    ],
})
@Unsubscribe()
export class PerformanceNumberComponent implements OnInit, OnDestroy, ControlValueAccessor {
    @Input() public minValue = 0;
    public control: FormControl;

    public propagateChange: any = () => {
    }

    public get isDisabledRemove(): boolean {
        return !this.control.value || this.minValue === parseFloat(this.control.value);
    }

    public ngOnInit(): void {
        this.control = new FormControl();

        this.control.valueChanges
            .pipe(
                debounceTime(125),
                distinctUntilChanged(),
                untilDestroyed(this),
                map(parseFloat)
            )
            .subscribe(item => this.propagateChange(item));
    }

    public writeValue(obj: any): void {
        this.control.setValue(obj);
    }

    public registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    public registerOnTouched(fn: any): void {
    }

    public addNumber(): void {
        let { value } = this.control;
        this.control.setValue(++value);
    }

    public deleteNumber(): void {
        let { value } = this.control;
        value -= 1;

        if (value >= this.minValue) {
            this.control.setValue(value);
        }
    }

    public ngOnDestroy(): void {
    }
}
