import {
    Component,
    ChangeDetectionStrategy,
    Input,
    EventEmitter,
    Output,
    ChangeDetectorRef
} from '@angular/core';
import { PageTypes, LevelTypes } from '@core/models/generic';
import { capitalizeFirstLetter } from '@utils/utilsfunc';

@Component({
    selector: 'app-table-tree',
    templateUrl: './table-tree.component.html',
    styleUrls: ['./table-tree.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableTreeComponent {
    @Input() public tableData: any[] = [];
    @Input() public serieHeaderName = 'USER FACTORS';
    @Input() public headerSorts: any;
    @Input() public isSelectedStep: any[];
    @Input() public activeKeyCode: string;
    @Input() public isCheckedGroup: any = [];
    @Input() public groupId: string = null;
    @Input() public pageType: PageTypes;
    @Input() public validateSeriesDepend: string[] = [];
    @Output() public changeStatusHeaders = new EventEmitter<any>();
    @Output() public changeHeaderSort = new EventEmitter<string>();
    @Output() public changeActiveGroup = new EventEmitter<{ serieId: string }>();
    @Output() public changeGroupInfo = new EventEmitter<any>();
    @Output() public addNewEmptyStep = new EventEmitter<{ serieId: string }>();
    @Output() public saveStep = new EventEmitter<any>();
    @Output() public removeStep = new EventEmitter<any>();
    @Output() public swapLeft = new EventEmitter<any>();
    @Output() public swapRight = new EventEmitter<any>();
    @Output() public selectStep = new EventEmitter<any>();
    @Output() public insertStep = new EventEmitter<any>();
    @Output() public dropStep = new EventEmitter<any>();
    @Output() public infoClick = new EventEmitter<any>();
    @Output() public removeGroupStep = new EventEmitter<any>();
    @Output() public dropSerie = new EventEmitter<number>();
    @Output() public dragGroupStart = new EventEmitter<any>();
    @Output() public changeSubGroupStatus = new EventEmitter<string>();

    public validateDraggable = true;

    constructor(private readonly cd: ChangeDetectorRef) {}

    public handleSort(nameField: string): void {
        this.changeHeaderSort.emit(nameField);
    }

    public handleActiveGroup({ serieId }: any): void {
        this.changeActiveGroup.emit({ serieId });
    }

    public handleGroupsInfo(data: any, item: any): void {
        this.changeGroupInfo.emit({ ...item, ...data });
    }

    public handleAddStep({ serieId, blocked }: any): void {
        if (blocked) {
            return;
        }

        this.addNewEmptyStep.emit({ serieId });
    }

    public handleSaveStep(obj: any, { serieId, blocked }: any): void {
        if (blocked) {
            return;
        }

        this.saveStep.emit({serieId, data: obj});
    }

    public handleRemoveStep(order: number, { serieId, blocked }: any): void {
        if (blocked) {
            return;
        }

        this.removeStep.emit({ order, serieId });
    }

    public handleSwapLeft(data: any, { serieId, blocked }: any): void {
        if (blocked) {
            return;
        }

        this.swapLeft.emit({ ...data, serieId });
    }

    public handleSwapRight(data: any, { serieId, blocked }: any): void {
        if (blocked) {
            return;
        }

        this.swapRight.emit({ ...data, serieId });
    }

    public handleSelectStep(data: any, { serieId, blocked }: any): void {
        if (blocked) {
            return;
        }

        this.selectStep.emit({ ...data, serieId });
    }

    public handleInsertStep(data: any, { serieId, blocked }: any): void {
        if (blocked) {
            return;
        }

        this.insertStep.emit({ ...data, serieId });
    }

    public handleDropStep({ move, stepId, index, data: { data } }, { serieId, blocked }: any): void {
        if (blocked) {
            return;
        }

        const stepsId = Array.isArray(data) ? data.map(item => item.stepId) : [data.stepId];
        this.dropStep.emit({ move, serieId, index, stepId, stepsId});
    }

    public handleInfoClick(data: any, levelType = LevelTypes.Step): void {
        this.infoClick.emit({...data, levelType});
    }

    public handleCheckHeader(): void {
        this.changeStatusHeaders.emit({type: 'group'});
    }

    public handleRemoveGroupStep(data: number, {blocked}: any): void {
        if (blocked) {
            return;
        }

        this.removeGroupStep.emit({ids: [data]});
    }

    public handleHeaderSubGroup(obj: any): void {
        this.changeStatusHeaders.emit({type: 'subgroup', ...obj});
    }

    public handleDragStartGroup(data: any): void {
        setTimeout(() => this.dragGroupStart.emit(data));
    }

    public handleSeriaInfo({ serieId, serie }: any, levelType = LevelTypes.Serie): void {
        this.infoClick.emit({id: serieId, name: serie, levelType});
    }

    public handleDrop({ data: {data: { serieId } } }: any): void {
        this.dropSerie.emit(serieId);
        this.validateDraggable = false;
        this.cd.detectChanges();
    }

    public handleDraggable(flag: boolean): void {
        this.validateDraggable = flag;
        this.cd.markForCheck();
    }

    public checkedGroup({ serieId }: any): boolean {
        return !!this.isCheckedGroup.find(item => item.serieId === serieId);
    }

    public checkStatusUserFactor(): boolean {
        return !!this.isCheckedGroup.find(item =>
            (item.factors && item.factors.groupId === this.groupId) && !item.isSerieSelected && !item.isMainGroup
        );
    }

    public handleChangeValidateStatus(message: string): void {
        const headerLength = this.serieHeaderName.length;
        const newMessage = message.includes('placeholder')
            ? capitalizeFirstLetter(this.serieHeaderName.toLowerCase().slice(0, headerLength - 1)) + message.replace('placeholder', '')
            : message;
        this.changeSubGroupStatus.emit(newMessage);
    }

    public isSelectedSteps({ serieId }: any): any[] {
        return this.isSelectedStep.filter(item => item.serieId === serieId);
    }

    public trackByFn(index: number, item: any): number {
        return item.serieId;
    }
}
