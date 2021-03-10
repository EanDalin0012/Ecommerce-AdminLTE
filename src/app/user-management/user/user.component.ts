import { Component, OnInit } from '@angular/core';
import { SubscribeMessageService } from '../../m-share/service/subscribe-message.service';
import { HttpService } from '../../m-share/service/http.service';
import { Category } from 'src/app/m-share/model/category';
import { orderBy, SortDescriptor } from '@progress/kendo-data-query';
import { GridDataResult, PageChangeEvent, RowClassArgs, SelectableSettings } from '@progress/kendo-angular-grid';
import { Title } from '@angular/platform-browser';
import { ModalService } from '../../m-share/service/modal.service';
import { ButtonRoles, ResponseStatus } from '../../m-share/constants/common.const';
import { Message } from '../../m-share/model/message';
import { ID } from '../../m-share/model/id';
import { TranslateService } from '@ngx-translate/core';
import { UserAddComponent } from '../user-add/user-add.component';
import { UserAuthenticationAddComponent } from '../user-authentication-add/user-authentication-add.component';
declare const $: any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  totalRecord = 0;
  constructor(
    private subscribeMessageService: SubscribeMessageService,
    private httpService: HttpService,
    private titleService: Title,
    private modalService: ModalService,
    private translate: TranslateService
  ) {
    this.titleService.setTitle(this.translate.instant('Category.Label.Category'));
   }

  ngOnInit(): void {
    const url = (window.location.href).split('/');
    console.log(url);
    this.subscribeMessageService.visitMessage(url[5]);
  }

  add(): void {
    this.modalService.open({
      content: UserAddComponent,
      callback: response => {
        if (response.close === ButtonRoles.save) {
          // this.inquiry();
        }
      }
    });
  }

  addUser(): void {
    this.modalService.open({
      content: UserAuthenticationAddComponent,
      callback: response => {
        if (response.close === ButtonRoles.save) {
          // this.inquiry();
        }
      }
    });
  }
}
