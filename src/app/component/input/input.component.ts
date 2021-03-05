import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { Event } from '@angular/router';
import { ModalService } from 'src/app/m-share/service/modal.service';
import { ButtonRoles } from '../../m-share/constants/common.const';
import { PopupComponent } from '../popup/popup.component';
import { FileRestrictions, FileState, SelectEvent } from '@progress/kendo-angular-upload';
import * as moment from 'moment';
import { Base64ImageModel } from '../../m-share/model/image-base64';
import { SubscribeMessageService } from '../../m-share/service/subscribe-message.service';
import { Country, CountryData } from './data';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
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
  input: string;
  selected: string;
  checkbox: boolean;
  // kendo
  public imagePreviews: any[] = [];
  public fileRestrictions: FileRestrictions = {
    allowedExtensions: ['.jpg', '.png']
  };
  imageUploaded: boolean;
  // end kendo
  value: Date = new Date();
  countryList: Country[];
  defaultCountry = { id: '', name: 'Select', countryCode: '', isEnabled: '' };
  country: Country;
  filterSettings: DropDownFilterSettings = {
    caseSensitive: false,
    operator: 'startsWith'
  };

  public toggleText = 'Show';
    public show = false;

  constructor(
    private modalService: ModalService,
    private subscribeMessageService: SubscribeMessageService
  ) { }
   exampleOptions: FlatpickrOptions = {
    defaultDate: '2017-03-15'
  };

  ngOnInit(): void {
    const url = (window.location.href).split('/');
    console.log(url);

    this.subscribeMessageService.visitMessage(url[4]);
    this.countryList = CountryData;
    this.checkbox = false;
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

  selectChangeHandler(event: any): void {
    this.selected = event.target.value;
    console.log(this.selected);
    if (this.selected === '-- Select --') {
      this.selected = undefined;
    }
  }

  // file select function
  public selectEventHandler(e: SelectEvent): void {
    this.imageUploaded = false;
    this.imagePreviews = [];
    const that = this;
    e.files.forEach((file) => {
    if (!file.validationErrors) {
        const reader = new FileReader();
        reader.onload = function (ev) {
        const image = {
            src: ev.target['result']+"",
            uid: file.uid,
            id: file.uid + '-' + moment().format('YYYYMMDDhhmmss'),
            name: file.name,
            size: file.size,
            type: file.rawFile.type,
            extension: file.extension
        };
        that.imagePreviews.unshift(image);

        };
        reader.readAsDataURL(file.rawFile);
    }
    });
  }

  public showButton(state: FileState): boolean {
    return (state === FileState.Selected) ? true : false;
  }

  public remove(fileSelect, uid: string): void {
    this.imageUploaded = false;
    fileSelect.removeFileByUid(uid);
    if (this.imagePreviews.length > 0) {
      this.imagePreviews.forEach((element,index) =>{
        if (element.uid === uid) {
            this.imagePreviews.splice(index, 1);
        }
      });
    }
  }

  upload(state: any): void {
    if(this.imagePreviews.length > 0) {
      this.imagePreviews.forEach(element =>{
        if(element.uid === state) {
            const splitted = element.src.split(',');
            const base64WriteImage = new Base64ImageModel();
            if (splitted[1]) {
               base64WriteImage.id         = element.id;
               base64WriteImage.base64     = splitted[1];
               base64WriteImage.fileName  = element.name;
               base64WriteImage.fileType  = element.type;
               base64WriteImage.fileSize  = element.size + '';
               base64WriteImage.fileExtension = element.extension;
               console.log(base64WriteImage);
              //  this.uploadService.upload(base64WriteImage).then(resp => {
              //    if(resp === true) {
              //      this.resource_img_id = base64WriteImage.id;
              //      this.image_uploaded = true;
              //    }
              // });
             }
        }
      });
    }
  }

  setBankName(country: any): void {
    console.log(country);
  }

  onToggle(): void {
    this.show = !this.show;
    this.toggleText = this.show ? 'Hide' : 'Show';
  }


  checkboxChange(value) {
    console.log(value);

  }
}
