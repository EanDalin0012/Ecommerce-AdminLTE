import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DataTableDirective } from "angular-datatables";
import { Subject } from 'rxjs';
import { SubscribeMessageService } from '../../m-share/service/subscribe-message.service';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AllModulesService } from '../../m-share/all-modules.service';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../../m-share/service/http.service';
import { Category } from 'src/app/m-share/model/category';
import { orderBy, SortDescriptor } from '@progress/kendo-data-query';
import { GridDataResult, PageChangeEvent, RowClassArgs, SelectableSettings } from '@progress/kendo-angular-grid';
import { Title } from '@angular/platform-browser';
import { ModalService } from '../../m-share/service/modal.service';
declare const $: any;
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  // start Declaration grid
  info = true;
  buttonCount = 5;
  type: 'numeric' | 'input' = 'numeric';
  previousNext = false;
  pageSizes: any[] = [10, 20, 30, 50, 100];
  group: any[] = [{
    field: ''
  }];
  multiple = false;
  allowUnsort = true;
  height = 'auto';
  search: string;
  sort: SortDescriptor[] = [{
    field: 'id',
    dir: 'asc'
  }];
  gridView: GridDataResult;
  gridData: any[];
  checkboxOnly = false;
  mode = 'multiple';
  gridheight = screen.height * 0.5;
  selectedCallback = (args) => args.dataItem;
  selectableSettings: SelectableSettings;
  skip = 0;
  pageSize = 10;
  mySelection: any[] = [];
// end declear grid

  totalRecord = 0;
  categorylist = new Array<Category>();
  obj_Id_model_list = [];
  public data  = Array<Category>();
  menu = '';

  constructor(
    private subscribeMessageService: SubscribeMessageService,
    private httpService: HttpService,
    private titleService: Title,
    private modalService: ModalService,
    ) {
      this.titleService.setTitle('Category');
      this.setSelectableSettings();
    }

  ngOnInit(): void {
    const url = (window.location.href).split('/');
    this.subscribeMessageService.visitMessage(url[5]);
    this.inquiry();
  }

  inquiry(): void {
    const api = '/api/category/v1/list';
    this.httpService.Get(api).then(resp => {
      const response   = resp as any;
      if (response) {

        this.categorylist = response;
        this.data          = response;
        this.gridData      = this.categorylist;
        this.loadingData(this.categorylist);
      }
    });
  }

  // Declaration  function gride
  setSelectableSettings(): void {
    this.selectableSettings = {
        checkboxOnly: this.checkboxOnly,
        mode: 'multiple'
    };
  }

  loadingData(data: any): void {
    if (data) {
      this.gridView = {
        data: orderBy(data.slice(this.skip, this.skip + this.pageSize), this.sort),
        total: data.length
      };
    }
    this.totalRecord = data.length;
  }

  loadData(): void {
    this.gridView = {
      data: orderBy(this.gridData.slice(this.skip, this.skip + this.pageSize), this.sort),
      total: this.gridData.length
    };
  }

  pageChange({ skip, take }: PageChangeEvent): void {
    this.skip = skip;
    this.pageSize = take;
    this.paging();
  }

  public rowCallback = (context: RowClassArgs) => {
      switch (context.dataItem.serviceStatusDesc) {
        case 'Deactivated':
          return {dormant: true};
        default:
          return {};
       }
  }

  private paging(): void {
    this.gridView = {
      data: this.gridData.slice(this.skip, this.skip + this.pageSize),
      total: this.gridData.length
    };
  }

  sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.loadData();
  }
  // end gride function

  searchChange(event): void {
    if (event) {
      console.log(event.target.value);
      const resultSearch  = this.categorylist.filter( data => data.name.toLowerCase().includes(event.target.value));
      this.totalRecord    = resultSearch.length;
      this.loadingData(resultSearch);
    }
  }


  deleteTextSearch(): void {
    this.search = undefined;
    this.loadingData(this.categorylist);
  }

  excelExportExcel(component): void {
    const options = component.workbookOptions();
    const rows = options.sheets[0].rows;
    console.log(rows);

    let altIdx = 0;
    rows.forEach((row) => {
        if (row.type === 'data') {
            if (altIdx % 2 !== 0) {
                row.cells.forEach((cell) => {
                    cell.background = '#aabbcc';
                });
            }
            altIdx++;
        }
    });

    component.save(options);
  }


  delete(): void {
    if (this.mySelection.length > 0) {
      let name = '';
      let i = 0;
      this.mySelection.forEach(element => {
          const mainCategoryName = this.getNameById(element);
          if (mainCategoryName !== '') {
            if (i === this.mySelection.length - 1) {
              name += mainCategoryName;
            } else {
              name += mainCategoryName  + ', ';
            }
          }

          this.obj_Id_model_list.push({
            id: element + ''
          });

          ++i;
      });

      this.modalService.confirm({
        title: 'Delete Item(s)',
        content: 'Your select item(s) is: ' + name,
        lBtn: {btnText: 'Close'},
        rBtn: {btnText: 'Confirm'},
        modalClass: ['pop-confirm-btn dialog-confirm'],
        callback: response => {
          console.log('response', response);
          if (response.text === 'Confirm') {
            // this.doDelete();
          }
        }
      });
    } else {
      this.modalService.alert({
        title: 'Delete Item(s)',
        content: '<h2>Please select Item(s) that you want to delete.</h2>',
        btnText: 'Confirm',
        callback: response => {}
      });
    }
  }

  getNameById(val: number): string {
    let name = '';
    this.categorylist.forEach(element => {
      if (element.id === val) {
        name = element.name ; // + '(' + element.id + ')';
      }
    });
    return name;
  }

  edit(event: any): void {

  }

}

