import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'app-cards-tree',
    templateUrl: './cards-tree.component.html',
    styleUrls: ['./cards-tree.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsTreeComponent {
    @Input() public headerName = 'Groupe name';
}
