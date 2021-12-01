import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TechCheckService } from '@app/shared/services/tech-check.service';
import { RegistroFormService } from '../../services/registro-form.service';

@Component({
  selector: 'app-informacion-conectividad',
  templateUrl: './informacion-conectividad.component.html',
  styleUrls: ['./informacion-conectividad.component.css']
})
export class InformacionConectividadComponent implements OnInit {

  infoConectividadForm: FormGroup;
  btnImg = 'assets/images/iconos/icon-arrow-button.svg';
  interval: any;
  constructor(
    private _registroFormService: RegistroFormService,
    private _techCheckService: TechCheckService
  ) {
    this.infoConectividadForm = this._registroFormService.formInfoConectividad;
  }

  get operador() { return this.infoConectividadForm.controls['operador']; }
  get carga() { return this.infoConectividadForm.controls['carga']; }
  get descarga() { return this.infoConectividadForm.controls['descarga']; }
  get ping() { return this.infoConectividadForm.controls['ping']; }
  get latencia() { return this.infoConectividadForm.controls['latencia']; }
  get ip() { return this.infoConectividadForm.controls['ip']; }
  get isp() { return this.infoConectividadForm.controls['isp']; }

  /**
   * @deprecated
   */

  ngOnInit(): void {
    this.attachToWindow(this.testCompleted);
    this.interval = setInterval(() => {
      let localData = localStorage.getItem('LOCAL_DATA')
      if(localData){
        this.initTest(JSON.parse(localData));
      }
    }, 6000)
  }

  attachToWindow(listener?: any): void {
    if (window.addEventListener) {
      window.addEventListener("message", listener);
    }
  }
  testCompleted(event): void {
    if (event.origin !== 'https://b12.speedtestcustom.com') {
      return;
    }
    localStorage.setItem('LOCAL_DATA', JSON.stringify(event.data));
  }


  initTest(dataMbps?: any): void {
    this._techCheckService.getDataIP().subscribe(data => {
      this.descarga.setValue(dataMbps.download);
      this.carga.setValue(dataMbps.upload);
      this.ping.setValue('4 enviados, 4 recibidos, 0 perdidos');
      this.latencia.setValue(dataMbps.latency.minimum);
      this.ip.setValue(data.query);
      this.isp.setValue(data.isp);
      this.operador.setValue(data.as);
    });
    clearInterval(this.interval);
  }
}
