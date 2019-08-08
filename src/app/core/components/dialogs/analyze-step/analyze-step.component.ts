import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-analyze-step',
    templateUrl: './analyze-step.component.html',
    styleUrls: [
        '../combine-elements/combine-elements.component.scss',
        './analyze-step.component.sass'
    ],
})
export class AnalyzeStepComponent implements OnInit {
    public blockers: any = null;

    constructor(
        public dialogRef: MatDialogRef<AnalyzeStepComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

    public get interfaceBlock(): any {
        return this.data.analyzeData.interfaceBlock;
    }

    public ngOnInit(): void {
        this.analyzeDataInterfaceBlock();
    }

    public onNoClick(value: boolean): void {
        this.dialogRef.close(value);
    }

    public getText(interfaces: any): string {
        const elements = interfaces.element || '';
        const child = interfaces.child || '';
        return child ? `${elements}, ${child}` : elements + child;
    }

    public analyzeDataInterfaceBlock(): any {
        if (this.interfaceBlock.blockers && this.interfaceBlock.blockers.length > 0) {
            this.blockers = {
                data: this.interfaceBlock.blockers,
                message: 'Blocked due to the next Interfaces'
            };
        } else if (this.interfaceBlock.compatibleComps && this.interfaceBlock.compatibleComps.length > 0) {
            this.blockers = {
                data: this.interfaceBlock.compatibleComps,
                message: 'There are no possible components for interface\'s connections'
            };
        } else if (this.interfaceBlock.notCompatibleBasedComps && this.interfaceBlock.notCompatibleBasedComps.length > 0) {
            this.blockers = {
                data: this.interfaceBlock.notCompatibleBasedComps,
                message: 'Based components are not compatible via interface\'s connections'
            };
        } else if (this.interfaceBlock.blockingRelatedComps && this.interfaceBlock.blockingRelatedComps.length > 0) {
            this.blockers = {
                data: this.interfaceBlock.blockingRelatedComps,
                message: 'Blocked due related components'
            };
        }
    }
}
