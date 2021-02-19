import { Component, OnInit } from '@angular/core';
import { ModalDataService } from '../modal-data.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  message: string;
  constructor(private modalDataService: ModalDataService) {
    this.modalDataService.currentMessage.subscribe(message => this.message = message);
   }

  ngOnInit(): void {
    this.modalDataService.currentMessage.subscribe(message => this.message = message);
  }

}
