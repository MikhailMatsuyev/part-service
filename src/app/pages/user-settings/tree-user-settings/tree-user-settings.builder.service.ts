import { Injectable } from '@angular/core';
import { BaseTreeBuilder } from '@core/models/base-class/base-tree';

export class UserSettingsNode {
    constructor(
        public children: UserSettingsNode[] = null,
        public parent: UserSettingsNode = new UserSettingsNode(),
        public name: string = '',
        public selected: boolean = false,
        public id: number = 0,
        public immutable: boolean = false
    ) {}
}

export class UserSettingsFlatNode {
    constructor(
        public name: string,
        public expandable: boolean,
        public level: number,
        public selected: boolean,
        public id?: number,
        public immutable?: boolean,
        public children?: UserSettingsNode[]
    ) { }
}

@Injectable()
export class TreeUserSettingsBuilderService implements BaseTreeBuilder<any> {
    public initialize(data: any): any[] {
        return this.normalize(data);
    }

    private normalize(data: any): any[] {
        return data.map(({ roleId, roleName, tabs }) => {
            const obj = {
                roleName: roleName,
                roleId: roleId,
                tree: this.generateTabs(tabs)
            };

            return obj;
        });
    }

    private generateTabs(tabs: any[]): any {
        return tabs.map(({ tabName, pages }) => {
            const obj = new UserSettingsNode(
                [],
                null,
                tabName,
                false
            );

            this.setChildrenAndSelected(obj, this.generatePages(pages, obj));

            return obj;
        });
    }

    private generatePages(pages: any[], parent: UserSettingsNode): any {
        return pages.map(({ pageId, pageName, hasAccess, immutable }) => new UserSettingsNode(
            [],
            parent,
            pageName,
            hasAccess,
            pageId,
            immutable
        ));
    }

    private setChildrenAndSelected(parent: UserSettingsNode, children: UserSettingsNode[]): void {
        parent.children = children;
        parent.selected = children.some(child => child.selected);
        parent.immutable = children.every(child => child.immutable);
    }

}
