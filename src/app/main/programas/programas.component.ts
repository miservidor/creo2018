import { Component, OnInit } from '@angular/core';
import { CiudadesService } from '../../api/ciudades.service';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-programas',
  templateUrl: './programas.component.html',
  styleUrls: ['./programas.component.css'],
  providers:[CiudadesService, AngularFireDatabase]
})
export class ProgramasComponent implements OnInit {

  fullcities:any =[];
  grupociudades:any=[];
  popup:boolean = false;  
  constructor(public apicity:CiudadesService) { 

  }

  popupinfo:any = {}
  
    AbrirPopup:any = function(paket){
      this.popup = true;
      console.log(paket.proyecto);
      this.popupinfo.proyecto = paket.proyecto;
      this.popupinfo.tipo = paket.tipo;
      this.popupinfo.id = paket.id;
      this.popupinfo.tipociudad = paket.tipociudad;
  
    }
  
    CerrarPopup:any = function(){
      this.popup=false;
    }

  ngOnInit() {
    this.apicity.CargaDb().subscribe((paquete)=>{
      this.fullcities = [];
    this.grupociudades = paquete;
    for(let item of paquete){
      this.fullcities.push(item)
    }
    console.log(this.grupociudades.length);
  });
  }

}
