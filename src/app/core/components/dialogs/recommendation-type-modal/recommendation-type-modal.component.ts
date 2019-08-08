import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { UniterState } from '@core/store/reducers';
import * as Recommendations from '@store/recommendations';

@Component({
    selector: 'app-recommendation-type',
    templateUrl: './recommendation-type-modal.component.html',
    styleUrls: [
        './recommendation-type-modal.component.sass',
        '../combine-elements/combine-elements.component.scss',
    ]
})
export class RecommendationTypeModalComponent implements OnInit {
    public recomendationTypes$ = this.store.pipe(select(Recommendations.getRecommendationTypes));

    constructor(
        public dialogRef: MatDialogRef<RecommendationTypeModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private readonly store: Store<UniterState>
    ) { }

    public ngOnInit(): void {
        this.store.dispatch(new Recommendations.GetDefaultRecommendationType());
    }

    public confirm(): void {
        this.store.dispatch(new Recommendations.UpdateDefaultRecommendationType());
        this.dialogRef.close();
    }

    public onNoClick(value: boolean): void {
        this.dialogRef.close(value);
    }

    public changeType(recomendation: any): void {
        this.store.dispatch(new Recommendations.SetDefaultRecommendationType(recomendation));
    }

    public trackByFn(index: number, item: any): number {
        return item.type;
    }
}
