import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CiudadesService {
cities:any =[];
  constructor(public http:Http, public db: AngularFireDatabase) {
    console.log('Cargo api service ciudades');
    this.cities = db.list('/newcity', {
      query: {
          orderByChild:'map',
          equalTo:true,
          limitToFirst:50,
    }
    });
   }
respuesta:any;
  CargaCiudad:any = function(){
           this.http.get("https://creo-26216.firebaseio.com/newcity/.json").map(res => res).subscribe(data => {
            console.log(JSON.parse(data._body));
        }, error =>{
          this.conexion = false;
        });
  }

  CargaGrupo:any = function(){
    return this.http.get("https://creo-26216.firebaseio.com/newcity/.json").map(res => res.json())
  }
  CargaDb:any = function(){
    return this.cities;
  }
}
