import { Component, OnInit } from '@angular/core';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { FileRestrictions, FileState, SelectEvent } from '@progress/kendo-angular-upload';
import { Category } from 'src/app/m-share/model/category';
import { TranslateService } from '@ngx-translate/core';
import { HttpService } from '../../m-share/service/http.service';
import { ModalService } from '../../m-share/service/modal.service';
import { UploadService } from '../../m-share/service/upload.service';
import { CommonHttpService } from '../../m-share/service/common-http.service';
import { Product } from '../../m-share/model/product';
import { Message } from '../../m-share/model/message';
import { ResponseStatus, ButtonRoles, maritalStatus } from '../../m-share/constants/common.const';
import * as moment from 'moment';
import { Base64WriteImage } from '../../m-share/model/base64-write-image';
import { StepperActivateEvent } from '@progress/kendo-angular-layout';
import { MaritalStatus } from '../../m-share/model/marital-status';
@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  modal;
  typeList: any[] = [];

  productName: string;
  description: string;
  resourceImageId: string;
  imageUploaded: boolean;
  translateTxt: any;

// file select Declaration
  public imagePreviews: any[] = [];
  public fileRestrictions: FileRestrictions = {
      allowedExtensions: ['.jpg', '.png']
  };

  defaultCountry = {
    text: 'Select Marital Status',
    code: 'NA'
  };

  filterSettings: DropDownFilterSettings = {
    caseSensitive: false,
    operator: 'startsWith'
  };

  maritalStatusList = new Array<MaritalStatus>();
  maritalStatus: MaritalStatus;


  stepsIcons = [
    { label: 'Personal Info',  isValid: true },
    { label: 'Education Info',  isValid: true },
    { label: 'Emergency Contact', isValid: true },
    { label: 'Family Info', isValid: false },
  ];
  currentStep = 0;

  constructor(
    private translate: TranslateService,
    private httpService: HttpService,
    private modalService: ModalService,
    private uploadService: UploadService,
    private dataService: CommonHttpService
  ) { }

  ngOnInit(): void {
    this.inquiryCategory();
  }

  inquiryCategory(): void {
      this.maritalStatusList = maritalStatus;
  }

  save(): void {
    if ( this.isValid() === true) {
      const product               = new Product();
      product.name                = this.productName;
      product.description         = this.description;
      // product.categoryId          = this.maritalStatus.;
      product.resourceImageId     = this.resourceImageId;

      const api = '/api/product/v1/save';

      this.httpService.Post(api, product).then(response => {
        const responseData = response as Message;
        if ( responseData && responseData.status === ResponseStatus.Y) {
          this.modal.close( {close: ButtonRoles.save});
        }
      });
    }
  }

  private isValid(): boolean {
    if (!this.maritalStatus) {
      this.alertMessage(this.translate.instant('Common.Label.DeleteItems'), 'Select Category');
      return false;
    } else if (!this.productName || this.productName && this.productName.trim() === '' || this.productName && this.productName === null) {
      this.alertMessage(this.translate.instant('Common.Label.DeleteItems'), 'Product Name is empty || null');
      return false;
    }  else {
      return true;
    }
  }

  close(): void {
    this.modal.close({close: ButtonRoles.close});
  }

  alertMessage(title: string, content: string): void{
    this.modalService.alert({
      title,
      content,
      btnText: this.translate.instant('Common.Button.Confirm'),
      callback: response => {

      }
    });
  }

  buttonX(val): void {
    switch (val) {
      case 'productName':
        this.productName = undefined;
        break;
      case 'description':
        this.description = undefined;
        break;
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
            src: ev.target['result'] + '',
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

  remove(fileSelect, uid: string): void {
    this.imageUploaded = false;
    fileSelect.removeFileByUid(uid);
    if (this.imagePreviews.length > 0) {
      this.imagePreviews.forEach((element, index) => {
        if (element.uid === uid) {
            this.imagePreviews.splice(index, 1);
        }
      });
    }
  }

  showButton(state: FileState): boolean {
    return (state === FileState.Selected) ? true : false;
  }

  upload(state): void {
    if(this.imagePreviews.length > 0) {
      this.imagePreviews.forEach(element =>{
        if (element.uid === state) {
            const splitted = element.src.split(',');
            const base64WriteImage = new Base64WriteImage();
            if (splitted[1]) {
              base64WriteImage.id         = element.id;
              base64WriteImage.base64     = splitted[1];
              base64WriteImage.fileName  = element.name;
              base64WriteImage.fileType  = element.type;
              base64WriteImage.fileSize  = element.size + '';
              base64WriteImage.fileExtension = element.extension;
              this.uploadService.upload(base64WriteImage).then(resp => {
                if(resp === true) {
                  this.resourceImageId = base64WriteImage.id;
                  this.imageUploaded = true;
                }
              });
            }
        }
      });
    }

  }

  public onStepActivate(ev: StepperActivateEvent): void {
    if (ev.index === this.stepsIcons.length - 1) {
        ev.preventDefault();
        this.currentStep =  this.stepsIcons.length - 1;
        console.log('Please fill previous steps');
    }
    this.stepsIcons[0].isValid = this.checkUserInfoActivated();
    this.stepsIcons[2].isValid = this.checkCardIdentyfyActivated();
    console.log(`Step ${ev.index} was activated`);
    console.log(ev);
  }

  checkUserInfoActivated():boolean {
    return true;
  }

  checkCardIdentyfyActivated(): boolean {
    return true;
  }


  public next(value: number): void {
    console.log(value);
    // if(value === 0) {
    //   if(this.checkUserInfo()) {
    //     this.stepsIcons[0].isValid =  true;
    //     this.stepsIcons[1].isValid =  true;
    //     this.currentStep += 1;
    //   } else {
    //     this.stepsIcons[0].isValid =  false;
    //   }
    // } else if (value === 1) {
    //   this.currentStep += 1;
    // }else if (value === 2) {
    //   if(this.checkCardIdentyfy()) {
    //     this.stepsIcons[2].isValid =  true;
    //     this.currentStep += 1;
    //   } else {
    //     this.stepsIcons[2].isValid =  false;
    //   }
    // }else if (value === 3) {
    //   this.currentStep += 1;
    // }

    this.currentStep += 1;
  }

  public prev(): void {
      this.currentStep -= 1;
  }

}
