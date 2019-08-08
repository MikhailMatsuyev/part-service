import { VisEdges, VisNodes } from 'ngx-vis';
import { flatten } from 'lodash';


export const interfaceNodeSize = 300;
export const palleteVis = {
    node: '#4C6F98',
    nodeTransparent: '#7C9CBF',
    current: '#565555',
    currentTransparent: '#7D7D7D'
};

export abstract class BaseConections {
    public componentGroup: any;
    public visNetworkData: {edges: VisEdges, nodes: VisNodes} = null;
    public isFullscreenMode: boolean;
    public selectedNode: number;
    private interfaceNetworkNodeCounter = 0;

    public handleNetWorkClick({ nodes }: any): void {
        this.selectedNode = nodes[0];
        const data = this.mapNodes(this.visNetworkData.nodes.getAll(), this.selectedNode);
        this.visNetworkData.nodes.update(data);
    }

    public handleDoubleClick(obj: any): void {
        if (obj.nodes.length > 0) {
            const { nodes: [group] } = obj;

            if (group !== this.componentGroup) {
                this.componentGroup = group;
                this.changeComponentsSeries(group);
            }
        }
    }

    public mapNodes(obj: any[], selected?: number): any[] {
        return obj.map(item => this.mapNode(item, selected));
    }

    public mapNode({ id, name, label }: any, selected?: number): any {
        return {
            id,
            label: name || label,
            color: (!selected || selected === id) ? this.setColorGroup(id) : this.setColorTransparentGroup(id),
            widthConstraint: { minimum: 120, maximum: 120 },
        };
    }

    public mapInterfaceNodes(interfaces: any[], components: any[], selected?: number) {
        this.interfaceNetworkNodeCounter = 0;
        return [
            ...flatten(components.map(component => this.mapInterfaceNetworkComponentNode(component))),
            ...interfaces.map(interfaceNode => this.mapInterfaceNetworkInterfaceNode(interfaceNode, interfaces.length))
        ];
    }

    public mapInterfaceNetworkComponentNode({ id, name, steps }: any, selected?: number ): any[] {
        return [
                {
                id: `cs-${id}`,
                label: name,
                widthConstraint: { minimum: interfaceNodeSize, maximum: interfaceNodeSize },
                color:  palleteVis.node,
                x: 0,
                y: 50 * this.interfaceNetworkNodeCounter++
            },
            ...steps.map(step => this.mapInterfaceNetworkComponentStepNode(step))
        ];
    }

    public mapInterfaceNetworkComponentStepNode({ id, name }: any, selected?: number ): any {
        return {
            id: `comp-${id}`,
            label: name,
            widthConstraint: { minimum: interfaceNodeSize, maximum: interfaceNodeSize },
            color:  (!selected || selected === id) ? this.setColorGroup(id) : this.setColorTransparentGroup(id),
            x: 50,
            y: 50 * this.interfaceNetworkNodeCounter++
        };
    }

    public mapInterfaceNetworkInterfaceNode({ id, name }: any, length: number, selected?: number ): any {
        return {
            id: `int-${id}`,
            label: name,
            widthConstraint: { minimum: interfaceNodeSize, maximum: interfaceNodeSize },
            color:  (!selected || selected === id) ? this.setColorGroup(id) : this.setColorTransparentGroup(id),
            x: 600,
            y: 50 * this.interfaceNetworkNodeCounter++ + (((this.interfaceNetworkNodeCounter * 50) - (length * 50)) / 2)
        };
    }

    public setColorGroup(id: number): string {
        return this.componentGroup === id ? palleteVis.current : palleteVis.node;
    }

    public setColorTransparentGroup(id: number): string {
        return this.componentGroup === id ? palleteVis.currentTransparent : palleteVis.nodeTransparent;
    }

    public handleFullScreen(value: boolean): void {
        this.isFullscreenMode = value;
    }

    public abstract changeComponentsSeries(data: any): void;
}
