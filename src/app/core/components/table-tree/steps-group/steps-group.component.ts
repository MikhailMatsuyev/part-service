import {
    Component,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
    SimpleChanges,
    OnChanges,
    ViewChild
} from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';
import { MatMenuTrigger } from '@angular/material';
import { omit } from '@utils/utilsfunc';
import { PageTypes } from '@core/models/generic';

@Component({
    selector: 'app-steps-group',
    templateUrl: './steps-group.component.html',
    styleUrls: ['./steps-group.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepsGroupComponent implements OnChanges {
    @Input() public groups = [];
    @Input() public pageType: PageTypes;
    @Input() public isSelectedStep: any = [];
    @Input() public activeKeyCode: string;
    @Input() public maxHeightGroup = 350;
    @Input() public isBlocked = false;
    @Output() public addStep = new EventEmitter<void>();
    @Output() public saveStep = new EventEmitter<any>();
    @Output() public removeStep = new EventEmitter<number>();
    @Output() public swapLeft = new EventEmitter<any>();
    @Output() public swapRight = new EventEmitter<any>();
    @Output() public selectStep = new EventEmitter<any>();
    @Output() public insertStep = new EventEmitter<any>();
    @Output() public dropSteps = new EventEmitter<any>();
    @Output() public infoClick = new EventEmitter<{id: number, name: string}>();
    @Output() public removeGroupStep = new EventEmitter<number>();

    @ViewChild('menuTrigger') public matMenuTrigger: MatMenuTrigger;

    public isStepFocused: number = null;
    public style: any;
    public menuStyle: any;
    public dragData: any;

    public ngOnChanges(changes: SimpleChanges): void {
        const groups = changes['groups'];

        if (groups) {
            const stepIndex = groups.currentValue.findIndex(({ step }) => step.trim() === '');
            this.isStepFocused = stepIndex === -1 ? null : stepIndex;
        }
    }

    public checkStepFocus(elemIndex, index): boolean {
        return elemIndex === index;
    }

    public handleNewStep(): void {
        this.addSteps();
    }

    public addSteps(): void {
        if (this.isBlocked) {
            return;
        }

        if (this.groups.filter(({ step }) => step.trim() === '').length <= 1) {
            this.addStep.emit();
        }
    }

    public changeStepText(text: string, step: any): void {
        if (text.length === 0 || text === step.step) {
            return;
        }

        this.saveStep.emit({ text, step });
    }

    public handleRemoveStep({ order }: any): void {
        this.removeStep.emit(order);
    }

    public handleSwapLeft({ order, stepId }: any): void {
        this.swapLeft.emit({ order: order - 1, stepId, selected: [stepId], move: true });
    }

    public handleSwapRight({ order, stepId }: any): void {
        this.swapRight.emit({ order: order + 1, stepId, selected: [stepId], move: true });
    }

    public handleSelectStep(step: any): void {
        this.selectStep.emit(step);
    }

    public handleInsertStep({ order }: any): void {
        this.insertStep.emit({order});
    }

    public handleInfoClick({ stepId, step }: any): void {
        this.infoClick.emit({id: stepId, name: step});
    }

    public handleRemoveGroupStep(id: number): void {
        this.removeGroupStep.emit(id);
    }

    public handleMove(event: MouseEvent, move: boolean): void {
        event.stopPropagation();
        this.dropSteps.emit({ ...this.dragData, move });
        this.matMenuTrigger.closeMenu();
    }

    public clearData(): void {
        this.dragData = null;
    }

    public handleDrop(data: any): void {
        const { cordsPage: { offsetX, offsetY } } = data;
        this.menuStyle = { top: `${offsetY}px`, left: `${offsetX}px` };
        const steps = this.groups[data.index];
        const stepId = steps ? steps.stepId : 0;
        this.dragData = { ...omit(data, ['cordsPage']), stepId };
        // trick for menu render
        setTimeout(() => this.matMenuTrigger.openMenu(), 0);
    }

    public isSelected({ stepId }: any): boolean {
        return this.isSelectedStep.filter(item => item.stepId === stepId).length > 0;
    }

    public onResizeEnd({ rectangle: { height } }: ResizeEvent): void {
        const maxHeight = height <= this.maxHeightGroup ? this.maxHeightGroup : height;

        this.style = {
            height: `${height}px`,
            'max-height': `${maxHeight}px`
        };
    }

    public validate = ({ rectangle: { height } }: ResizeEvent): boolean => {
        return height && height > 30 && height <= this.maxHeightGroup;
    }

    public trackByFn(index, item): any {
        return item;
    }
}
