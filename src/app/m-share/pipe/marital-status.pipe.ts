import { Pipe, PipeTransform } from '@angular/core';
import { maritalStatus } from '../constants/common.const';

@Pipe({
  name: 'maritalStatus'
})
export class MaritalStatusPipe implements PipeTransform {

  transform(value: string): string {
    let v = '';
    maritalStatus.forEach(element => {
      if (value === element.code) {
        v = element.text;
      }
    });
    return v;
  }

}
