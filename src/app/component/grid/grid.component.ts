import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { DataTableDirective } from "angular-datatables";
declare const $: any;
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public lstLeave: any;
  public url: any = "adminleaves";
  public tempId: any;
  public editId: any;

  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  public addLeaveadminForm: FormGroup;
  public editLeaveadminForm: FormGroup;
  public editFromDate: any;
  public editToDate: any;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    // for floating label
    $(".floating")
      .on("focus blur", function (e) {
        $(this)
          .parents(".form-focus")
          .toggleClass("focused", e.type === "focus" || this.value.length > 0);
      })
      .trigger("blur");

    this.loadLeaves();

    this.addLeaveadminForm = this.formBuilder.group({
      LeaveType: ["", [Validators.required]],
      From: ["", [Validators.required]],
      To: ["", [Validators.required]],
      NoOfDays: ["", [Validators.required]],
      RemainLeaves: ["", [Validators.required]],
      LeaveReason: ["", [Validators.required]],
    });

    // Edit leaveadmin Form Validation And Getting Values

    this.editLeaveadminForm = this.formBuilder.group({
      LeaveType: ["", [Validators.required]],
      From: ["", [Validators.required]],
      To: ["", [Validators.required]],
      NoOfDays: ["", [Validators.required]],
      RemainLeaves: ["", [Validators.required]],
      LeaveReason: ["", [Validators.required]],
    });

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
    this.loadLeaves();
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }
  // Get leave  Api Call
  loadLeaves() {
    // this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstLeave = adminleaves;
      this.rows = this.lstLeave;
      this.srch = [...this.rows];
    // });
  }

  // to know the date picker changes

  from(data) {
    this.editFromDate = this.pipe.transform(data, "dd-MM-yyyy");
  }
  to(data) {
    this.editToDate = this.pipe.transform(data, "dd-MM-yyyy");
  }


  // To Get The leaves Edit Id And Set Values To Edit Modal Form

  edit(value) {
    this.editId = value;
    const index = this.lstLeave.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.lstLeave[index];
    this.editLeaveadminForm.setValue({
      LeaveType: toSetValues.leaveType,
      From: toSetValues.from,
      To: toSetValues.to,
      NoOfDays: toSetValues.noofDays,
      RemainLeaves: toSetValues.remainleaves,
      LeaveReason: toSetValues.reason,
    });
  }

  //search by name
  searchName(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.employeeName.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
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

const adminleaves = [
  {
    id: 1,
    employeeName: "John Doe",
    designation: "web developer",
    leaveType: "Casual Leave",
    from: "08-09-2019",
    to: "11-09-2019",
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
    from: "08-09-2019",
    to: "11-09-2019",
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
    from: "13-05-2019",
    to: "17-05-2019",
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
    from: "13-04-2019",
    to: "17-06-2019",
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
    from: "13-05-2019",
    to: "17-05-2019",
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
    from: "08-09-2019",
    to: "11-09-2019",
    noofDays: "2 days",
    remainleaves: "4",
    reason: "Personnal",
    status: "Approved",
  },
];
