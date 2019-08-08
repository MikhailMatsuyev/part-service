import { AnalyzeStepComponent } from './analyze-step/analyze-step.component';
import { TreeAnalyzeBuilderService } from './analyze-elements/tree-analyze-elements/tree-analyze-elements.builder.service';
import { AppTreeAnalyzeComponent } from './analyze-elements/tree-analyze-elements/tree-analyze-elements.component';
import { TreeImpossibleBuilderService } from './full-impossible-modal/tree-impossible/tree-impossible.builder.service';
import { RemovedStepsModalComponent } from './removed-steps-modal/removed-steps-modal.component';
import { WarningModule } from './../warning/warning.module';
import { InterfacesLinksComponent } from './interfaces-links/interfaces-links.component';
import { AnalyzeElementsComponent } from './analyze-elements/analyze-elements.component';
import { SpecificationInformaionComponent } from './specification-info-modal/specification-info-modal.component';
import { UserFactorXlsxModalComponent } from './userfactor-xlsx-modal/userfactor-xlsx-modal.component';
import { RecommendationTypeModalComponent } from './recommendation-type-modal/recommendation-type-modal.component';
import { HelpModalComponent } from './help-modal/help-modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatTreeModule,
    MatTabsModule,
    MatExpansionModule,
    MatTableModule
} from '@angular/material';
import { NewGroupComponent } from './new-group/new-group.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdditionalInformationComponent } from './additional-information/additional-information.component';
import { ResizableModule } from 'angular-resizable-element';
import { InlineSVGModule } from 'ng-inline-svg';
import { DeleteGroupComponent } from './delete-group/delete-group.component';
import { DirectivesModule } from '../../directives/directives.module';
import { WarningDragModalComponent } from './warning-drag-modal/warning-drag-modal.component';
import { ConnectionComponent } from './connection-component/connection-component.component';
import { AppScrollbarModule } from '../scrollbar/scrollbar.module';
import { NewPerfomanceComponent } from './new-perfomance/new-perfomance.component';
import { NewComponentElemComponent } from './new-component/new-component.component';
import { NewInterfaceComponent } from './new-interface/new-interface.component';
import { CombineElementsComponent } from './combine-elements/combine-elements.component';
import { InterfaceConnModalComponent } from './interface-conn-modal/interface-conn-modal.component';
import { UserFactorCombineComponent } from './userfactor-combine/userfactor-combine.component';
import { FormulasPreviewModalComponent } from './formulas-preview-modal/formulas-preview-modal.component';
import { ChooseElementsComponent } from './choose-elements/choose-elements.component';
import { ProjectModalComponent } from './project-modal/project-modal.component';
import { UsersOnlineModalComponent } from './users-online-modal/users-online-modal.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NewSqlModalComponent } from './new-sql-modal/new-sql-modal.component';
import { PushSqlModalComponent } from './push-sql-modal/push-sql-modal.component';
import { WarningImportModalComponent } from './warning-import-modal/warning-import-modal.component';
import { NewUsernameModalComponent } from './new-username-modal/new-username-modal.component';
import { ConnectionsDownloadedModalComponent } from './connections-downloaded-modal/connections-downloaded-modal.component';
import { UserFactorCombineConnectedComponent } from './userfactor-combine-connected/userfactor-combine-connected.component';
import { ComponentDimensioningModalComponent } from './component-dimensioning-modal/component-dimensioning-modal.component';
import { DropdownModule } from '@core/components/dropdown/dropdown.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NewSpecificationComponent } from './new-specification/new-specification.component';
import { SpecInformaionComponent } from './spec-form-information-modal/spec-form-information-modal.component';
import { InterfaceStepModalComponent } from './interfaces-step-modal/interface-step-modal.component';
import { NewEntryComponent } from '@core/components/dialogs/new-entry/new-entry.component';
import { TreeInterfaceLinkBuilderService } from './interfaces-links/tree-interface-link/tree-interface-link.builder.service';
import { AppTreeInterfaceLinkComponent } from './interfaces-links/tree-interface-link/tree-interface-link.component';
import { FullImpossibleModalComponent } from './full-impossible-modal/full-impossible-modal.component';
import { AppTreeImpossibleComponent } from './full-impossible-modal/tree-impossible/tree-impossible.component';
import { UserSettingsCreateUserComponent } from '@core/components/dialogs/user-settings-create-user/user-settings-create-user.component';
import { TextareaModule } from '@core/components/textarea/textarea.module';
import { DeleteFormulasComponent } from '@core/components/dialogs/delete-formulas/delete-formulas.component';
import { VerifyFormulaValuesComponent } from '@core/components/dialogs/verify-formula-values/verify-formula-values.component';
import { ImportModalComponent } from './import-modal/import-modal.component';
import { ImportNodeComponent } from './import-modal/import-node/import-node.component';
import { UserSettingsRemoveUsersComponent } from '@core/components/dialogs/user-settings-remove-users/user-settings-remove-users.component';
import { UserSettingsManageUsersComponent } from '@core/components/dialogs/user-settings-manage-users/user-settings-manage-users.component';

const components = [
    WarningDragModalComponent,
    NewGroupComponent,
    NewComponentElemComponent,
    AdditionalInformationComponent,
    DeleteGroupComponent,
    ConnectionComponent,
    NewInterfaceComponent,
    NewPerfomanceComponent,
    CombineElementsComponent,
    UserFactorCombineComponent,
    FormulasPreviewModalComponent,
    ChooseElementsComponent,
    ProjectModalComponent,
    UsersOnlineModalComponent,
    InterfaceConnModalComponent,
    ChangePasswordComponent,
    NewSqlModalComponent,
    PushSqlModalComponent,
    WarningImportModalComponent,
    NewUsernameModalComponent,
    ConnectionsDownloadedModalComponent,
    UserFactorCombineConnectedComponent,
    ComponentDimensioningModalComponent,
    HelpModalComponent,
    RecommendationTypeModalComponent,
    UserFactorXlsxModalComponent,
    InterfaceStepModalComponent,
    UserFactorXlsxModalComponent,
    NewSpecificationComponent,
    SpecificationInformaionComponent,
    SpecInformaionComponent,
    NewEntryComponent,
    AnalyzeElementsComponent,
    InterfacesLinksComponent,
    AppTreeInterfaceLinkComponent,
    RemovedStepsModalComponent,
    FullImpossibleModalComponent,
    AppTreeImpossibleComponent,
    AppTreeAnalyzeComponent,
    AnalyzeStepComponent,
    UserSettingsCreateUserComponent,
    UserSettingsManageUsersComponent,
    UserSettingsRemoveUsersComponent,
    DeleteFormulasComponent,
    VerifyFormulaValuesComponent,
    ImportModalComponent,
    ImportNodeComponent
];

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatDialogModule,
        MatButtonModule,
        MatInputModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        ResizableModule,
        AppScrollbarModule,
        InlineSVGModule,
        DirectivesModule,
        MatRadioModule,
        MatCheckboxModule,
        MatSlideToggleModule,
        DropdownModule,
        FlexLayoutModule,
        MatTreeModule,
        WarningModule,
        MatTabsModule,
        MatExpansionModule,
        MatTableModule,
        TextareaModule
    ],
    entryComponents: components,
    declarations: components,
    providers: [
        TreeInterfaceLinkBuilderService,
        TreeImpossibleBuilderService,
        TreeAnalyzeBuilderService
    ]
})
export class DialogsModule { }
