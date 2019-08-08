import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'getArrOfKeys', pure: false })
export class GetArrOfKeys implements PipeTransform {
    public transform(item: any = {}, bottomHeaderTitlesSettings: any): any {
        const buffer = [];
        Object.keys(item).forEach(key => {
            const element = bottomHeaderTitlesSettings.find(
              items => items.name === key
            );
            if (element) {
                buffer[element.order] = key;
            }
        });
        return buffer;
    }
}
