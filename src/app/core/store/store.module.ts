import { NgModule } from '@angular/core';
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UniterReducers, UniterActions, UniterState } from './reducers';
import { environment } from '../../../environments/environment';

const optionalImports = [];

export function logger(reducer: ActionReducer<UniterState>): ActionReducer<UniterState> {
    return function (state: UniterState, action: any): UniterState {
        console.log('state', state);
        console.log('action', action);
        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<UniterState>[] = !environment.production
    ? [logger]
    : [];

if (!environment.production) {
    optionalImports.push(StoreDevtoolsModule.instrument({
        maxAge: 25
    }));
}

@NgModule({
    imports: [
        StoreModule.forRoot(UniterReducers, { metaReducers }),
        ...optionalImports,
    ],
    providers: [
        ...UniterActions,
    ],
})
export class CoreStoreModule {}
