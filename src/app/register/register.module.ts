import { NgModule, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category/category.component';
import { CategoryAddComponent } from './category-add/category-add.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { ProductComponent } from './product/product.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductDetailAddComponent } from './product-detail-add/product-detail-add.component';
import { ProductDetailEditComponent } from './product-detail-edit/product-detail-edit.component';
import { VendorComponent } from './vendor/vendor.component';
import { VendorAddComponent } from './vendor-add/vendor-add.component';
import { VendorEditComponent } from './vendor-edit/vendor-edit.component';
import { RegisterRoutingModule } from './register-routing.module';
import { MShareModule } from '../m-share/m-share.module';
import { KendoModule } from '../m-share/kendo/kendo.module';
import { POPUP_CONTAINER } from '@progress/kendo-angular-popup';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DataTablesModule } from 'angular-datatables';
import { PickListModule } from 'primeng/picklist';



@NgModule({
  declarations: [
    CategoryComponent,
    CategoryAddComponent,
    CategoryEditComponent,
    ProductComponent,
    ProductAddComponent,
    ProductEditComponent,
    ProductDetailComponent,
    ProductDetailAddComponent,
    ProductDetailEditComponent,
    VendorComponent,
    VendorAddComponent,
    VendorEditComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    MShareModule,
    PickListModule,
    BsDatepickerModule.forRoot(),
    DataTablesModule,
  ],
  providers: [
    {
      provide: POPUP_CONTAINER,
      useFactory: () => {
         return { nativeElement: document.body } as ElementRef;
      }
    }
  ]
})
export class RegisterModule {
  constructor() {
    console.log('RegisterModule work');

  }
 }
