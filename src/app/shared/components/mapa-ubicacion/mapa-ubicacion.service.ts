import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from '@app/globals';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapaUbicacionService {
  direccionState:BehaviorSubject<any> = new BehaviorSubject(null);
  direccionCoordenates:BehaviorSubject<any> = new BehaviorSubject(null);
  disabled$: Subject<any> = new Subject();
  constructor(
  ) { }

  GeoCodeDireccion(lat: number, lng: number): Promise<any> {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      let url = `${environment.geolocalization}?latlng=${lat},${lng}&key=${environment.api_key_map}`;
      xhr.open('GET', url);
      xhr.onreadystatechange = function (aEvt) {
        if (xhr.readyState == 4) {
          if(xhr.status == 200) {
            //  console.log(JSON.parse(xhr.responseText));
            //  console.log(aEvt);
            resolve(JSON.parse(xhr.responseText));
           } else {
            reject('Error loading page');
           }
        }
      };
      xhr.send(null);
    })
  }

  GeoCodeLatLng(direccion:string): Promise<any> {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      let url = `${environment.geolocalization}?address=${direccion}&key=${environment.api_key_map}`
      xhr.open('GET', url);
      xhr.onreadystatechange = function (aEvt) {
        if (xhr.readyState == 4) {
           if(xhr.status == 200) {
            resolve(JSON.parse(xhr.responseText));
           } else {
            reject('Error loading page');
           }
        }
      };
      xhr.send(null);
    })
  }
}
