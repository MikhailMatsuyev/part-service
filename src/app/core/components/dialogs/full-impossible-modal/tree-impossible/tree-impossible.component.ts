import {
    Input,
    Component,
    ChangeDetectionStrategy
} from '@angular/core';
import {
    ImpossibleNode,
    ImpossibleFlatNode,
    TreeImpossibleBuilderService
} from './tree-impossible.builder.service';
import { BaseTree } from '@core/models/base-class/base-tree';

@Component({
    selector: 'app-tree-impossible',
    templateUrl: './tree-impossible.component.html',
    styleUrls: ['./tree-impossible.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppTreeImpossibleComponent extends BaseTree<ImpossibleNode, ImpossibleFlatNode, FullyImpossibleComponent[]> {
    @Input() public data: FullyImpossibleComponent[] = [];

    constructor(
        protected readonly treeBuilder: TreeImpossibleBuilderService
    ) {
        super(treeBuilder);
    }

    public transformer = ({ name, type, children, id, }: ImpossibleNode, level: number) => {
        return new ImpossibleFlatNode(
            name,
            type,
            !!children,
            level,
            id
        );
    }
}
