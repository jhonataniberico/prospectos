import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private _localStorageService: LocalStorageService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError((err: HttpErrorResponse) => {
            // if ([401, 403].includes(err.status) && this.authenticationService.userValue) {
            //     // auto logout if 401 or 403 response returned from api
            //     this.authenticationService.logout();
            // }
            const error = (err && err.error && err.error.message) || err.statusText;
            console.error(err);
            if ((err.error || {}).error === 'invalid_token' && this._localStorageService.get('token')) {
                this._localStorageService.clear();
                this.router.navigate(['/login']);
            }
            return throwError(error);
        }))
    }
}