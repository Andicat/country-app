import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'list', pure: false})

export class ListPipe implements PipeTransform {
  transform(value: any, split = ' '): string {
    if (value instanceof Array) {
      return value.join(split);
    }
    return value;
  }
}