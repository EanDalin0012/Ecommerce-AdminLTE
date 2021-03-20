
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse  } from '@angular/common/http';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/timeout';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LocalStorage } from '../constants/common.const';
import { ModalService } from './modal.service';
import { Utils } from '../utils/utils.static';
import { CryptoService } from './crypto.service';

declare let CryptoJS: any;

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  timeoutmillsec = 120000;
  longtimeApis = ['MAN1006'];

 constructor(
    private translate: TranslateService,
    private modal: ModalService,
    private cryptoService: CryptoService,
    private modalService: ModalService,
    private router: Router
  ) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    Utils.setSecureStorage(LocalStorage.LAST_EVENT_TIME, String(new Date().getTime()));
    // tslint:disable-next-line: prefer-for-of
    for ( let idx = 0 ; idx < this.longtimeApis.length ; idx++ ) {
      if ( req.url.indexOf(this.longtimeApis[idx]) > 0 ){
        environment.production ? (() => '')() : console.log('timeout sec changed.');
        this.timeoutmillsec = 2 * 60 * 1000;
        break;
    }
  }

    // console.log('new headers', clonedRequest.headers.keys());
    return next.handle(req).timeout(this.timeoutmillsec).map(event => {
      // if (req) {
      //   // const aesInfo: any = Utils.getSecureStorage(AES_INFO.STORE) || {};
      //   if (event instanceof HttpResponse) {
      //     event = event.clone({ body: {
      //       header: event.body.header,
      //       body: 'Hello'
      //     }});
      //   }
      // }

      // if (event instanceof HttpResponse) {
      //   const bodyData = event.clone(event);
      //   console.log(bodyData.headers);
      //   const b = event instanceof HttpResponse;
      //   console.log('data', event.body.header, bodyData.headers.get('Key-Code'));
      //   const data = "Testing";
      //   console.log('data', data);
      //   event = event.clone({ body: {
      //     header: event.body.header,
      //     body: JSON.parse(event.body.body)
      //   }});
      // }

        // if (event instanceof HttpResponse){
        //   // environment.production ? (() => '')() : console.log(' Response Code : ' + apiname);
        //   environment.production ? (() => '')() : console.log(event.body);
        // }
      // "CBK_SES_001"

      return event;
    }).pipe(finalize(() => {
        environment.production ? (() => '')() : console.log('Communicate finish.');
        // $('div.loading').addClass('none') ;
      })
    ).catch((error) => {
      console.log('error', error);
      if ( Number(error.status) === 401) {
        this.modalService.alert({
          title: error.error.error,
          content:  '<p>' + error.error.error_description + '</p>',
          modalClass: ['message-alert testing, open-alert'],
          btnText: 'Confirm',
          callback: (res) => {
            if (res) {
              this.router.navigate(['/login']);
            }
          }
        });
      }
      if (error && error.status === 0) {
          this.modalService.alert({
            content:  '<span>Connection failed</span> status: ' + error.statusText,
            modalClass: ['message-alert testing, open-alert'],
            btnText: 'Confirm',
            callback: (res) => {
              return false;
            }
          });
      }

      let httpErrorCode;
      if (error.status){
        httpErrorCode = error.status;
      } else {
        httpErrorCode = '999999';
      }

      console.log(typeof error.status + ' : ' + error.statusText);
      environment.production ? (() => '')() : console.log(error.name + ' : ' + error.message);
      const data = {
        result: {
          code: 'N',
          message: error.statusText,
          status: error.status,
          httpErrorCode
        }
      };
      const rawData = this.cryptoService.encrypt(JSON.stringify(data));
      return Observable.of(new HttpResponse({body: rawData }));
    }) as any;
  }

  showErrMsg(msgKey: string){
    this.translate.get('COMMON.ERROR').subscribe( message => {
      if (msgKey === 'NOTLOGIN'){
        this.modal.alert({
          content : message[msgKey],
          callback : () => {
            // this.zone.run(() =>  this.router.navigate(['/login']));
          }
        });
      } else {
        this.modal.alert({
          content : message[msgKey]
        });
      }
    });
  }
}
