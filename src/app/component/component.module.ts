import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid/grid.component';
import { InputComponent } from './input/input.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ComponentRoutingModule } from './component-routing.module';
import { InvoicesComponent } from './invoices/invoices.component';
import { PaymentsComponent } from './payments/payments.component';
import { ClientsComponent } from './clients/clients.component';
import { RecentProjectsComponent } from './recent-projects/recent-projects.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MShareModule } from '../m-share/m-share.module';
import { PickListModule } from 'primeng/picklist';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ProfileComponent } from './profile/profile.component';
import { PopupComponent } from './popup/popup.component';
@NgModule({
  declarations: [
    GridComponent,
    InputComponent,
    DashboardComponent,
    InvoicesComponent,
    PaymentsComponent,
    ClientsComponent,
    RecentProjectsComponent,
    ProfileComponent,
    PopupComponent
  ],
  imports: [
    CommonModule,
    ComponentRoutingModule,
    CommonModule,
    FormsModule,
    MShareModule,
    ReactiveFormsModule,
    PickListModule,
    BsDatepickerModule.forRoot(),
    DataTablesModule

  ],
  exports: [
    InvoicesComponent,
    PaymentsComponent,
    ClientsComponent,
    RecentProjectsComponent
  ]
})
export class ComponentModule { }
