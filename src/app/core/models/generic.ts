export enum Levels {
    ComponentSeriesGroups = 0,
    ComponentStep,
    ComponentSeries,
    UserFactorStep,
    UserFactors,
    UserFactorGroups,
    InterfaceGroups,
    InterfaceSeries,
    InterfaceStep
}

export enum LevelTypes {
    Group = 0,
    Serie,
    Step
}

export interface RequestImport {
    type: PageTypes;
    keys: number[];
}

export enum LevelRemove {
    Group = 0,
    Serie,
    Step
}

export enum InfoType {
    Text = 0,
    Image,
    Pdf
}

export enum PageTypes {
    ComponentSeries = 0,
    UserFactors,
    Interfaces
}

export enum InterfaceStepsActs {
    Disable = 'Disable',
    Hide = 'Hide'
}

export const DisplayTypes = [
    {
        id: 0,
        desc: 'Floating point (ex. 123,456,78.9)'
    },
    {
        id: 1,
        desc: 'Floating point 2 (ex. 123\'456\'78.9)'
    },
    {
        id: 2,
        desc: 'Exponential (ex. 1.23456+e7)'
    }
];

export const InterfaceConnectionsOptions = {
    nodes: {
        shape: 'box',
        labelHighlightBold: false,
        font: { color: '#fff' }
    },
    edges: {
        smooth: {
            enabled: true,
            type: 'cubicBezier',
            roundness: 0.5
        }
    },
    physics: false,
    interaction: {
        multiselect: true,
        navigationButtons: true
    }
};
