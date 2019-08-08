import { Component, ChangeDetectionStrategy, Input } from '@angular/core';


@Component({
    selector: 'app-scrollbar',
    templateUrl: './scrollbar.component.html',
    styleUrls: ['./scrollbar.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppScrollbarComponent {
    @Input() public trackX = false;
    @Input() public trackY = true;
    @Input() public viewClass = '';
}
