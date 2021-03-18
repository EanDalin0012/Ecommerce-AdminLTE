import { Pipe, PipeTransform } from '@angular/core';
import { gender } from '../constants/common.const';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(value: string): string {
    let v = '';
    gender.forEach(element => {
     if (element.code === value) {
      v = element.text;
     }
   });
    return v;
  }

}
