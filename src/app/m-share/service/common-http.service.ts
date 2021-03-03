import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CommonHttpService {

  constructor(
    private httpService: HttpService
  ) { }

  inquiryCategory(): Promise<Category[]> {
    return new Promise( (resolve, reject) => {
    const api = '/api/category/v1/list';
    this.httpService.Get(api).then(response => {
      if (response) {
        resolve(response);
      } else {
        resolve([]);
      }
      });
    });
  }
}
