import { Component, OnInit } from '@angular/core';
//import { Router} from '@angular/router';
//import { Location } from '@angular/common';

@Component({
  selector: 'app-menusup',
  templateUrl: './menusup.component.html',
  styleUrls: ['./menusup.component.css']
})
export class MenusupComponent implements OnInit {
showmenumap:boolean=false;
  /*constructor(private location: Location) {

    var pathString = location.path();
    if(pathString==='/maps'){
      this.showmenumap=true;
    }
    
  }
  */

  donde:any;
  ngOnInit() {

  }

}
