import {
    Component,
    ChangeDetectionStrategy,
    OnDestroy,
    OnInit,
    Input,
    EventEmitter,
    Output
} from '@angular/core';
import { Unsubscribe, untilDestroyed } from '@core/decorators/unsubscribe';
import { FormGroup, FormBuilder } from '@angular/forms';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-performance-selection',
    templateUrl: './performance-selection.component.html',
    styleUrls: ['./performance-selection.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@Unsubscribe()
export class PerformanceSelectionComponent implements OnInit, OnDestroy {
    @Input() public listPerformance: UserFactorConnected[] = [];
    @Input() public isDisabledRemove = false;
    @Output() public changeFilter = new EventEmitter<any>();
    @Output() public removeListPerformace = new EventEmitter<void>();
    public form: FormGroup;

    constructor(private readonly fb: FormBuilder) {}

    public ngOnInit(): void {
        this.form = this.fb.group({
            direction: false,
            position: null,
            performance: ''
        });

        this.form.valueChanges
            .pipe(
                untilDestroyed(this),
                filter(x => x.performance || x.position)
            )
            .subscribe(item => this.changeFilter.emit(item));
    }

    public ngOnDestroy(): void {
    }

    public removePerformance(event: MouseEvent): void {
        event.stopPropagation();

        if (this.isDisabledRemove) {
            return;
        }

        this.removeListPerformace.emit();
    }
}
