import { Component, OnInit } from '@angular/core';
import {ControlbutService} from '../controlbut.service';

@Component({
  selector: 'app-central',
  templateUrl: './central.component.html',
  styleUrls: ['./central.component.css']
})
export class CentralComponent implements OnInit {
  message:string;
  constructor(public ctrlbut: ControlbutService) { }

  ngOnInit() {
    this.ctrlbut.currentMessage.subscribe(message => this.message = message)    
  }

}
