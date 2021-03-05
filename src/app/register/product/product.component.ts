import { SubscribeMessageService } from './../../m-share/service/subscribe-message.service';
import { Component, OnInit } from "@angular/core";
import { HttpService } from '../../m-share/service/http.service';
import { ResponseStatus, ButtonRoles } from '../../m-share/constants/common.const';
import { Message } from '../../m-share/model/message';
import { ProductAddComponent } from '../product-add/product-add.component';
import { ProductEditComponent } from '../product-edit/product-edit.component';
import { orderBy, SortDescriptor } from '@progress/kendo-data-query';
import { RowClassArgs, SelectableSettings, GridDataResult } from '@progress/kendo-angular-grid';
import { PageChangeEvent } from '@progress/kendo-angular-dropdowns/dist/es2015/common/models/page-change-event';
import { Title } from '@angular/platform-browser';
import { ModalService } from '../../m-share/service/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { Category } from '../../m-share/model/category';
import { ID } from '../../m-share/model/id';
import { ProductDetail } from '../../m-share/model/product-detail';
import { SwitchProduct } from '../../m-share/model/switch-product';
import { environment } from '../../../environments/environment.prod';
declare const $: any;
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
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
  gridHeight = screen.height * 0.5;
  selectedCallback = (args) => args.dataItem;
  selectableSettings: SelectableSettings;
  skip = 0;
  pageSize = 10;
  mySelection: any[] = [];
// end Declaring grid

  totalRecord = 0;
  productDetails = new Array<ProductDetail>();
  productDetailsTmp = new Array<ProductDetail>();
  itemsID = new Array<ID>();
  public data  = Array<Category>();
  menu = '';
  public statusValue: string;
  src: string;
  constructor(
    private subscribeMessageService: SubscribeMessageService,
    private httpService: HttpService,
    private titleService: Title,
    private modalService: ModalService,
    private translate: TranslateService
    ) {
      this.titleService.setTitle(this.translate.instant('Product.Label.Product'));
      this.setSelectableSettings();
      this.src = environment.serverURL;
    }

  ngOnInit(): void {
    const url = (window.location.href).split('/');
    this.subscribeMessageService.visitMessage(url[5]);
    this.inquiry();
  }

  inquiry(): void {
    const api = '/api/product/v1/list';
    this.httpService.Get(api).then(resp => {
      const response   = resp as any;
      if (response) {
        this.productDetails = response;
        this.productDetailsTmp = this.productDetails;
        this.data          = response;
        this.gridData      = this.productDetails;
        this.loadingData(this.productDetails);
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
      const resultSearch  = this.productDetailsTmp.filter( data => data.name.toLowerCase().includes(event.target.value));
      this.totalRecord    = resultSearch.length;
      this.productDetails     = resultSearch;
      console.log(resultSearch);
      this.loadingData(resultSearch);
    }
  }


  deleteTextSearch(): void {
    this.search = undefined;
    this.productDetails = this.productDetailsTmp;
    this.loadingData(this.productDetails);
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
        rBtn: {btnText: this.translate.instant('Common.Button.Confirm')},
        modalClass: ['pop-confirm-btn dialog-confirm'],
        callback: response => {
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
    this.productDetails.forEach(element => {
      if (element.id === val) {
        name = element.name ; // + '(' + element.id + ')';
      }
    });
    return name;
  }

  edit(dataItems: any): void {
    this.modalService.open({
      content: ProductEditComponent,
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
      content: ProductAddComponent,
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
    const api = '/api/product/v1/delete';
    this.httpService.Post(api, data).then(resp => {
      const response   = resp as Message;
      if (response.status === ResponseStatus.Y) {
       this.inquiry();
      }
    });
  }


  switchWeb(b: boolean, productId: number): void {
    if (b !== undefined && productId) {
      const switchsRequest = new SwitchProduct();
      switchsRequest.value = b;
      switchsRequest.productId = productId;
      const api = '/api/product/v1/switch_web';
      this.httpService.Post(api, switchsRequest).then( res => {
        if ( res && res.status === ResponseStatus.Y) {
          this.inquiry();
        }
      });
    }

  }

  switchMobile(b: boolean, productId: number): void {
    if (b !== undefined && productId) {
      const switchsRequest = new SwitchProduct();
      switchsRequest.value = b;
      switchsRequest.productId = productId;
      const api = '/api/product/v1/switch_mobile';
      this.httpService.Post(api, switchsRequest).then( res => {
        if ( res && res.status === ResponseStatus.Y) {
          this.inquiry();
        }
      });
    }
  }

  checkboxChangeMobile(value: boolean, dataItem: any): void {
    let text = this.translate.instant('Common.Label.enable');
    if (value === false) {
      text = this.translate.instant('Common.Label.disable');
    }

    this.modalService.confirm({
      title: this.translate.instant('Common.Label.Confirm'),
      content:  this.translate.instant('Product.Label.Q1', {value: text, productName: dataItem.name}),
      lBtn: {btnText: this.translate.instant('Common.Button.Close')},
      rBtn: {btnText: this.translate.instant('Common.Button.Confirm')},
      modalClass: ['pop-confirm-btn dialog-confirm'],
      callback: response => {
        if (response.text === 'Confirm') {
          this.switchMobile(value, dataItem.id);
        }
      }
    });
  }


  checkboxChangeWeb(value: boolean, dataItem: any): void {
    let text = this.translate.instant('Common.Label.enable');
    if (value === false) {
      text = this.translate.instant('Common.Label.disable');
    }

    this.modalService.confirm({
      title: this.translate.instant('Common.Label.Confirm'),
      content:  this.translate.instant('Product.Label.Q2', {value: text, productName: dataItem.name}),
      lBtn: {btnText: this.translate.instant('Common.Button.Close')},
      rBtn: {btnText: this.translate.instant('Common.Button.Confirm')},
      modalClass: ['pop-confirm-btn dialog-confirm'],
      callback: response => {
        if (response.text === 'Confirm') {
          this.switchWeb(value, dataItem.id);
        }
      }
    });
  }


}

