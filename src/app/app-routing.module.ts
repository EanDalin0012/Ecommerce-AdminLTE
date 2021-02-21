import { InputComponent } from './component/input/input.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { LayoutBlankComponent } from './layout/layout-blank/layout-blank.component';

const routes: Routes = [
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {
    path: 'main', component: LayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: './home/home.module#HomeModule'
      },
      {
        path: 'component',
        loadChildren: './component/component.module#ComponentModule'
      },
      {
        path: 'register',
        loadChildren: './register/register.module#RegisterModule'
      }
    ]
  },
  {path: 'login', component: LayoutBlankComponent, loadChildren: './login/login.module#LoginModule'},

  // { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
