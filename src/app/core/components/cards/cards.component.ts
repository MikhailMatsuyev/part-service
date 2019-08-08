import {
    Component,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
    OnInit,
    OnChanges,
    OnDestroy,
    SimpleChanges
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { Unsubscribe, untilDestroyed } from '@core/decorators/unsubscribe';
import { setTrimAndLowerCase } from '@utils/utilsfunc';
import { PageTypes } from '@core/models/generic';

@Component({
    selector: 'app-cards',
    templateUrl: './cards.component.html',
    styleUrls: ['./cards.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@Unsubscribe()
export class CardsComponent implements OnChanges, OnInit, OnDestroy {
    @Input() public pageType: PageTypes;
    @Input() public headerName = 'Groupe name';
    @Input() public headerPriority = 'Priority';
    @Input() public canEdit = true;
    @Input() public headerSorts: boolean;
    @Input() public isActive = false;
    @Input() public validateDepend: string[] = [];
    @Input() public saveAfterOut = false;
    @Input() public set headerCollapse(value: boolean) {
        this.isCollapsed = value;
    }

    @Output() public headerChecked = new EventEmitter<boolean>();
    @Output() public changeSort = new EventEmitter<void>();
    @Output() public headerChange = new EventEmitter<string>();
    @Output() public headerPriorityChange = new EventEmitter<number>();
    @Output() public changeCollapse = new EventEmitter<boolean>();
    @Output() public changeStatusValidate = new EventEmitter<string>();

    public checked: FormControl;
    public isCollapsed = false;
    public headerControl: FormControl;
    public priorityControl: FormControl;
    public pageTypes = PageTypes;

    private patternControl = /[^0-9]/g;

    public ngOnInit(): void {
        const value = this.canEdit ? 'No group' : this.headerName;
        this.checked = new FormControl(this.isActive);
        this.priorityControl = new FormControl({ value: this.headerPriority, disabled: this.canEdit });
        this.headerControl = new FormControl({ value, disabled: this.canEdit });
        this.initListener();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        const headerName = changes['headerName'];
        const canEdit = changes['canEdit'];
        const headerPriority = changes['headerPriority'];
        const isActive = changes['isActive'];

        if (headerName && !headerName.firstChange) {
            this.headerControl.setValue(headerName.currentValue, {emitEvent: false});
        }

        if (headerPriority && !headerPriority.firstChange) {
            this.priorityControl.setValue(headerPriority.currentValue, {emitEvent: false});
        }

        if (canEdit && canEdit.currentValue && this.headerControl) {
            this.headerControl.disable();
        }

        if (isActive && !isActive.firstChange) {
            this.checked.setValue(isActive.currentValue, {emitEvent: false});
        }
    }

    public ngOnDestroy(): void {
    }

    public setFilterClass(): string {
        return this.headerSorts ? 'filter-icon-left' : 'filter-icon-right';
    }

    public collapseHandle(): void {
        this.isCollapsed = !this.isCollapsed;
        this.changeCollapse.emit(this.isCollapsed);
    }

    public filterChange(): void {
        this.changeSort.emit();
    }

    private initListener(): void {
        this.checked.valueChanges
            .pipe(
                untilDestroyed(this),
            )
            .subscribe(item => {
                this.headerChecked.emit(item);
            });

        this.headerControl.valueChanges
            .pipe(
                untilDestroyed(this),
                debounceTime(125),
                distinctUntilChanged(),
                filter(() => !this.saveAfterOut)
            )
            .subscribe(item => {
                if (this.validateDepend.some(validateItem => validateItem === item)) {
                    this.changeStatusValidate.emit();
                } else {
                    this.headerChange.emit(item);
                }
            });

        this.priorityControl.valueChanges
            .pipe(
                untilDestroyed(this),
                debounceTime(125),
                map(item => parseFloat(item)),
                distinctUntilChanged(),
                filter(() => !this.saveAfterOut)
            ).subscribe(item => {
                this.headerPriorityChange.emit(item);
            });
    }

    public handleFocusOut(): void {
        const data = setTrimAndLowerCase(this.headerControl.value);
        const defaultHeaderName = this.headerName.toLowerCase();
        let dataPriority = this.priorityControl.value;

        if (defaultHeaderName === data && this.headerPriority === dataPriority) {
            this.headerControl.setValue(this.headerControl.value.trim(), { emitEvent: false });
            return;
        }

        if (this.saveAfterOut) {
            if (this.headerPriority !== dataPriority) {
                const newData = dataPriority.trim().replace(this.patternControl, '');
                if (newData.length === 0) {
                    this.priorityControl.setValue(0, { emitEvent: false });
                    dataPriority = 0;
                }

                this.headerPriorityChange.emit(dataPriority);
                return;
            }

            if (data.length === 0) {
                this.changeStatusValidate.emit('Group name can\'t be empty');
                this.headerControl.setValue(this.headerName, { emitEvent: false });
                return;
            }

            if (this.validateDepend.some(item => item.toLowerCase() === data)) {
                this.changeStatusValidate.emit('The Group with the same name already exists');
                this.headerControl.setValue(this.headerName, { emitEvent: false });
                return;
            }

            this.headerChange.emit(this.headerControl.value.trim());
        }
    }
}
