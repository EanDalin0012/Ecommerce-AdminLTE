import { Component, Inject, OnInit, TemplateRef, ViewContainerRef  } from '@angular/core';
import { SubscribeMessageService } from '../../m-share/service/subscribe-message.service';
import { SelectableSettings, GridDataResult, RowClassArgs, PageChangeEvent } from '@progress/kendo-angular-grid';
import { ProductDetail } from '../../m-share/model/product-detail';
import { ID } from 'src/app/m-share/model/id';
import { HttpService } from '../../m-share/service/http.service';
import { Title } from '@angular/platform-browser';
import { ModalService } from '../../m-share/service/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { orderBy, SortDescriptor } from '@progress/kendo-data-query';
import { ResponseStatus, ButtonRoles } from '../../m-share/constants/common.const';
import { Message } from '../../m-share/model/message';
import { ProductAddComponent } from '../product-add/product-add.component';
import { PopupService, PopupRef, POPUP_CONTAINER } from '@progress/kendo-angular-popup';
import { Subject } from 'rxjs';
import { DatePipe } from "@angular/common";
import { DataTableDirective } from "angular-datatables";
import { products } from '../../component/input/data';
import { environment } from 'src/environments/environment';
declare const $: any;
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  // data table
  public pipe = new DatePipe("en-US");
  chartData;
  chartOptions;
  lineData;
  lineOption;
  barColors = {
    a: '#007bff',
    b: '#6610f2',
  };
  lineColors = {
    a: '#007bff',
    b: '#6610f2',
  };

  totalRecord = 0;
  public dtOptions: DataTables.Settings = {};
  lstLeave: any[];
  public rows = [];
  public srch = [];
  public statusValue;
  url: string;
  productDetails = new Array<ProductDetail>();
  // end Declaring variable

  constructor(
    private subscribeMessageService: SubscribeMessageService,
    private httpService: HttpService,
  ) {
    this.url = environment.serverURL;
   }

  ngOnInit(): void {
    const url = (window.location.href).split('/');
    console.log('url', url);
    this.subscribeMessageService.visitMessage(url[5]);

    // for floating label
    $(".floating")
      .on("focus blur", function (e) {
        $(this)
          .parents(".form-focus")
          .toggleClass("focused", e.type === "focus" || this.value.length > 0);
      })
      .trigger("blur");
    this.inquiry();
    // this.loadLeaves();

  }

  // declear function
  inquiry(): void {
    const api = '/api/product/v1/list';
    this.httpService.Get(api).then(response => {
      if (response) {
        this.productDetails = response;
        console.log('response', this.productDetails);
        this.rows = this.productDetails;
        this.srch = [...this.rows];
      }
    });
  }

  // // Get leave  Api Call
  // loadLeaves() {
  //     this.lstLeave = employeeleaves;
  //     this.rows = this.lstLeave;
  //     // this.srch = [...this.rows];
  // }

  //search by name
  searchName(val): void {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.employeeName.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //search by status
  searchType(val): void {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.leaveType.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  searchStatus(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.status.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //search by purchase
  searchByFrom(val) {
    let mySimpleFormat = this.pipe.transform(val, "dd-MM-yyyy");
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      return d.from.indexOf(mySimpleFormat) !== -1 || !mySimpleFormat;
    });
    this.rows.push(...temp);
    $(".floating")
      .on("focus blur", function (e) {
        $(this)
          .parents(".form-focus")
          .toggleClass("focused", e.type === "focus" || this.value.length > 0);
      })
      .trigger("blur");
  }

  //search by warranty
  searchByTo(val) {
    let mySimpleFormat = this.pipe.transform(val, "dd-MM-yyyy");
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      return d.to.indexOf(mySimpleFormat) !== -1 || !mySimpleFormat;
    });
    this.rows.push(...temp);
    $(".floating")
      .on("focus blur", function (e) {
        $(this)
          .parents(".form-focus")
          .toggleClass("focused", e.type === "focus" || this.value.length > 0);
      })
      .trigger("blur");
  }

  //getting the status value
  getStatus(data) {
    this.statusValue = data;
  }
}

