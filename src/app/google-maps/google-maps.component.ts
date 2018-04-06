import { Component, NgZone, ChangeDetectorRef, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { GoogleApiService } from './shared/google-api.service';
import { CiudadesService } from '../api/ciudades.service';
import { Observable } from 'rxjs';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

declare var google;

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css'],
  providers: [GoogleApiService, CiudadesService, AngularFireDatabase]
})


export class GoogleMapsComponent implements OnInit {

height = '100vh';
myLatLng = { lat: -23.62001, lng: -70.39755 };
map: any;
cities: FirebaseListObservable<any[]>;
filcities:any = [];
popup:boolean = false;  
tipociudad:any;
nombreciudad:any;
descciudad:any;
term:any;
ci_show:boolean = true;
ca_show:boolean = true;
cs_show:boolean = true;
cm_show:boolean = true;
cb_show:boolean = true;

showmapa:boolean=false;

// Border Map
bordermap_top:any;
bordermap_bottom:any;
bordermap_left:any;
bordermap_right:any;

Eligeciudad:any = function(cod){
  this.Refreshlista(cod);
  var filcity = [];
 for(var i = 0; i<this.typo.length; i++){
   console.log('aqui aparecere typo');
   console.log(this.typo);
   if(this.typo[i].codciudad===cod){
    this.nombreciudad= this.typo[i].nombreciudad;
    this.descciudad= this.typo[i].desc;
    filcity.push(this.typo[i]);
   }
 }
  console.log(filcity);
 return filcity;
}

grupociudades:Array<any> =[];
grupocity:any = [];
listafull:any=[];
fullcities:any=[];
mitexto:any={};

constructor(private googleApi: GoogleApiService, public apicity:CiudadesService, public db: AngularFireDatabase, private ref: ChangeDetectorRef, public zone: NgZone) { 
    this.mitexto = {'que':'alo alo'};
    this.cities = db.list('/newcity', {
    query: {
        orderByChild:'map',
        equalTo:true,
        limitToFirst:50,
  }
  });

  /*this.fullcities = this.db.list('/newcity', {
    query: {
      orderByChild:'map',
      equalTo:true,
      limitToFirst:50,
    }
  }).map((items)=> { 
      var grupo = [];
      console.log(items.length);
      for (let item of items) {
                 grupo.push(item);
      }
      return grupo;
  });
*/
  }
  
  proysearch:any;

nuevacarga(){
  console.log('dentro nva carga')
  console.log(this.kmzs);
  for(var i=0; i<this.kmzs.length;i++){
    console.log(this.kmzs[i])
    this.MostrarMapaKmz(this.kmzs[i]);
  }
}

grupocities=[];

CargaMax:any = function(){
    if(this.cs_show){
    this.MostrarMapaKmlMax('CS_MAX-PG');
        }
    if(this.cm_show){
    this.MostrarMapaKmlMax('CM_MAX-PG');
        }
    if(this.ci_show){
    this.MostrarMapaKmlMax('CI_MAX-PG'); 
        }
    if(this.cb_show){
    this.MostrarMapaKmlMax('CB_MAX-PG');
        }
    if(this.ca_show){
    this.MostrarMapaKmlMax('CA_MAX-PG');
        }
}


PuntoMedio:any = function(latmax, latmin, lonmax, lonmin, numid, itemproy, tipociudad){
    console.log('llego pto medio',latmax, latmin, lonmax, lonmin, numid);
    latmax = Number(latmax);
    latmin = Number(latmin);
    lonmax = Number(lonmax);
    lonmin = Number(lonmin);
    numid = String(numid);
    var latmed = (latmax + latmin)/2;
    var lonmed = (lonmax + lonmin)/2;
    var myLatLng = { 'lat': latmed, 'lng': lonmed };
    console.log(myLatLng);
    var map = this.map;
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        label: {
            text: numid,
            color: 'grey',
          },
        icon: 'http://www.latapp.com/k/'+tipociudad+'.png',
        title: itemproy
      });
      var that = this;

      var aver= function(){
        document.getElementById("newtext").innerHTML = itemproy;
        document.getElementById(numid).className = "rowcitymap";
      }
      
    google.maps.event.addListener(marker, 'mouseover', () => {
        // this.polyline.getPath().setAt(i, marker.getPosition());
        console.log("hover"+itemproy);
        console.log("drag listening");
        aver();
    });

    google.maps.event.addListener(marker, 'mouseout', () => {
        // this.polyline.getPath().setAt(i, marker.getPosition());
        document.getElementById(numid).className = "rowcity";
       
    });
}



