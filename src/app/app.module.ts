
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutBlankComponent } from './layout/layout-blank/layout-blank.component';
import { LayoutModule } from './layout/layout.module';
import { LayoutComponent } from './layout/layout/layout.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AllModulesData } from 'src/assets/all-modules-data/all-modules-data';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FormsModule } from '@angular/forms';
import { MShareModule } from './m-share/m-share.module';
@NgModule({
  declarations: [
    AppComponent,
    LayoutBlankComponent,
    LayoutComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    DataTablesModule,
    MShareModule,
    InMemoryWebApiModule.forRoot(AllModulesData),
    PerfectScrollbarModule,
    ToastrModule.forRoot(
      {
        timeOut: 1500,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
      }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
