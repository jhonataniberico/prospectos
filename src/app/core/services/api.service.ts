import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Response } from 'selenium-webdriver/http';
// ----------------
export interface IResponse {
  body: {};
  //
  statusCode: number;
  statusMessage: string;
}
// ----------------
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(public http: HttpClient) {}
  // ----------------
  get<T>(obj: {path?: string; _params?: HttpParams }): Observable<T> {

    const _GET$ = this.http.get<T>(obj.path, {
      params: obj._params
    });
    return _GET$;
  }

  post<T>(path: string, body?: any, params?: any): Observable<Response> {
    const _POST$ = this.http.post<Response>(path, body, {params});
    return _POST$;
  }

  put<T>(path: string, body?: any): Observable<Response> {
    const _POST$ = this.http.put<Response>(path, body);
    return _POST$;
  }

  delete<T>(path: string, params?: HttpParams): Observable<Response> {
    const _DELETE$ = this.http.delete<Response>(path, { params });
    return _DELETE$;
  }
}

