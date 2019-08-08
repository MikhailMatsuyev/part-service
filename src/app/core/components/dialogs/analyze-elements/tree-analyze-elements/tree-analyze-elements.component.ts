import {
    Input,
    Component,
    ChangeDetectionStrategy,
    EventEmitter,
    Output,
    SimpleChanges,
    OnChanges,
    AfterViewInit
} from '@angular/core';
import {
    AnalyzeNode,
    AnalyzeFlatNode,
    TreeAnalyzeBuilderService
} from './tree-analyze-elements.builder.service';
import { BaseTree } from '@core/models/base-class/base-tree';
import { MatCheckboxChange } from '@angular/material';

@Component({
    selector: 'app-tree-analyze-elements',
    templateUrl: './tree-analyze-elements.component.html',
    styleUrls: ['./tree-analyze-elements.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
// tslint:disable-next-line:max-line-length
export class AppTreeAnalyzeComponent extends BaseTree<AnalyzeNode, AnalyzeFlatNode, ImpossibleComponents> implements OnChanges, AfterViewInit {
    @Input() public data: ImpossibleComponents;

    @Output() public changeStatusNode = new EventEmitter<any>();
    @Output() public changeStatusNodeUF = new EventEmitter<any>();

    private needUpdateAllActiveNode: boolean = null;

    public get isAllActive(): boolean {
        return this.treeBuilder.isAllActiveNodeComponents;
    }

    constructor(
        protected readonly treeBuilder: TreeAnalyzeBuilderService
    ) {
        super(treeBuilder);
    }

    public ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);
        const data = changes['data'];

        if (data && !data.firstChange && data.currentValue && this.needUpdateAllActiveNode !== null) {
            this.treeBuilder.isAllActiveNodeComponents = this.needUpdateAllActiveNode;
        }
    }

    public ngAfterViewInit(): void {
        if (this.treeRef && this.treeRef.treeControl) {
            this.treeRef.treeControl.dataNodes.forEach(item => {
                if (item.type === 'group') {
                    if (item.name === 'User Factors') {
                        this.treeRef.treeControl.expand(item);
                    }

                    if (item.name === 'Components') {
                        this.treeRef.treeControl.expandDescendants(item);
                    }
                }
            });
        }
    }

    public transformer = ({ name, type, children, id, selected, rec, groupId, selectedChild }: AnalyzeNode, level: number) => {
        return new AnalyzeFlatNode(
            name,
            type,
            !!children,
            level,
            id,
            selected,
            rec,
            groupId,
            selectedChild
        );
    }

    public handleSelectChange({ checked }: MatCheckboxChange, node: AnalyzeNode): void {
        if (node.rec === undefined) {
            this.changeStatusNodeUF.emit({...node, checked});
            return;
        }

        this.needUpdateAllActiveNode = checked;
        this.changeStatusNode.emit({...node, checked});
    }
}
