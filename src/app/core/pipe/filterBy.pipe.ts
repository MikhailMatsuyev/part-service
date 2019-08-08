import { Pipe, PipeTransform } from '@angular/core';
import { memo } from '../decorators/memo';
import { filterBy } from '../../utils/utilsfunc';

@Pipe({
    name: 'filterBy',
    pure: false
})
export class FilterByPipe implements PipeTransform {
    @memo((items, searchText) => items.length + searchText)
    public transform(items: any[], searchText: string): any[] {
        return filterBy(items, searchText);
    }
}
