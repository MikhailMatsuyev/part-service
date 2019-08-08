import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-project-modal',
    templateUrl: './project-modal.component.html',
    styleUrls: [
        './project-modal.component.sass',
        '../combine-elements/combine-elements.component.scss',
    ]
})
export class ProjectModalComponent implements OnInit {
    public forms: FormGroup;
    constructor(
        public dialogRef: MatDialogRef<ProjectModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private readonly fb: FormBuilder
    ) { }

    public ngOnInit(): void {
        const { projectInfo: { titlePage, projectName } } = this.data;
        this.forms = this.fb.group({
            projectName: [projectName || '', Validators.required],
            titlePage: [titlePage || '', Validators.required],
        });
    }

    public onNoClick(value: boolean): void {
        this.dialogRef.close(value);
    }

    public confirm(): void {
        this.dialogRef.close(this.forms.value);
    }
}
