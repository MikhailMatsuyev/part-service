import { SelectionState } from './selection.reducer';
import { guuid } from './util';

export const initialState: SelectionState = {
    userFactorTree: [],
    specifications: [],
    activeSpecification: null,
    specficationsName: [],
    categoryNames: [],
    performances: [],
    showAll: false,
    performanceFilters: Array(3).fill({
        direction: false,
        position: null,
        performance: ''
    }).map(item => ({ ...item, id: guuid() })),
    autoReload: JSON.parse(localStorage.getItem('autoReload')) || false,
    isActiveReloadedBlock: false,
    orderingKey: false,
    activeInfo: null,
    componentTree: [],
    activeFormula: null,
    csSpinner: false,
    ufSpinner: false,
    orderingKeyModel: null,
    activeSteps: [],
    impossibleComponents: null,
    availableUserFactor: null
};
