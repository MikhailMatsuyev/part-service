import {
    Component,
    ChangeDetectionStrategy,
    Input,
    EventEmitter,
    Output
} from '@angular/core';

@Component({
    selector: 'app-calculations-header',
    templateUrl: './calculations-header.component.html',
    styleUrls: ['./calculations-header.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppCalculationsHeaderComponent {
    @Input() public withCustomTemplateSeries = true;
    @Input() public valuesWithStatusUF: RecommendationsCalculationsStatus[] = [];
    @Input() public valuesWithStatusCS: RecommendationsCalculationsStatus[] = [];
    @Input() public defaultItemUserFactor: any;
    @Input() public defaulItemSeries: any;
    @Input() public componentSeries: RecommendationsComponent[];
    @Input() public userFactor: RecommendationsComponent[];
    @Input() public textChanges: any;
    @Input() public isDisabledUpdateButton = false;
    @Input() public withFormulasIcon = false;
    @Input() public withCustomSelect = false;
    @Input() public canBlankXDisabled = false;
    @Input() public updateBtnText = 'Update Auto Generated Recommendations';

    @Output() public changeUserFactorStep = new EventEmitter<{ ufId: number, ufvId: number }>();
    @Output() public changeComponentStep = new EventEmitter<{ csId: number, csvId: number }>();
    @Output() public changeUserFactor = new EventEmitter<{ position: boolean, value: number }>();
    @Output() public changeHeaders = new EventEmitter<boolean>();
    @Output() public clickBlankX = new EventEmitter<boolean>();
    @Output() public syncCalculation = new EventEmitter<{ viewType: number }>();
    @Output() public clickError = new EventEmitter<string>();
    @Output() public autoGenerate = new EventEmitter<void>();
    @Output() public cancelGenerate = new EventEmitter<void>();
    @Output() public clickHelp = new EventEmitter<void>();
    @Output() public changeComponent = new EventEmitter<{ position: boolean, value: number }>();
    @Output() public selectedItemDropdown = new EventEmitter<{ id: number, isChecked: boolean, type: number }>();
    @Output() public selectedAllDropdown = new EventEmitter<{status: boolean, type: number}>();

    public tableSync = false;
    public isCollapsed = false;
    public isCollapsedComponent = false;
    public componentPosition = false;

    public get isAllUserFactor(): boolean {
        return this.withCustomSelect && !this.componentPosition && this.userFactor.every((item: any) => item.isSelected);
    }

    public get isBlankXDisabled(): boolean {
        if (this.componentPosition) {
            return true;
        }

        return this.canBlankXDisabled && !this.userFactor.find((item: any) => item.isSelected);
    }

    public handleBlankX(): void {
        this.clickBlankX.emit(this.componentPosition);
    }

    public updateManual(): void {
        this.autoGenerate.emit();
    }

    public cancelUpdating(): void {
        this.cancelGenerate.emit();
    }

    public handleHelp(): void {
        this.clickHelp.emit();
    }

    public handleError(message: string): void {
        this.clickError.emit(message);
    }

    public syncCalculations(): void {
        this.tableSync = true;
        this.syncCalculation.emit({ viewType: Number(!this.componentPosition) });
    }

    public swapHeader(): void {
        this.componentPosition = !this.componentPosition;
        this.changeHeaders.emit(this.componentPosition);

        if (this.tableSync) {
            this.syncCalculations();
        }
    }

    public handleChangeUserFactorStep(value: number, { serieId }: any): void {
        this.changeUserFactorStep.emit({ ufId: serieId, ufvId: value });
    }

    public handleChangeComponentStep(value: number, { serieId }: any): void {
        this.changeComponentStep.emit({ csId: serieId, csvId: value });
    }

    public handleChangeComponent(value: number): void {
        if (!this.componentPosition) {
            this.tableSync = false;
        }

        this.changeComponent.emit({ position: this.componentPosition, value });
    }

    public handleChangeUserFactor(value: number): void {
        if (this.componentPosition) {
            this.tableSync = false;
        }

        this.changeUserFactor.emit({ position: this.componentPosition, value });
    }

    public collapseHandle(nameField: string): void {
        this[nameField] = !this[nameField];
    }

    public selectedAll(value: boolean): void {
        this.selectedAllDropdown.emit({status: value, type: Number(this.componentPosition)});
    }

    public selectedItem(item: { id: number, isChecked: boolean }): void {
        this.selectedItemDropdown.emit({...item, type: Number(this.componentPosition)});
    }
}
