import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { isFunction } from '@utils/utilsfunc';

export interface OnDestroy {
    readonly destroyed$?: Observable<boolean>;
    ngOnDestroy(): void;
}

export function Unsubscribe(destroyMethodName = 'ngOnDestroy') {
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {
        const originalDestroy = constructor.prototype[destroyMethodName];

        if (!isFunction(originalDestroy)) {
            console.warn(`${constructor.name} is using @Unsubscribe but does not implement ${destroyMethodName}`);
        }

        return class extends constructor {
            private _takeUntilDestroy$: Subject<boolean> = new Subject();

            public get destroyed$() {
                this._takeUntilDestroy$ = this._takeUntilDestroy$ || new Subject();
                return this._takeUntilDestroy$.asObservable();
            }

            public [destroyMethodName]() {
                if (isFunction(originalDestroy)) {
                    originalDestroy.apply(this, arguments);
                }

                this._takeUntilDestroy$.next(true);
                this._takeUntilDestroy$.complete();
            }
        };
    };
}

export const untilDestroyed = that => <T>(source: Observable<T>) => {
  if (!('destroyed$' in that)) {
    console.warn(`'destroyed$' property does not exist on ${that.constructor.name}. Did you decorate the class with '@Unsubscribe()'?`);
    return source;
  }

  return source.pipe(takeUntil<T>(that.destroyed$));
};
