import { Component, OnInit } from '@angular/core';
import { SubscribeMessageService } from '../../m-share/service/subscribe-message.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {

  constructor(
    private subscribeMessageService: SubscribeMessageService
  ) { }

  ngOnInit(): void {
    const url = (window.location.href).split('/');
    console.log('url', url);

    this.subscribeMessageService.visitMessage(url[5]);
  }

}
