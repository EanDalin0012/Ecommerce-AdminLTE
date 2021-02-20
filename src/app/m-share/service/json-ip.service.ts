import { LocalStorage } from './../constants/common.const';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StoreInMemoryModel } from '../model/store-in-memory-model';

@Injectable({
  providedIn: 'root'
})
export class JsonIPService {
  storeInMemoryModel = new StoreInMemoryModel();
  constructor(private http: HttpClient) { }

  public jsonIp(): void {
    this.http.get<{ip: string}>('https://jsonip.com').subscribe( data => {
        const ipAddress = data as any;
        this.storeInMemoryModel.set(LocalStorage.networkIP, ipAddress.ip);
    });
}
}
