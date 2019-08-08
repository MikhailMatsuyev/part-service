import {
    Component,
    ChangeDetectionStrategy,
    Input,
    OnInit,
    Output,
    EventEmitter,
    ViewChild,
    ElementRef,
    SimpleChanges,
    OnChanges,
    NgZone,
    Renderer2,
    OnDestroy,
    ChangeDetectorRef
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageTypes } from '@core/models/generic';

@Component({
    selector: 'app-steps',
    templateUrl: './steps.component.html',
    styleUrls: ['./steps.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepsComponent implements OnChanges, OnInit, OnDestroy {
    @Input() public stepName = 'Steps 1';
    @Input() public pageType: PageTypes;
    @Input() public text: string;
    @Input() public activeKeyCode: string;
    @Input() public isCanSwapRight: boolean;
    @Input() public isCanSwapLeft: boolean;
    @Input() public stepsInfo = false;
    @Input() public set isFocused(value: boolean) {
        if (!value) {
            return;
        }

        if (this.isCanSwapRight && this.isCanSwapLeft) {
            // TODO: CHECK FOR FIRST RENDER STEP!
            setTimeout(() => this.setFocus(), 350);
        } else {
            this.setFocus();
        }
    }
    @Input() public maxLength = 50;
    @Input() public stepId: string;
    @Input() public isBlocked = false;

    @Output() public changeStepText = new EventEmitter<string>();
    @Output() public changeOptions = new EventEmitter<void>();
    @Output() public dragStart = new EventEmitter<any>();
    @Output() public addNewStep = new EventEmitter<void>();
    @Output() public removeStep = new EventEmitter<void>();
    @Output() public swapLeft = new EventEmitter<void>();
    @Output() public swapRight = new EventEmitter<void>();
    @Output() public selectStep = new EventEmitter<void>();
    @Output() public insertStep = new EventEmitter<void>();
    @Output() public infoClick = new EventEmitter<void>();
    @Output() public removeGroupStep = new EventEmitter<void>();

    @ViewChild('stepInput') public stepInput: ElementRef;

    public control: FormControl;
    public textActive = false;
    public pageTypes = PageTypes;
    private listenerFn: any[] = [];

    constructor(
        private readonly zone: NgZone,
        private readonly element: ElementRef,
        private readonly renderer: Renderer2,
        private readonly cd: ChangeDetectorRef
    ) { }

    public ngOnChanges(change: SimpleChanges): void {
        const text = change['text'];
        const isBlocked = change['isBlocked'];

        if (text && !text.firstChange && text.currentValue) {
            this.control.setValue(text.currentValue, {emitEvent: false});
        }

        if (isBlocked && !isBlocked.firstChange) {
            const methods = isBlocked.currentValue ? 'disable' : 'enable';
            this.control[methods]();
        }
    }

    public ngOnInit(): void {
        this.control = new FormControl({value: this.text, disabled: this.isBlocked});
        this.initListener();
    }

    public ngOnDestroy(): void {
        this.listenerFn.forEach(itemFn => itemFn());
    }

    public changeControl(): void {
        const value = this.control.value.trim();

        if (value && value === this.text) {
            this.focusStep();
            return;
        }

        if (value) {
            this.changeStepText.emit(this.control.value);
        } else if (this.stepId) {
            this.control.setValue(this.text);
        } else {
            this.removeStep.emit();
        }

        this.focusStep();
    }

    public optionsClick(event: MouseEvent): void {
        event.stopPropagation();
    }

    public setFocus(): void {
        this.stepInput.nativeElement.focus();
    }

    public onKeyDown = (event: KeyboardEvent): void => {
        if (event.keyCode === 9) {
            event.preventDefault();

            if (this.control.value.trim().length > 0) {
                this.addNewStep.emit();
                this.stepInput.nativeElement.blur();
            }
        }

        if (event.keyCode === 13) {
            this.stepInput.nativeElement.blur();
        }
        this.cd.markForCheck();
    }

    public handleSwapLeft(): void {
        this.swapLeft.emit();
    }

    public handleSwapRight(): void {
        this.swapRight.emit();
    }

    public handleDelete(): void {
        this.removeGroupStep.emit();
    }

    public handleInsert(): void {
        this.insertStep.emit();
    }

    public handleEditStep(): void {
        this.setFocus();
    }

    public handleInfoClick(): void {
        this.infoClick.emit();
    }

    public handleFocus(event: MouseEvent): void {
        if (this.isBlocked) {
            event.stopPropagation();
            return;
        }

        this.textActive = true;
    }

    public onClick = (): void => {
        if (this.isBlocked) {
            return;
        }

        if (this.activeKeyCode) {
            this.selectStep.emit();
            return;
        }

        this.setFocus();
        this.focusStep(true);
    }

    public onRightClick = (event: MouseEvent): void => {
        event.preventDefault();
        this.selectStep.emit();
    }

    private initListener(): void {
        this.zone.runOutsideAngular(() => {
            this.listenerFn.push(
                this.renderer.listen(
                    this.element.nativeElement,
                    'click',
                    this.onClick
                )
            );

            this.listenerFn.push(
                this.renderer.listen(
                    this.element.nativeElement,
                    'contextmenu',
                    this.onRightClick
                )
            );

            this.listenerFn.push(
                this.renderer.listen(
                    this.stepInput.nativeElement,
                    'keydown',
                    this.onKeyDown
                )
            );
        });
    }

    private focusStep(flag = false): void {
        this.textActive = flag;
        this.cd.markForCheck();
    }
}
