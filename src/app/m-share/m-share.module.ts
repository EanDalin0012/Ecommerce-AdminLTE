import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CustomDatePipe } from './pipe/custom-date.pipe';
import { ModalComponent } from './component/modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule, ButtonsModule } from '@progress/kendo-angular-buttons';
import { ButtonGroupModule } from '@progress/kendo-angular-buttons';
import { ChartModule } from '@progress/kendo-angular-charts';
import { SparklineModule } from '@progress/kendo-angular-charts';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { CalendarModule } from '@progress/kendo-angular-dateinputs';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { AutoCompleteModule } from '@progress/kendo-angular-dropdowns';
import { ComboBoxModule } from '@progress/kendo-angular-dropdowns';
import { EditorModule } from '@progress/kendo-angular-editor';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import { GaugesModule } from '@progress/kendo-angular-gauges';
import { ArcGaugeModule } from '@progress/kendo-angular-gauges';
import { RadialGaugeModule } from '@progress/kendo-angular-gauges';
import { ExcelModule, GridModule, PDFModule  } from '@progress/kendo-angular-grid';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ColorPickerModule } from '@progress/kendo-angular-inputs';
import { MaskedTextBoxModule } from '@progress/kendo-angular-inputs';
import { NumericTextBoxModule } from '@progress/kendo-angular-inputs';
import { SliderModule } from '@progress/kendo-angular-inputs';
import { RangeSliderModule } from '@progress/kendo-angular-inputs';
import { SwitchModule } from '@progress/kendo-angular-inputs';
import { TextBoxModule } from '@progress/kendo-angular-inputs';
import { TextAreaModule } from '@progress/kendo-angular-inputs';
import { CheckBoxModule } from '@progress/kendo-angular-inputs';
import { RadioButtonModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { PanelBarModule } from '@progress/kendo-angular-layout';
import { ListViewModule } from '@progress/kendo-angular-listview';
import { PagerModule } from '@progress/kendo-angular-pager';
import { PopupModule } from '@progress/kendo-angular-popup';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { ProgressBarModule } from '@progress/kendo-angular-progressbar';
import { RippleModule } from '@progress/kendo-angular-ripple';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';
import { ScrollViewModule } from '@progress/kendo-angular-scrollview';
import { SortableModule } from '@progress/kendo-angular-sortable';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { TreeListModule } from '@progress/kendo-angular-treelist';
import { UploadsModule } from '@progress/kendo-angular-upload';
import { FileSelectModule } from '@progress/kendo-angular-upload';
import { ImagePipe } from './pipe/image.pipe';
import { DateFormatPipe } from './pipe/date-format.pipe';
@NgModule({
  declarations: [
    CustomDatePipe,
    ModalComponent,
    ImagePipe,
    DateFormatPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    // kendo
    ButtonModule,
    ButtonGroupModule,
    ChartModule,
    SparklineModule,
    DateInputsModule,
    CalendarModule,
    DialogModule,
    DropDownsModule,
    AutoCompleteModule,
    ComboBoxModule,
    EditorModule,
    ExcelExportModule,
    GaugesModule,
    ArcGaugeModule,
    RadialGaugeModule,
    GridModule,
    IndicatorsModule,
    InputsModule,
    ColorPickerModule,
    MaskedTextBoxModule,
    NumericTextBoxModule,
    SliderModule,
    RangeSliderModule,
    SwitchModule,
    TextBoxModule,
    TextAreaModule,
    CheckBoxModule,
    RadioButtonModule,
    LabelModule,
    LayoutModule,
    PanelBarModule,
    ListViewModule,
    PagerModule,
    PDFExportModule,
    PopupModule,
    ProgressBarModule,
    RippleModule,
    SchedulerModule,
    ScrollViewModule,
    SortableModule,
    ToolBarModule,
    TooltipModule,
    TreeListModule,
    FileSelectModule,
    UploadsModule,
    PDFModule,
    ExcelModule,
    ButtonsModule,
    // End Kendo
    CustomDatePipe,
    ImagePipe,
    DateFormatPipe

  ],
  entryComponents: [
    ModalComponent,
  ],
  providers: [
    DatePipe,
  ]
})
export class MShareModule {
  static forRoot(): ModuleWithProviders<MShareModule> {
    return {
      ngModule: MShareModule,
      providers: []
    };
  }
}
