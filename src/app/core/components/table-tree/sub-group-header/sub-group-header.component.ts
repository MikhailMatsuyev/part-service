import {
    Component,
    ChangeDetectionStrategy,
    Input,
    EventEmitter,
    Output,
    OnInit,
    OnDestroy,
    SimpleChanges,
    OnChanges
} from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { Unsubscribe, untilDestroyed } from '@core/decorators/unsubscribe';
import { setTrimAndLowerCase } from '@utils/utilsfunc';
import { PageTypes, InterfaceStepsActs } from '@core/models/generic';

@Component({
    selector: 'app-sub-group-header',
    templateUrl: './sub-group-header.component.html',
    styleUrls: ['./sub-group-header.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@Unsubscribe()
export class SubGroupHeaderComponent implements OnChanges, OnInit, OnDestroy {
    @Input() public pageType: PageTypes;
    @Input() public headerName: string;
    @Input() public description: string;
    @Input() public orderName: string;
    @Input() public interfaceAct: boolean;
    @Input() public serieDisplay: boolean;
    @Input() public serieActive: boolean;
    @Input() public isActiveGroup = false;
    @Input() public isActiveCategories: boolean;
    @Input() public isCheckedGroup = false;
    @Input() public isCombined = false;
    @Input() public validateDepend: string[] = [];
    @Input() public saveAfterOut = true;

    @Output() public changeValidateStatus = new EventEmitter<string>();
    @Output() public headerChecked = new EventEmitter<boolean>();
    @Output() public changeGroupStatus = new EventEmitter<void>();
    @Output() public changeGroupsInfo = new EventEmitter<any>();
    @Output() public changeActiveGroup = new EventEmitter<void>();
    @Output() public changeSeriaInfo = new EventEmitter<void>();
    @Output() public activeDraggable = new EventEmitter<boolean>();

    public checked: FormControl;
    public form: FormGroup;
    public isActiveControl = false;
    public pageTypes = PageTypes;
    public interfaceStepsActs = InterfaceStepsActs;

    private patternControl = /[^0-9]/g;

    constructor(private readonly fb: FormBuilder) {}

    public ngOnInit(): void {
        this.checked = new FormControl(this.isCheckedGroup);
        this.form = this.fb.group({
            orderName: this.orderName || 0,
            description: this.description || '',
            headerName: this.headerName || ''
        });
        this.initListener();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        const description = changes['description'];
        const orderName = changes['orderName'];
        const headerName = changes['headerName'];
        const isCheckedGroup = changes['isCheckedGroup'];

        if (description && !description.firstChange && !this.isActiveControl) {
            this.form.patchValue({ description: description.currentValue }, { emitEvent: false });
        }

        if (orderName && this.form) {
            this.form.patchValue({ orderName: orderName.currentValue }, { emitEvent: false });
        }

        if (headerName && !headerName.firstChange && !this.isActiveControl) {
            this.form.patchValue({ headerName: headerName.currentValue }, { emitEvent: false });
        }

        if (isCheckedGroup && !isCheckedGroup.firstChange) {
            this.checked.patchValue(isCheckedGroup.currentValue, { emitEvent: false });
        }
    }

    public ngOnDestroy(): void {
    }

    public handleInfo(): void {
        this.changeSeriaInfo.emit();
    }

    public editHeader(element: HTMLInputElement): void {
        element.focus();
    }

    public addGroup(): void {
    }

    public handleSubDrag(flag: boolean): void {
        this.activeDraggable.emit(flag);
    }

    public showGroup(): void {
        this.changeActiveGroup.emit();
    }

    public getDisplayIcon(): string {
        return this.serieDisplay
            ? '../../../../../assets/icons/outline-visibility.svg'
            : '../../../../../assets/icons/outline-visibility-off.svg';
    }

    public focusHeaderName(): void {
        this.isActiveControl = true;
    }

    public blurHeaderName(fieldName: string): void {
        this.isActiveControl = false;
        const headerName = setTrimAndLowerCase(this.form.get('headerName').value);
        const defaultHeaderName = this.headerName.toLowerCase();
        const orderName = `${this.form.get('orderName').value}`;

        if (fieldName === 'headerName' && headerName === defaultHeaderName) {
            return;
        }

        if (fieldName === 'headerName' && (this.validateDepend.some(item => item.toLowerCase() === headerName)
            || headerName.length === 0)) {
            const message = headerName.length === 0 ? 'placeholder name can\'t be empty' : 'The Serie with the same name already exists';
            this.changeValidateStatus.emit(message);
            this.form.get('headerName').setValue(this.headerName, { emitEvent: false });
        } else {
            this.changeGroupsInfo.emit(this.mapValue(this.form.value));

            const data = orderName.trim().replace(this.patternControl, '');

            if (fieldName === 'orderName' && data.length === 0) {
                this.form.get('orderName').setValue(0, { emitEvent: false });
            }
        }
    }

    public handleIntAct(): void {
        this.interfaceAct = !this.interfaceAct;
        this.changeGroupsInfo.emit(this.mapValue(this.form.value));
    }

    public handleActivationChange(): void {
        this.serieActive = !this.serieActive;
        this.changeGroupsInfo.emit(this.mapValue(this.form.value));
    }

    public handleDisplayChange(): void {
        this.serieDisplay = !this.serieDisplay;
        this.changeGroupsInfo.emit(this.mapValue(this.form.value));
    }

    private initListener(): void {
        this.checked.valueChanges
            .pipe(
                untilDestroyed(this),
            )
            .subscribe(item => {
                this.headerChecked.emit(item);
            });

        this.form.valueChanges
            .pipe(
                untilDestroyed(this),
                debounceTime(250),
                distinctUntilChanged(),
                filter(() => !this.saveAfterOut),
                map(this.mapValue)
            )
            .subscribe(item => {
                this.changeGroupsInfo.emit(item);
            });
    }

    private mapValue({ orderName, description, headerName }: any): any {
        return {
            description,
            order: parseFloat(orderName),
            serie: headerName,
            hide: this.interfaceAct,
            active: this.serieActive,
            display: this.serieDisplay
        };
    }
}
