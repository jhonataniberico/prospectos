import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@app/core/services/api.service';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class RegistroLeadService {

  constructor(
    private _http: ApiService,
  ) { }

  registrarLead(body: any): Observable<any> {
    return this._http.post<any>(`${environment.api}${environment.apiService.leadpostulante.registrarLead}`, body);
  }

}