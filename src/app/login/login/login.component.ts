import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/app/m-share/utils/utils.static';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: string;
  password: string;
  rememberMe = false;

  constructor() { }

  ngOnInit(): void {
  }

  Login(): void {

  }

  enterLoginHandler(event: any): void {
    console.log(event);
  }

  tapfocus(event: any): void {
    console.log(event);

  }

  clickRememberMe(): void {

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
