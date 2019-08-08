import {
    Output,
    EventEmitter,
    OnInit,
    OnChanges,
    OnDestroy,
    SimpleChanges
} from '@angular/core';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'app-import-node',
    templateUrl: './import-node.component.html',
    styleUrls: ['./import-node.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImportNodeComponent {
    @Input() public title: string;
    @Input() public isCollapsed = false;
    @Input() public sub = false;

    public handleClickTitle(): void {
        this.isCollapsed = !this.isCollapsed;
    }
}
