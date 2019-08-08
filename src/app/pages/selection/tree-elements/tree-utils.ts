import { unionArray } from '@utils/utilsfunc';

export const sortPerformance = function (arr, sortArray) {
    if (arr.some((item) => item.perfValues === undefined)) {
        return arr;
    }

    const { data, elements, oldElements } = checkActivePerformance(arr, sortArray, 0);
    if (!elements) {
        if (oldElements) {
            const oldPosition = (oldElements && oldElements.position);

            return isNaN(oldPosition)
                ? data
                : data.slice(0, oldPosition);
        }
        return data;
    }

    const dataValue = data.map(({ activeValue }) => Number(activeValue));
    const maxValue = Math.max(...dataValue);
    const minValue = Math.min(...dataValue);
    const isEqual = minValue === maxValue;
    const dataSort = data.sort((a, b) => {
        const direction = elements.direction;
        const normalizeA = Number(a.activeValue);
        const normalizeB = Number(b.activeValue);
        return direction ? normalizeB - normalizeA : normalizeA - normalizeB;
    }).map(({ ref, activeValue }) => {
        let cellColor;
        if (isEqual) {
            cellColor = 'default';
        } else {
            const activeValueNumber = Number(activeValue);
            cellColor = activeValueNumber === maxValue ? 'max' : activeValueNumber === minValue ? 'min' : 'default';
        }

        return {
            ...ref,
            cellColor: setColorCellTable(cellColor)
        };
    });

    const position = (oldElements && oldElements.position) || elements.position;

    return isNaN(position)
        ? dataSort
        : dataSort.slice(0, position);
};

export const sortPerformanceTable = (arr, idTable, direction) => {
    if (!idTable) {
        return arr;
    }

    const { data } = checkActivePerformance(arr, [{ performance: idTable }], 0);

    return data.sort((a, b) => {
        const normalizeA = Number(a.activeValue);
        const normalizeB = Number(b.activeValue);
        return direction ? normalizeB - normalizeA : normalizeA - normalizeB;
    }).map(({ ref }) => ({...ref}));
};

export const findActivePerformance = (arr, sortArray, activeIndex = 0) => {
    let elements;
    let index;
    for (let i = activeIndex; i < sortArray.length; i++) {
        elements = arr.find(({ perfValues }) => perfValues.some(({ perfId }) => sortArray[i] && perfId === sortArray[i].performance));
        if (elements) {
            elements = sortArray[i];
            index = i;
            break;
        }
    }

    return {
        elements,
        index
    };
};

export const checkActivePerformance = (arr, sortArray, sortIndex = 0, oldElements?) => {
    const { elements, index } = findActivePerformance(arr, sortArray, sortIndex);

    if (!elements) {
        return {data: arr, elements, oldElements};
    }

    const data = arr.map(item => {
        const activeValue = item.perfValues.find(items => items.perfId === elements.performance);
        return {
            activeValue: (activeValue && activeValue.val) || 0,
            ref: item
        };
    });

    const activeArray = unionArray(data.map(({ activeValue }) => Number(activeValue)));

    if (activeArray.length === 0 || activeArray.length === 1) {
        return checkActivePerformance(arr, sortArray, index + 1, elements);
    }

    return {data, elements, oldElements};
};

export const setColorCellTable = (isMaxValue = false, isMinValue: boolean = false): string => {
    if (isMaxValue) {
        return '#FFE4E4';
    }

    if (isMinValue) {
        return '#D8F6D2';
    }

    return 'transparent';
};
