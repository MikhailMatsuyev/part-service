
interface StdInterfaces {
    DT_RowId: string;
    description: string;
    group: string;
    groupno: string;
    hide: boolean;
    hideText: string;
    item: string;
    itemno: string;
}

interface UsersFactors {
    order: number;
    series: any[];
    group: string;
    groupId: number;
    isCollapsed?: boolean;
    factorDirection?: any;
}

interface SerieState {
    seriesGroup: UsersFactors[];
    direction: boolean;
    seriesSelection: any[];
    groupList: any[];
    groupsSelection: any[];
    isCollapsed: boolean;
    importConflict: SeriesImportModel;
}

interface EditStdInterfaces {
    action: string;
    itemno: string;
    item: string;
    description: string;
    priority: number;
    group: string;
    display: number;
    active: number;
    hide: boolean;
}

interface RemoveStdInterfaces {
    action: string;
    id: number;
}

interface InterfaceGroups extends InterfaceGroupsBase {
    DT_RowId: string;
    Priority: string;
}

interface InterfaceGroupsBase {
    group: string;
    groupno: string;
}

interface ResponseInterfaceGroup extends InterfaceGroupsBase {
    priority: string;
    action: string;
}

interface DownloadExcel {
    level: number;
}

interface Notifications {
    date: number;
    id: number;
    isFile: boolean;
    readed: boolean;
    text: string;
    extension?: any;
    link?: any;
    size?: any;
    inProgress?: boolean;
}

interface GroupNotifications {
    notifications: Notifications[];
    unreaded: number;
}

interface RowCopyModel {
    noStart: number;
    noEnd: number;
    type: string;
}

interface InterfacesStep {
    SortOrder: number;
    Step: string;
    StepNo: number;
}

interface StdInterFacesSteps {
    Blocked: boolean;
    Row: string;
    RowGroup: string;
    RowNo: number;
    Steps: InterfacesStep[];
}

interface OnlineUsers {
    date: string;
    role: string;
    user: string;
}

interface ConnectedComponents {
    ComponentSeriesId: number;
    ComponentSeriesName: string;
    Steps: any;
}

interface ConnectedInterfaces {
    InterfaceId: number;
    InterfaceName: string;
}

interface ConnectedLinks {
    ComponentId: number;
    InterfaceId: number;
}

interface IUnsafeAction {
    type: string;
    payload: any;
}

interface ILogin {
    userName: string;
    password: string;
    isGuest: boolean;
}

interface UserFactorsImpl {
    DT_RowId: string;
    dimensioning: number;
    formula: string;
    max_number_dim: number;
    userfactor: string;
}

interface RequestFactorsImpl {
    combinedOnly: boolean,
    withoutConnections: boolean
}

interface RepsonseEditFactorsImpl {
    UfNo: number;
    DimEnable: boolean;
    DimMax: number;
    DimFormula: string;
}

interface FactorsGroupsImpl {
    HasFictive: boolean;
    Names: any[];
    Row_id: number;
    values: number[];
}

interface IResponse {
    data: any;
    error: boolean;
    message: string;
}

interface IDeleteNotification {
    id: number;
}

interface IToggleNotification {
    id: number;
    isReaded: boolean;
}

declare const enum InfoLevels {
    ComponentSeriesGroup = 0,
    Component,
    ComponentSeries,
    UserFactorValue,
    UserFactor,
    UserFactorGroup
}

interface StepSelectCopy {
    stepId: number;
    serieId: number;
    order: number;
    move: boolean;
    selected: number[];
}

interface UserFactorValues {
    serieId: number;
    stepId: number;
    name: string;
    text: string;
    val: number;
    minSpanPos: number;
    maxSpanPos: number;
    minSpanRec: number;
    maxSpanRec: number;
}

interface UserFactorValuesImpl {
    id: number;
    name: string;
    dimEnabled: boolean;
    maxDim: number;
    formula: string;
}

interface AppSettingsResponse {
    numsType: number,
    analyzeVisibility: boolean,
    timeout: number
}

interface Performance {
    id: number;
    name: string;
    unit: string;
    description: string;
    typeKey: boolean;
    calculate: boolean;
    display: boolean;
    displayText: boolean;
    highlight: boolean;
    order: number;
}

