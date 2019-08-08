import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-wiki',
    templateUrl: './wiki.component.html',
    styleUrls: ['./wiki.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WikiComponent { }
