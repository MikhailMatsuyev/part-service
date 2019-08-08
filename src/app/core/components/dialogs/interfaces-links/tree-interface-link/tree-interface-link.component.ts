import {
    Input,
    Component,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    EventEmitter,
    Output
} from '@angular/core';
import {
    InterfaceLinkNode,
    InterfaceLinkFlatNode,
    TreeInterfaceLinkBuilderService
} from './tree-interface-link.builder.service';
import { BaseTree } from '@core/models/base-class/base-tree';

@Component({
    selector: 'app-tree-interface-link',
    templateUrl: './tree-interface-link.component.html',
    styleUrls: ['./tree-interface-link.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppTreeInterfaceLinkComponent extends BaseTree<InterfaceLinkNode, InterfaceLinkFlatNode, CSSteps[]> {
    @Input() public data: CSSteps[] = [];
    @Output() public activeLinks = new EventEmitter<any[]>();
    public activeInterfaceLinks = [];

    constructor(
        protected readonly treeBuilder: TreeInterfaceLinkBuilderService,
        private readonly cd: ChangeDetectorRef
    ) {
        super(treeBuilder);
    }

    public transformer = ({ name, type, children, id, selected, intLinks, groupId }: InterfaceLinkNode, level: number) => {
        return new InterfaceLinkFlatNode(
            name,
            type,
            !!children,
            level,
            id,
            selected,
            intLinks,
            groupId
        );
    }

    public handleSelectChange({ checked }: any, { intLinks, id, groupId }: InterfaceLinkNode): void {
        if (checked) {
            this.activeInterfaceLinks.push({id, intLinks, checked, groupId});
        } else {
            this.activeInterfaceLinks = this.activeInterfaceLinks.filter(item => item.id !== id);
        }

        const data = this.data.filter(item => {
            return !!this.activeInterfaceLinks.find(({ intLinks: links, groupId: groupIdLinks }) => {
                return groupIdLinks !== item.serieId || links.some(({ intId }) => item.intIds.includes(intId));
            });
        }).map(item => {
            // TODO: refactor (only for demo)
            const { serieId } = item;
            return {
                ...item,
                steps: item.steps.filter(({ intLinks: links, stepId }) => {
                    return this.activeInterfaceLinks.every(items => {
                        if (items.groupId === serieId) {
                            return items.id === stepId;
                        }

                        return items.intLinks.some(({ intStepIds }) => {
                            return intStepIds.some(steps =>
                                links.some(({ intStepIds: stepsIds }) => stepsIds.includes(steps))
                            );
                        });
                    });
                }).map(items => {
                    const element = this.activeInterfaceLinks.find(({ id: idLinks }) => idLinks === items.stepId);

                    return {
                        ...items,
                        selected: element && element.checked
                    };
                })
            };
        });

        const newData = this.activeInterfaceLinks.length > 0 ? data : this.data;
        this.activeLinks.emit(this.activeInterfaceLinks);
        this.updateControlTree(newData);
        this.expandAll();
    }
}
