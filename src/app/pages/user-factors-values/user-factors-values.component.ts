import {
    Component,
    ChangeDetectionStrategy,
    OnInit,
    OnDestroy
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UniterState } from '@store/reducers';
import * as UserValues from '@store/user-values';
import { ResizeEvent } from 'angular-resizable-element';
import { MatRadioChange } from '@angular/material';
import { map, filter } from 'rxjs/operators';
import { bottomHeaderTitlesUserFactorsSettings } from '@core/components/two-headers-table/utils/propsValuesValidation';

@Component({
    selector: 'app-user-factors-values',
    templateUrl: './user-factors-values.component.html',
    styleUrls: ['./user-factors-values.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFactorsValuesComponent implements OnInit, OnDestroy {
    public userValues$ = this.store.pipe(select(UserValues.getValues));
    public userValuesTable$ = this.store.pipe(select(UserValues.getValuesTable));
    public isActiveUserValue$ = this.store.pipe(
        select(UserValues.getActiveUserValue),
        filter(Boolean)
    );
    public sortingClass$ = this.store
        .pipe(
            select(UserValues.getDirectionSort),
            map(item => item ? 'filter-icon-right' : 'filter-icon-left')
        );
    public styleLeftSide = { width: '350px' };
    public styleTable = { width: '910px' };
    public tableSettings = {
        colspan: '3',
        topHeaderTitles: [
            '',
            'Possible Span',
            'Recomended Span'
        ],
        bottomHeaderTitles: [
            'User Factor Step',
            'Text',
            'Value',
            'Min',
            'Max',
            'Min',
            'Max'
        ],
        disabled: ['name'],
        textInput: ['text', 'name'],
        bottomHeaderTitlesSettings: bottomHeaderTitlesUserFactorsSettings
    };
    public infoText = 'No matching records found';
    public isActiveItem = false;

    constructor(
        private readonly store: Store<UniterState>
    ) { }

    public ngOnInit(): void {
        this.store.dispatch(new UserValues.UserValuesGet());
    }

    public ngOnDestroy(): void {
        this.store.dispatch(new UserValues.SetDefaultState());
    }

    public changeValues({ value }: MatRadioChange): void {
        this.isActiveItem = true;
        this.store.dispatch(new UserValues.SetUserValue(value));
        this.store.dispatch(new UserValues.UserValuesGetTable(value));
    }

    public colapseTree(): void {
        this.store.dispatch(new UserValues.UserValuesTableSorting());
    }

    public trackByFn(index, item): number {
        return item.id + index;
    }

    public handleChangeElement(value: any): void {
        this.store.dispatch(new UserValues.SaveUserValueTable(value));
    }

    public onResizeEnd({ rectangle: { width } }: ResizeEvent): void {
        // TODO: calculate width
        const leftWidth = 350 + width;
        this.styleLeftSide = {
            width: `${leftWidth}px`
        };
        this.styleTable = {
            width: `calc(1270px - ${leftWidth}px)`
        };
    }
}
