import { Action } from '@ngrx/store';

export enum InterfacesStepsActionTypes {
    SET_IS_INTERFACE_VALUES                 = '[InterfaceSteps] SET_IS_INTERFACE_VALUES',
    SET_IS_INTERFACE_VALUES_SUCCESS         = '[InterfaceSteps] SET_IS_INTERFACE_VALUES_SUCCESS',
    SET_IS_INTERFACE_VALUES_CHOOSED         = '[InterfaceSteps] SET_IS_INTERFACE_VALUES_CHOOSED',
    SET_IS_INTERFACE_VALUES_CHOOSED_SUCCESS = '[InterfaceSteps] SET_IS_INTERFACE_VALUES_CHOOSED_SUCCESS',
    SET_IS_COMPONENT_VALUES                 = '[InterfaceSteps] SET_IS_COMPONENT_VALUES',
    SET_IS_COMPONENT_VALUE_CHOOSED          = '[InterfaceSteps] SET_IS_COMPONENT_VALUE_CHOOSED',
    SET_IS_COMPONENT_VALUE_CHOOSED_SUCCESS  = '[InterfaceSteps] SET_IS_COMPONENT_VALUE_CHOOSED_SUCCESS',
    SET_IS_COMPONENT_STEP_VALUES            = '[InterfaceSteps] SET_IS_COMPONENT_STEP_VALUES',
    SET_IS_ACTIVE_ONE_COMPONENT_STEP_VALUE  = '[InterfaceSteps] SET_IS_ACTIVE_ONE_COMPONENT_STEP_VALUE',
    SET_IS_INTERFACE_TABLE_SORTING          = '[InterfaceSteps] SET_IS_INTERFACE_TABLE_SORTING',
    SET_IS_COMPONENT_TABLE_SORTING          = '[InterfaceSteps] SET_IS_COMPONENT_TABLE_SORTING',
    SET_IS_INTERFACE_STEP_VALUES            = '[InterfaceSteps] SET_IS_INTERFACE_STEP_VALUES',
    SET_IS_INTERFACE_STEP_VALUES_CONNECT    = '[InterfaceSteps] SET_IS_INTERFACE_STEP_VALUES_CONNECT',
    SET_IS_INTERFACE_STEP_VALUES_CONNECT_SUCCESS = '[InterfaceSteps] SET_IS_INTERFACE_STEP_VALUES_CONNECT_SUCCESS',
    SET_MODAL_ONE_ITEM_CHECKED              = '[InterfaceSteps] SET_MODAL_ONE_ITEM_CHECKED',
    SET_MODAL_SAVE_ITEMS_CHECKED            = '[InterfaceSteps] SET_MODAL_SAVE_ITEMS_CHECKED',
    SET_IS_COMPONENT_STEP_TRUE_CHECK_BOXES  = '[InterfaceSteps] SET_IS_COMPONENT_STEP_TRUE_CHECK_BOXES',
    SET_IS_FALSE_ALL_COMPONENT_STEP_VALUE   = '[InterfaceSteps] SET_IS_FALSE_ALL_COMPONENT_STEP_VALUE'
}

export class SetISInterfaceValues implements Action {
    readonly type = InterfacesStepsActionTypes.SET_IS_INTERFACE_VALUES;
}

export class SetISInterfaceValuesSuccess implements Action {
    readonly type = InterfacesStepsActionTypes.SET_IS_INTERFACE_VALUES_SUCCESS;
    constructor(public payload: any[]) { }
}

export class SetISInterfaceValueChoosed implements Action {
    readonly type = InterfacesStepsActionTypes.SET_IS_INTERFACE_VALUES_CHOOSED;
    constructor(public payload: number) { }
}

export class SetISInterfaceValueChoosedSuccess implements Action {
    readonly type = InterfacesStepsActionTypes.SET_IS_INTERFACE_VALUES_CHOOSED_SUCCESS;
    constructor(public payload: any[]) { }
}

export class SetISComponentValues implements Action {
    readonly type = InterfacesStepsActionTypes.SET_IS_COMPONENT_VALUES;
    constructor(public payload: any[]) { }
}

export class SetISComponentValueChoosed implements Action {
    readonly type = InterfacesStepsActionTypes.SET_IS_COMPONENT_VALUE_CHOOSED;
    constructor(public payload: number) { }
}

export class SetISComponentValueChoosedSuccess implements Action {
    readonly type = InterfacesStepsActionTypes.SET_IS_COMPONENT_VALUE_CHOOSED_SUCCESS;
    constructor(public payload: number) { }
}

export class SetISComponentStepValues implements Action {
    readonly type = InterfacesStepsActionTypes.SET_IS_COMPONENT_STEP_VALUES;
    constructor(public payload: any[]) { }
}

export class SetISActiveOneComponentStepValue implements Action {
    readonly type = InterfacesStepsActionTypes.SET_IS_ACTIVE_ONE_COMPONENT_STEP_VALUE;
    constructor(public payload: any[]) { }
}

export class SetISFalseAllComponentStepValue implements Action {
    readonly type = InterfacesStepsActionTypes.SET_IS_FALSE_ALL_COMPONENT_STEP_VALUE;
    constructor(public payload: any[]) { }
}

export class SetISInterfaceTableSorting implements Action {
    readonly type = InterfacesStepsActionTypes.SET_IS_INTERFACE_TABLE_SORTING;
}

export class SetISComponentTableSorting implements Action {
    readonly type = InterfacesStepsActionTypes.SET_IS_COMPONENT_TABLE_SORTING;
}

export class SetISInterfaceStepValues implements Action {
    readonly type = InterfacesStepsActionTypes.SET_IS_INTERFACE_STEP_VALUES;
    constructor(public payload: any[]) { }
}

export class SetISInterfaceStepValuesConnect implements Action {
    readonly type = InterfacesStepsActionTypes.SET_IS_INTERFACE_STEP_VALUES_CONNECT;
}

export class SetISInterfaceStepValuesConnectSuccess implements Action {
    readonly type = InterfacesStepsActionTypes.SET_IS_INTERFACE_STEP_VALUES_CONNECT_SUCCESS;
    constructor(public payload: any[]) { }
}

export class SetModalOneItemChecked implements Action {
    readonly type = InterfacesStepsActionTypes.SET_MODAL_ONE_ITEM_CHECKED;
    constructor(public payload: { checked: boolean, id: number }) { }
}

export class SetModalSaveItemsChecked implements Action {
    readonly type = InterfacesStepsActionTypes.SET_MODAL_SAVE_ITEMS_CHECKED;
}

export class SetISComponentStepTrueCheckBoxes implements Action {
    readonly type = InterfacesStepsActionTypes.SET_IS_COMPONENT_STEP_TRUE_CHECK_BOXES;
    constructor(public payload: any[]) { }
}

export type InterfacesStepsActions =
    | SetISInterfaceValuesSuccess
    | SetISInterfaceValues
    | SetISInterfaceValueChoosed
    | SetISInterfaceValueChoosedSuccess
    | SetISComponentValueChoosed
    | SetISComponentValueChoosedSuccess
    | SetISComponentValues
    | SetISComponentStepValues
    | SetISActiveOneComponentStepValue
    | SetISInterfaceTableSorting
    | SetISComponentTableSorting
    | SetISInterfaceStepValues
    | SetISInterfaceStepValuesConnect
    | SetISInterfaceStepValuesConnectSuccess
    | SetModalOneItemChecked
    | SetISComponentStepTrueCheckBoxes;
