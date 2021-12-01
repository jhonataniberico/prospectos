import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '@app/core/services/local-storage.service';
import { IDistritoDetectado } from '@app/modules/registro/entities/combos/distrito-detectado';
import { IVelocidadCarga } from '@app/modules/registro/entities/combos/velocidad-carga';
import { IVelocidadDescarga } from '@app/modules/registro/entities/combos/velocidad-descagar';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { environment } from 'src/environments/environment';
import { IAuricular } from '../../modules/registro/entities/combos/auricular';
import { IDepartamento } from '../../modules/registro/entities/combos/departamento';
import { IDisco } from '../../modules/registro/entities/combos/disco';
import { IDistrito } from '../../modules/registro/entities/combos/distrito';
import { IPais } from '../../modules/registro/entities/combos/pais';
import { IProcesador } from '../../modules/registro/entities/combos/procesador';
import { IProvincia } from '../../modules/registro/entities/combos/provincia';
import { IRam } from '../../modules/registro/entities/combos/ram';
import { ISistema } from '../../modules/registro/entities/combos/sistema';

@Injectable({
  providedIn: 'root'
})
export class CombosService {

  constructor(
    private _http: ApiService,
    private _httpClient: HttpClient,
    private _localStorageService: LocalStorageService
  ) {
  }

  comboPais(): Observable<IPais[]> {
    // return this._httpClient.get<IPais[]>({path: `${environment.api}${environment.apiService.combos.pais}`});

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._httpClient.get<IPais[]>(`${environment.api}${environment.apiService.combos.pais}`, { headers });
  }

  comboDepartamento(idPais: number): Observable<IDepartamento[]> {
    const params: HttpParams = new HttpParams()
      .set('idPais', String(idPais));
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    // return this._http.get<IDepartamento[]>({path: `${environment.api}${environment.apiService.combos.departamento}`,_params});
    return this._httpClient.get<IDepartamento[]>(`${environment.api}${environment.apiService.combos.departamento}`, { params, headers });
  }

  comboProvincia(idDepartamento: number): Observable<IProvincia[]> {
    const params: HttpParams = new HttpParams()
      .set('idDepartamento', String(idDepartamento));
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    // return this._http.get<IProvincia[]>({path:`${environment.api}${environment.apiService.combos.provincia}`, _params});
    return this._httpClient.get<IProvincia[]>(`${environment.api}${environment.apiService.combos.provincia}`, { params, headers });
  }

  comboDistrito(idProvincia: number): Observable<IDistrito[]> {
    const params: HttpParams = new HttpParams()
      .set('idProvincia', String(idProvincia));
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    // return this._http.get<IDistrito[]>({path: `${environment.api}${environment.apiService.combos.distrito}`,_params });
    return this._httpClient.get<IDistrito[]>(`${environment.api}${environment.apiService.combos.distrito}`, { params, headers });
  }

  comboProcesador(): Observable<IProcesador[]> {
    // return this._http.get<IProcesador[]>({path: `${environment.api}${environment.apiService.combos.procesador}`});
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._httpClient.get<IProcesador[]>(`${environment.api}${environment.apiService.combos.procesador}`, { headers });
  }

  comboRam(): Observable<IRam[]> {
    // return this._http.get<IRam[]>({path: `${environment.api}${environment.apiService.combos.ram}`});
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._httpClient.get<IRam[]>(`${environment.api}${environment.apiService.combos.ram}`, { headers });
  }

  comboDisco(): Observable<IDisco[]> {
    // return this._http.get<IDisco[]>({path: `${environment.api}${environment.apiService.combos.disco}`});
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._httpClient.get<IDisco[]>(`${environment.api}${environment.apiService.combos.disco}`, { headers });
  }

  comboSistema(): Observable<ISistema[]> {
    // return this._http.get<ISistema[]>({path: `${environment.api}${environment.apiService.combos.sistema}`});
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._httpClient.get<ISistema[]>(`${environment.api}${environment.apiService.combos.sistema}`, { headers });
  }

  comboAuricular(): Observable<IAuricular[]> {
    // return this._http.get<IAuricular[]>({path: `${environment.api}${environment.apiService.combos.auricular}`});
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._httpClient.get<IAuricular[]>(`${environment.api}${environment.apiService.combos.auricular}`, { headers });
  }

  comboVelocidadDeCarga(): Observable<IVelocidadCarga[]> {
    // return this._http.get<IAuricular[]>({path: `${environment.api}${environment.apiService.combos.auricular}`});
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this._localStorageService.get('token')}`
    });
    return this._httpClient.get<IVelocidadCarga[]>(`${environment.api}${environment.apiService.combos.carga}`, { headers });
  }

  comboVelocidadDeDescarga(): Observable<IVelocidadDescarga[]> {
    // return this._http.get<IAuricular[]>({path: `${environment.api}${environment.apiService.combos.auricular}`});
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this._localStorageService.get('token')}`
    });
    return this._httpClient.get<IVelocidadDescarga[]>(`${environment.api}${environment.apiService.combos.descarga}`, { headers });
  }

  comboDistritoDetectado(): Observable<IDistritoDetectado[]> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this._localStorageService.get('token')}`
    });
    return this._httpClient.get<IDistritoDetectado[]>(`${environment.api}${environment.apiService.combos.distritoDetectado}`, { headers });
  }
}


