import { VisNetworkOptions } from 'ngx-vis';

export const networkOptions: VisNetworkOptions = {
    physics: false,
    edges: {
        smooth: {
            enabled: true,
            type: 'discrete',
            roundness: 0
        }
    },
    nodes: {
        shape: 'box',
        borderWidth: 0,
        labelHighlightBold: false,
        font: { color: '#fff' }
    },
    interaction: {
        navigationButtons: true
    }
};
