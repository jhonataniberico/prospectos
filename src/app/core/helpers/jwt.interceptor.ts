import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { AuthenticationService } from '@app/core/services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const isApiUrl = request.url.startsWith(environment.api);
        const token = localStorage.getItem('token');
        let headers = request.headers;
        if (!request.url.includes(environment.apiService.postulante.registrarDispositivos) && !request.url.includes(environment.apiService.postulante.registrarEquipo)) {
            if (!request.headers.has('Content-Type')) {
                headers = request.headers
                    .set('Content-Type', 'application/json');
            }
        }
        
        if (token && isApiUrl) {
            headers = request.headers
                .set('Authorization', `Bearer ${token}`);
        }

        if (request.url.includes(environment.apiService.oauth.token)) {
            headers = headers
                .set('Authorization', 'Basic cnJoaHByb3NwZWN0b2FwcDpycmhocHJvc3BlY3RvY29kZXg=')
                .set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }

        if (request.url.includes(environment.apiService.postulante.registrarDispositivos) || request.url.includes(environment.apiService.postulante.registrarEquipo)) {
            console.log(request.body);
            headers = request.headers
                .set('Content-Type', 'multipart/form-data;boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW');
        }
        const _PARAMS = { headers };
        const req$ = request.clone(_PARAMS);
        return next.handle(req$);
    }
}