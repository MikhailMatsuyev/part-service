import { FlatTreeControl } from '@angular/cdk/tree';
import { Observable } from 'rxjs/Observable';
import {
    Input,
    Component,
    ChangeDetectionStrategy,
    OnChanges,
    SimpleChanges,
    OnInit
} from '@angular/core';
import {
    UserSettingsNode,
    UserSettingsFlatNode,
    TreeUserSettingsBuilderService
} from './tree-user-settings.builder.service';
import { BaseTree } from '@core/models/base-class/base-tree';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'app-tree-user-settings',
    templateUrl: './tree-user-settings.component.html',
    styleUrls: [
        './tree-user-settings.component.sass',
        '../../../pages/selection/tree-userfactor/tree-userfactor.component.sass'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppTreeUserSettingsComponent extends BaseTree<UserSettingsNode, UserSettingsFlatNode, any> implements OnChanges, OnInit {
    @Input() public data: any;
    @Input() public tree: any;

    public selection = new SelectionModel<UserSettingsFlatNode>(true, []);

    constructor(
        protected readonly treeBuilder: TreeUserSettingsBuilderService
    ) {
        super(treeBuilder);
    }

    public ngOnInit(): void {
        super.ngOnInit();

        if (this.tree) {
            this.treeData = this.tree;
            this.dataSource.data = this.treeData;
        }
    }

    public ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);

        const tree = changes['tree'];

        if (tree && !tree.firstChange && tree.currentValue) {
            this.updateControlTree(tree.currentValue);
        }
    }

    public handleSelectChange({ checked }, node: UserSettingsFlatNode): void {
        this.selection.toggle(node);
        const descendants = this.treeControl.getDescendants(node);
        this.selection.isSelected(node)
        ? this.selection.select(...descendants)
        : this.selection.deselect(...descendants);
    }

    public descendantsAllSelected(node: UserSettingsFlatNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        return descendants.every(child => this.selection.isSelected(child));
    }

    public transformer = ({ name, children, selected, id, immutable }: UserSettingsNode, level: number) => {
        return new UserSettingsFlatNode(
            name,
            children.length > 0,
            level,
            selected,
            id,
            immutable,
            children
        );
    }
}
