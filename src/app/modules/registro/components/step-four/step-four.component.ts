import { Component, OnInit } from '@angular/core';
import { RegistroFormService } from '../../services/registro-form.service';
import { RegistroProspectoService } from '../../services/registro-prospecto.service';
import { RegistroLeadService } from '../../services/registro-lead.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { SharedConstants } from '@app/shared/shared.constants';
import { ActivatedRoute } from '@angular/router';
import { IProject } from '../../entities/project/project';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-step-four',
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.css']
})
export class StepFourComponent implements OnInit {

  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
  utmOrigin: string;
  gclid: string;
  
  finalizarActivate: boolean = false;
  ICON_ARROW_BUTTON = SharedConstants.ICONS.ICON_ARROW_BUTTON;
  project: IProject = {};
  subServiceActive: Subscription = new Subscription();
  subActiRoute: Subscription = new Subscription();
  params: any = {};
  serviceRegLead: boolean = false;
  constructor(
    public registroFormService: RegistroFormService,
    private _registroProspectoService: RegistroProspectoService,
    private _registroLeadService: RegistroLeadService,
    private deviceService: DeviceDetectorService,
    private route: ActivatedRoute
  ) { 

  }

  ngOnInit() {
    this.subActiRoute = this.route.queryParamMap
      .pipe(map((data: any) => ({ ...data.params })))
      .subscribe(params => {
        this.params = params;
        this._registroProspectoService.detalleProyecto(params.codigoProyecto || 'proy00001')
          .subscribe(detalle => {
            this.project = detalle || {};
            this.registroFormService.project = this.project;
          });
      });
    this.utmSource = this.route.snapshot.queryParamMap.get('utmSource') ? this.route.snapshot.queryParamMap.get('utmSource') : "";
    this.utmMedium = this.route.snapshot.queryParamMap.get('utmMedium') ? this.route.snapshot.queryParamMap.get('utmMedium') : "";
    this.utmCampaign = this.route.snapshot.queryParamMap.get('utmCampaign') ? this.route.snapshot.queryParamMap.get('utmCampaign') : "";
    this.utmTerm = this.route.snapshot.queryParamMap.get('utmTerm') ? this.route.snapshot.queryParamMap.get('utmTerm') : "";
    this.utmContent = this.route.snapshot.queryParamMap.get('utmContent') ? this.route.snapshot.queryParamMap.get('utmContent') : "";
    this.utmOrigin = this.route.snapshot.queryParamMap.get('utmOrigin') ? this.route.snapshot.queryParamMap.get('utmOrigin') : "";
    this.gclid = this.route.snapshot.queryParamMap.get('gclid') ? this.route.snapshot.queryParamMap.get('gclid') : "";
  }

  finalizarRegistro(): void {
  
    if (!this.registroFormService.formValidStepConfirm || this.serviceRegLead) {
      this.registroFormService.touchedInputStepFour();
      return;
    }
    const values = this.registroFormService.valuesFormStepFour;
    this.serviceRegLead = true;
    this._registroProspectoService.registrarEquipo(values).subscribe(data => {
      const objParam = {
        equipo: data.idEquipo,
        extensionImg: values.extensionFile,
        file: values.file
      };
      this._registroProspectoService.registrarEquipoImg(objParam).subscribe(dataImg => {
        this.serviceRegLead = false;
        this.finalizarActivate = true;
        this.registrarLead();
      }, () => this.serviceRegLead = false);
    })
  }
  registrarLead(): void {
    const obj = {
      "idPostulante": localStorage.getItem('idPostulante'),
      "fecHoraLead": new Date().toISOString(),
      "dispositivo": this.deviceService.getDeviceInfo().device,
      "navegador": this.deviceService.getDeviceInfo().browser,
      "sistOperativo": this.deviceService.getDeviceInfo().os,
      "resolucion": this.deviceService.getDeviceInfo().orientation,
      "userAgent": this.deviceService.getDeviceInfo().userAgent,
      "isp": "Perú",
      "utmSource": this.utmSource,
      "utmMedium": this.utmMedium,
      "utmCampaign": this.utmCampaign,
      "utmTerm": this.utmTerm,
      "utmContent": this.utmContent,
      "utmOrigin": this.utmOrigin,
      "gclid": this.gclid
    }
    this._registroLeadService.registrarLead(obj).subscribe(data => {
      console.log(data);
      console.log('USUARIO REGISTRADO');
      localStorage.clear();
      this.registroFormService.resetForms();

    })
  }
}
