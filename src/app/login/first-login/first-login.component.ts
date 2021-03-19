import { Component, OnInit } from '@angular/core';
import { Event } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-first-login',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.css']
})
export class FirstLoginComponent implements OnInit {

  password: string;
  rememberMe: boolean;
  userName: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  constructor(
    private titleService: Title,
    private translate: TranslateService) {
    this.titleService.setTitle(this.translate.instant('FirstLogin.Label.FirstLogin'));
   }

  ngOnInit(): void {
  }

  remember(): void {

  }

  enterLoginHandler(event): void {

  }

  tapfocus(event): void {

  }

  login(): void {

  }

}
