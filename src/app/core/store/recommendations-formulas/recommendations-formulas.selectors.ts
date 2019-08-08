import { UniterState } from './../reducers';
import { createSelector } from 'reselect';

export const getRecommendationsFormulas = (({ recommendationsFormulas }: UniterState) => recommendationsFormulas);
export const getRecomentadionsFormulasTableData = createSelector(getRecommendationsFormulas, ({ dataForTable }) => dataForTable);
export const getRecomentadionsFormulasSort = createSelector(getRecommendationsFormulas, ({ sort }) => sort);
export const getRecomentadionsFormulasDropdownCS = createSelector(getRecommendationsFormulas, ({ dropdownCS }) => dropdownCS);
export const getRecomentadionsFormulasDropdownUF = createSelector(getRecommendationsFormulas, ({ dropdownUF }) => dropdownUF);
export const getRecomentadionsFormulasValuesForValidateUF = createSelector(
    getRecommendationsFormulas,
    ({ valuesForValidateUF }) => valuesForValidateUF
);
export const getRecomentadionsFormulasValuesForValidateCS = createSelector(
    getRecommendationsFormulas,
    ({ valuesForValidateCS }) => valuesForValidateCS
);
export const getRecomentadionsFormulasSelections = createSelector(getRecommendationsFormulas, ({ selections }) => selections);
