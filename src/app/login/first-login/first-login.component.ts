import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Utils } from '../../m-share/utils/utils.static';
import { LocalStorage, ResponseStatus, ButtonRoles } from '../../m-share/constants/common.const';
import { FirstLogIn } from '../../m-share/model/first-log';
import { HttpService } from '../../m-share/service/http.service';
import { Message } from '../../m-share/model/message';
import { Router } from '@angular/router';
import { ModalService } from '../../m-share/service/modal.service';
import { AuthenticationService } from '../../m-share/service/authentication.service';

@Component({
  selector: 'app-first-login',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.css']
})
export class FirstLoginComponent implements OnInit {

  firstLogIn = new FirstLogIn();
  constructor(
    private titleService: Title,
    private translate: TranslateService,
    private router: Router,
    private modalService: ModalService,
    private authenticationService: AuthenticationService,
    private httpService: HttpService) {
    this.titleService.setTitle(this.translate.instant('FirstLogin.Label.FirstLogin'));
   }

  ngOnInit(): void {
    const userInfo = Utils.getSecureStorage(LocalStorage.USER_INFO);
    if (userInfo) {
      this.firstLogIn.userName = userInfo.user_name;
    }
  }

  remember(): void {

  }

  enterLoginHandler(event): void {

  }

  tapfocus(event): void {

  }

  change(): void {
    if ( this.isValid() === true) {
      const api = '/api/user/v1/first/login';
      this.httpService.Post(api, this.firstLogIn).then(response => {
        console.log('responseresponseresponseresponse', response);
        const responseData = response as Message;
        if ( responseData && responseData.status === ResponseStatus.Y) {
          this.logout();
        }
      });
    }
  }

  isValid(): boolean {
    if (!this.firstLogIn.userName || this.firstLogIn.userName.trim() === '') {
          const message = this.translate.instant('FirstLogin.Message.InvalidUserName');
          this.modalService.alert({
            content:  '<span>' + message + '</span>',
            modalClass: ['message-alert testing, open-alert'],
            btnText: 'Confirm',
            callback: (res) => {
            }
          });
          return false;
    } else if (!this.firstLogIn.newPassword){
      this.modalService.alert({
        content:  '<span>' + this.translate.instant('FirstLogin.Message.InvalidNewPassword') + '</span>',
        modalClass: ['message-alert testing, open-alert'],
        btnText: 'Confirm',
        callback: (res) => {
        }
      });
      return false;
    } else if (!this.firstLogIn.confirmPassword){
      this.modalService.alert({
        content:  '<span>' + this.translate.instant('FirstLogin.Message.InvalidConfirmPassword') + '</span>',
        modalClass: ['message-alert testing, open-alert'],
        btnText: 'Confirm',
        callback: (res) => {
        }
      });
      return false;
    } else if (this.firstLogIn.confirmPassword !== this.firstLogIn.newPassword){
      this.modalService.alert({
        content:  '<span>' + this.translate.instant('FirstLogin.Message.PasswordNotMatch') + '</span>',
        modalClass: ['message-alert testing, open-alert'],
        btnText: 'Confirm',
        callback: (res) => {
        }
      });
      return false;
    }
    else {
      return true;
    }
  }

  logout(): void {
    this.authenticationService.revokeToken().then(resp => {
      if (resp === ResponseStatus.Y) {
        Utils.removeSecureStorage(LocalStorage.USER_INFO);
        Utils.removeSecureStorage(LocalStorage.Authorization);
        this.router.navigate(['/login']);
      }
    });
  }

}