CargaLista:any = function(){
    this.NewMap();

    this.filcities = this.db.list('/newcity', {
  query: {
    orderByChild:'map',
    equalTo:true,
    limitToFirst:50,
  }
}).map((items)=> { 
    
    var grupo = [];
    this.CargaMax();
    var map = this.map;
    var numid = 0;
    for (let item of items) {
        //this.MostrarMapaKml(item.id);
        if(item.geoborder.maxlon > this.bordermap_left){
            if(item.geoborder.maxlon > this.bordermap_left && item.geoborder.minlon < this.bordermap_right && item.geoborder.maxlat > this.bordermap_bottom && item.geoborder.minlat < this.bordermap_top){
                grupo.push(item);
                this.PuntoMedio(item.geoborder.maxlat, item.geoborder.minlat, item.geoborder.maxlon, item.geoborder.minlon, numid, item.proyecto, item.tipociudad)
            numid++;
            }
          //  console.log('es menor!');
        }
     // console.log(item);
    }
    return grupo;
});
  };

//============================== TEST ============================

listamenu:any = [];

Testing:any =function (){
    
    //this.NewMap();
    //this.CargaMax();
    console.log('nuevo mapa');
    var map = this.map;

    this.apicity.CargaDb().subscribe((paquete)=>{
    var artemp = [];
    var numid = 0;
    for(let item of paquete){
        if(item.geoborder.maxlon > this.bordermap_left){
            if(item.geoborder.maxlon > this.bordermap_left && item.geoborder.minlon < this.bordermap_right && item.geoborder.maxlat > this.bordermap_bottom && item.geoborder.minlat < this.bordermap_top){
                //artemp.push(item);
                this.listamenu.push(item);
                //this.PuntoMedio(item.geoborder.maxlat, item.geoborder.minlat, item.geoborder.maxlon, item.geoborder.minlon, numid, item.proyecto, item.tipociudad)
            numid++;
            }
          //  console.log('es menor!');
        }
      }
      console.log(artemp.length);
    });
}


//============================== FIN TEST ============================



  RecargaMenu:any = function(){
      console.log(this.filcities);
    this.filcities.map((items)=> { 
    var grupo = [];
    console.log(items.length);
    for (let item of items) {
        console.log('compara: '+item.geoborder.maxlon +'> '+ this.bordermap_left+'&&'+ item.geoborder.minlon+' < '+this.bordermap_right)
        if(item.geoborder.maxlon > this.bordermap_left){
            if(item.geoborder.maxlon > this.bordermap_left && item.geoborder.minlon < this.bordermap_right && item.geoborder.maxlat > this.bordermap_bottom && item.geoborder.minlat < this.bordermap_top){
                grupo.push(item);
            }
            console.log('es menor!');   
        }
     // console.log(item);
    }
    return grupo;
    });
  };


  Fulllista:any = function(){
    this.fullcities = this.db.list('/newcity', {
  query: {
    orderByChild:'map',
    equalTo:true,
    limitToFirst:50,
  }
}).map((items)=> { 
    var grupo = [];
    console.log(items.length);
    for (let item of items) {
               grupo.push(item);
    }
    return grupo;
});
  };


Newlista(aer){
    let me = this;
      console.log(aer);
      
      /*this.filcities = this.listafull.map((items)=>{
          var grupo =[];
          for(let item of items){
              console.log(item);
          }
      })*/
  };

Refreshlista:any = function(cod){
    this.filcities = this.db.list('/newcity', {
      query: {
      orderByChild: 'id',
      equalTo:cod,
      limitToFirst:100,
    }
  }).map((items)=> { 
    //let filteredUser: any[];
    var grupo = [];
    console.log(items.length);
    for (let item of items) {
     // console.log(item);
      if(item.mapa == true){
        console.log(item)
      grupo.push(item);
      }
    }
    return grupo;
});

  };


  ListaCiudad:any = function(){
    this.apicity.CargaCiudad();
  }


  ListaGrupo:any = function(){
    this.apicity.CargaGrupo().subscribe((paquete)=>{
      console.log(paquete);
      this.grupociudades = paquete;
    })
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
  test: any = "Titulo";
  Codigo(item) {
    console.log(item);
  };

  /*
  MostrarMapa(cod) {
    console.log(cod);
    cod = new google.maps.KmlLayer({
      url: 'http://www.turistaclub.com/kml/' + cod + '.kml',
      map: this.map
    });

    cod.setMap(this.map);
  };
*/


kmzs =['CAc', 'CIh', 'CMb'];

  AgregaMarker(myLatLng){
    
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: 'Hello World!'
      });
  }



  MostrarMapaKmz(cod) {
    console.log(cod);
    cod = new google.maps.KmlLayer({
      url: 'http://www.turistaclub.com/kmz/' + cod + '.kmz',
      map: this.map,
      preserveViewport: true
    });

    cod.setMap(this.map);
  };

  BorrarMap() {
    console.log(google.maps);
  };
  RemoveMap(){
    this.map.setMap(null);
  }

  MostrarMapaKml(cod) {
    console.log(cod);
    cod = new google.maps.KmlLayer({
      url: 'http://www.latapp.com/k/' + cod + '.kml',
      map: this.map,
      preserveViewport: true
    });

    cod.setMap(this.map);
  };

  MostrarMapaKmlMax(cod) {
    console.log(cod);
    cod = new google.maps.KmlLayer({
      url: 'http://www.latapp.com/kmlmax/' + cod + '.kml',
      map: this.map,
      preserveViewport: true
    });

    cod.setMap(this.map);
  };

