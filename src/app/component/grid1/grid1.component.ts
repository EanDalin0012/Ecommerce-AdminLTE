import { SubscribeMessageService } from './../../m-share/service/subscribe-message.service';
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { DataTableDirective } from "angular-datatables";
import { HttpService } from '../../m-share/service/http.service';
import { environment } from 'src/environments/environment';
import { ProductDetail } from '../../m-share/model/product-detail';
declare const $: any;

@Component({
  selector: 'app-grid1',
  templateUrl: './grid1.component.html',
  styleUrls: ['./grid1.component.css']
})
export class Grid1Component implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public lstLeave: any;
  public url: string;
  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  public addLeaveadminForm: FormGroup;
  public editLeaveadminForm: FormGroup;
  public editFromDate: any;
  public editToDate: any;
  searchInput: string;

  src = '<img alt="" src="http://localhost:8080/api/web/reader/v1/read/448648c1-2bb1-4506-a1ad-d80af03db2c4-20201105073121"/>';
  productDetails = new Array<ProductDetail>();

  constructor(
    private subscribeMessageService: SubscribeMessageService,
    private httpService: HttpService,
  ) {
    this.url = environment.serverURL;
  }

  ngOnInit() {
    console.log("date", new Date(1613119281000).toLocaleString());
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

    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  // manually rendering Data table

  rerender(): void {
    $("#datatable").DataTable().clear();
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
    this.lstLeave = [];
    // this.loadLeaves();
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  // declear function
  inquiry(): void {
    const api = '/api/product/v1/list';
    this.httpService.Get(api).then(response => {
      if (response) {
        this.lstLeave = response;
        this.rows = this.lstLeave;
        this.srch = [...this.rows];
        console.log('response', this.lstLeave);
      }
    });
  }

  // // Get leave  Api Call
  // loadLeaves() {
  //   // this.srvModuleService.get(this.url).subscribe((data) => {
  //     this.lstLeave = adminleaves;
  //     this.rows = this.lstLeave;
  //     this.srch = [...this.rows];
  //   // });
  // }

  // to know the date picker changes

  from(data) {
    this.editFromDate = this.pipe.transform(data, "dd-MM-yyyy");
  }
  to(data) {
    this.editToDate = this.pipe.transform(data, "dd-MM-yyyy");
  }


  // To Get The leaves Edit Id And Set Values To Edit Modal Form

  //search by name
  searchName(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    console.log(temp);
    this.rows.push(...temp);
    console.log('this.rows', this.rows);
  }


  //getting the status value
  getStatus(data) {
    this.statusValue = data;
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
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
  {
    id: 15,
    employeeName: "John Doe 15",
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
    id: 16,
    employeeName: "John Smith 16",
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
    id: 17,
    employeeName: "Mike Litorus 17",
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
    id: 18,
    employeeName: "Mike Litorus 18",
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
    id: 19,
    employeeName: "Catherine Manseau 19",
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
    id: 20,
    employeeName: "Mike Litorus 20",
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
    id: 21,
    employeeName: "John Smith 21",
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
    id: 22,
    employeeName: "John Doe 22",
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
    id: 23,
    employeeName: "John Smith 23",
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
    id: 24,
    employeeName: "Mike Litorus 24",
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
    id: 25,
    employeeName: "Mike Litorus 25",
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
    id: 26,
    employeeName: "Catherine Manseau 26",
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
    id: 27,
    employeeName: "Mike Litorus 27",
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
    id: 28,
    employeeName: "John Smith 28",
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