interface Formulas {
    enabled: boolean;
    generalized: boolean;
    generalFormula: string;
    csId: number;
    csName: string;
    ufId: number;
    ufName: string;
    operand: string;
    valFormat: string;
    csFormula: string;
    ufFormula: string;
    csSpan: string;
    ufSpan: string;
}

interface UnitPricing {
    id: number;
    name: string;
    enabled: boolean;
}

interface MultipleSort {
    active: string[];
    direction: boolean;
}

interface FunctionsSettings {
    calculate: boolean;
    activated: boolean;
    perfId: number;
    termId: number;
    factorId: number;
    showField: boolean;
    performances: Perfomances[];
    terms: Terms[];
    ufs: Ufs[];
    functions: Functions[];
}

interface TypeKeySettingsRow {
        id: number,
        name: string,
        length: number,
        position: number,
        showDelimeter: boolean,
        showDefaultValue: boolean,
        type: number,
        isChecked: boolean
}

interface FreeTextItem {
    freeText: string,
    freeTextPos: number,
    separator: boolean
}

interface TypeKeySettingsUfItem{
    ufId: number,
    add: boolean
}

interface PrimaryKeySettingsModel{
    delimiter: string,
    perfId: number,
    fixed: boolean,
    digitsOnly: number,
    displayField: boolean,
    defaultValue: string,
    perfList: any[],
    ufList: SelectItem[],
    textList: SelectItem[],
    sortTypeKeyItems: any
}

interface TypeKeySettingsError{
    data: any
    error: boolean,
    message: string
}

interface Perfomances {
    Disabled: boolean;
    Selected: boolean;
    Text: string;
    Value: string;
}

interface SelectItem{
    Text: string;
    Value: string;
}

interface Terms {
    Disabled: boolean;
    Selected: boolean;
    Text: string;
    Value: string;
}

interface Ufs {
    Disabled: boolean;
    Selected: boolean;
    Text: string;
    Value: string;
}

interface Functions {
    id: number;
    name: string;
    selected: boolean;
}

interface FunctionsSettingsModel {
    perfId: number;
    factorId: number;
    termId: number;
    activated: boolean;
    functions: FunctionsSelected[];
}

interface FunctionsSelected {
    id: number;
    selected: number;
}

interface UnitPricingConnectedModel {
    perfId: number;
    csIds: number[];
}

interface OnlineStatus {
    user: string;
    role: string;
    date: number;
}

interface SqlStatements {
    id: number;
    name: string;
    active: boolean;
    text: string;
    done: boolean;
    error: boolean;
    errorMessage: string;
    duration: number;
    activiteStatus?: any;
    inProcess?: boolean;
    Duration?: number;
    Error?: boolean;
    ErrorMessage?: string;
}

interface SqlState {
    id: number;
    name: string;
    active: boolean;
    text?: string;
}

interface UsersChanges {
    nameOld: string;
    nameNew: string;
    action: UsersActionStatus;
}

declare const enum UsersActionStatus {
    new = 0,
    merge
}

interface DownloadConnections {
    componentsSort: Array<{ componentOrder: ComponentOrder, sortBy: SortByComponent }>;
    userFactorSort: Array<{ userFactorOrder: ComponentOrder, sortBy: SortByComponent }>;
    includeSteps: boolean;
}

declare const enum ComponentOrder {
    groups = 'groups',
    series = 'series',
    steps = 'steps'
}

declare const enum SortByComponent {
    name = 'name',
    priority = 'priority'
}

interface UserRoles {
    id: number;
    name: string;
    immutable: boolean;
    sealed: boolean;
}

interface UserFactorConnected {
    id: number;
    name: string;
}

interface UserFactorNetwork {
    links: Array<{ base: number, comb: number }>
    names: Array<{ id: number, name: number }>
}

interface RecommendationsComponent {
    id: number;
    name: string;
    rec: boolean;
    pos: boolean;
    inFormula: boolean;
}

interface InterfacesImp {
    id: number,
    name: string
}

