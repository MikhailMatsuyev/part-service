import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UniterState } from '@store/reducers';
import * as AppLayout from '@store/app-layout';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

    constructor(
        private readonly store: Store<UniterState>,
        private readonly titleService: Title
    ) { }

    public ngOnInit(): void {
        this.store.select(AppLayout.getProjectInfo)
            .subscribe(({ titlePage }) => {
                this.setTitle(titlePage);
            });
        this.store.dispatch(new AppLayout.GetTitleAction());
    }

    private setTitle(title: string): void {
        this.titleService.setTitle(title);
    }
}
