export const mapRows = ({ ufv, csv, rows, viewType, uf, cs, defaultRows }, isSwapHeaders) => {
    const data = {};
    const columns = [];
    // TODO: refactor mapper
    const rowsArray = (defaultRows && Array.isArray(defaultRows)) ? defaultRows : rows;
    rowsArray.forEach(({ cols }, index) => {
        cols.forEach((item, indexCols) => {
            const [ufvRows] = ufv.filter((items: any) => items.Id === item.ufvId).map(({ Name }: any) => Name);
            const [csvRows] = csv.filter((items: any) => items.Id === item.csvId).map(({ Name }: any) => Name);
            const rowsIndex = !!viewType ? index : indexCols;

            if (!data[item.ufvId]) {
                data[item.ufvId] = {};
            }

            if (!columns[item.ufvId]) {
                columns[rowsIndex] = { name: 'col' + rowsIndex, header: csvRows };
            }

            data[item.ufvId] = { ...data[item.ufvId], ['col' + rowsIndex]: item, csvRows, ufvRows, isSwapHeaders };
        });
    });

    return (<any>{
        rows: Object.values(data),
        ufv,
        csv,
        viewType,
        columns,
        uf,
        cs,
        defaultRows: defaultRows || rows,
    }) || {};
};

export const mapColumns = ({ defaultRows, ufv, csv, rows, uf, cs, viewType }, isSwapHeaders) => {
    const data = {};
    const columns = [];
    const rowsArray = (defaultRows && Array.isArray(defaultRows)) ? defaultRows : rows;
    rowsArray.forEach(({ cols }, index) => {
        cols.forEach((item, indexCols) => {
            const [ufvRows] = ufv.filter((items: any) => items.Id === item.ufvId).map(({ Name }: any) => Name);
            const [csvRows] = csv.filter((items: any) => items.Id === item.csvId).map(({ Name }: any) => Name);
            const rowsIndex = !viewType ? index : indexCols;

            if (!data[item.csvId]) {
                data[item.csvId] = {};
            }

            if (!columns[item.csvId]) {
                columns[rowsIndex] = { name: 'col' + rowsIndex, header: ufvRows };
            }

            data[item.csvId] = { ...data[item.csvId], ['col' + rowsIndex]: item, csvRows, ufvRows, isSwapHeaders };
        });
    });

    return {
        columns,
        uf,
        cs,
        ufv,
        csv,
        viewType,
        rows: Object.values(data)
    };
};
