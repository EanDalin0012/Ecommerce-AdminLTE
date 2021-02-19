import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDatePipe } from './pipe/custom-date.pipe';
import { ModalComponent } from './component/modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CustomDatePipe,
    ModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CustomDatePipe,
  ],
})
export class MShareModule {
  static forRoot(): ModuleWithProviders<MShareModule> {
    return {
      ngModule: MShareModule,
      providers: []
    };
  }
}
