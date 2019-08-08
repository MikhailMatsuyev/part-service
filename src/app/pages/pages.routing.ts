import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectionComponent } from '@pages/selection/selection.component';
import { PagesComponent } from '@pages/pages.component';
import { AuthGuard } from '@core/guards/auth.guard';
import { PermissionGuard } from '@core/guards/permission.guard';
// tslint:disable:max-line-length

const routes: Routes = [
    {
        path: 'home',
        component: PagesComponent,
        canActivate: [AuthGuard],
        canActivateChild: [PermissionGuard],
        children: [
            {
                path: '',
                component: SelectionComponent,
                data: { pageName: 'Selection', tabName: 'Selection' }
            },
            {
                path: 'advanced-editor',
                loadChildren: './advanced-editor/advanced-editor.module#AdvancedEditorModule',
                data: { pageName: 'Advanced', tabName: 'Advanced' }
            },
            {
                path: 'analyze',
                loadChildren: './analyze/analyze.module#AnalyzeModule',
                data: { pageName: 'Analyze', tabName: 'Analyze' }
            },
            {
                path: 'app-settings',
                loadChildren: './app-settings/app-settings.module#AppSettingsModule',
                data: { pageName: 'App Settings', tabName: 'Settings' }
            },
            {
                path: 'calculations',
                loadChildren: './calculations/calculations.module#CalculationsModule',
                data: { pageName: 'Calculations', tabName: 'Recommendations' }
            },
            {
                path: 'element',
                loadChildren: './element/element.module#ElementModule',
                data: { pageName: 'Components', tabName: 'Components' }
            },
            {
                path: 'element-connections',
                loadChildren: './element-connections/element-connections.module#ElementConnectionsModule',
                data: { pageName: 'Connections', tabName: 'Components' }
            },
            {
                path: 'element-values',
                loadChildren: './element-values/element-values.module#ElementValuesModule',
                data: { pageName: 'Values', tabName: 'Components' }
            },
            {
                path: 'element-performance',
                loadChildren: './element-performance/element-performance.module#ElementPerformanceModule',
                data: { pageName: 'Performance', tabName: 'Components' }
            },
            {
                path: 'formulas',
                loadChildren: './formulas/formulas.module#FormulasModule',
                data: { pageName: 'Formulas', tabName: 'Recommendations' }
            },
            {
                path: 'interfaces-connections',
                loadChildren: './interfaces-connections/interfaces-connections.module#InterfacesConnectionsModule',
                data: { pageName: 'Connections', tabName: 'Interfaces' }
            },
            {
                path: 'interfaces',
                loadChildren: './interfaces/interfaces.module#InterfacesModule',
                data: { pageName: 'Interfaces', tabName: 'Interfaces' }
            },
            {
                path: 'interfaces-steps',
                loadChildren: './interfaces-steps/interfaces-steps.module#InterfacesStepsModule',
                data: { pageName: 'Steps connections', tabName: 'Interfaces' }
            },
            {
                path: 'recommendations',
                loadChildren: './recommendations/recommendations.module#RecommendationsModule',
                data: { pageName: 'Recommendations', tabName: 'Recommendations' }
            },
            {
                path: 'element-steps-scopes',
                loadChildren: './steps-scopes/steps-scopes.module#StepsScopesModule',
                data: { pageName: 'Steps Scopes', tabName: 'Components' }
            },
            {
                path: 'type-key-settings',
                loadChildren: './type-key-settings/type-key-settings.module#TypeKeySettingsModule',
                data: { pageName: 'Type Key Settings', tabName: 'Settings' }
            },
            {
                path: 'user-factors',
                loadChildren: './user-factors/user-factors.module#UserFactorsModule',
                data: { pageName: 'User Factor', tabName: 'User Factor' }
            },
            {
                path: 'user-factors-connection',
                loadChildren: './user-factors-connection/user-factors-connection.module#UserFactorsConnectionModule',
                data: { pageName: 'Connections', tabName: 'User Factor' }
            },
            {
                path: 'user-factors-values',
                loadChildren: './user-factors-values/user-factors-values.module#UserFactorsValuesModule',
                data: { pageName: 'Values', tabName: 'User Factor' }
            },
            {
                path: 'user-settings',
                loadChildren: './user-settings/user-settings.module#UsersSettingsModule',
                data: { pageName: 'User Settings', tabName: 'Settings' }
            },
            {
                path: 'users-data-exchange',
                loadChildren: './users-data-exchange/users-data-exchange.module#UsersDataExchangeModule',
                data: { pageName: 'Users Import/Export', tabName: 'Advanced' }
            },
            { path: 'wiki', loadChildren: './wiki/wiki.module#WikiModule' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {
}
