import * as _ from 'lodash';

// TODO: change sorting (simple sort)
export const sortBy = (array: any[] = [], fieldName: string, direction: boolean): any[] => {
    const directionText = direction ? 'asc' : 'desc';
    return _.orderBy(array, [item => {
        if (typeof item[fieldName] === 'number') {
            return item[fieldName];
        }

        return `${item[fieldName]}`.toLowerCase();
    }], [directionText]);
};

export const sortByMultiply = (array: any[] = [], fieldName: string[], direction: boolean): any[] => {
    const directionText = direction ? 'asc' : 'desc';
    const func = fieldName.map(field => (item => {
        if (typeof item[field] === 'number') {
            return item[field];
        }

        return `${item[field]}`.toLowerCase();
    }));
    return _.orderBy(array, func, [directionText]);
};

export const filterBy = (items: any[], searchText: string): any[] => {
    return items.filter(itemObj =>
        Object.values(itemObj).some(valueObj => `${valueObj}`.includes(searchText))
    );
};

export const isObject = obj => obj === Object(obj);

export const pick = (obj, arr) =>
    arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

export const filterByRecursive = (data, searchText, searchInField = ['group', 'order', 'serie', 'step', 'description']) => {
    return data.reduce((acc, itemObj) => {
        for (const key in itemObj) {
            if (searchInField.includes(key) && `${itemObj[key]}`.toLowerCase().includes(searchText.toLowerCase())) {
                return [...acc, itemObj];
            } else if (Array.isArray(itemObj[key])) {
                const data1 = filterByRecursive(itemObj[key], searchText);
                return data1.length > 0 ? [...acc, { ...itemObj, [key]: data1 }] : acc;
            }
        }

        return acc;
    }, []);
};

export const omit = (obj, arr): any =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

export const isNumberValue = (value: any): boolean => !isNaN(parseFloat(value as any)) && !isNaN(Number(value));

export const sortingDataAccessor = (item, property) => {
    const value: any = item[property];
    return isNumberValue(value) ? Number(value) : value.toLowerCase();
};

export const setActiveOrFirst = (data: any[], activeElement: any): any | null | undefined => {
    let element = null;

    if (data && data.length > 0) {
        if (activeElement) {
            element = data.find(item => item.id === activeElement.id);
        }

        if (!element) {
            element = data[0];
        }
    }
    return element;
};

export const isFunction = value => typeof value === 'function';

export const uuid = (): number => Math.floor(Math.random() * (Date.now() - 1)) + 1;

export const union = (a: any[] | any, b: any[] | any) => Array.from(new Set([...a, ...b]));

export const unionArray = (a: any[]) => Array.from(new Set(a));

export const setRecomendationStatus = (status: number): { rec: boolean, pos: boolean } => {
    switch (status) {
        case 0: {
            return {
                rec: true,
                pos: true,
            };
        }

        case 1: {
            return {
                rec: false,
                pos: true,
            };
        }

        default: {
            return {
                rec: false,
                pos: false,
            };
        }
    }
};

export const setTrimAndLowerCase = (value: string) => value.trim().toLowerCase();

export const setColumsNameAndDisplayedColums = (maxSteps: number) => {
    const arr1 = [{
        header: '',
        key: 'Step'
    }];
    const arr2 = ['Step'];

    for (let i = 1; i <= maxSteps; i++) {
        arr1.push({
            header: `Step ${i}`,
            key: `Step${i}`
        });
        arr2.push(
            `Step${i}`
        );
    }

    return { arr1, arr2 };
};

export const setColumsNameAndDisplayedColumsVerticalTable = (steps: any) => {
    const arr1 = [{
        header: '',
        key: 'Step'
    }];
    const arr2 = ['Step'];

    for (let i = 0; i < steps.series.length; i++) {
        arr1.push({
            header: steps.series[i].uf,
            key: steps.series[i].uf
        });

        arr2.push(
            steps.series[i].uf
        );
    }

    return { arr1, arr2 };
};

export const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);
