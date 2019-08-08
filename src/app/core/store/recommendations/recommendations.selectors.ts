import { createSelector } from 'reselect';
import { UniterState } from '../reducers';

export const getRecommendations = (state: UniterState) => state.recommendations;
export const getComponentSeries = createSelector(getRecommendations, ({ componentSeries }) => componentSeries);
export const getUserFactor = createSelector(getRecommendations, ({ userFactor }) => userFactor);
export const getValuesWithStatus = createSelector(getRecommendations, ({ valuesWithStatus }) => valuesWithStatus);
export const getDimensionsRecommendation = createSelector(getRecommendations,
    ({ dimensionsRecommendation }) => dimensionsRecommendation
);
export const getRecommendationView = createSelector(getRecommendations, ({ recommendationView }) => recommendationView);
export const getActiveComponentSeries = createSelector(getRecommendations,
    ({ isActiveComponentSeries }) => isActiveComponentSeries
);

export const getActiveUserFactor = createSelector(getRecommendations,
    ({ isActiveUserFactor }) => isActiveUserFactor
);
export const getValuesWithStatusCS = createSelector(getValuesWithStatus, ({ cs }) => cs);
export const getValuesWithStatusUF = createSelector(getValuesWithStatus, ({ uf }) => uf);
export const getLastChangesText = createSelector(getRecommendations, ({ textChanges }) => textChanges);

export const getActiveComponentStep = createSelector(getRecommendations,
    ({ activeComponentStep }) => activeComponentStep
);

export const getActiveUserFactorStep = createSelector(getRecommendations,
    ({ activeUserFactorStep }) => activeUserFactorStep
);

export const getTableCount = createSelector(getRecommendations,
    ({ rowFirst, colFirst }) => ({rowFirst, colFirst})
);

export const getUpdateStatus = createSelector(getRecommendations,
    ({ statusCalculate }) => statusCalculate
);

export const getRecommendationTypes = createSelector(getRecommendations,
    ({ recommendationTypes }) => recommendationTypes
);

export const getUserFactorSelected = createSelector(getUserFactor, item => item.filter((items: any) => items.isSelected));

export const getPerformanceList = createSelector(getRecommendations,
    ({ performancesList }) => performancesList
);

export const getActiveComment = createSelector(getRecommendations,
    ({ activeComment }) => activeComment
);

export const getSwapHeader = createSelector(getRecommendations,
    ({ isSwapHeaders }) => isSwapHeaders
);

