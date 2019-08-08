import { sortBy, sortByMultiply } from '@utils/utilsfunc';

export function mapGroupId(data: any, filtersData: any[], Group: any, isActiveConfirmButton: boolean): number {
    if (data.isNewGroup) {
        if (Group && typeof Group === 'string') {
            const findElement = filtersData.find(item => item.group === Group);
            return findElement ? findElement.groupId : -1;
        }

        if (typeof Group === 'object') {
            return Group.groupId;
        }
    } else {
        return (isActiveConfirmButton && typeof Group === 'object' && Group)
            ? Group.groupId
            : data.groupId;
    }
}

export function mapGroup(id: number, Group: any, isActiveConfirmButton: boolean, GroupOrderPriority: string): any {
    const model: any = {};

    if (Group && !isActiveConfirmButton) {
        const name = typeof Group === 'string' ? Group.trim() : Group.group.trim();
         model.group = {
            id,
            name,
            priority: parseFloat(GroupOrderPriority)
        };
    }
    return model;
}

export function mergeGroupArrays(source: UsersFactors[], dest: UsersFactors[]): UsersFactors[] {
    const allSeries = source.reduce((acc, item) => {
        return [
            ...acc,
            ...item.series
        ];
    }, []);

    return dest.map(group => {
        const sourceGroup = source.find(i => i.groupId === group.groupId);

        return {
            ...group,
            isCollapsed: sourceGroup && sourceGroup.isCollapsed,
            series: group.series
                .map(serie => {
                    const sourceSerie = allSeries.find(i => i.serieId === serie.serieId);
                    if (!sourceSerie) {
                        return serie;
                    }

                    return {
                        ...serie,
                        isActiveGroup: sourceSerie.isActiveGroup
                    };
                })
        };
    });
}

export function mapSeries(payload: any): any[] {
    return payload.map(item => ({
        ...item,
        series: sortByMultiply(item.series, ['order', 'serie'], true),
        factorDirection: {
            nameField: ['order', 'serie'],
            direction: item.factorDirection !== undefined ? !item.factorDirection.direction : true
        }
    }));
}

export function sortSeries(series: any[], groupId: number, nameField: any): any[] {
    return series.map(item => {
        if (item && item.groupId && item.groupId === groupId) {
            const factorDirection = {
                nameField,
                direction: item.factorDirection !== undefined ? !item.factorDirection.direction : true
            };
            return {
                ...item,
                series: sortByMultiply([...item.series], nameField, factorDirection.direction),
                factorDirection
            };
        }

        return item;
    });
}

export function showGroups(seriesGroup: any[], groupId: number, serieId: number): any[] {
    return seriesGroup.map(item => {
            if (item && item.groupId === groupId) {
                const series = item.series.map(serieItem => {
                    if (serieItem.serieId === serieId) {
                        return {
                            ...serieItem,
                            isActiveGroup: !serieItem.isActiveGroup
                        };
                    }

                    return serieItem;
                });

                return {
                    ...item,
                    series
                };
            }

            return item;
        });
}

export function collapseGroups(seriesGroup: any[], payload: any, isCollapsed: boolean): any {
    return seriesGroup.map(item => {
        const series = item.series.map(serieItem => {
            return {
                ...serieItem,
                isActiveGroup: isCollapsed
            };
        });

        return {
            ...item,
            isCollapsed: payload === undefined ? !isCollapsed : item.isCollapsed,
            series
        };
    });
}

export function addNewStep(groups: any[], groupId: number, serieId: number): any[] {
    return groups.map(item => {
        if (groupId === item.groupId) {
            const series = item.series.map(serieItem => {
                if (serieId === serieItem.serieId) {
                    return {
                        ...serieItem,
                        steps: [...serieItem.steps, {
                            stepId: null,
                            step: '',
                            order: serieItem.steps.length
                        }]
                    };
                }

                return serieItem;
            });

            return {
                ...item,
                series
            };
        }

        return item;
    });
}

export function removeStep(groups: any[], groupId: number, serieId: number, order: number): any[] {
    return groups.map(item => {
        if (groupId === item.groupId) {
            const series = item.series.map(serieItem => {
                if (serieId === serieItem.serieId) {
                    return {
                        ...serieItem,
                        steps: [
                            ...serieItem.steps.slice(0, order),
                            ...serieItem.steps.slice(order + 1)
                        ]
                    };
                }

                return serieItem;
            });

            return {
                ...item,
                series
            };
        }

        return item;
    });
}

