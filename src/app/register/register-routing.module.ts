import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { VendorComponent } from './vendor/vendor.component';

const routes: Routes = [
  {path: 'category', component: CategoryComponent},
  {path: 'product', component: ProductComponent},
  {path: 'vendor', component: VendorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
