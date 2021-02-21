import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InputComponent } from './input/input.component';
import { ProfileComponent } from './profile/profile.component';
import { GridComponent } from './grid/grid.component';

const routes: Routes = [
  {path: 'index', component: DashboardComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'gride', component: GridComponent},
  {
    path: '',
    component: InputComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule { }
