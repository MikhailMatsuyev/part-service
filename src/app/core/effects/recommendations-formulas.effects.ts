import { EffectError } from './user-factors.effects';
import { exhaustMap, catchError, map, switchMap } from 'rxjs/operators';
import {
  RecommendationsFormulasActionTypes,
  GetFormulasSuccess,
  SetFormulasSort,
  GetDropdownCSSuccess,
  GetDropdownUFSuccess,
  SetFormulaSuccess,
  EnableFormulasSuccess,
  GetFormulas,
  VerifyFormulaValueUFSuccess,
  DownloadFormulasSuccess,
  VerifyFormulaValueCSSuccess
} from './../store/recommendations-formulas/recommendations-formulas.actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { RecommendationsFormulasService } from '@core/services/recommendations-formulas.service';
import { of, from } from 'rxjs';
import { Injectable } from '@angular/core';
import * as AppLayout from '@store/app-layout';

@Injectable()
export class RecommendationsFormulasEffects {
  constructor(
    public actions$: Actions,
    private recommendationsFormulasService: RecommendationsFormulasService
  ) {
  }

  @Effect() public getFormulas$ = this.actions$
    .pipe(
      ofType(RecommendationsFormulasActionTypes.GET_FORMULAS),
      exhaustMap(() => this.recommendationsFormulasService.getFormulas()
          .pipe(
              exhaustMap((item: FormulaResponseModel[]) => from([
                new GetFormulasSuccess(item),
                new SetFormulasSort(null)
              ])),
              catchError(() => of(new EffectError()))
          )
      )
    );

  @Effect() public setFormula$ = this.actions$
    .pipe(
      ofType(RecommendationsFormulasActionTypes.SET_FORMULA),
      switchMap(({ payload }: IUnsafeAction) => this.recommendationsFormulasService.setFormula(payload).pipe(
          map(() => payload.editFromDialog ? new GetFormulas() : new SetFormulaSuccess(null)),
          catchError(({error: {Message}}) => of(
            new AppLayout.CreateLocalNotificaitonAction({type: 'danger', text: Message})
          )
        ))
      ),
    );

  @Effect() public getDropdownCS$ = this.actions$
    .pipe(
      ofType(RecommendationsFormulasActionTypes.GET_DROPDOWN_CS),
      exhaustMap(() => this.recommendationsFormulasService.getDropdownCS()
          .pipe(
              map(item => new GetDropdownCSSuccess(item)),
              catchError(() => of(new EffectError()))
          )
      )
    );

  @Effect() public getDropdownUF$ = this.actions$
    .pipe(
      ofType(RecommendationsFormulasActionTypes.GET_DROPDOWN_UF),
      exhaustMap(() => this.recommendationsFormulasService.getDropdownUF()
          .pipe(
              map(item => new GetDropdownUFSuccess(item)),
              catchError(() => of(new EffectError()))
          )
      )
    );

  @Effect() public deleteFormulas$ = this.actions$
    .pipe(
      ofType(RecommendationsFormulasActionTypes.DELETE_FORMULAS),
      exhaustMap(({ payload }: IUnsafeAction) => this.recommendationsFormulasService.deleteFormulas(payload)
          .pipe(
              map(() => new GetFormulas()),
              catchError(() => of(new EffectError()))
          )
      )
    );

  @Effect() public enableFormulas$ = this.actions$
    .pipe(
      ofType(RecommendationsFormulasActionTypes.ENABLE_FORMULAS),
      exhaustMap(({ payload }: IUnsafeAction) => this.recommendationsFormulasService.enableFormulas(payload)
          .pipe(
              map(item => new EnableFormulasSuccess(item)),
              catchError(() => of(new EffectError()))
          )
      )
    );

  @Effect() public valuesForVerifyUF$ = this.actions$
    .pipe(
      ofType(RecommendationsFormulasActionTypes.VERIFY_FORMULA_VALUE_UF),
      exhaustMap(({ payload }: IUnsafeAction) => this.recommendationsFormulasService.verifyFormulaValuesUF(payload)
        .pipe(
            map(item => new VerifyFormulaValueUFSuccess(item)),
            catchError(() => of(new EffectError()))
        )
      )
    );

  @Effect() public valuesForVerifyCS$ = this.actions$
    .pipe(
      ofType(RecommendationsFormulasActionTypes.VERIFY_FORMULA_VALUE_CS),
      exhaustMap(({ payload }: IUnsafeAction) => this.recommendationsFormulasService.verifyFormulaValuesCS(payload.csId, payload.ufId)
        .pipe(
            map(item => new VerifyFormulaValueCSSuccess(item)),
            catchError(() => of(new EffectError()))
        )
      )
    );

  @Effect() public downloadXLSX$ = this.actions$
    .pipe(
      ofType(RecommendationsFormulasActionTypes.DOWNLOAD_FORMULAS),
      exhaustMap(() => this.recommendationsFormulasService.downloadXLSX()
          .pipe(
              map(() => new DownloadFormulasSuccess()),
              catchError(() => of(new EffectError()))
          )
      )
    );
}
