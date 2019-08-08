import { Action } from '@ngrx/store';
import { Sort } from '@angular/material';

export enum RecommendationsFormulasActionTypes {
    GET_FORMULAS = '[Recommendations Formulas] GET FORMULAS',
    GET_FORMULAS_SUCCESS = '[Recommendations Formulas] GET FORMULAS SUCCESS',
    SET_FORMULAS_SORT = '[Recommendations Formulas] SET FORMULAS SORT',
    SET_FORMULAS_SORT_SUCCESS = '[Recommendations Formulas] SET FORMULAS SORT SUCCESS',
    SET_FORMULAS_SELECTIONS = '[Recommendations Formulas] SET FORMULAS SELECTIONS',
    SET_FORMULAS_SELECTIONS_SUCCESS = '[Recommendations Formulas] SET FORMULAS SELECTIONS SUCCESS',
    GET_DROPDOWN_CS = '[Recommendations Formulas] GET DROPDOWN CS',
    GET_DROPDOWN_CS_SUCCESS = '[Recommendations Formulas] GET DROPDOWN CS SUCCESS',
    GET_DROPDOWN_UF = '[Recommendations Formulas] GET DROPDOWN UF',
    GET_DROPDOWN_UF_SUCCESS = '[Recommendations Formulas] GET DROPDOWN UF SUCCESS',
    SET_FORMULA = '[Recommendations Formulas] SET FORMULA',
    SET_FORMULA_SUCCESS = '[Recommendations Formulas] SET FORMULA SUCCESS',
    SET_FORMULA_FAILED = '[Recommendations Formulas] SET FORMULA FAILED',
    DELETE_FORMULAS = '[Recommendations Formulas] DELETE FORMULAS',
    DELETE_FORMULAS_SUCCESS = '[Recommendations Formulas] DELETE FORMULAS SUCCESS',
    ENABLE_FORMULAS = '[Recommendations Formulas] ENABLE FORMULAS',
    ENABLE_FORMULAS_SUCCESS = '[Recommendations Formulas] ENABLE FORMULAS SUCCESS',
    DOWNLOAD_FORMULAS = '[Recommendations Formulas] DOWNLOAD FORMULAS',
    DOWNLOAD_FORMULAS_SUCCESS = '[Recommendations Formulas] DOWNLOAD FORMULAS SUCCESS',
    VERIFY_FORMULA_VALUE_UF = '[Recommendations Formulas] VERIFY FORMULA VALUE UF',
    VERIFY_FORMULA_VALUE_UF_SUCCESS = '[Recommendations Formulas] VERIFY FORMULA VALUE UF SUCCESS',
    VERIFY_FORMULA_VALUE_CS = '[Recommendations Formulas] VERIFY FORMULA VALUE CS',
    VERIFY_FORMULA_VALUE_CS_SUCCESS = '[Recommendations Formulas] VERIFY FORMULA VALUE CS SUCCESS',
    RESET_VERIFY_FORMULAS = '[Recommendations Formulas] RESET VERIFY FORMULAS'
}

export class GetFormulas implements Action {
  readonly type = RecommendationsFormulasActionTypes.GET_FORMULAS;
}

export class GetFormulasSuccess implements Action {
  readonly type = RecommendationsFormulasActionTypes.GET_FORMULAS_SUCCESS;

  constructor(private payload: FormulaResponseModel[]) {}
}

export class SetFormulasSort implements Action {
  readonly type = RecommendationsFormulasActionTypes.SET_FORMULAS_SORT;

  constructor(private payload: Sort) {}
}

export class SetFormulasSortSuccess implements Action {
  readonly type = RecommendationsFormulasActionTypes.SET_FORMULAS_SORT_SUCCESS;

  constructor(private payload: Sort) {}
}

export class SetFormulasSelections implements Action {
  readonly type = RecommendationsFormulasActionTypes.SET_FORMULAS_SELECTIONS;

  constructor(private payload: FormulaResponseModel[]) {}
}

export class SetFormulasSelectionsSuccess implements Action {
  readonly type = RecommendationsFormulasActionTypes.SET_FORMULAS_SELECTIONS_SUCCESS;

  constructor(private payload: FormulaResponseModel[]) {}
}

export class GetDropdownCS implements Action {
  readonly type = RecommendationsFormulasActionTypes.GET_DROPDOWN_CS;
}

export class GetDropdownCSSuccess implements Action {
  readonly type = RecommendationsFormulasActionTypes.GET_DROPDOWN_CS_SUCCESS;

  constructor(private payload: any[]) {}
}

export class GetDropdownUF implements Action {
  readonly type = RecommendationsFormulasActionTypes.GET_DROPDOWN_UF;
}

export class GetDropdownUFSuccess implements Action {
  readonly type = RecommendationsFormulasActionTypes.GET_DROPDOWN_UF_SUCCESS;

  constructor(private payload: any[]) {}
}

export class SetFormula implements Action {
  readonly type = RecommendationsFormulasActionTypes.SET_FORMULA;

  constructor(private payload: FormulaEditModel | any) {}
}

export class SetFormulaSuccess implements Action {
  readonly type = RecommendationsFormulasActionTypes.SET_FORMULA_SUCCESS;

  constructor(private payload: FormulaEditModel | any) {}
}

export class SetFormulaFailed implements Action {
  readonly type = RecommendationsFormulasActionTypes.SET_FORMULA_FAILED;

  constructor(private payload: any) {}
}

export class DeleteFormulas implements Action {
  readonly type = RecommendationsFormulasActionTypes.DELETE_FORMULAS;

  constructor(private payload: FormIdentityModel[]) {}
}

export class DeleteFormulasSuccess implements Action {
  readonly type = RecommendationsFormulasActionTypes.DELETE_FORMULAS_SUCCESS;

  constructor(private payload: FormIdentityModel[]) {}
}

export class EnableFormulas implements Action {
  readonly type = RecommendationsFormulasActionTypes.ENABLE_FORMULAS;

  constructor(private payload: EnableFormulaModel) {}
}

export class EnableFormulasSuccess implements Action {
  readonly type = RecommendationsFormulasActionTypes.ENABLE_FORMULAS_SUCCESS;

  constructor(private payload: EnableFormulaModel) {}
}

export class DownloadFormulas implements Action {
  readonly type = RecommendationsFormulasActionTypes.DOWNLOAD_FORMULAS;
}

export class DownloadFormulasSuccess implements Action {
  readonly type = RecommendationsFormulasActionTypes.DOWNLOAD_FORMULAS_SUCCESS;
}

export class VerifyFormulaValueUF implements Action {
  readonly type = RecommendationsFormulasActionTypes.VERIFY_FORMULA_VALUE_UF;

  constructor(private payload: number) {}
}

export class VerifyFormulaValueUFSuccess implements Action {
  readonly type = RecommendationsFormulasActionTypes.VERIFY_FORMULA_VALUE_UF_SUCCESS;

  constructor(private payload: any) {}
}

export class VerifyFormulaValueCS implements Action {
  readonly type = RecommendationsFormulasActionTypes.VERIFY_FORMULA_VALUE_CS;

  constructor(private payload: FormIdentityModel) {}
}

export class VerifyFormulaValueCSSuccess implements Action {
  readonly type = RecommendationsFormulasActionTypes.VERIFY_FORMULA_VALUE_CS_SUCCESS;

  constructor(private payload: any) {}
}

export class ResetVerifyFormulas implements Action {
  readonly type = RecommendationsFormulasActionTypes.RESET_VERIFY_FORMULAS;
}
