import {
    Component,
    ChangeDetectionStrategy,
    OnInit,
    Input,
    OnDestroy,
    EventEmitter,
    Output,
    SimpleChanges,
    OnChanges
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { Unsubscribe, untilDestroyed } from '@core/decorators/unsubscribe';

@Component({
    selector: 'app-performance-input',
    templateUrl: './performance-input.component.html',
    styleUrls: ['./performance-input.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@Unsubscribe()
export class PerformanceInputComponent implements OnChanges, OnInit, OnDestroy {
    @Input() public data: any;
    @Input() public isDisabled = false;
    @Input() public inputType = 'text';
    @Input() public maxLength: number;
    @Input() public maxValue: number;
    @Input() public minValue: number;
    @Input() public saveAfterOut = true;
    @Input() public isRequired = false;
    @Input() public validateDepend: string[] = [];
    @Output() public changeControlStatus = new EventEmitter<string>();
    @Output() public changeValue = new EventEmitter<string | number>();
    public control: FormControl;

    public ngOnChanges(changes: SimpleChanges): void {
        const data = changes['data'];

        if (data && !data.isFirstChange) {
            this.control.setValue(data.currentValue, { emitEvent: false });
        }
    }

    public ngOnInit(): void {
        this.control = new FormControl({
            value: this.data,
            disabled: this.isDisabled
        });

        this.control.valueChanges
            .pipe(
                untilDestroyed(this),
                filter(() => !this.saveAfterOut),
                debounceTime(250),
                distinctUntilChanged(),
            ).subscribe(item => this.changeValue.emit(item));
    }

    public ngOnDestroy(): void {
    }

    public handleFocusOut(): void {
        const data = this.control.value.toString().trim();
        if (this.data === data) {
            this.control.setValue(data, { emitEvent: false });
            return;
        }

        if (!this.saveAfterOut) {
            return;
        }

        if (this.isRequired && !data) {
            this.changeControlStatus.emit('validateRequired');
            this.control.setValue(this.data, { emitEvent: false });
            return;
        }

        if (this.validateDepend.some(item => item === data)) {
            this.changeControlStatus.emit('validateDepend');
            this.control.setValue(this.data, { emitEvent: false });
            return;
        }

        this.changeValue.emit(data);
        this.control.setValue(data, { emitEvent: false });
    }

    public handleKeyDown(event: KeyboardEvent, ref: HTMLInputElement): void {
        if (event.keyCode === 13) {
            ref.blur();
            return;
        }

        if (this.inputType === 'number') {
            const { code } = event;
            if (code === 'Minus') {
                event.preventDefault();
                event.stopPropagation();
            }

            if (!this.saveAfterOut || !(code.startsWith('Digit'))) {
                return;
            }

            const value: string = this.control.value.toString().trim();
            if ((this.maxLength && value.length >= this.maxLength)) {
                event.preventDefault();
                event.stopPropagation();
                return;
            }
        }
    }
}
