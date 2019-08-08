import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { UniterState } from '@store/reducers';
import * as Auth from '@store/auth';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
    public form: FormGroup;
    public isActiveGuestMode$ = this.store.pipe(select(Auth.getIsActiveGuestMode));

    constructor(
        private readonly fb: FormBuilder,
        private readonly store: Store<UniterState>
    ) { }

    public ngOnInit(): void {
        this.form = this.fb.group({
            userName: ['', Validators.required],
            password: ['', Validators.required],
        });
        this.store.dispatch(new Auth.CheckLoginGuest());
    }

    public login(isGuest: boolean): void {
        this.store.dispatch(new Auth.Login({...this.form.value, isGuest}));
    }

    public onSubmit({ value }: { value: any }) {
        this.store.dispatch(new Auth.Login({...value, isGuest: false}));
    }
}