interface InterfaceNetwork {
    components: Array<{ id: number, name: string, steps: Array<{ id: number, name: string }> }>
    interfaces: Array<{ id: number, name: string }>,
    links: Array<{ compId: number, intId: number }>
}

interface RecommendationsCalculationsStatus {
    cs: RecommendationsCS[];
    uf: RecommendationsCS[];
}

interface RecommendationsCS {
    serieId: number;
    serie: string;
    steps: RecommendationsCSStep[]
}

interface RecommendationsCSStep {
    stepId: number;
    step: string;
    rec: boolean;
    pos: boolean;
}


interface DimensionsRecommendationCalculate {
    Components: number;
    Values: number;
}

interface DimensionsRecommendation {
    csId: number;
    ufId: number;
    steps: DimensionsRecommendationSteps;
}

interface DimensionsRecommendationSteps {
    cs: Array<{ csId: number, compId: number }>;
    uf: Array<{ ufId: number, ufvId: number }>;
}

interface RecommendationView {
    viewType: number;
    csId: number;
    ufId: number;
    rowsToLoad: number;
    rowsTotal: number;
    rowFirst: number;
    colsToLoad: number;
    colsTotal: number;
    colFirst: number;
    steps: DimensionsRecommendationSteps;
}

interface AllRoles {
    id: number,
    name: string
}

interface AllSteps {
    roleId: number
}

interface LastChangesText {
    updates: LastChangesUpdate;
    changes: LastChangesAuthor;
}

interface LastChangesAuthor {
    date: string;
    author: string;
}

interface LastChangesUpdate {
    date: string;
    error: boolean;
    errorMessage: string;
    duration: string;
    done?: boolean;
    postFixMessage?: string;
}

interface LastChangesUpdateModel {
    done: boolean;
    duration: string;
    message: string;
    success: boolean;
}

interface CalculateView {
    csvId: number;
    csv: string;
    ufvId: number;
    ufv: string;
    rec: boolean;
    pos: boolean;
    csvVal: number;
    csvMinPos: number;
    csvMaxPos: number;
    csvMinRec: number;
    csvMaxRec: number;
    ufvVal: number;
    ufvMinPos: number;
    ufvMaxPos: number;
    ufvMinRec: number;
    ufvMaxRec: number;
}

interface StatusCalculate {
    recommendationsInProgress: boolean;
    calculationsInProgress: boolean;
}

declare const enum RecommendationsType {
    rec = 0,
    pos,
    imp
}

interface TableIds {
    cols: number[];
    rows: number[];
}

interface ExportUserFactor {
    csId: number;
    perfId: number;
    perfFormula: string;
    ufCols: number[];
    ufRows: number[];
    calcPos: number;
}

interface AnalyzeComponent {
    id: number;
    name: string;
    combined: boolean;
}

interface AnalyzeSteps {
    series: AnalyzeSeries[];
    combined: boolean;
}

interface AnalyzeSeries {
    serieId: number;
    serie: string;
    steps: Array<{ compId: number, comp: string, checked: boolean }>;
}

interface AnalyzeCsUfSteps {
    maxSteps: number;
    series: Array<{ ufId: number, uf: string, steps: Array<{ ufvId: number, ufv: string }> }>;
}

interface AnalyzeValueCount {
    id: number;
    steps: number[];
    dependGroupMode: boolean;
    allInvalid: boolean;
}

interface AnalyzeStepModel {
    ufvId: number;
    rec: boolean;
    pos: boolean;
}

interface RecommendationsView {
    ufId?: number;
    uf?: string;
    csId?: number;
    cs?: string;
    viewType?: number;
    ufv?: Array<{ id: number, name: string }>;
    csv?: Array<{ id: number, name: string }>;
    rows?: RecommendationRow[];
}

interface RecommendationRow {
    csvId: number;
    csv: string;
    ufvId: number;
    ufv: string;
    cols: RecommendationCol[];
}

interface RecommendationCol {
    ufvId: number
    csvId: number
    pos: boolean;
    rec: boolean;
    hasChanges: boolean;
    hasComment: boolean;
}

interface RecommendationRow {
    ufvId: number;
    csvId: number;
    rec: boolean;
    pos: boolean;
    quick: boolean;
}

