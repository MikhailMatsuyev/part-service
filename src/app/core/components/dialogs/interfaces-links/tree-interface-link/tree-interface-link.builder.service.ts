import { Injectable } from '@angular/core';
import { BaseTreeBuilder } from '@core/models/base-class/base-tree';
import { omit } from '@utils/utilsfunc';

export class InterfaceLinkNode {
    children: InterfaceLinkNode[];
    name: string;
    type: 'step' | 'group';
    groupId?: number;
    selected?: boolean;
    id?: number;
    intLinks?: any[];
}

export class InterfaceLinkFlatNode {
    constructor(
        public name: string,
        public type: any,
        public expandable: boolean,
        public level: number,
        public id: number,
        public selected: boolean,
        public intLinks: any[],
        public groupId: number
    ) { }
}

@Injectable()
export class TreeInterfaceLinkBuilderService extends BaseTreeBuilder<CSSteps[]> {
    public initialize(data: CSSteps[]): InterfaceLinkFlatNode[] {
        return this.normalizeForTree(data);
    }

    private normalizeForTree(obj: any): any[] {
        // change logic for recursive!!
        return obj.map(item => this.normalizeGroup(item));
    }

    private normalizeGroup(obj: any): any {
        return {
            ...new InterfaceLinkNode(),
            ...(omit(obj, ['steps'])),
            id: obj.serieId,
            name: obj.serie,
            type: 'group',
            children: obj.steps.map(item => this.normalizeSteps({ ...item, groupId: obj.serieId}))
        };
    }

    private normalizeSteps(obj: any): any {
        return {
            ...new InterfaceLinkNode(),
            ...obj,
            id: obj.stepId,
            name: obj.step,
            type: 'step',
        };
    }
}
