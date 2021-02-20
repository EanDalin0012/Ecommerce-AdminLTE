import { Component, OnInit } from '@angular/core';

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

  }
}
