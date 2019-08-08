import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { DisplayTypes } from '@core/models/generic';
import { UniterState } from '../../core/store/reducers';
import {
    GetAppSettings,
    getDisplayAnalyzeButton,
    getTimeoutDuration,
    getNumberDisplayType,
    SetNumbersType,
    SetAnalyzeButtonVisibility,
    SetAnalyzeTimeout
} from '../../core/store/app-settings';

@Component({
    selector: 'app-settings',
    templateUrl: './app-settings.component.html',
    styleUrls: ['./app-settings.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppSettingsComponent implements OnInit {
    public selectedDisplayType$ = this.store.pipe(select(getNumberDisplayType));
    public displayAnalyzeButtons$ = this.store.pipe(select(getDisplayAnalyzeButton));
    public timeoutDuration$ = this.store.pipe(select(getTimeoutDuration));
    public displayTypes = DisplayTypes;

    constructor(
        private readonly store: Store<UniterState>
    ) { }

    public ngOnInit(): void {
        this.store.dispatch(new GetAppSettings());
    }

    public onChangeTimeout(timeout: number): void {
        this.store.dispatch(new SetAnalyzeTimeout(timeout));
    }

    public onChangeType(typeId: number): void {
        this.store.dispatch(new SetNumbersType(typeId));
    }

    public onChangeAnalyzeButtonsVisibility(show: boolean): void {
        this.store.dispatch(new SetAnalyzeButtonVisibility(show));
    }
}
