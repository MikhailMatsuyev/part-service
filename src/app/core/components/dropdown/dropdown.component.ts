import {
    Component,
    ChangeDetectionStrategy,
    Input,
    OnInit,
    forwardRef,
    OnDestroy,
    Output,
    EventEmitter,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';
import { MatCheckboxChange } from '@angular/material';
import { Unsubscribe, untilDestroyed } from '@core/decorators/unsubscribe';

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AppDropdownComponent),
            multi: true
        }
    ],
})
@Unsubscribe()
export class AppDropdownComponent implements OnChanges, OnInit, OnDestroy, ControlValueAccessor {
    @Input() public list: any[] = [];
    @Input() public searchable = false;
    @Input() public clearable = false;
    @Input() public defaultItem: any;
    @Input() public takeFirstItem = false;
    @Input() public isObjectMode = false;
    @Input() public objectFieldParseName;
    @Input() public objectFieldText;
    @Input() public isDisabled = false;
    // search solution with ng-content (not render ng-content in ng-select)
    @Input() public withCustomTemplate = false;
    @Input() public withFormulasIcon = false;
    @Input() public withCustomSelect = false;
    @Input() public isSelectedAll = false;

    @Output() public changeItem = new EventEmitter<any>();
    @Output() public selectedAll = new EventEmitter<boolean>();
    @Output() public selectedItem = new EventEmitter<{id: number, isChecked: boolean}>();
    @Output() public focus = new EventEmitter<void>();
    @Output() public blur = new EventEmitter<void>();

    public dropDownControl: FormControl;

    public ngOnInit(): void {
        this.dropDownControl = new FormControl({value: this.findItem(), disabled: this.isDisabled});
        this.dropDownControl.valueChanges
            .pipe(
                untilDestroyed(this),
                distinctUntilChanged()
            )
            .subscribe(item => {
                this.changeItem.emit(item);
                this.propagateChange(item);
            });

        // TODO: fix issue with custom dropdown not selected default value with object, need rerender
        setTimeout(() => this.dropDownControl.setValue(this.findItem(), { emitEvent: false }));
    }

    public ngOnChanges(changes: SimpleChanges): void {
        const list = changes['list'];
        const isDisabled = changes['isDisabled'];
        const defaultItem = changes['defaultItem'];

        if (list && !list.firstChange && list.currentValue) {
            this.dropDownControl.setValue(this.findItem(), { emitEvent: false });
        }

        if (isDisabled && !isDisabled.firstChange) {
            const method = isDisabled.currentValue ? 'disable' : 'enable';
            this.dropDownControl[method]();
        }

        if (defaultItem && !defaultItem.firstChange && defaultItem.currentValue) {
            this.dropDownControl.setValue(defaultItem.currentValue, { emitEvent: false });
        }
    }

    public ngOnDestroy(): void {
    }

    public propagateChange: any = () => {
    }

    public registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    public registerOnTouched(fn: any): void {
    }

    public writeValue(obj: any): void {
        if (!obj) {
            return;
        }

        setTimeout(() => this.dropDownControl.setValue(obj, { emitEvent: false }));
    }

    public setClassStatus(item: any): string {
        return (item.rec && item.pos)
            ? 'icon-status-active'
            : (!item.rec && item.pos)
                ? 'icon-status-not-active'
                : 'icon-status-disable';
    }

    public handleSelectAll({ checked }: MatCheckboxChange): void {
        this.selectedAll.emit(checked);
    }

    public handleSelectItem({ checked }: MatCheckboxChange, { id }: any): void {
        this.selectedItem.emit({ id, isChecked: checked });
    }

    public handleClick(event: MouseEvent): void {
        event.stopPropagation();
    }

    public emitBlur(event: any): void {
        this.blur.emit(event);
    }

    public emitFocus(event: any): void {
        this.focus.emit(event);
    }

    private findItem(): any {
        if (this.defaultItem && this.isObjectMode && this.list.length > 0) {
            const items = this.list.find(item => `${item[this.objectFieldParseName]}` === `${this.defaultItem}`);


            if (items) {
                return items[this.objectFieldParseName];
            }
        }

        if (this.takeFirstItem && this.isObjectMode && this.list && this.list.length > 0) {
            return this.list[0][this.objectFieldParseName];
        }

        return this.defaultItem;
    }
}
