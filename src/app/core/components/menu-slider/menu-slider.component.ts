import { Component, ChangeDetectionStrategy, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'app-menu-slider',
    templateUrl: './menu-slider.component.html',
    styleUrls: ['./menu-slider.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppMenuSliderComponent {
    @HostBinding('style.width.px') @Input() public hoverElemWidth: number;
    @HostBinding('style.left.px') @Input() public navElemLeft: number;
}