interface RecommendationCellComment {
    added: number;
    comment: string;
    prevState: string;
    currState: string;
    userName: string;
    withCalc: boolean;
}

interface RecommendationCommentRequest {
    csId: number;
    csvId: number;
    ufId: number;
    ufvId: number;
    comment: string;
}

declare const enum StepsScopesRequestTypes {
    onestep = 0,
    allsteps,
    allseries
}

interface RecommendationCommentsRequest {
    ids: number[];
    pos: boolean;
    rec: boolean;
    comment: string;
}

interface RecommendationRequestSaveAllSteps {
    ufId: number;
    ufvIds: number[];
    csId: number;
    csvIds: number[];
    status: RecommendationsType;
    selectedSteps: RecommendationsSelectedStep;
}

interface RecommendationsSelectedStep {
    cs: Array<{ csId: number, csvId: number }>;
    uf: Array<{ ufId: number, ufvId: number }>;
}

declare const enum ExportType {
    excel = 0,
    excelExpanded
}

declare const enum SelectionInfoType {
    CSG = 0,
    CSV,
    CS,
    UFV,
    UF,
    UFG
}

interface SelectionGetInfo {
    text: string;
    files: SelectionFileName[];
}

interface SelectionFileName {
    id: number;
    fileName: string;
    url: string;
}

interface Specification {
    userId: number;
    user: string;
    isAdmin: boolean;
    categories: SpecificationCategories[];
    specs: SpecificationSpec[];
    specId?: number;
}

interface SpecificationCategories {
    categoryId: number;
    category: string;
}

interface SpecificationSpec {
    categoryId: number;
    specId: number;
    spec: string;
    isDefault: boolean;
    isAdmin: boolean;
}

interface LoadSpecification {
    allowModification: boolean;
    removedSteps: SpecificationRemovedSteps[];
}

interface SpecificationRemovedSteps {
    specId: number;
    specType: SpecType,
    serieId: number;
    serie: string;
    stepId: number;
    step: string;
}

declare const enum SpecType {
    uf = 0,
    cs
}

interface SpecInformation {
    specId: number;
    segment: string;
    customer: string;
    application: string;
    product: string;
    description: string;
    feedback: string;
    price: string;
}

interface SpecificationsSaveAsModel {
    specId: number;
    spec: string;
    categoryId: number;
}

interface RenameNodeModel {
    id: number;
    name: string;
    type: RenameSchema;
    error?: boolean;
}

declare const enum RenameSchema {
    spec = 0,
    category
}

interface DeleteNodeModel {
    id: number;
    type: RenameSchema;
    name?: string;
}

interface UfTree {
    ufgId: number;
    ufg: string;
    info: boolean;
    series: UfTreeSerie[];
}

interface UfTreeSerie {
    ufId: number;
    uf: string;
    info: boolean;
    steps: UfTreeStep[];
}

interface UfTreeStep {
    ufId: number;
    uf: string;
    info: boolean;
    selected: boolean;
}

interface CSTree {
    notify: boolean;
    notifyMessage: string;
    showAnalysisButton: boolean;
    csgList: csgList[];
}

interface csgList {
    csgId: number;
    csg: string;
    order: number;
    info: boolean;
    series: csgSeries[]
}

interface csgSeries {
    csId: number;
    cs: string;
    info: boolean;
    perfTitles: perfTitles[];
    display: boolean;
    hasInterface: boolean;
    intLinks: intLinks[];
    order: number;
    steps: CSstep[];
}

interface perfTitles {
    id: number;
    name: string;
    total: boolean;
}

interface intLinks {
    intId: number;
    hide: boolean;
}

interface CSstep {
    csvId: number;
    csv: string;
    rec: boolean;
    selected: boolean;
    display: boolean;
    blocked: boolean;
    blockAct: boolean;
    info: boolean;
    color: string;
    icon: string;
    order: 0;
    perfValues: perfValues[];
}

interface perfValues {
    perfId: number;
    val: number;
    valTotal: number;
    unit: string;
    text: string;
    isMaxValue: boolean;
    isMinValue: boolean;
}

interface ImpossibleComponents {
    cs: CSSteps[];
    uf: UfSteps[];
    int: IntSteps[];
}

