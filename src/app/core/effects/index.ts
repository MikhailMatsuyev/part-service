import { RecommendationsFormulasEffects } from './recommendations-formulas.effects';
import { EffectsModule } from '@ngrx/effects';
import { AppLayoutEffects } from '@core/effects/app-layout.effects';
import { AuthEffects } from '@core/effects/auth.effects';
import { UserFactorsEffects } from '@core/effects/user-factors.effects';
import { UserValuesEffects } from '@core/effects/user-values.effects';
import { ComponentsEffects } from '@core/effects/components.effects';
import { ComponentValuesEffects } from '@core/effects/component-values.effects';
import { ComponentConnectionsEffects } from '@core/effects/component-connections.effects';
import { ComponentPerformanceEffects } from '@core/effects/component-performance.effects';
import { InterfaceConnectionsEffects } from '@core/effects/interfaces-connections.effects';
import { UsersEffects } from '@core/effects/users.effects';
import { InterfacesEffects } from '@core/effects/interfaces.effects';
import { AdvancedEditorEffects } from '@core/effects/advanced-editor.effects';
import { UsersDataExchangeEffects } from '@core/effects/users-data-exchange.effects';
import { AppSettingsEffects } from '@core/effects/app-settings.effects';
import { UserFactorConnectionsEffects } from '@core/effects/user-connections.effects';
import { StepsScopesEffects } from '@core/effects/steps-scopes.effects';
import { RecommendationsCalculationsEffects } from '@core/effects/recommendations-calculations.effects';
import { TypeKeySettingsEffects } from '@core/effects/type-key-settings.effects';
import { RecommendationsEffects } from '@core/effects/recommendations.effects';
import { AnalyzeEffects } from '@core/effects/analyze.effects';
import { SelectionEffects } from '@core/effects/selection.effects';
import { InterfacesStepsEffects } from '@core/effects/interfaces-steps.effects';
import { UserSettingsEffects } from '@core/effects/user-settings.effects';

// TODO: add lazy loading for effect
export const AppEffectsModules = EffectsModule.forRoot([
  AppSettingsEffects,
  AppLayoutEffects,
  AnalyzeEffects,
  AuthEffects,
  TypeKeySettingsEffects,
  UserFactorsEffects,
  UserValuesEffects,
  ComponentsEffects,
  ComponentValuesEffects,
  ComponentConnectionsEffects,
  UsersEffects,
  InterfacesEffects,
  AdvancedEditorEffects,
  UsersDataExchangeEffects,
  UserFactorConnectionsEffects,
  RecommendationsEffects,
  InterfaceConnectionsEffects,
  ComponentPerformanceEffects,
  StepsScopesEffects,
  RecommendationsCalculationsEffects,
  SelectionEffects,
  RecommendationsFormulasEffects,
  InterfacesStepsEffects,
  SelectionEffects,
  UserSettingsEffects
]);