const employeeleaves = [
  {
    id: 1,
    employeeName: "John Doe",
    designation: "web developer",
    leaveType: "Casual Leave",
    from: "08-03-2019",
    to: "09-04-2019",
    noofDays: "2 days",
    remainleaves: "12",
    reason: "Going to Hospital",
    status: "New",
  },
  {
    id: 2,
    employeeName: "John Smith",
    designation: "web developer",
    leaveType: "LOP",
    from: "24-02-2019",
    to: "25-02-2019",
    noofDays: "2 days",
    remainleaves: "4",
    reason: "Personnal",
    status: "Approved",
  },
  {
    id: 3,
    employeeName: "Mike Litorus",
    designation: "Android developer",
    leaveType: "Paternity Leave",
    from: "13-02-2019",
    to: "17-02-2019",
    noofDays: "5 days",
    remainleaves: "10",
    reason: "Personnal",
    status: "Declined",
  },
  {
    id: 4,
    employeeName: "Mike Litorus",
    designation: "web developer",
    leaveType: "Paternity Leave",
    from: "13-02-2019",
    to: "17-02-2019",
    noofDays: "5 days",
    remainleaves: "6",
    reason: "Medical leave",
    status: "Declined",
  },
  {
    id: 5,
    employeeName: "Catherine Manseau",
    designation: "web designer",
    leaveType: "Casual Leave",
    from: "13-02-2019",
    to: "17-02-2019",
    noofDays: "5 days",
    remainleaves: "7",
    reason: "Going to Hospital",
    status: "Approved",
  },
  {
    id: 6,
    employeeName: "Mike Litorus",
    designation: "web developer",
    leaveType: "Paternity Leave",
    from: "13-02-2019",
    to: "17-02-2019",
    noofDays: "5 days",
    remainleaves: "6",
    reason: "Medical leave",
    status: "Declined",
  },
  {
    id: 7,
    employeeName: "John Smith",
    designation: "web developer",
    leaveType: "LOP",
    from: "13-02-2019",
    to: "17-02-2019",
    noofDays: "2 days",
    remainleaves: "4",
    reason: "Personnal",
    status: "Approved",
  },
  {
    id: 8,
    employeeName: "John Doe",
    designation: "web developer",
    leaveType: "Casual Leave",
    from: "08-03-2019",
    to: "09-04-2019",
    noofDays: "2 days",
    remainleaves: "12",
    reason: "Going to Hospital",
    status: "New",
  },
  {
    id: 9,
    employeeName: "John Smith",
    designation: "web developer",
    leaveType: "LOP",
    from: "24-02-2019",
    to: "25-02-2019",
    noofDays: "2 days",
    remainleaves: "4",
    reason: "Personnal",
    status: "Approved",
  },
  {
    id: 10,
    employeeName: "Mike Litorus",
    designation: "Android developer",
    leaveType: "Paternity Leave",
    from: "13-02-2019",
    to: "17-02-2019",
    noofDays: "5 days",
    remainleaves: "10",
    reason: "Personnal",
    status: "Declined",
  },
  {
    id: 11,
    employeeName: "Mike Litorus",
    designation: "web developer",
    leaveType: "Paternity Leave",
    from: "13-02-2019",
    to: "17-02-2019",
    noofDays: "5 days",
    remainleaves: "6",
    reason: "Medical leave",
    status: "Declined",
  },
  {
    id: 12,
    employeeName: "Catherine Manseau",
    designation: "web designer",
    leaveType: "Casual Leave",
    from: "13-02-2019",
    to: "17-02-2019",
    noofDays: "5 days",
    remainleaves: "7",
    reason: "Going to Hospital",
    status: "Approved",
  },
  {
    id: 13,
    employeeName: "Mike Litorus",
    designation: "web developer",
    leaveType: "Paternity Leave",
    from: "13-02-2019",
    to: "17-02-2019",
    noofDays: "5 days",
    remainleaves: "6",
    reason: "Medical leave",
    status: "Declined",
  },
  {
    id: 14,
    employeeName: "John Smith",
    designation: "web developer",
    leaveType: "LOP",
    from: "13-02-2019",
    to: "17-02-2019",
    noofDays: "2 days",
    remainleaves: "4",
    reason: "Personnal",
    status: "Approved",
  },
];
