import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(value: string): string {
    return '<img alt="" src="http://localhost:8080/api/web/reader/v1/read/448648c1-2bb1-4506-a1ad-d80af03db2c4-20201105073121"/>';
  }

}
