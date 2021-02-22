import { Component, OnInit } from '@angular/core';
import { SubscribeMessageService } from '../../m-share/service/subscribe-message.service';
import { HttpService } from '../../m-share/service/http.service';
import { Category } from 'src/app/m-share/model/category';
import { orderBy, SortDescriptor } from '@progress/kendo-data-query';
import { GridDataResult, PageChangeEvent, RowClassArgs, SelectableSettings } from '@progress/kendo-angular-grid';
import { Title } from '@angular/platform-browser';
import { ModalService } from '../../m-share/service/modal.service';
import { CategoryAddComponent } from '../category-add/category-add.component';
import { ButtonRoles, ResponseStatus } from '../../m-share/constants/common.const';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { Message } from '../../m-share/model/message';
import { ID } from '../../m-share/model/id';
import { TranslateService } from '@ngx-translate/core';
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
  itemsID = new Array<ID>();
  public data  = Array<Category>();
  menu = '';

  constructor(
    private subscribeMessageService: SubscribeMessageService,
    private httpService: HttpService,
    private titleService: Title,
    private modalService: ModalService,
    private translate: TranslateService
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
      console.log(response);
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

          this.itemsID.push({
            id: element
          });

          ++i;
      });

      this.modalService.confirm({
        title: this.translate.instant('Common.Label.DeleteItems'),
        content:  this.translate.instant('Common.Label.YourSelectedItems', {value: name}),
        lBtn: {btnText: this.translate.instant('Common.Button.Close')},
        rBtn: {btnText: this.translate.instant('Common.Button.Confirm'),},
        modalClass: ['pop-confirm-btn dialog-confirm'],
        callback: response => {
          console.log('response', response);
          if (response.text === 'Confirm') {
            this.doDelete();
          }
        }
      });
    } else {
      this.modalService.alert({
        title: this.translate.instant('Common.Label.DeleteItems'),
        content: '<h2>Please select Item(s) that you want to delete.</h2>',
        btnText: this.translate.instant('Common.Button.Confirm'),
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

  edit(dataItems: any): void {
    this.modalService.open({
      content: CategoryEditComponent,
      message: dataItems,
      callback: response => {
        if (response.close === ButtonRoles.edit) {
          this.inquiry();
        }
      }
    });
  }

  add(): void {
    this.modalService.open({
      content: CategoryAddComponent,
      callback: response => {
        if (response.close === ButtonRoles.save) {
          this.inquiry();
        }
      }
    });
  }


  doDelete(): void {
    const data = {
      body: this.itemsID
    };
    console.log( );
    const api = '/api/category/v1/delete';
    this.httpService.Post(api, data).then(resp => {
      const response   = resp as Message;
      if (response.status === ResponseStatus.Y) {
       this.inquiry();
      }
    });
  }
}

