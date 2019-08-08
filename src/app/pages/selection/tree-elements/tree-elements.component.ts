import { flattenDeep } from 'lodash';
import {
    ChangeDetectionStrategy,
    Component,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import {
    TreeElementsBuilderService,
    ComponentsNode,
    ComponentsFlatNode
} from './tree-elements.builder.service';
import { BaseTree } from '@core/models/base-class/base-tree';
import { User } from '@core/store/auth';
import { MatMenuTrigger, MatCheckboxChange } from '@angular/material';
import { sortPerformance, setColorCellTable, sortPerformanceTable } from './tree-utils';

@Component({
    selector: 'app-tree-elements',
    templateUrl: './tree-elements.component.html',
    styleUrls: ['./tree-elements.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppTreeElementsComponent extends BaseTree<ComponentsNode, ComponentsFlatNode, csgList[]> implements OnChanges {
    @Input() public data: csgList[] = [];
    @Input() public set isShowAllMode(value: boolean) {
        if (value !== this.treeBuilder.isShowAllMode) {
            this.updateControlTree(this.data);
        }

        this.treeBuilder.isShowAllMode = value;
    }
    @Input() public userModel: User;
    @Input() public performanceSorting: any[];

    @Output() public clickAnalyzeElements = new EventEmitter<ComponentsFlatNode>();
    @Output() public clickAnalyzeInterfaces = new EventEmitter<ComponentsFlatNode>();
    @Output() public clickTroubleShooting = new EventEmitter<ComponentsFlatNode>();
    @Output() public clickInfoNode = new EventEmitter<{ id: number, type: number }>();
    @Output() public clickAnalyzeState = new EventEmitter<{ csId: number, csvId: number, headerName: string }>();
    @Output() public changeStatusNode = new EventEmitter<any>();
    @ViewChild('contextMenuTrigger', {read: MatMenuTrigger}) public menuTrigger: MatMenuTrigger;

    public activeNode: ComponentsFlatNode;
    public activeContextNode: ComponentsFlatNode;
    public contextMenuLeft = 0;
    public contextMenuTop = 0;
    private sortingArray: number[] = [];

    public get selectedStepsName(): string[] {
        const data = this.data.map(({series}) => series.map(({steps}) => steps.filter(({ selected }) => selected).map(({ csv }) => csv)));
        return flattenDeep(data);
    }

    constructor(
        protected readonly treeBuilder: TreeElementsBuilderService
    ) {
        super(treeBuilder);
    }

    public ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);

        const performanceSorting = changes['performanceSorting'];

        if (performanceSorting && !performanceSorting.firstChange) {
            const newTreeData = this.treeData.map(item => {
                if (item.children && item.children.length > 0) {
                    return {
                        ...item,
                        children: item.children.map(items => {
                            if (items.type === 'cs') {
                                return {
                                    ...items,
                                    children: sortPerformance(items.children, performanceSorting.currentValue)
                                };
                            }

                            return items;
                        })
                    };
                }

                return item;
            });

            this.dataSource.data = newTreeData;
        }
    }

    public isFirstLevelNode(node: ComponentsFlatNode, level = 0): boolean {
        return this._getLevel(node) === level;
    }

    public handleClickActiveNode(activeNode: ComponentsFlatNode): void {
        this.activeNode = activeNode;
    }

    public clearData(): void {
        this.activeNode = null;
    }

    public handleAnalyzeComponent(): void {
        this.clickAnalyzeElements.emit(this.activeNode);
    }

    public handleAnalyzeInterface(): void {
        this.clickAnalyzeInterfaces.emit(this.activeNode);
    }

    public handleTroubleShooting(): void {
        this.clickTroubleShooting.emit(this.activeNode);
    }

    public transformer = (item: ComponentsNode, level: number) => {
        return new ComponentsFlatNode(
            item.name,
            item.type,
            !!item.children,
            level,
            item.id,
            item.selected,
            item.info,
            item.groupId,
            item.blocked,
            item.hasInterface,
            item.blockAct,
            item.icon,
            item.rec,
            item.display,
            item.color,
            item.groupName,
            item.perfTitles,
            item.perfValues,
            item.inactive,
            item.children,
            item.loading
        );
    }

    public isActiveAnalyze(node: ComponentsFlatNode): boolean {
        return node.type === 'cs';
    }

    public isActiveChildAnalyze(node: ComponentsFlatNode): number {
        if (this.isActiveAnalyze(node)) {
            return (node.children && node.children.length > 0) ? 1 : 0;
        }

        return 1;
    }

    public handleClickInfo({ id, type }: ComponentsFlatNode): void {
        this.clickInfoNode.emit({ id, type: this.setLevel(type) });
    }

    public handleContextMenu(event: any, node: ComponentsFlatNode): void {
        event.preventDefault();
        const { offsetX, offsetY, target: { offsetLeft, offsetTop } } = event;
        this.activeContextNode = node;
        this.contextMenuLeft = offsetX + offsetLeft;
        this.contextMenuTop = offsetY + offsetTop;
        setTimeout(() => this.menuTrigger.openMenu(), 100);
    }

    public handleAnalyzeState(): void {
        const { groupId, id, groupName, name } = this.activeContextNode;
        this.clickAnalyzeState.emit({
            csId: groupId,
            csvId: id,
            headerName: `${groupName} - ${name}`
        });
    }

    public contextClearData(): void {
        this.activeContextNode = null;
    }

    public isWarningMode(node: ComponentsFlatNode): boolean {
        return node.inactive;
    }

    public isBlockedHideNode(node: ComponentsFlatNode): boolean {
        return this.isBlockedNode(node).hidden;
    }

    public isBlockedDisabledNode(node: ComponentsFlatNode): boolean {
        return this.isBlockedNode(node).disabled;
    }

    public handleSelectChange({ checked }: MatCheckboxChange, node: ComponentsFlatNode): void {
        this.changeStatusNode.emit({...node, checked});
    }

    public isBlockedNode(node: ComponentsFlatNode): any {
        return node.blockAct
            ? { hidden: node.blocked }
            : { disabled: node.blocked };
    }

    public setStyle({ isMaxValue, isMinValue}: any): any {
        return {
            backgroundColor: setColorCellTable(isMaxValue, isMinValue)
        };
    }

    public sortingPerfTable({ id: idSort }: any, { id }: ComponentsFlatNode): void {
        const isSortingActive = this.sortingArray.some(item => item === idSort);

        if (isSortingActive) {
            this.sortingArray = this.sortingArray.filter(item => item !== idSort);
        } else {
            this.sortingArray = [...this.sortingArray, idSort];
        }

        const newTreeData = this.treeData.map(item => {
            if (item.children && item.children.length > 0 && item.type === 'csg') {
                return {
                    ...item,
                    children: item.children.map(items => {
                        if (items.type === 'cs' && items.id === id) {
                            return {
                                ...items,
                                children: sortPerformanceTable(items.children, idSort, !isSortingActive)
                            };
                        }

                        return items;
                    })
                };
            } else if (item.children && item.children.length > 0 && item.type === 'cs') {
                return {
                    ...item,
                    children: sortPerformanceTable(item.children, idSort, !isSortingActive)
                };
            }

            return item;
        });

        this.dataSource.data = newTreeData;
    }

    private setLevel(type: string): number {
        switch (type) {
            case 'csg': {
                return 0;
            }

            case 'cs': {
                return 2;
            }

            default: {
                return 1;
            }
        }
    }
}
