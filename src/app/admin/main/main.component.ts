import { Component, OnInit } from '@angular/core';
import {ControlbutService} from '../controlbut.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  main:string='inicio';
  constructor(public ctrlbut:ControlbutService) { }

  ngOnInit() {
    this.ctrlbut.currentStatus.subscribe(status => this.main = status)       
  }

}
