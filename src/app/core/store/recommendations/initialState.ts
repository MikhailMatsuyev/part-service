import { RecommendationsState } from './recommendations.reducer';

export const initialState: RecommendationsState = {
    componentSeries: [],
    userFactor: [],
    valuesWithStatus: {
        cs: [],
        uf: []
    },
    dimensionsRecommendation: null,
    recommendationView: null,
    isActiveComponentSeries: null,
    isActiveUserFactor: null,
    textChanges: null,
    activeComponentStep: null,
    activeUserFactorStep: null,
    rowFirst: 1,
    colFirst: 1,
    exportTableModel: {
        viewType: 1,
        ufId: -1,
        csId: -1,
        rowsTotal: Number.MAX_SAFE_INTEGER,
        rowsToLoad: Number.MAX_SAFE_INTEGER,
        rowFirst: 1,
        colsToLoad: 11,
        colsTotal: 11,
        colFirst: 1,
        steps: {
            cs: [],
            uf: []
        }
    },
    statusCalculate: null,
    recommendationTypes: [
        {
            type: RecommendationsType.rec,
            name: 'Recommended',
            isActive: false
        },
        {
            type: RecommendationsType.pos,
            name: 'Possible',
            isActive: false
        },
        {
            type: RecommendationsType.imp,
            name: 'Not possible',
            isActive: false
        }
    ],
    performancesList: [],
    activeComment: null,
    isActiveTable: false,
    isSwapHeaders: null
};
