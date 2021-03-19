import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Authentcation } from 'src/app/m-share/model/authentcation';
import { Utils } from 'src/app/m-share/utils/utils.static';
import { AuthenticationService } from '../../m-share/service/authentication.service';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
declare var $;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  userName: string;
  password: string;
  rememberMe = false;
  @ViewChild('passwordElement') passwordElement: ElementRef;

  constructor(
    private authentcationService: AuthenticationService,
    private titleService: Title,
    private translate: TranslateService
    ) {
    this.titleService.setTitle(this.translate.instant('Login.Label.Login'));
   }

  ngOnInit(): void {
    this.password = 'admin1234';
    this.userName = 'admin';
    $('body').addClass('hold-transition login-page');
    this.rememberMe = Utils.getSecureStorage('remember_me');
    if (this.rememberMe === true) {
      this.userName = Utils.getSecureStorage('user_id');
    }
    console.log('remember_me', this.rememberMe);
  }

  ngOnDestroy(): void {
    $('body').removeClass('hold-transition login-page');
  }

  login(): void {
    if (this.rememberMe) {
      Utils.setSecureStorage('user_id', this.rememberMe);
    }

    const authenticationObj: Authentcation = {
      user_name: this.userName,
      password: this.password
    };
    console.log(authenticationObj);
    this.authentcationService.login(authenticationObj);
  }

  enterLoginHandler(event: any): void {
    if (event.keyCode === 13 && this.userName !== '' && this.password !== '') {
      this.login();
    } else if (event.keyCode === 13 && this.userName !== '') {
      this.passwordElement.nativeElement.focus();
    }
  }

  tapfocus(event: any): void {
    const element = event.srcElement.nextElementSibling;
    if (event.keyCode === 9) {
      element.focus();
    }

  }

  clickRememberMe(): void {
    if (this.userName !== '') {
      Utils.setSecureStorage('remember_me', this.rememberMe);
      Utils.setSecureStorage('user_id', this.userName)
    }
  }

  remember(): void {
    this.rememberMe = !this.rememberMe;
    Utils.setSecureStorage('remember_me', this.rememberMe);
    Utils.removeSecureStorage('user_id');
    if (this.rememberMe) {
      Utils.setSecureStorage('user_id', this.userName)
    }
  }
}
