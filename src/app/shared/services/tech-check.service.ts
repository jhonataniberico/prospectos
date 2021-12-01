import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { SpeedTestService, SpeedTestSettingsModel } from 'ng-speed-test';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IDataIP } from '../models/data-ip';

@Injectable({
    providedIn: 'root'
})
export class TechCheckService {
    private _ip: string = null;
    constructor(
        private speedTestService: SpeedTestService,
        private _httpClient: HttpClient
    ) {
    }

    get ip(): string {
        return this._ip;
    }
    set ip(value: string) {
        this._ip = value;
    }

    /**
     * @deprecated
     * @param setting 
     * @returns 
     */
    _getMbps(setting?: SpeedTestSettingsModel): Observable<number> {
        setting = setting || {};
        setting.iterations = 80;
        setting.retryDelay = 20000;
        return this.speedTestService.getMbps();
    }

    getMbps(): Promise<number> {
        return new Promise((resolve, reject) => {
            let imageAddr = "https://prospectos.s3.amazonaws.com/velocidad/prueba.jpg";
            let downloadSize = 2895050; //bytes
            let startTime: any;
            let endTime: any;
            let download = new Image();

            download.onload = () => {
                endTime = (new Date()).getTime();
                let duration = (endTime - startTime) / 1000;
                let bitsLoaded = downloadSize * 8;
                let speedBps: any = (bitsLoaded / duration).toFixed(2);
                let speedKbps: any = (speedBps / 1024).toFixed(2);
                let speedMbps = (speedKbps / 1024).toFixed(2);
                return resolve(Number(speedMbps));
            }

            download.onerror = (err, msg) => {
                console.log(err);
                console.log(msg);
                return resolve(0);
            }

            startTime = (new Date()).getTime();
            let cacheBuster = "?nnn=" + startTime;
            download.src = imageAddr + cacheBuster;
        });
    }

    getDataIP(): Observable<IDataIP> {
        let params = new HttpParams()
            .set('ip', this.ip);

        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this._httpClient.get(`${environment.api}${environment.apiService.postulante.testIP}`, { headers, params });
    }

    getIp(): Observable<any> {
        return this._httpClient.get('https://api.ipify.org/?format=json').pipe(map((objIP: any) => {
            this.ip = (objIP || {}).ip;
            return this.ip;
        }));
    }
}