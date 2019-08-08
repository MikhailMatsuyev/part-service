import { flattenDeep } from 'lodash';
import { Injectable } from '@angular/core';
import { omit } from '@utils/utilsfunc';
import { BaseTreeBuilder } from '@core/models/base-class/base-tree';

export class UserFactorNode {
    children: UserFactorNode[];
    name: string;
    type: 'ufg' | 'uf' | 'ufv';
    info: boolean;
    selected?: boolean;
    id?: number;
    groupId?: number;
    selectedChild?: any;
}

export class UserFactorFlatNode {
    constructor(
        public name: string,
        public type: any,
        public expandable: boolean,
        public level: number,
        public id: number,
        public selected: boolean,
        public info: boolean,
        public groupId: number,
        public selectedChild: any
    ) { }
}

@Injectable()
export class TreeUserFactorBuilderService extends BaseTreeBuilder<UfTree[]> {
    public initialize(data: UfTree[]): UserFactorNode[] {
        return flattenDeep(this.normalizeForTree(data));
    }

    private normalizeForTree(obj: any): any[] {
        // change logic for recursive!!
        // -1 empty group
        return obj.map(item => {
            return item.ufgId === -1
                ? item.series.map(series => this.normalizeSeries(series))
                : this.normalizeGroup(item);
        });
    }

    private normalizeGroup(obj: UfTree): any {
        return {
            ...new UserFactorNode(),
            ...(omit(obj, ['series'])),
            id: obj.ufgId,
            name: obj.ufg,
            type: 'ufg',
            children: obj.series.map(item => this.normalizeSeries(item))
        };
    }

    private normalizeSeries(obj: UfTreeSerie): any {
        const children = obj.steps.map(item => this.normalizeSteps({ ...item, groupId: obj.ufId }));
        return {
            ...new UserFactorNode(),
            ...(omit(obj, ['steps'])),
            id: obj.ufId,
            name: obj.uf,
            type: 'uf',
            children,
            selectedChild: children.find(({selected}) => selected)
        };
    }

    private normalizeSteps(obj: any): any {
        return {
            ...new UserFactorNode(),
            ...obj,
            id: obj.ufvId,
            name: obj.ufv,
            type: 'ufv',
        };
    }
}
