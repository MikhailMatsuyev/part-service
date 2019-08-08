import { createSelector } from 'reselect';
import { UniterState } from '../reducers';

export const getRecommendationsCalculations = (state: UniterState) => state.recommendationsCalculations;
export const getComponentSeries = createSelector(getRecommendationsCalculations, ({ componentSeries }) => componentSeries);
export const getUserFactor = createSelector(getRecommendationsCalculations, ({ userFactor }) => userFactor);
export const getValuesWithStatus = createSelector(getRecommendationsCalculations, ({ valuesWithStatus }) => valuesWithStatus);
export const getDimensionsRecommendation = createSelector(getRecommendationsCalculations,
    ({ dimensionsRecommendation }) => dimensionsRecommendation
);
export const getRecommendationView = createSelector(getRecommendationsCalculations, ({ recommendationView }) => recommendationView);
export const getActiveComponentSeries = createSelector(getRecommendationsCalculations,
    ({ isActiveComponentSeries }) => isActiveComponentSeries
);

export const getActiveUserFactor = createSelector(getRecommendationsCalculations,
    ({ isActiveUserFactor }) => isActiveUserFactor
);
export const getValuesWithStatusCS = createSelector(getValuesWithStatus, ({ cs }) => cs);
export const getValuesWithStatusUF = createSelector(getValuesWithStatus, ({ uf }) => uf);
export const getLastChangesText = createSelector(getRecommendationsCalculations, ({ textChanges }) => textChanges);

export const getActiveComponentStep = createSelector(getRecommendationsCalculations,
    ({ activeComponentStep }) => activeComponentStep
);

export const getActiveUserFactorStep = createSelector(getRecommendationsCalculations,
    ({ activeUserFactorStep }) => activeUserFactorStep
);

export const getTableCount = createSelector(getRecommendationsCalculations,
    ({ rowFirst, colFirst }) => ({rowFirst, colFirst})
);

export const getUpdateStatus = createSelector(getRecommendationsCalculations,
    ({ statusCalculate }) => statusCalculate
);