export function swapSteps(groups: any[], payload: any): any[] {
    return groups.map(item => {
        const groupsData = payload.find(actionItem => item.groupId === actionItem.groupId);

        if (groupsData) {
            const seriesData = item.series.map(serieItem => {
                if (serieItem.serieId) {
                    const element = groupsData.series.find(seriesItems => seriesItems.serieId === serieItem.serieId);

                    if (element) {
                        return {
                            ...serieItem,
                            steps: element.steps
                        };
                    }
                }

                return serieItem;
            });

            return {
                ...item,
                series: seriesData
            };
        }

        return item;
    });
}

export function selectStep(seriesSelection: any[], payload: any): any {
    const userSelection = seriesSelection.find(item => item.stepId === payload.stepId);
    let newSeriesSelection;

    if (userSelection) {
        newSeriesSelection = seriesSelection.filter(item => item.stepId !== payload.stepId);
    } else {
        newSeriesSelection = [...seriesSelection, { ...payload }];
    }
    return newSeriesSelection;
}

export function insertStep(groups: any[], order: number, data: any): any[] {
    return groups.map(item => {
        const groupsData = data.find(actionItem => item.groupId === actionItem.groupId);

        if (groupsData) {
            const seriesData = item.series.map(serieItem => {
                if (serieItem.serieId) {
                    const element = groupsData.series.find(seriesItems => seriesItems.serieId === serieItem.serieId);

                    if (element) {
                        return {
                            ...serieItem,
                            steps: [
                                ...element.steps.slice(0, order),
                                {
                                    stepId: null,
                                    step: '',
                                    order
                                },
                                ...element.steps.slice(order)
                            ]
                        };
                    }
                }

                return serieItem;
            });

            return {
                ...item,
                series: seriesData
            };
        }

        return item;
    });
}

export function createGroup(groups: any[], serie: any, group: any, payloadData: any, direction: boolean): any[] {
    const idFactor = (payloadData && payloadData.serie) ? payloadData.serie.idGroup : null;
    const idGroup = (group && group.groupId) ? group.groupId : (idFactor || -1);
    let seriesGroup = groups.map(item => {
        const element = item.series.find(itemSeries => (serie && itemSeries.serieId === serie.serieId));

        if (item.groupId !== idGroup && element) {
            return {
                ...item,
                series: item.series.filter(itemSeries => (serie && itemSeries.serieId !== serie.serieId))
            };
        }

        if (item.groupId !== idGroup) {
            return item;
        }

        let series = [];
        if (element) {
            series = item.series.map(itemSeries => {
                if (serie && (itemSeries.serieId === serie.serieId)) {
                    return {
                        ...itemSeries,
                        ...serie,
                        steps: itemSeries.steps,
                    };
                }

                return itemSeries;
            });
        } else {
            series = [
                ...item.series,
                {
                    ...serie,
                    steps: [{
                        stepId: null,
                        step: '',
                        order: 0
                    }]
                }
            ];
        }

        const nameSort = (series[0] && series[0].factorDirection) ? series[0].factorDirection.nameField : 'order';
        const directionSort = (series[0] && series[0].factorDirection) ? series[0].factorDirection.direction : true;

        return {
            ...item,
            series: sortBy(series, nameSort, directionSort)
        };
    });

    const elements = seriesGroup.find(item => item.groupId === idGroup);

    if (!elements && group) {
        let series = (group.series.length === 0 && serie)
            ? [{
                ...serie,
                steps: [{
                    stepId: null,
                    step: '',
                    order: 0
                }]
            }]
            : group.series;
        series = sortBy(series, 'order', true);
        seriesGroup = [...seriesGroup, {
            ...group,
            series
        }];
    } else if (!group && idGroup === -1) {
        const elementIndex = groups.find(item => item.groupId === idGroup);

        if (!elementIndex) {
            seriesGroup = [...seriesGroup, {
                group: '',
                groupId: -1,
                order: 0,
                series: [serie]
            }];
        }
    }

    return sortByMultiply([...seriesGroup], ['order', 'group'], direction);
}

