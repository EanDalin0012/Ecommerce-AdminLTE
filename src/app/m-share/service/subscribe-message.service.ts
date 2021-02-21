import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
@Injectable({
  providedIn: 'root'
})
export class SubscribeMessageService {

  private visitSource =  new BehaviorSubject<any>('');
  visitData = this.visitSource.asObservable();

  constructor() { }

  visitMessage(message: any): void {
    console.log('message', message);
    this.visitSource.next(message);
  }
}
