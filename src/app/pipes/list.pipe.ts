import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'list', pure: false })
export class ListPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(value: any, split = ', '): string | any {
    if (value instanceof Array) {
      return value.join(split);
    }

    return value;
  }
}
