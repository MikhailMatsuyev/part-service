import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { bottomHeaderTitlesSettings } from './utils/propsValuesValidation';

@Component({
  selector: 'app-two-headers-table',
  templateUrl: './two-headers-table.component.html',
  styleUrls: ['./two-headers-table.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TwoHeadersTableComponent {
    @Input() public data: any;
    @Input() public infoText: string;

    @Input() public settings = {
        colspan: '4',
        topHeaderTitles: [
            'Current Performance',
            'Possible Span',
            'Recomended Span'
        ],
        bottomHeaderTitles: [
            'Performance',
            'Text',
            'Value',
            'Unit',
            'Min',
            'Max',
            'Min',
            'Max'
        ],
        disabled: ['name', 'unit'],
        textInput: ['text', 'unit', 'name'],
        bottomHeaderTitlesSettings
    };

    @Output() public changeElement = new EventEmitter<any>();

    public getNewObject(item): void {
        this.changeElement.emit(item);
    }

    public trackByFn(index: number, item: any): any {
        return item;
    }
}
