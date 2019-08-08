import {
    Component,
    ChangeDetectionStrategy,
    OnInit,
    OnDestroy,
    Input,
    forwardRef
} from '@angular/core';
import {
    ControlValueAccessor,
    FormControl,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Unsubscribe, untilDestroyed } from '@core/decorators/unsubscribe';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SearchComponent),
            multi: true
        }
    ],
})
@Unsubscribe()
export class SearchComponent implements OnInit, ControlValueAccessor, OnDestroy {
    @Input() public placeHolder = 'Search';
    @Input() public maxLength = 255;
    public control: FormControl;
    public isActive = false;
    public propagateChange: any = () => {
    }

    public ngOnInit(): void {
        this.control = new FormControl('');
        this.initListener();
    }

    public ngOnDestroy(): void {
    }

    public writeValue(obj: any): void {
        this.control.setValue(obj);
    }

    public registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    public registerOnTouched(fn: any): void {
    }

    public clearControl(): void {
        this.control.setValue('');
    }

    private initListener(): void {
        this.control.valueChanges
            .pipe(
                debounceTime(250),
                distinctUntilChanged(),
                untilDestroyed(this)
            )
            .subscribe(item => {
                this.propagateChange(item);
            });
    }
}
