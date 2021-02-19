import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlatpickrOptions } from 'ng2-flatpickr';
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
  constructor() { }
   exampleOptions: FlatpickrOptions = {
    defaultDate: '2017-03-15'
  };

  ngOnInit(): void {

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
}
