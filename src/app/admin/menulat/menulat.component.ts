import { Component, OnInit } from '@angular/core';
import {ControlbutService} from '../controlbut.service';

@Component({
  selector: 'app-menulat',
  templateUrl: './menulat.component.html',
  styleUrls: ['./menulat.component.css']
})
export class MenulatComponent implements OnInit {

  constructor(public ctrlbut:ControlbutService) { }
  message:string;
  statusmenu:string;
  ngOnInit() {
    this.ctrlbut.currentMessage.subscribe(message => this.message = message);
  }

  newMessage() {
    this.ctrlbut.changeMessage("Hello from Sibling")
  }

  newStatus(status:string) {
    this.ctrlbut.changeStatus(status);
    this.statusmenu = status;
  }

  otroMessage() {
    this.ctrlbut.changeMessage("Chao from Sibling")
  }

}
