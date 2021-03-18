import { Component, OnInit } from '@angular/core';
import { SubscribeMessageService } from '../../m-share/service/subscribe-message.service';
import { HttpService } from '../../m-share/service/http.service';
import { Category } from 'src/app/m-share/model/category';
import { orderBy, SortDescriptor } from '@progress/kendo-data-query';
import { GridDataResult, PageChangeEvent, RowClassArgs, SelectableSettings } from '@progress/kendo-angular-grid';
import { Title } from '@angular/platform-browser';
import { ModalService } from '../../m-share/service/modal.service';
import { ButtonRoles, ResponseStatus } from '../../m-share/constants/common.const';
import { Message } from '../../m-share/model/message';
import { ID } from '../../m-share/model/id';
import { TranslateService } from '@ngx-translate/core';
import { UserAddComponent } from '../user-add/user-add.component';
import { UserAuthenticationAddComponent } from '../user-authentication-add/user-authentication-add.component';
import { PersonalInformation } from '../../m-share/model/personal-info';
import { environment } from 'src/environments/environment';
declare const $: any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  totalRecord = 0;
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

  personalInformations = new Array<PersonalInformation>();
  personalInformation = new Array<PersonalInformation>();
  personalInformationsTmp = new Array<PersonalInformation>();
  itemsID = new Array<ID>();
  public data  = Array<PersonalInformation>();
  menu = '';
  src: string;
  constructor(
    private subscribeMessageService: SubscribeMessageService,
    private httpService: HttpService,
    private titleService: Title,
    private modalService: ModalService,
    private translate: TranslateService
  ) {
    this.titleService.setTitle(this.translate.instant('Category.Label.Category'));
      this.setSelectableSettings();
      this.src = environment.serverURL;
   }

  ngOnInit(): void {
    const url = (window.location.href).split('/');
    console.log(url);
    this.subscribeMessageService.visitMessage(url[5]);
    this.inquiry();
  }

  inquiry(): void {
    const api = '/api/user/v1/info/detail';
    this.httpService.Get(api).then(resp => {
      const response   = resp as any;
      console.log(response);
      if (response) {
        this.personalInformations = response;
        this.personalInformationsTmp = this.personalInformations;
        this.data          = response;
        this.gridData      = this.personalInformations;
        this.loadingData(this.personalInformations);
    }
    });
  }

  add(): void {
    this.modalService.open({
      content: UserAddComponent,
      callback: response => {
        if (response.close === ButtonRoles.save) {
          this.inquiry();
        }
      }
    });
  }

  addUser(dataItem): void {
    this.modalService.open({
      content: UserAuthenticationAddComponent,
      message: dataItem,
      callback: response => {
        if (response.close === ButtonRoles.save) {
          this.inquiry();
        }
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

  }

  deleteTextSearch(): void {

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

  edit(dataItem): void {

  }
}
