import { Component, OnInit, Output, EventEmitter, Input, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ResizeEvent } from 'angular-resizable-element';
import { Unsubscribe, OnDestroy, untilDestroyed } from '@core/decorators/unsubscribe';

@Component({
    selector: 'app-textarea',
    templateUrl: 'textarea.component.html',
    styleUrls: ['textarea.component.sass'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextareaComponent),
            multi: true
        }
    ]
})
@Unsubscribe()
export class TextareaComponent implements OnInit, ControlValueAccessor, OnDestroy {
    public control: FormControl;

    public textareaValue = '';

    public style: any;
    public textLength: any;

    private maxLength = 1000;

    @Output() public blur = new EventEmitter<void>();

    @Input() public text(text: string) {
        this.textareaValue = text;
    }

    public ngOnInit(): void {
        this.setupControl();
        this.initListeners();
    }

    public ngOnDestroy(): void {
    }

    public writeValue(value: string): void {
        this.control.setValue(value);
    }

    public registerOnChange(fn: any): void {
        this.propogateChange = fn;
    }

    public registerOnTouched(fn: any): void {
    }

    public propogateChange(value: any): any {
    }

    public onBlur(): void {
        this.blur.emit();
    }

    public onResizeEnd({ rectangle: { height }}: ResizeEvent): void {
        if (height > 40) {
            this.style = {
                height: `${height}px`
            };
        }
    }

    public onChange(value: any): void {
        this.textLength = value.length;
    }

    public onPaste(event: ClipboardEvent): void {
        const length = (this.maxLength - this.textLength);
        const calulateLength = length >= 0 ? length : 0;
        this.textareaValue = this.textareaValue.concat(event.clipboardData.getData('text/plain').slice(0, calulateLength));
        this.textLength = this.textareaValue.length;
        event.preventDefault();
    }

    private setupControl(): void {
        this.control = new FormControl();
    }

    private initListeners(): void {
        this.control.valueChanges
            .pipe(
                untilDestroyed(this)
            )
            .subscribe(value => this.propogateChange(value));
    }
}
