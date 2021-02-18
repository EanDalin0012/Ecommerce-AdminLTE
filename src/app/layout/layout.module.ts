import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
     HeaderComponent,
     FooterComponent,
     NavComponent
    ],
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: [
    HeaderComponent,
     FooterComponent,
     NavComponent
  ]
})
export class LayoutModule { }
