import { flattenDeep } from 'lodash';
import { BaseTreeBuilder } from '@core/models/base-class/base-tree';
import { Injectable } from '@angular/core';
import { omit } from '@utils/utilsfunc';

export class ComponentsNode {
    children: ComponentsNode[];
    name: string;
    type: 'csg' | 'cs' | 'csv';
    info: boolean;
    selected?: boolean;
    id?: number;
    groupId?: number;
    blocked?: boolean;
    blockAct?: boolean;
    icon?: string;
    rec?: boolean;
    display?: boolean;
    color?: string;
    hasInterface?: boolean;
    groupName?: string;
    perfTitles?: any[];
    perfValues?: any[];
    inactive?: boolean;
    loading?: boolean;
}

export class ComponentsFlatNode {
    constructor(
        public name: string,
        public type: any,
        public expandable: boolean,
        public level: number,
        public id: number,
        public selected: boolean,
        public info: boolean,
        public groupId: number,
        public blocked: boolean,
        public hasInterface: boolean,
        public blockAct: boolean,
        public icon: string,
        public rec: boolean,
        public display: boolean,
        public color: string,
        public groupName: string,
        public perfTitles: any[],
        public perfValues: any[],
        public inactive: boolean,
        public children: ComponentsNode[],
        public loading: boolean
    ) { }
}

@Injectable()
export class TreeElementsBuilderService extends BaseTreeBuilder<csgList[]> {
    public isShowAllMode = false;

    public initialize(data: csgList[]): ComponentsNode[] {
        return flattenDeep(this.normalizeForTree(data));
    }

    private normalizeForTree(obj: any): any[] {
        // change logic for recursive!!
        return obj.map(item => {
            return item.csgId === -1
                ? item.series.map(series => this.normalizeSeries(series))
                : this.normalizeGroup(item);
        });
    }

    private normalizeGroup(obj: any): any {
        return {
            ...new ComponentsNode(),
            ...(omit(obj, ['series'])),
            id: obj.csgId,
            name: obj.csg,
            type: 'csg',
            children: obj.series.map(item => this.normalizeSeries(item))
        };
    }

    private normalizeSeries(obj: csgSeries): any {
        let children = obj.steps.map(item => this.normalizeSteps({
            ...item,
            groupId: obj.csId,
            groupName: obj.cs,
            perfTitles: obj.perfTitles
        })).filter(item => {
            if (this.isShowAllMode) {
                return item.display || item.inactive;
            }

            return item.display && !this.isBlockedHideNode(item);
        });
        const isSelecteMode = children.some(({ selectedMode }) => selectedMode);
        children = children
            .filter(item => {
                if (!isSelecteMode) {
                    return true;
                }

                return item.selectedMode === undefined || item.selectedMode;
            });
        // TODO: add total get in perfValues data, and check flag perfTitle(total)

        return {
            ...new ComponentsNode(),
            ...(omit(obj, ['steps'])),
            id: obj.csId,
            name: obj.cs,
            type: 'cs',
            children,
            perfValues: children.some(item => item.perfValues && item.perfValues.length > 0)
        };
    }

    private normalizeSteps(obj: any): any {
        return {
            ...new ComponentsNode(),
            ...obj,
            id: obj.csvId,
            name: obj.csv,
            type: 'csv'
        };
    }

    private isBlockedHideNode(node: ComponentsFlatNode): boolean {
        return this.isBlockedNode(node).hidden;
    }

    private isBlockedNode(node: ComponentsFlatNode): any {
        return node.blockAct
            ? { hidden: node.blocked }
            : { disabled: node.blocked };
    }
}
