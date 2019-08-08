import { RecommendationsFormulasActionTypes } from './recommendations-formulas.actions';
import { initialState } from './initialState';
import { Sort } from '@angular/material';
import { sortBy } from '@utils/utilsfunc';

export interface RecommendationsFormulasState {
  dataForTable: any[];
  initialDataForTable: any[];
  sort: Sort;
  dropdownCS: any[];
  dropdownUF: any[];
  valuesForValidateUF: any[];
  valuesForValidateCS: any[];
  selections: any[];
}

export function recommendationsFormulas(state = initialState, action: IUnsafeAction): RecommendationsFormulasState {
  const { type, payload } = action;

  switch (type) {
    case RecommendationsFormulasActionTypes.GET_FORMULAS_SUCCESS: {
      return {
        ...state,
        dataForTable: payload.reduce((acc, item) => [ ...acc, { ...item, oldCsId: item.csId, oldUfId: item.ufId }], []),
        initialDataForTable: payload
      };
    }

    case RecommendationsFormulasActionTypes.SET_FORMULAS_SORT: {
      const { dataForTable, initialDataForTable } = state;
      const currentSort = payload || initialState.sort;

      return {
        ...state,
        sort: currentSort,
        dataForTable: currentSort.direction
                        ? sortBy(dataForTable, currentSort.active, currentSort.direction === 'asc')
                        : initialDataForTable
      };
    }

    case RecommendationsFormulasActionTypes.RESET_VERIFY_FORMULAS: {
      return {
        ...state,
        valuesForValidateUF: initialState.valuesForValidateUF,
        valuesForValidateCS: initialState.valuesForValidateCS
      };
    }

    case RecommendationsFormulasActionTypes.VERIFY_FORMULA_VALUE_UF_SUCCESS: {
      return {
        ...state,
        valuesForValidateUF: payload
      };
    }

    case RecommendationsFormulasActionTypes.VERIFY_FORMULA_VALUE_CS_SUCCESS: {
      return {
        ...state,
        valuesForValidateCS: payload
      };
    }

    case RecommendationsFormulasActionTypes.SET_FORMULAS_SELECTIONS: {
      return {
        ...state,
        selections: payload
      };
    }

    case RecommendationsFormulasActionTypes.GET_DROPDOWN_CS_SUCCESS: {
      return {
        ...state,
        dropdownCS: payload
      };
    }

    case RecommendationsFormulasActionTypes.GET_DROPDOWN_UF_SUCCESS: {
      return {
        ...state,
        dropdownUF: payload
      };
    }

    default: {
      return state;
    }
  }
}
