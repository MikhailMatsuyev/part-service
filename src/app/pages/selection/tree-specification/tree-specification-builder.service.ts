import { BaseTreeBuilder } from '@core/models/base-class/base-tree';
import { Injectable } from '@angular/core';

export class SpecificationNode {
    children: SpecificationNode[];
    name: string;
    type: 'category' | 'spec';
    isDefault: boolean;
    specId?: number;
    categoryId?: number;
    userId?: number;
}

export class SpecificationFlatNode {
    constructor(
        public name: string,
        public type: any,
        public expandable: boolean,
        public level: number,
        public specId: number,
        public isDefault: boolean,
        public categoryId: number,
        public userId: number
    ) { }
}

@Injectable()
export class TreeSpecificationBuilderService extends BaseTreeBuilder<Specification[]> {
    public initialize(data: Specification[]): SpecificationNode[] {
        const normalizeData = Array.isArray(data) ? this.normalizeForTree(data) : this.normalizeTreeBranch(data);
        return this.buildSpecificationTree(normalizeData);
    }

    private buildSpecificationTree(obj: any[]): SpecificationNode[] {
        return obj.reduce((acc, items) => {
            const { specs, category, userId } = items;

            if (!specs) {
                const { spec } = items;
                const nodeSpec = new SpecificationNode();
                nodeSpec.type = 'spec';
                nodeSpec.name = spec;
                nodeSpec.userId = userId;
                return [...acc, { ...items, ...nodeSpec }];
            }

            const node = new SpecificationNode();
            node.type = 'category';
            node.name = category;
            node.userId = userId;
            node.children = specs.map(item => {
                const data = new SpecificationNode();
                data.type = 'spec';
                data.name = item.spec;
                data.userId = userId;
                return { ...item, ...data };
            });
            return [...acc, { ...items, ...node }];
        }, []);
    }

    private normalizeForTree(data: Specification[]): any {
        return data.map(({ categories, specs }) =>
            categories.map(item => ({ ...item, specs: specs.filter(({ categoryId }) => item.categoryId === categoryId) }))
        );
    }

    private normalizeTreeBranch({ categories, specs, userId }: Specification): any {
        return [
            ...categories.map(item => ({ ...item, userId, specs: specs.filter(({ categoryId }) => item.categoryId === categoryId) })),
            ...specs.filter(({categoryId}) => categoryId === -1).map(item => ({...item, userId}))
        ];
    }
}
