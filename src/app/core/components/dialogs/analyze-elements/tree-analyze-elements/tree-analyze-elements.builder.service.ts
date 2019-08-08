import { Injectable } from '@angular/core';
import { BaseTreeBuilder } from '@core/models/base-class/base-tree';
import { omit } from '@utils/utilsfunc';
import { guuid } from '@core/store/selection/util';

export class AnalyzeNode {
    children: AnalyzeNode[];
    name: string;
    selected?: boolean;
    type: 'step' | 'group' | 'sub-steps';
    id: number;
    rec?: boolean;
    groupId?: number;
    selectedChild?: AnalyzeNode;
}

export class AnalyzeFlatNode {
    constructor(
        public name: string,
        public type: any,
        public expandable: boolean,
        public level: number,
        public id: number,
        public selected: boolean,
        public rec: boolean,
        public groupId: number,
        public selectedChild: AnalyzeNode
    ) { }
}

// add for add id top branch in tree(for not collapsed)
const csGuuid = guuid();
const ufGuuid = guuid();

@Injectable()
export class TreeAnalyzeBuilderService extends BaseTreeBuilder<ImpossibleComponents> {
    public isAllActiveNodeComponents = true;
    public initialize(data: ImpossibleComponents): AnalyzeNode[] {
        return this.normalizeForTree(data);
    }

    public initializeUfTree(data: ImpossibleComponents): AnalyzeNode[] {
        return this.normalizeForTree(data);
    }

    private normalizeForUFTree({ preselected, ufvs }: AvailableUserFactor): any[] {
        // change logic for recursive!!
        return this.normalizeGroup(ufvs, 'uf', preselected);
    }

    private normalizeForTree(obj: ImpossibleComponents): any[] {
        // change logic for recursive!!
        return Object.keys(obj)
            .filter(key => Array.isArray(obj[key]) ? obj[key].length > 0 : true)
            .map(key => {
                return key === 'analyzeData'
                    ? this.normalizeForUFTree(obj[key])
                    : this.normalizeGroup(obj[key], key);
            });
    }

    private normalizeGroup(obj: any, typeTree: string, selected?: number[]): any {
        switch (typeTree) {
            case 'cs': {
                return {
                    ...new AnalyzeNode(),
                    name: 'Components',
                    id: csGuuid,
                    type: 'group',
                    children: obj.map(item => this.normalizeSubSteps(item))
                };
            }

            case 'uf': {
                return {
                    ...new AnalyzeNode(),
                    name: 'User Factors',
                    id: ufGuuid,
                    type: 'group',
                    children: obj.map(item => this.normalizeSubSteps(item, selected))
                };
            }

            default: {
                return new AnalyzeNode();
            }
        }
    }

    private normalizeSubSteps(obj: any, selected?: number[]): any {
        const id = obj.serieId || obj.intId || obj.ufId;
        const children = obj.steps
            ? obj.steps.map((item, index) => this.normalizeSteps({...item, groupId: id}, false, selected))
            : obj.ufvIds.map((item, index) => this.normalizeSteps({...item, groupId: id}, index === 0, selected));

        const isFullChildren = this.isAllActiveNodeComponents
            ? children.some(({ active }) => active)
            : false;

        const subChildren = isFullChildren ? children.filter(({ active }) => active) : children;

        return {
            ...new AnalyzeNode(),
            ...(omit(obj, ['steps'])),
            id,
            name: obj.serie || obj.int || obj.uf,
            type: 'sub-steps',
            children: subChildren,
            selectedChild: subChildren.find(({selected: selectedChildren}) => selectedChildren)
        };
    }

    private normalizeSteps(obj: any, isActive: boolean, selected?: number[]): any {
        const id = obj.stepId || obj.intStepId || obj.id;

        return {
            ...new AnalyzeNode(),
            ...obj,
            id,
            name: obj.step || obj.intStep || obj.name,
            type: 'step',
            selected: selected ? selected.some(item => id === item) : (obj.active || isActive)
        };
    }
}
