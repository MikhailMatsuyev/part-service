import { createSelector } from 'reselect';
import { UniterState } from '../reducers';

export const getStateInterfacesSteps = (state: UniterState) => state.interfacesSteps;
export const getInterfaceValuesSelector = createSelector(getStateInterfacesSteps, ({ stateISInterfaceValues }) => stateISInterfaceValues);
export const getInterfaceValueChoosedSelector = createSelector(getStateInterfacesSteps,
    ({ stateISInterfaceValueChoosed }) => stateISInterfaceValueChoosed
);
export const getComponentValuesSelector = createSelector(getStateInterfacesSteps, ({ stateISComponentValues }) => stateISComponentValues);
export const getComponentValueChoosedSelector = createSelector(getStateInterfacesSteps,
    ({ stateISComponentValueChoosed }) => stateISComponentValueChoosed
);
export const getComponentStepValues = createSelector(getStateInterfacesSteps,
    ({ stateISComponentStepValues }) => stateISComponentStepValues
);
export const getComponentStepValuesChoosed = createSelector(getStateInterfacesSteps,
    ({ stateISComponentStepValuesChoosed }) => stateISComponentStepValuesChoosed
);
export const getDirectionSortSelector = createSelector(getStateInterfacesSteps, ({ stateDirectionSort }) => stateDirectionSort);
export const getDirectionSortComponentSelector = createSelector(getStateInterfacesSteps,
    ({ stateDirectionSortComponent }) => stateDirectionSortComponent
);
export const getInterfaceStepValuesSelector = createSelector(getStateInterfacesSteps,
    ({ stateInterfaceStepValues }) => stateInterfaceStepValues
);
export const getInterfaceStepValuesConnectSelector = createSelector(getStateInterfacesSteps,
    ({ stateInterfaceStepValuesConnect }) => stateInterfaceStepValuesConnect
);
export const getTrueCheckboxesComponentStepSelector = createSelector(getStateInterfacesSteps,
    ({ stateTrueCheckboxesComponentStep }) => stateTrueCheckboxesComponentStep
);
