import { Component, OnInit } from '@angular/core';
import { SubscribeMessageService } from '../../m-share/service/subscribe-message.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(
    private subscribeMessageService: SubscribeMessageService
  ) { }

  ngOnInit(): void {
    const url = (window.location.href).split('/');
    console.log('url', url);

    this.subscribeMessageService.visitMessage(url[5]);
  }

}
