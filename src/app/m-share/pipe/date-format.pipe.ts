import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: string): unknown {
    if(value) {
      const formateValue = value.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
      const format = 'DD-MMM-YYYY';
      const dateTime = moment(formateValue).format(format);
      return dateTime;
    }
    return null;
  }

}
