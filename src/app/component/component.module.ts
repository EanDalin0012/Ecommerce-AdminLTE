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
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { DataTablesModule } from 'angular-datatables';
@NgModule({
  declarations: [
    GridComponent,
    InputComponent,
    DashboardComponent,
    InvoicesComponent,
    PaymentsComponent,
    ClientsComponent,
    RecentProjectsComponent
  ],
  imports: [
    CommonModule,
    ComponentRoutingModule,
    Ng2FlatpickrModule,
    DataTablesModule,

  ],
  exports: [
    InvoicesComponent,
    PaymentsComponent,
    ClientsComponent,
    RecentProjectsComponent
  ]
})
export class ComponentModule { }
