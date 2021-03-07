import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { UserAccountAddComponent } from './user-account-add/user-account-add.component';
import { UserAccountEditComponent } from './user-account-edit/user-account-edit.component';
import { UserRoleComponent } from './user-role/user-role.component';
import { UserRoleAddComponent } from './user-role-add/user-role-add.component';
import { UserRoleEditComponent } from './user-role-edit/user-role-edit.component';
import { MShareModule } from '../m-share/m-share.module';
import { UserManagementRoutingModule } from './user-management-routing.module';



@NgModule({
  declarations: [
    UserComponent,
    UserAddComponent,
    UserEditComponent,
    UserAccountComponent,
    UserAccountAddComponent,
    UserAccountEditComponent,
    UserRoleComponent,
    UserRoleAddComponent,
    UserRoleEditComponent
  ],
  imports: [
    CommonModule,
    MShareModule,
    UserManagementRoutingModule
  ]
})
export class UserManagementModule { }
