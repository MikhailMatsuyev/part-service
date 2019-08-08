import {
    Input,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Output
} from '@angular/core';
import { TreeUserFactorBuilderService, UserFactorNode, UserFactorFlatNode } from './tree-userfactor-builder.service';
import { BaseTree } from '@core/models/base-class/base-tree';

@Component({
    selector: 'app-tree-userfactor',
    templateUrl: './tree-userfactor.component.html',
    styleUrls: ['./tree-userfactor.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppTreeUserFactorComponent extends BaseTree<UserFactorNode, UserFactorFlatNode, UfTree[]> {
    @Input() public data: UfTree[] = [];

    @Output() public clickInfo = new EventEmitter<{ id: number, type: number }>();
    @Output() public saveValue = new EventEmitter<any>();

    constructor(
        protected readonly treeBuilder: TreeUserFactorBuilderService
    ) {
        super(treeBuilder);
    }

    public transformer = ({ name, type, children, id, selected, info, groupId, selectedChild }: UserFactorNode, level: number) => {
        return new UserFactorFlatNode(
            name,
            type,
            !!children,
            level,
            id,
            selected,
            info,
            groupId,
            selectedChild
        );
    }

    public changeModel(values: any): void {
        this.saveValue.emit(values);
    }

    public isFirstLevelNode(node: UserFactorFlatNode): boolean {
        return this._getLevel(node) === 0;
    }

    public handleClickInfo({ id, type }: UserFactorFlatNode): void {
        this.clickInfo.emit({ id, type: this.mapTypes(type) });
    }

    private mapTypes(value: string): number {
        switch (value) {
            case 'uf': {
                return 4;
            }

            case 'ufg': {
                return 5;
            }

            case 'ufv': {
                return 3;
            }

            default: {
                return 3;
            }
        }
    }
}
