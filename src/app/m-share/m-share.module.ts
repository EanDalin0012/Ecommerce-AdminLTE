import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDatePipe } from './pipe/custom-date.pipe';



@NgModule({
  declarations: [CustomDatePipe],
  imports: [
    CommonModule
  ],
  exports: [
    CustomDatePipe,
  ],
})
export class MShareModule { }
