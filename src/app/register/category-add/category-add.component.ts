import { Component, OnInit } from '@angular/core';
import { ButtonRoles, ResponseStatus } from '../../m-share/constants/common.const';
import { HttpService } from '../../m-share/service/http.service';
import { ModalService } from '../../m-share/service/modal.service';
import { Title } from '@angular/platform-browser';
import { SubscribeMessageService } from '../../m-share/service/subscribe-message.service';
import { TranslateService } from '@ngx-translate/core';
import { Category } from '../../m-share/model/category';
import { Message } from '../../m-share/model/message';
import { element } from 'protractor';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {

  modal;
  name: string;
  description: string;

  constructor(
    private translate: TranslateService,
    private httpService: HttpService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
  }

  save(): void {
    if ( this.isValid() === true) {
      const category          = new Category();
      category.name               = this.name;
      category.description        = this.description;
      const api = '/api/category/v1/save';
      this.httpService.Post(api, category).then(response => {
        const responseData = response as Message;
        if ( responseData && responseData.status === ResponseStatus.Y) {
          this.modal.close( {close: ButtonRoles.save});
        }
      });
    }
  }

  isValid(): boolean {
    if (!this.name || this.name && this.name.trim() === ''
        || this.name && this.name === null) {
          const message = this.translate.instant('Category.Message.NameIsEmpty');
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
