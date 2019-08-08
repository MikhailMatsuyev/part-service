import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource, MatTree } from '@angular/material';
import { Observable, of } from 'rxjs';
import { SimpleChanges, OnInit, OnChanges, ViewChild } from '@angular/core';

export class BaseTreeFlatNode {
    expandable: boolean;
    level: number;
}

export class BaseTreeNode {
    children: any[];
}

export abstract class BaseTree<T extends BaseTreeNode, N extends BaseTreeFlatNode, R> implements OnChanges, OnInit {
    public treeData: any;
    public treeControl: FlatTreeControl<N>;
    public treeFlattener: MatTreeFlattener<T, N>;
    public dataSource: MatTreeFlatDataSource<T, N>;

    @ViewChild(MatTree) public treeRef: MatTree<T>;

    public abstract transformer;
    public abstract data: R;
    public hasChild = (_: number, _nodeData: N) => _nodeData.expandable;
    protected _getChildren = (node: T): Observable<T[]> => of(node.children);
    protected _isExpandable = (node: N) => node.expandable;
    protected _getLevel = (node: N) => node.level;

    constructor(protected readonly treeBuilder: BaseTreeBuilder<R>) {}

    public ngOnInit(): void {
        this.initControlTree();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        const data = changes['data'];

        if (data && !data.firstChange && data.currentValue) {
            this.updateControlTree(data.currentValue);
        }
    }

    public collapseAll(): void {
        this.treeControl.collapseAll();
    }

    public expandAll(): void {
        this.treeControl.expandAll();
    }

    protected initControlTree(): void {
        this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel,
            this._isExpandable, this._getChildren);
        this.treeControl = new FlatTreeControl<N>(this._getLevel, this._isExpandable);
        this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

        if (this.data) {
            this.buildTree(this.data);
        }
    }

    protected updateControlTree(data: any): void {
        const selectedIds = this.treeControl.expansionModel.selected.map(({id}: any) => id).filter(item => item !== undefined);
        this.buildTree(data);

        if (this.treeRef) {
            this.treeRef.treeControl.dataNodes.forEach((item: any) => {
                const element = selectedIds.find(id => id === item.id);

                if (element) {
                    this.treeRef.treeControl.expand(item);
                }
            });
        }
    }

    protected buildTree(obj: any): void {
        if (!this.dataSource) {
            this.initControlTree();
        }

        this.treeData = this.treeBuilder.initialize(obj);
        this.dataSource.data = this.treeData;
    }
}

export abstract class BaseTreeBuilder<T> {
    public abstract initialize(data: T): any[];
}
