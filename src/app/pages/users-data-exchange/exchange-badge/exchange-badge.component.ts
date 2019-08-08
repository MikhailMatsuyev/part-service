import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'app-exchange-badge',
    templateUrl: './exchange-badge.component.html',
    styleUrls: ['./exchange-badge.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExchangeBadgeComponent {
    @Input() public text: string;
}
