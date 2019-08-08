import {
    Component,
    ChangeDetectionStrategy,
    Input,
    OnInit,
    Output,
    EventEmitter,
    OnDestroy,
    SimpleChanges,
    OnChanges
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Unsubscribe, untilDestroyed } from '@core/decorators/unsubscribe';
import { PageTypes } from '@core/models/generic';

@Component({
    selector: 'app-table-tree-header',
    templateUrl: './table-tree-header.component.html',
    styleUrls: ['./table-tree-header.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@Unsubscribe()
export class TableTreeHeaderComponent implements OnChanges, OnInit, OnDestroy {
    @Input() public headerName = 'USER FACTORS';
    @Input() public orderName = 'PRIORITY';
    @Input() public headerSorts: any = null;
    @Input() public isActiveHeader = false;
    @Input() public pageType: PageTypes;

    @Output() public headerChecked = new EventEmitter<boolean>();
    @Output() public changeHeaderSort = new EventEmitter<string[]>();

    public checked: FormControl;
    public pageTypes = PageTypes;

    public ngOnInit(): void {
        this.checked = new FormControl(this.isActiveHeader);
        this.initListener();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        const isActiveHeader = changes['isActiveHeader'];

        if (isActiveHeader && !isActiveHeader.firstChange) {
            this.checked.setValue(isActiveHeader.currentValue, { emitEvent: false });
        }
    }

    public setFilterClass(nameField: string): string {
        if (!this.headerSorts || !this.headerSorts.nameField || this.headerSorts.nameField[0] !== nameField) {
            return '';
        }

        let { direction } = this.headerSorts;

        if (nameField === 'order') {
            direction = !direction;
        }

        return direction ? 'filter-icon-right' : 'filter-icon-left';
    }

    public filterChange(nameField: string[]): void {
        this.changeHeaderSort.emit(nameField);
    }

    public ngOnDestroy(): void {
    }

    private initListener(): void {
        this.checked.valueChanges
            .pipe(
                untilDestroyed(this),
            )
            .subscribe(item => {
                this.headerChecked.emit(item);
            });
    }
}
