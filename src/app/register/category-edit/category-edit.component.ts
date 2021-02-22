import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpService } from 'src/app/m-share/service/http.service';
import { ModalService } from 'src/app/m-share/service/modal.service';
import { Category } from '../../m-share/model/category';
import { Message } from '../../m-share/model/message';
import { ButtonRoles, ResponseStatus } from '../../m-share/constants/common.const';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  modal;
  name: string;
  description: string;
  id: number;
  constructor(
    private translate: TranslateService,
    private httpService: HttpService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    if (this.modal.message) {
      this.id = this.modal.message.id;
      this.name = this.modal.message.name;
      this.description = this.modal.message.description;
    }
  }


  edit(): void {
    if ( this.isValid() === true) {
      const category          = new Category();
      category.id             = this.id;
      category.name               = this.name;
      category.description        = this.description;
      const api = '/api/category/v1/update';
      this.httpService.Post(api, category).then(response => {
        const responseData = response as Message;
        if ( responseData && responseData.status === ResponseStatus.Y) {
          this.modal.close( {close: ButtonRoles.edit});
        }
      });
    }
  }

  isValid(): boolean {
    if (!this.name || this.name && this.name.trim() === ''
        || this.name && this.name === null) {
          const message = 'Category Name is empty || null';
          this.modalService.alert({
            title: 'Validation',
            content:  '<p>' + message + '</p>',
            modalClass: ['message-alert testing, open-alert'],
            btnText: 'Confirm',
            callback: (res) => {
            }
          });
          return false;
    } else {
      return true;
    }
  }

  close(): void {
    this.modal.close( {close: ButtonRoles.close});
  }

  undefinedValue(element: string): void {
    switch (element) {
      case 'name':
        this.name = undefined;
        break;
      case 'description':
        this.description = undefined;
        break;
    }
  }

}
