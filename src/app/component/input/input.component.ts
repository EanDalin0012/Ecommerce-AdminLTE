import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { Event } from '@angular/router';
import { ModalService } from 'src/app/m-share/service/modal.service';
import { ButtonRoles } from '../../m-share/constants/common.const';
import { PopupComponent } from '../popup/popup.component';
declare const $: any;
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  public pipe = new DatePipe("en-US");
  public rows = [];
  public srch = [];
  constructor(
    private modalService: ModalService,
  ) { }
   exampleOptions: FlatpickrOptions = {
    defaultDate: '2017-03-15'
  };

  ngOnInit(): void {

  }

  //search by purchase
  searchByFrom(val) {
    let mySimpleFormat = this.pipe.transform(val, "dd-MM-yyyy");
    console.log(mySimpleFormat);
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

  //search by status
  searchType(val: any): void {
    console.log(val);
  }

  searchName(event: any): void {
    console.log(event.target.value);
  }

  popUp(): void {

  }

  add() {
    this.modalService.open({
      content: PopupComponent,
      callback: response => {
        if(response.close === ButtonRoles.save) {
          console.log(response);
        }
      }
    });
  }
}
