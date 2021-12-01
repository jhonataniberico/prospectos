import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@app/core/services/api.service';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RegistroProspectoService {

  constructor(
    private _http: ApiService,
    private _httpClient: HttpClient,
    private _router: Router
  ) { }

  registrarProspecto(body: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._httpClient.post<any>(`${environment.api}${environment.apiService.postulante.registrarProspecto}`, body, { headers });
  }

  registrarConectividad(body: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    body = {
      ...body,
      postulante: {
        idPostulante: localStorage.getItem('idPostulante')
      }
    }
    return this._httpClient.post<any>(`${environment.api}${environment.apiService.postulante.registrarConectividad}`, body, { headers });
  }

  registrarDispositivos(body: any): Observable<any> {
    const idPostulante = localStorage.getItem('idPostulante');
    const params = new HttpParams()
      .set('TIPO-DISPOSITIVO', body.tipoDispositivo)
      .set('ID-POSTULANTE', idPostulante)
      .set('EXTENCION-FILE', body.extension);
    const formData = new FormData();
    formData.append('file', body.file);
    return this._httpClient.post<any>(`${environment.api}${environment.apiService.postulante.registrarDispositivos}`, formData, { params });
  }

  registrarEquipo(body: any): Observable<any> {
    const updBody = {
      // ...body,
      procesador: body.procesador,
      memoriaRam: body.memoriaRam,
      discoDuro: body.discoDuro,
      sistOperativo: body.sistOperativo,
      extensionFile: body.extensionFile,
      // imagen: '',
      idPostulante: parseInt(localStorage.getItem('idPostulante'),10)
    };
    // delete updBody.file;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._httpClient.post<any>(`${environment.api}${environment.apiService.postulante.registrarEquipo}`, updBody, { headers });
  }

  registrarEquipoImg(body: any): Observable<any> {
    const params = new HttpParams()
      .set('EQUIPO', body.equipo)
      .set('EXTENCION-FILE', body.extensionImg);
    const formData = new FormData()
    formData.append('file', body.file);
    return this._httpClient.post<any>(`${environment.api}${environment.apiService.postulante.registrarEquipoImg}`, formData, { params });
  }

  // dataSpeedTest(): Observable<any> {
  //   const params = new HttpParams()
  //     .set('https', 'true')
  //     .set('token', 'YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm')
  //     .set('urlCount', '5');
  //   let headers = new HttpHeaders()

  //   return this._httpClient.get<any>('https://api.fast.com/netflix/speedtest/v2', { params, headers });
  // }

  detalleProyecto(proyecto: string): Observable<any> {
    const params = new HttpParams()
      .set('codigoProyecto', proyecto);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._httpClient.get<any>(`${environment.api}${environment.apiService.postulante.detalleProyecto}`, { params, headers })
      .pipe(map(data => {
        return data[0];
      }));
  }

  redirectStep(textStep: number, params?: any): void {
    this._router.navigate([`${textStep}`], {queryParams: params});
  }

}
