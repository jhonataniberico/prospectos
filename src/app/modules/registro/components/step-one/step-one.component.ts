import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '@app/core/services/local-storage.service';
import { SnackBarService } from '@app/core/services/snackbar.service';
import { SharedConstants } from '@app/shared/shared.constants';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProject } from '../../entities/project/project';
import { RegistroFormService } from '../../services/registro-form.service';
import { RegistroProspectoService } from '../../services/registro-prospecto.service';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.css']
})
export class StepOneComponent implements OnInit, OnDestroy {
  ICON_ARROW_BUTTON = SharedConstants.ICONS.ICON_ARROW_BUTTON;
  project: IProject = {};
  subActiRoute: Subscription = new Subscription();
  params: any = {};
  serviceRegister: boolean = false;
  constructor(
    public registroFormService: RegistroFormService,
    private _activedRoute: ActivatedRoute,
    private _registroProspectoService: RegistroProspectoService,
    private _snackBarService: SnackBarService,
    private _localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.subActiRoute = this._activedRoute.queryParamMap
      .pipe(map((data: any) => ({ ...data.params })))
      .subscribe(params => {
        this.params = params;
        this._registroProspectoService.detalleProyecto(params.codigoProyecto || 'proy00001')
          .subscribe(detalle => {
            this.project = detalle || {};
            this.registroFormService.project = this.project;
          });
      });
  }

  ngOnDestroy(): void {
    this.subActiRoute.unsubscribe();
  }

  redirectNextStep(stepIndex: number): void {

    if (this._localStorageService.get('idPostulante')) {
      this._registroProspectoService.redirectStep(stepIndex, this.params);
      return;
    }

    if (!this.registroFormService.formValidStep1 || this.serviceRegister) {
      this.registroFormService.touchedInputStepOne();
      return;
    }
    const values = this.registroFormService.valuesFormStepOne;

    this.serviceRegister = true;
    this._registroProspectoService.registrarProspecto(values).subscribe(data => {
      this.serviceRegister = false;
      if (data.cod === 0) {
        this._localStorageService.set('stepOne', JSON.stringify(values));
        this._localStorageService.set('idPostulante', String(data.idPostulante));
        this._registroProspectoService.redirectStep(stepIndex, this.params);
      } else {
        this._snackBarService.show({ message: data.msg });
      }
    }, err => {
      this.serviceRegister = false;
      console.log(err);
    });
  }
}
