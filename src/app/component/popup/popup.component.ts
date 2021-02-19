import { Component, OnInit } from '@angular/core';
import { ButtonRoles } from '../../m-share/constants/common.const';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  modal;
  constructor() { }

  ngOnInit(): void {
  }

  close(): void {
    this.modal.close( {close: ButtonRoles.close});
  }

}
