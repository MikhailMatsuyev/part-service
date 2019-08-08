import { Pipe, PipeTransform } from '@angular/core';
import { sortBy } from '../../utils/utilsfunc';

@Pipe({
    name: 'sortBy',
    pure: false
})
export class SortByPipe implements PipeTransform {
    public transform(items: any[] = [], fieldName: string, direction = true): any[] {
        const data = items || [];
        return sortBy(data, fieldName, direction);
    }
}
