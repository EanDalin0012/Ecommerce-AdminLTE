import { Injectable } from '@angular/core';
import { MShareModule } from '../m-share.module';
import { StoreInMemoryModel } from '../model/store-in-memory-model';
import { DialogCloseResult, DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { ModalDataService } from '../component/modal-data.service';
import { TranslateService } from '@ngx-translate/core';
import { ModalComponent } from '../component/modal/modal.component';
import { ModalStoreKey } from '../constants/common.const';
import * as $ from 'jquery';
@Injectable({
  providedIn: MShareModule
})
export class ModalService {
  store = new StoreInMemoryModel();
  dialogRefList: DialogRef[] = [];
  i = 0;
  constructor(
    private dialogService: DialogService,
    private modalData: ModalDataService,
    private translate: TranslateService,
  ) { }

  notice({ content = '', btnText = 'OK', modalClass = [], height = 0, width = 0, minWidth = 0 }): void {
    let contentComponent: any;

    if (typeof content === 'string') {
      this.modalData.sendMessage(content.replace(/\n/gi, '<br/>'));
      contentComponent = ModalComponent;
    } else {
      contentComponent = content;
    }

    this.dialogService.open({
      content: ModalComponent,
      actions: [{
        text: btnText
      }],
      height,
      width,
      minWidth
    });

    /**
     * Modal
     */
    $('kendo-dialog').addClass(modalClass);
  }

  alert({ title = '', content, btnText = 'OK', modalClass = [], callback = (res: any) => {}, height = 0, width = 0, minWidth = 0 }): void {
    let contentComponent: any;

    if (typeof content === 'string') {
      // Base Component
      this.modalData.sendMessage(content.replace(/\n/gi, '<br/>'));
      contentComponent = ModalComponent;
    } else {
      contentComponent = content;
    }

    const dialog: DialogRef = this.dialogService.open({
      title,
      content: contentComponent,
      actions: [{
        text: btnText
      }],
      height,
      width,
      minWidth
    });

    /**
     * Modal
     */
    $('kendo-dialog').addClass(modalClass);
    $('kendo-dialog').addClass('addAlert');
    $('.addAlert').eq(-1).addClass('addAlertCender message-alert');
    $('.addAlertCender').find('kendo-dialog-actions').addClass('alert-btn');
    dialog.result.subscribe((res) => {
      if (res instanceof DialogCloseResult) {
        callback(false);
      } else {
        callback(res);
      }
    });

  }

  confirm({title = '', content, lBtn = {}, rBtn = {}, modalClass = [], callback = (res: any) => {}, height = 0, width = 0, minWidth = 0 }): void {
    const lBtnText = lBtn['btnText'] || 'No';
    const lBtnCallback = lBtn['callback'] || function() {};

    const rBtnText = rBtn['btnText'] || 'Yes';
    const rBtnCallback = rBtn['callback'] || function() {};

    let contentComponent: any;

    if (typeof content === 'string') {
      // Base Component
      this.modalData.sendMessage(content.replace(/\n/gi, '<br/>'));
      contentComponent = ModalComponent;
    } else {
      contentComponent = content;
    }

    const dialog: DialogRef = this.dialogService.open({
      title,
      content: contentComponent,
      actions: [{
        text: lBtnText
      }, {
        text: rBtnText
      }],
      height,
      width,
      minWidth
    });

    $('kendo-dialog').addClass(modalClass);

    dialog.result.subscribe((res) => {
      if (res instanceof DialogCloseResult) {
        callback(false);
      } else {
        switch (res.text) {
          case lBtnText:
            lBtnCallback(res);
            callback(res);
            break;

          case rBtnText:
            rBtnCallback(res);
            callback(res);
            break;
        }
      }
    });
  }

  open({ content, message = {}, opener = {}, modalClass = [], callback = (res: any) => {} }): void {
    const dialog: DialogRef = this.dialogService.open({
      content
    });
    this.dialogRefList.push(dialog);
    this.store.set(ModalStoreKey.ModalStoreKey, this.dialogRefList);
    this.i++;
    $('kendo-dialog').addClass(modalClass);
    $('body').addClass('overHidden');

    dialog.content.instance.modal = {
      message,
      callback,
      opener,
      close: (res: any) => {
        const modalStoreKey = this.store.get(ModalStoreKey.ModalStoreKey);
        modalStoreKey.splice(this.i - 1);
        dialog.close(res);
        $('body').removeClass('overHidden');
      }
    };

    dialog.result.subscribe((res) => {
      if (res instanceof DialogCloseResult) {
        callback(false);
      } else {
        callback(res);
      }
    });
  }

  open1({ content, message = {}, opener = {}, modalClass = [], callback = (res: any) => {} }): void {
    const dialog: DialogRef = this.dialogService.open({
      content
    });
    this.dialogRefList.push(dialog);
    this.store.set(ModalStoreKey.ModalStoreKey, this.dialogRefList);
    this.i++;
    $('kendo-dialog').addClass(modalClass);
    $('body').addClass('overHidden');

    dialog.content.instance.modal = {
      message,
      callback,
      opener,
      close: (res: any) => {
        const modalStoreKey = this.store.get(ModalStoreKey.ModalStoreKey);
        modalStoreKey.splice(this.i - 1);
        dialog.close(res);
        $('body').removeClass('overHidden');
      }
    };

    dialog.result.subscribe((res) => {
      if (res instanceof DialogCloseResult) {
        callback(false);
      } else {
        callback(res);
      }
    });
  }

}
