import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ControlbutService {

  private messageSource = new BehaviorSubject("default message");
  private statusSource = new BehaviorSubject("inicio");
  currentMessage = this.messageSource.asObservable();
  currentStatus = this.statusSource.asObservable();
  
  mensaje:any;
  constructor() { }
  changeMessage(message: string) {
    this.messageSource.next(message);
  }
  changeStatus(status: string) {
    this.statusSource.next(status);
  }
}
