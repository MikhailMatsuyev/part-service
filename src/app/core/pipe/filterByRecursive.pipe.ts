import { Pipe, PipeTransform } from '@angular/core';
import { filterByRecursive } from '../../utils/utilsfunc';

@Pipe({
    name: 'filterByRecursive',
    pure: false
})
export class FilterByRecursivePipe implements PipeTransform {
    public transform(items: any[], searchText: string): any[] {
        return (searchText && searchText.length > 0) ? filterByRecursive(items, searchText) : items;
    }
}
