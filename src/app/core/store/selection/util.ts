import { flattenDeep } from 'lodash';

export const getActiveSteps = (array: csgList[]): number[] => {
    return flattenDeep(array.map(({ series }) =>
        series.map(({ steps }) =>
            steps.filter(({ selected }) => selected)
        ))
    ) || [];
};

export const guuid = () => {
    return Math.random().toString().slice(2, 8);
};
