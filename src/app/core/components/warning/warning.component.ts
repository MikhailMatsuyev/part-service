import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-warning',
    templateUrl: './warning.component.html',
    styleUrls: ['./warning.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WarningComponent {
}
