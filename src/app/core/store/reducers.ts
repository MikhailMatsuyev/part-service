import { RecommendationsFormulasState, recommendationsFormulas } from './recommendations-formulas/recommendations-formulas.reducer';
import { UsersState, users } from '@core/store/users/users.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { appLayout, AppLayoutActions, IAppSettings } from '@core/store/app-layout';
import { auth, AuthState } from '@core/store/auth';
import * as fromRouter from '@ngrx/router-store';
import { Params } from '@angular/router';
import { SelectionState, selection } from '@core/store/selection';
import { userFactors } from '@core/store/user-factors';
import { components } from '@core/store/component-elems';
import { interfaces } from '@core/store/interfaces';
import { UserValuesState, userValues } from '@core/store/user-values';
import { ComponentValuesState, componentValues } from '@core/store/component-values';
import { AppSettingsState, appSettings } from '@core/store/app-settings';
import { ComponentConnectionsState, componentConnections } from '@core/store/component-connections';
import { InterfaceConnectionsState, interfaceConnections } from '@core/store/interfaces-connections';
import { ComponentPerformanceState, componentPerformance } from '@core/store/component-performance';
import { AdvancedEditorState, advancedEditor } from '@core/store/advanced-editor';
import { UsersDataExchangeState, usersDataExchange } from '@core/store/users-data-exchange';
import { UserFactorConnectionsState, userFactorConnections } from '@core/store/user-connections';
import { StepsScopesState, stepsScopes } from '@core/store/steps-scopes';
import { usersSettings, UsersSettingsState } from '@core/store/users-settings';
import { recommendationsCalculations, RecommendationsCalculationsState } from '@core/store/recommendations-calculations';
import { TypeKeySettingsState, typeKeySettings } from '@core/store/type-key-settings';
import { recommendations, RecommendationsState } from '@core/store/recommendations';
import { AnalyzeState, analyze } from '@core/store/analyze';
import { InterfacesStepsState, interfacesSteps } from '@core/store/interfaces-steps';


export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export interface UniterState {
  appSettings: AppSettingsState;
  appLayout: IAppSettings;
  auth: AuthState;
  typeKeySettings: TypeKeySettingsState;
  router: fromRouter.RouterReducerState<RouterStateUrl>;
  selection: SelectionState;
  interfaces: SerieState;
  userFactors: SerieState;
  components: SerieState;
  userValues: UserValuesState;
  componentValues: ComponentValuesState;
  componentConnections: ComponentConnectionsState;
  interfaceConnections: InterfaceConnectionsState;
  componentPerformance: ComponentPerformanceState;
  users: UsersState;
  advancedEditor: AdvancedEditorState;
  usersDataExchange: UsersDataExchangeState;
  userFactorConnections: UserFactorConnectionsState;
  usersSettings: UsersSettingsState;
  recommendationsCalculations: RecommendationsCalculationsState;
  recommendationsFormulas: RecommendationsFormulasState;
  stepsScopes: StepsScopesState;
  recommendations: RecommendationsState;
  analyze: AnalyzeState;
  interfacesSteps: InterfacesStepsState;
}

export const UniterReducers: ActionReducerMap<UniterState> = {
  appSettings,
  advancedEditor,
  analyze,
  appLayout,
  auth,
  components,
  typeKeySettings,
  selection,
  interfaces,
  userFactors,
  userValues,
  componentValues,
  componentConnections,
  interfaceConnections,
  componentPerformance,
  users,
  usersDataExchange,
  userFactorConnections,
  usersSettings,
  recommendationsCalculations,
  recommendationsFormulas,
  router: fromRouter.routerReducer,
  recommendations,
  stepsScopes,
  interfacesSteps
};

export const UniterActions: any = [
  AppLayoutActions
];