//that = this;
  alo:any;


  NewMap: any = function () {
    
    this.googleApi.initMap().then(() => {
      let latlng = new google.maps.LatLng(this.myLatLng.lat, this.myLatLng.lng);
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: latlng,
        zoom: 15,
        styles:[
          {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#e9e9e9"
                  },
                  {
                      "lightness": 17
                  }
              ]
          },
          {
              "featureType": "landscape",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#f5f5f5"
                  },
                  {
                      "lightness": 20
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "color": "#ffffff"
                  },
                  {
                      "lightness": 17
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "geometry.stroke",
              "stylers": [
                  {
                      "color": "#ffffff"
                  },
                  {
                      "lightness": 29
                  },
                  {
                      "weight": 0.2
                  }
              ]
          },
          {
              "featureType": "road.arterial",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#ffffff"
                  },
                  {
                      "lightness": 18
                  }
              ]
          },
          {
              "featureType": "road.local",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#ffffff"
                  },
                  {
                      "lightness": 16
                  }
              ]
          },
          {
              "featureType": "poi",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#f5f5f5"
                  },
                  {
                      "lightness": 21
                  }
              ]
          },
          {
              "featureType": "poi.park",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#dedede"
                  },
                  {
                      "lightness": 21
                  }
              ]
          },
          {
              "elementType": "labels.text.stroke",
              "stylers": [
                  {
                      "visibility": "on"
                  },
                  {
                      "color": "#ffffff"
                  },
                  {
                      "lightness": 16
                  }
              ]
          },
          {
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "saturation": 36
                  },
                  {
                      "color": "#333333"
                  },
                  {
                      "lightness": 40
                  }
              ]
          },
          {
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "transit",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#f2f2f2"
                  },
                  {
                      "lightness": 19
                  }
              ]
          },
          {
              "featureType": "administrative",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "color": "#fefefe"
                  },
                  {
                      "lightness": 20
                  }
              ]
          },
          {
              "featureType": "administrative",
              "elementType": "geometry.stroke",
              "stylers": [
                  {
                      "color": "#fefefe"
                  },
                  {
                      "lightness": 17
                  },
                  {
                      "weight": 1.2
                  }
              ]
          }
      ]
      });
      console.log(this.map.getZoom());
      //this.kmles();
      var map = this.map;
      var bordermap_top = this.bordermap_top;
      var comparaborde = function(){
        //console.log('bla: '+that.bordermap_top + 'vs' +'')
        //this.bordermap_top = that.bordermap_top;
        that.bordermap_top= map.getBounds()['f'].f;
        that.bordermap_bottom= map.getBounds()['f'].b;
        that.bordermap_left= map.getBounds()['b'].b;
        that.bordermap_right= map.getBounds()['b'].f;

    };
        let that = this;
        let me = this;
        this.alo = " si alo";
        var newlista = this.Newlista;
        var RecargaMenu = this.RecargaMenu;
        map.addListener('zoom_changed', function(result){
            me.zone.run(() => {
                newlista('iuju');

            });
            console.log(map.getBounds()['b'].b);
            
           comparaborde();
           //RecargaMenu();
        });
        var CargaLista = this.CargaLista;
        map.addListener('bounds_changed', function(result){
            comparaborde();
        });

    });
  };
ciudconmapa=[];
menu=[]

RefreshMenu(){
    this.menu = this.fullcities.map((items)=>{
        var grupo = [];
        console.log(items);
        
        for (let item of items) { 
            if(item.geoborder.maxlon > this.bordermap_left){
                if(item.geoborder.maxlon > this.bordermap_left && item.geoborder.minlon < this.bordermap_right && item.geoborder.maxlat > this.bordermap_bottom && item.geoborder.minlat < this.bordermap_top){
                    grupo.push(item);
                    console.log(item);
                }
              //  console.log('es menor!');
                
            }
            
            
         // console.log(item);
        }
        return grupo;
    })
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
    this.NewMap();
    this.CargaLista();
    this.Testing();
  }

}
