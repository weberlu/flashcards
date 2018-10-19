import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {
  transform(data: Object) {
    const pairs: Array<Object> = [];
    Object.keys(data).forEach(key => {
      pairs.push({ key: key, value: data[key] });
    });
    return pairs;
  }
}
