import { Sort } from '@angular/material';

export const initialState = {
  dataForTable: [],
  initialDataForTable: [],
  sort: {
    active: 'csName',
    direction: 'asc'
  } as Sort,
  dropdownCS: [],
  dropdownUF: [],
  valuesForValidateUF: [],
  valuesForValidateCS: [],
  selections: []
};
