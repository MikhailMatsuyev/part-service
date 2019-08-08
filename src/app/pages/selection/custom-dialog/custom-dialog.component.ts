import {
    Component,
    ChangeDetectionStrategy,
    Input,
    EventEmitter,
    Output
} from '@angular/core';
import { AppConfig } from '../../../app.config';

@Component({
    selector: 'app-custom-dialog',
    templateUrl: './custom-dialog.component.html',
    styleUrls: ['./custom-dialog.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppCustomDialogComponent {
    @Input() public data: any;
    @Output() public closeDialogWindow = new EventEmitter<void>();

    constructor(private readonly appConfig: AppConfig) {}

    public closeDialog(): void {
        this.closeDialogWindow.emit();
    }

    public getIcon(fileUrl: string = ''): string {
        return `${this.appConfig.apiUrl}${fileUrl}`;
    }

    public trackByFn(index: number, item: SelectionFileName): number {
        return item.id;
    }
}