export function selectedGroup(initialGroupsSelection: any[], payload: any): any {
    let groupsSelection = [];
    const { serieId, factors, isSerieSelected, isMainGroup } = payload;
    const selection = initialGroupsSelection.some(item => item && (isSerieSelected
        ? (item.serieId === serieId)
        : (item.serieId ? false : item.factors.groupId === factors.groupId && item.isMainGroup === isMainGroup)
    ));

    if (selection) {
        groupsSelection = initialGroupsSelection.filter(item => {
            return item && (isSerieSelected
                ? (item.serieId !== serieId)
                : (item.serieId ||
                    !(item.factors.groupId === factors.groupId && (isMainGroup || item.isMainGroup === isMainGroup))));
        });

        if (isMainGroup || !isSerieSelected) {
            groupsSelection = groupsSelection.filter(item =>
                !(item.serieId && factors.series.some(items => items.serieId === item.serieId)));
        }

        if (isSerieSelected) {
            groupsSelection = groupsSelection.filter(item =>
                item.isSerieSelected || item.isMainGroup || !item.factors.series.some(i => i.serieId === serieId));
        }
    } else {
        groupsSelection = [...initialGroupsSelection, payload];

        if (isMainGroup) {
            groupsSelection.push({ ...payload, isMainGroup: false });
        }

        if (isMainGroup || !isSerieSelected) {
            const factorsSeries = factors.series
                ? factors.series
                    .filter(item => !initialGroupsSelection.some(i => i.serieId && i.serieId === item.serieId))
                    .map(item => ({ ...item, isSerieSelected: true }))
                : [];
            groupsSelection = [...groupsSelection, ...factorsSeries];
        }
    }

    return groupsSelection;
}

export function removeGroupStep(groups: any[], payload): any[] {
    return groups.map(item => {
        const groupsData = payload.find(actionItem => item.groupId === actionItem.groupId);

        if (groupsData) {
            const seriesData = item.series.map(serieItem => {
                if (serieItem.serieId) {
                    const element = groupsData.series.find(seriesItems => seriesItems.serieId === serieItem.serieId);

                    if (element) {
                        return {
                            ...serieItem,
                            steps: element.steps
                        };
                    }
                }

                return serieItem;
            });

            return {
                ...item,
                series: seriesData
            };
        }

        return item;
    });
}

export function saveGroupStep(groups: any[], group: any, serie: any, step: any) {
    return groups.map(item => {
        if (group.groupId === item.groupId) {
            const series = item.series.map(seriesItem => {
                if (seriesItem.serieId === serie.serieId) {
                    const steps = seriesItem.steps.map(itemStep => {
                        if (itemStep.order === step.order) {
                            return step;
                        }

                        return itemStep;
                    });

                    return {
                        ...seriesItem,
                        steps
                    };
                }

                return seriesItem;
            });

            return {
                ...item,
                series
            };
        }

        return item;
    });
}

export function changeGroupPlace(groups: any[], payload: any) {
    const newGroups = groups.map(item => {
        const element = payload.find(itemAction => itemAction.groupId === item.groupId);

        if (element) {
            return {
                ...item,
                ...element
            };
        }

        return item;
    });

    return mergeGroupArrays(groups, newGroups);
}

export function changeGroupInfo(groups: any[], payload: any, direction: boolean): any {
    const { group, serie } = payload;
    let seriesGroup;

    if (group) {
        seriesGroup = groups.map(item => {
            if (item.groupId === group.groupId) {
                const nameField = (item && item.factorDirection) ? item.factorDirection.nameField : ['order', 'serie'];
                const directions = (item && item.factorDirection) ? item.factorDirection.direction : true;

                return {
                    ...item,
                    ...group,
                    series: sortByMultiply(item.series, nameField, directions)
                };
            }

            return item;
        });
    }

    if (serie) {
        seriesGroup = groups.map(item => {
            const series = item.series.map(itemSeries => {
                if (serie && itemSeries.serieId === serie.serieId) {
                    return {
                        ...itemSeries,
                        ...serie,
                        steps: itemSeries.steps
                    };
                }
                return itemSeries;
            });

            const nameField = (item && item.factorDirection) ? item.factorDirection.nameField : ['order', 'serie'];
            const directions = (item && item.factorDirection) ? item.factorDirection.direction : true;

            return {
                ...item,
                series: sortByMultiply(series, nameField, directions)
            };
        });
    }

    return sortBy(seriesGroup, 'order', direction);
}

export function collapseGroup(groups: any[], payload: any): any[] {
    const { groupId, isCollapsed, isCreateGroup } = payload;

    return groups.map(item => {
        if (item.groupId === groupId) {
            return {
                ...item,
                isCollapsed: item.isCollapsed !== undefined ? !item.isCollapsed || isCreateGroup : isCollapsed
            };
        }

        return item;
    });
}

export function editGroupStep(groups: any[], payload: any): any[] {
    const { Group, Serie, Step } = payload;

    return groups.map(item => {
        if (Group.groupId === item.groupId) {
            const series = item.series.map(itemSeries => {
                if (itemSeries.serieId === Serie.serieId) {
                    const steps = itemSeries.steps.map(itemStep => {
                        if (itemStep.stepId === Step.stepId) {
                            return Step;
                        }

                        return itemStep;
                    });

                    return {
                        ...itemSeries,
                        steps
                    };
                }

                return itemSeries;
            });

            return {
                ...item,
                series
            };
        }

        return item;
    });
}

