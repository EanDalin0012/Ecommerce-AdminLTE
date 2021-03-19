import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { MShareModule } from '../m-share/m-share.module';
import { FirstLoginComponent } from './first-login/first-login.component';



@NgModule({
  declarations: [LoginComponent, FirstLoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MShareModule
  ]
})
export class LoginModule { }
