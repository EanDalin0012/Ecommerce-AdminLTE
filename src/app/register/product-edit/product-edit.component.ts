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
import { ResponseStatus, ButtonRoles } from '../../m-share/constants/common.const';
import * as moment from 'moment';
import { Base64WriteImage } from '../../m-share/model/base64-write-image';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {


  modal;
  typeList: any[] = [];
  categoryModel: Category;
  id: number;
  productName: string;
  description: string;
  resourceImageId: string;
  categoryId: number;
  imageUploaded: boolean;
  translateTxt: any;

// file select Declaration
  public imagePreviews: any[] = [];
  public fileRestrictions: FileRestrictions = {
      allowedExtensions: ['.jpg', '.png']
  };

  defaultCountry = {
    id: 0,
    name: 'Select Cagetory',
    description: '',
    create_by: 0,
    modify_by: 0,
    create_date: '',
    modify_date: '',
    status: ''
  };

  filterSettings: DropDownFilterSettings = {
    caseSensitive: false,
    operator: 'startsWith'
  };

  categories = new Array<Category>();
  country: Category;
  src: string;
  isSelectedFile = false;
  constructor(
    private translate: TranslateService,
    private httpService: HttpService,
    private modalService: ModalService,
    private uploadService: UploadService,
    private dataService: CommonHttpService
  ) {
    this.src = environment.serverURL + '/api/web/reader/v1/read/';
  }

  ngOnInit(): void {
    if (this.modal.message) {
      console.log(this.modal.message);

      this.id               = this.modal.message.id;
      this.productName      = this.modal.message.name;
      this.description      = this.modal.message.description;
      this.categoryId       = this.modal.message.categoryId;
      this.resourceImageId  = this.modal.message.resourceImgId;
    }
    this.inquiryCategory();
  }

  inquiryCategory(): void {
    this.dataService.inquiryCategory().then(resp => {
      this.categories = resp as any;
      console.log(this.categories, this.categoryId);
      this.categories.forEach(element => {
        if(element.id === this.categoryId) {
          this.categoryModel = element;
          console.log('this.categoryModel', this.categoryModel);

        }
      });
    });
  }

  save(): void {
    if ( this.isValid() === true) {
      const product               = new Product();
      product.id                  = this.id;
      product.name                = this.productName;
      product.description         = this.description;
      product.categoryId          = this.categoryModel.id;
      product.resourceImageId     = this.resourceImageId;
      const api = '/api/product/v1/update';
      this.httpService.Post(api, product).then(response => {
        const responseData = response as Message;
        if ( responseData && responseData.status === ResponseStatus.Y) {
          this.modal.close( {close: ButtonRoles.edit});
        }
      });
    }
  }

  private isValid(): boolean {
    if (!this.categoryModel) {
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
    this.isSelectedFile = true;
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
              console.log(base64WriteImage);
              this.uploadService.upload(base64WriteImage).then(resp => {
                if(resp === true) {
                  this.resourceImageId = base64WriteImage.id;
                  console.log(base64WriteImage.id);

                  this.imageUploaded = true;
                }
              });
            }
        }
      });
    }

  }
}
