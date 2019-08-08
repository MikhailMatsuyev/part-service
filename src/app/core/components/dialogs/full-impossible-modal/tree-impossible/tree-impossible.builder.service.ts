import { Injectable } from '@angular/core';
import { BaseTreeBuilder } from '@core/models/base-class/base-tree';
import { omit } from '@utils/utilsfunc';

export class ImpossibleNode {
    children: ImpossibleNode[];
    name: string;
    type: 'step' | 'group' | 'sub-steps';
    id: number;
}

export class ImpossibleFlatNode {
    constructor(
        public name: string,
        public type: any,
        public expandable: boolean,
        public level: number,
        public id: number
    ) { }
}

@Injectable()
export class TreeImpossibleBuilderService extends BaseTreeBuilder<FullyImpossibleComponent[]> {
    public initialize(data: FullyImpossibleComponent[]): ImpossibleNode[] {
        return this.normalizeForTree(data);
    }

    private normalizeForTree(obj: any): any[] {
        // change logic for recursive!!
        return obj.map(item => this.normalizeGroup(item));
    }

    private normalizeGroup(obj: any): any {
        return {
            ...new ImpossibleNode(),
            ...(omit(obj, ['steps'])),
            id: obj.csId,
            name: obj.cs,
            type: 'group',
            children: obj.steps.map(item => this.normalizeSteps(item))
        };
    }

    private normalizeSteps(obj: any): any {
        return {
            ...new ImpossibleNode(),
            ...(omit(obj, ['ufList'])),
            id: obj.csvId,
            name: obj.csv,
            type: 'step',
            children: obj.ufList.map(item => this.normalizeSubSteps(item))
        };
    }

    private normalizeSubSteps(obj: any): any {
        return {
            ...new ImpossibleNode(),
            ...obj,
            id: obj.ufId,
            name: obj.uf,
            type: 'sub-steps'
        };
    }
}
