import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid/grid.component';
import { InputComponent } from './input/input.component';



@NgModule({
  declarations: [GridComponent, InputComponent],
  imports: [
    CommonModule
  ]
})
export class ComponentModule { }
