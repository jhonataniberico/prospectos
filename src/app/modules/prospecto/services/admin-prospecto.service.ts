import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@app/core/services/api.service';
import { LocalStorageService } from '@app/core/services/local-storage.service';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { IDetalleProspecto } from '../models/detalle-prospecto';
import { IProspecto } from '../models/prospecto';

@Injectable()
export class AdminProspectoService {
  listProspectos$: BehaviorSubject<IProspecto[]> = new BehaviorSubject([]);
  constructor(
    private _httpClient: HttpClient,
    private _localStorageService: LocalStorageService
  ) { }

  buscarProspecto(values: any): Observable<any> {

    const params = new HttpParams()
      .set('idProyecto', values.idProyecto || '0')
      .set('tipoDocumento', values.tipoDocumento || '0')
      .set('numeroDocumento', values.numeroDocumento || '')
      .set('pais', values.pais || '0')
      .set('departamento', values.departamento || '0')
      .set('provincia', values.provincia || '0')
      .set('distrito', values.distrito || '0')
      .set('descarga', values.descarga || '0')
      .set('carga', values.carga || '0')
      .set('auricular', values.auricular || '0')
      .set('apto', values.apto || '0')
      .set('fecIniRegistro', values.fecIniRegistro || '')
      .set('fecFinRegistro', values.fecFinRegistro || '')
      .set('distritoDetectado', values.distritoDetectado || '');

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this._localStorageService.get('token')}`
    });

    return this._httpClient.get<any>(`${environment.api}${environment.apiService.admin.buscarProspecto}`, { params, headers });
  }

  detalleProspecto(idProspecto): Observable<IDetalleProspecto> {

    const params = new HttpParams()
      .set('idProspecto', idProspecto);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this._localStorageService.get('token')}`
    });

    return this._httpClient.get<IDetalleProspecto>(`${environment.api}${environment.apiService.admin.detalleProspecto}`, { params, headers });
  }

  listarProyecto(): Observable<any> {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this._localStorageService.get('token')}`
    });

    return this._httpClient.get<any>(`${environment.api}${environment.apiService.admin.listarProyecto}`, { headers });
  }

}