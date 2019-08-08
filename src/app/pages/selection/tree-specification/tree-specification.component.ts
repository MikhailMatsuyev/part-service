import {
    Component,
    ChangeDetectionStrategy,
    Input,
    EventEmitter,
    Output,
    ElementRef,
    ViewChild,
    ChangeDetectorRef,
    SimpleChanges,
    OnChanges
} from '@angular/core';
import { TreeSpecificationBuilderService, SpecificationNode, SpecificationFlatNode } from './tree-specification-builder.service';
import { pick } from '@utils/utilsfunc';
import { User } from '@core/store/auth';
import { BaseTree } from '@core/models/base-class/base-tree';

@Component({
    selector: 'app-tree-specification',
    templateUrl: './tree-specification.component.html',
    styleUrls: ['./tree-specification.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
// tslint:disable-next-line:max-line-length
export class AppTreeSpecificationComponent extends BaseTree<SpecificationNode, SpecificationFlatNode, Specification[]> implements OnChanges {
    @Input() public data: Specification[] = [];
    @Input() public userModel: User;
    @Input() public isActiveSpecification: Specification = null;
    @Input() public downloadMode = false;

    public contextSelected: SpecificationFlatNode = null;
    public isActiveRenameSpec: SpecificationFlatNode = null;
    public isActiveCategory: SpecificationFlatNode = null;
    public renameInputModel = '';
    public specificationDownload = [];

    @ViewChild('refInput') public inputElement: ElementRef = null;

    @Output() public changeSetDefault = new EventEmitter<number>();
    @Output() public clickInfo = new EventEmitter<number>();
    @Output() public selecteNode = new EventEmitter<number>();
    @Output() public deleteSpecification = new EventEmitter<DeleteNodeModel>();
    @Output() public renameSpecification = new EventEmitter<RenameNodeModel>();
    @Output() public addCategory = new EventEmitter<void>();
    @Output() public addSpecification = new EventEmitter<{ specCategory: number, userId: number }>();
    @Output() public dublicateSpecification = new EventEmitter<{specId: number, categoryId: number}>();
    @Output() public changeDownloadStatus = new EventEmitter<SpecificationFlatNode[]>();

    public get isActiveNodeSpec(): boolean {
        return this.userModel && this.contextSelected && this.userModel.userId === this.contextSelected.userId;
    }

    constructor(
        private readonly cd: ChangeDetectorRef,
        protected readonly treeBuilder: TreeSpecificationBuilderService
    ) {
        super(treeBuilder);
    }

    public ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);

        const downloadMode = changes['downloadMode'];

        if (downloadMode && !downloadMode.firstChange) {
            this.specificationDownload = [];
        }
    }

    public transformer = ({ name, type, children, specId, isDefault, categoryId, userId }: SpecificationNode, level: number) => {
        return new SpecificationFlatNode(
            name,
            type,
            !!children,
            level,
            specId,
            isDefault,
            categoryId,
            userId
        );
    }

    public handleNodeClick({ specId }: SpecificationFlatNode): void {
        this.selecteNode.emit(specId);
    }

    public handleNodeMenu(event: MouseEvent, node: SpecificationFlatNode): void {
        event.stopPropagation();
        this.contextSelected = node;
    }

    public handleRename(): void {
        this.isActiveRenameSpec = this.contextSelected;
        this.renameInputModel = this.contextSelected.name;
        this.cd.markForCheck();
        setTimeout(() => this.inputElement.nativeElement.focus());
    }

    public handleDelete(): void {
        const { name, specId } = this.contextSelected;

        this.deleteSpecification.emit({
            id: specId,
            type: RenameSchema.spec,
            name
        });
    }

    public blurHandle(): void {
        const { name, specId } = this.isActiveRenameSpec;
        this.renameSpecification.emit({
            id: specId,
            name: this.renameInputModel,
            type: RenameSchema.spec,
            error: this.renameInputModel === name
        });

        this.isActiveRenameSpec = null;
        this.renameInputModel = '';
    }

    public handleDuplicate(): void {
        this.dublicateSpecification.emit(pick(this.contextSelected, ['specId', 'categoryId']));
    }

    public handleInfo(): void {
        this.clickInfo.emit(this.contextSelected.specId);
    }

    public handleSetDefault(): void {
        this.changeSetDefault.emit(this.contextSelected.specId);
    }

    public clearData(): void {
        setTimeout(() => this.contextSelected = null);
    }

    public handleAddSpec(): void {
        const { categoryId, userId, } = this.isActiveCategory;
        this.addSpecification.emit({
            specCategory: categoryId,
            userId
        });
    }

    public handleAddFolder(): void {
        this.addCategory.emit();
    }

    public handleDeleteFolder(): void {
        const { name, categoryId } = this.isActiveCategory;

        this.deleteSpecification.emit({
            id: categoryId,
            type: RenameSchema.category,
            name
        });
    }

    public handleCategoryMenu(node: SpecificationFlatNode): void {
        this.isActiveCategory = node;
    }

    public clearCategory(): void {
        this.isActiveCategory = null;
    }

    public isActiveNodeCategory(node: SpecificationFlatNode): boolean {
        return this.userModel && node && this.userModel.userId === node.userId;
    }

    public isActiveNode(node: SpecificationFlatNode): boolean {
        return this.userModel && node
            && (this.userModel.userId === node.userId || this.userModel.role !== 'Admin')
            && this.userModel.role !== 'Guest';
    }

    public isSelected(node: SpecificationFlatNode): boolean {
        return this.specificationDownload.some(({ specId }) => specId === node.specId);
    }

    public handleSelectDownload(node: SpecificationFlatNode): void {
        const element = this.specificationDownload.find(({ specId }) => node.specId === specId);

        if (element) {
            this.specificationDownload = this.specificationDownload.filter(({ specId }) => node.specId !== specId);
        } else {
            this.specificationDownload.push(node);
        }

        this.changeDownloadStatus.emit(this.specificationDownload);
    }

    public trackByFn(index: number, item: SpecificationFlatNode): number {
        return item.specId;
    }
}
