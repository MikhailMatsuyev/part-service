import {
    Component,
    Inject,
    OnInit,
    ViewChild,
    ElementRef,
    AfterViewInit,
    Renderer2,
    NgZone,
    OnDestroy
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ResizeEvent } from 'angular-resizable-element';
import { InfoService } from '../../../services/info.service';
import { pluck } from 'rxjs/operators';
import { AppConfig } from '../../../../app.config';
import { InfoType } from '../../../models/generic';

const MIN_DIMENSIONS_PX = 50;
const MAX_DIMENSIONS_PX = 170;

@Component({
    selector: 'app-additional-information',
    templateUrl: './additional-information.component.html',
    styleUrls: [
        '../new-group/new-group.component.sass',
        './additional-information.component.scss'
    ]
})
export class AdditionalInformationComponent implements OnInit, AfterViewInit, OnDestroy {
    public style: object = {};
    public fileNames: any[];
    public textArea = '';
    public textLength = 0;
    public maxLength = 2500;
    public maxfileSize = 2097152; // 2mb
    public fileFailed = false;
    @ViewChild('textarea') public textarea: ElementRef;
    private listenerFn: any;

    constructor(
        public dialogRef: MatDialogRef<AdditionalInformationComponent>,
        private readonly infoService: InfoService,
        private readonly appConfig: AppConfig,
        private readonly zone: NgZone,
        private readonly renderer: Renderer2,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    public ngOnInit(): void {
        this.infoService.getInformation(this.data)
            .pipe(
                pluck('data')
            )
            .subscribe(({ info: { text, files} }) => {
                this.fileNames = files;
                this.textArea = text || '';
                this.textLength = text ? text.length : 0;
            });
    }

    public ngAfterViewInit(): void {
        this.zone.runOutsideAngular(() => {
            this.listenerFn = this.renderer.listen(
                this.textarea.nativeElement,
                'keydown',
                this.onKeyUp
            );
        });
    }

    public ngOnDestroy(): void {
        this.listenerFn();
    }

    public validate({ rectangle: { height } }: ResizeEvent): boolean {
        return height && height > MIN_DIMENSIONS_PX && height < MAX_DIMENSIONS_PX;
    }

    public onPaste(event: ClipboardEvent): void {
        const length = (this.maxLength - this.textLength);
        const calulateLength = length >= 0 ? length : 0;
        this.textArea = this.textArea.concat(event.clipboardData.getData('text/plain').slice(0, calulateLength));
        this.textLength = this.textArea.length;
        event.preventDefault();
    }

    public onChange(value: any): void {
        this.textLength = value.length;
    }

    public onKeyUp = (event: KeyboardEvent): void => {
        const codes = event.which === 8 || (event.ctrlKey && (event.keyCode === 86 || event.keyCode === 67 || event.keyCode === 65));

        if (this.textArea.length >= this.maxLength && !codes) {
            event.preventDefault();
        }

    }

    public getIcon(fileUrl: string = ''): string {
        return `${this.appConfig.apiUrl}${fileUrl}`;
    }

    public onResizeEnd({ rectangle: { height }}: ResizeEvent): void {
        this.style = {
            height: `${height}px`
        };
    }

    public handleOnFileSelected(dataFile: FileList, target: HTMLInputElement): void {
        const fileUpload = dataFile.item(0);

        if (!fileUpload) {
            target.value = '';
            return;
        }

        if (this.maxfileSize < fileUpload.size) {
            this.fileFailed = true;
            setTimeout(() => this.fileFailed = false, 2000);
            target.value = '';
            return;
        }

        if (this.fileNames) {
            const isMaxImage = this.fileNames.filter(item => item.type === InfoType.Image).length >= 6
                && fileUpload.type.includes('image');
            const isMaxPdf = this.fileNames.filter(item => item.type === InfoType.Pdf).length >= 1
                && fileUpload.type === 'application/pdf';

            if ((isMaxImage || isMaxPdf) && this.fileNames.length <= 7) {
                target.value = '';
                return;
            }
        }

        const { id, level } = this.data;
        const formData: FormData = new FormData();
        formData.append('id', id);
        formData.append('level', level);
        formData.append('files', fileUpload, fileUpload.name);
        this.infoService.uploadFiles(formData)
            .subscribe(item => {
                this.fileNames = this.fileNames ? [...this.fileNames, ...item] : item;
            });
    }

    public handleClick(data: HTMLElement): void {
        data.click();
    }

    public removeFile(id: number): void {
        this.fileNames = this.fileNames.filter(({ id: fileId }) => fileId !== id);
    }

    public handleSave(): void {
        const { level, id } = this.data;
        const data = {
            text: this.textArea,
            type: level,
            id,
            fileIds: this.fileNames && this.fileNames.map(item => item.id)
        };
        this.infoService.saveInformation(data)
            .subscribe(() => {
                this.dialogRef.close();
            });
    }

    public onNoClick(): void {
        this.infoService.сancelInformation({ id: this.data.id, level: this.data.level })
            .subscribe(() => {
                this.dialogRef.close();
            });
    }
}