interface IntSteps {
    intId: number;
    int: string;
    steps: IntListSteps[];
}

interface IntListSteps {
    intStepId: number;
    intStep: string;
    active: boolean;
}

interface UfStepModel {
    ufId: number;
    uf: string;
}

interface UfSteps extends UfStepModel {
    selectedValue: UfStepModel;
    values: UfStepModel[];
}

interface CSSteps {
    serieId: number;
    serie: string;
    intIds: number[];
    steps: CSStepsTiming[];
}

interface CSStepsTiming {
    stepId: number;
    step: string;
    limitingUf: Array<{ ufId: number, ufValue: number }>;
    intLinks: Array<{intId: number, intStepIds: number[]}>;
}

interface FullyImpossibleComponent {
    csId: number;
    cs: string;
    steps: FullyImpossibleComponentSteps[]
}

interface FullyImpossibleComponentSteps {
    csvId: number;
    csv: string;
    ufList: UfStepModel[];
}

interface SelectionComponentsInterfaces {
    components: CSSteps[];
    interfaces: IntSteps[];
}

interface SelectComponentModel {
    csTree: csgList[];
    activatedInt: number[];
}

interface PosAnalyse {
    uf: string;
    ufv: string;
    cs: string;
    csv: string;
}

interface AvailableUserFactor {
    ufvs: Array<{ ufId: number, ufIds: number[] }>;
    preselected: number[];
}

interface AnalyzeComponentState {
    uf: AnalyzeComponentStateUF[];
    intBlock: intBlock;
}

interface AnalyzeComponentStateUF {
    uf: string;
    ufSelected: string;
    isPosLimit: boolean;
    isRecLimit: boolean;
}

interface intBlock {
    blockers: intBlockers[];
    compatible: boolean;
    compability: boolean;
}

interface intBlockers {
    cs: string;
    csvId: number;
    csv: string;
    interfaces: Array<{ int: string, intStep: string }>;
}


interface ISInterfaces {
    id: number,
    name: string
}

interface ISSteps {
    id: number,
    name: string
}

interface UserResponseModel {
    id: number;
    name: string;
    password: string;
    roleId: number;
}

interface UsersModel {
    userId: number;
    userName: string;
    roleId: number;
    roleName: string;
}

interface FormulaResponseModel {
    create: boolean;
    enabled: boolean;
    generalized: boolean;
    generalFormula: string;
    csId: number;
    csName: string;
    ufId: number;
    ufName: string;
    operand: string;
    valFormat: string;
    csFormula: string;
    ufFormula: string;
    csSpan: string;
    ufSpan: string;
    visible: boolean;
    unit: string;
    order: number;
}

interface FormIdentityModel {
    csId?: number,
    ufId?: number
}

interface FormulaEditModel extends FormIdentityModel {
    formula: {
        create: boolean,
        enabled: boolean,
        generalized: boolean,
        generalFormula: string,
        csId: number,
        csName?: string,
        ufId: number,
        ufName?: string,
        operand: string,
        valFormat: string,
        csFormula: string,
        ufFormula: string,
        csSpan: string,
        ufSpan: string,
        visible: boolean,
        unit: string,
        order: number
    }
}

interface FormulaEditFromDialogModel extends FormulaEditModel {
    editFromDialog: boolean;
}

interface EnableFormulaModel extends FormIdentityModel {
    enable?: boolean
}
interface SeriesImportModel{
    mergedSeries: OneSeriesImportModel[];
    addedSeries: OneSeriesImportModel[];
    removedSeries: OneSeriesImportModel[];
    numberOfKeys: number;
}

interface OneSeriesImportModel {
    key: number;
    name: string;
    groupName: string;
    addedSteps: StepImportModel[];
    removedSteps: StepImportModel[];
    movedSteps: StepImportModel[];
    renamedSteps: StepImportModel[];
}

interface StepImportModel {
    key: number;
    name: string;
    order: number;
    nameOld: string;
    orderOld: number;
}

interface AdvancedStatus {
    id: number;
    inProcess: boolean;
    success: boolean;
    duration: string;
    message: string;
}

interface PushToRecommendationDoneStatus {
    done: boolean;
    duration: string;
}