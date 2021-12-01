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
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.css']
})
export class StepTwoComponent implements OnInit, OnDestroy {
  ICON_ARROW_BUTTON = SharedConstants.ICONS.ICON_ARROW_BUTTON;
  project: IProject = {};
  subServiceActive: Subscription = new Subscription();
  subActiRoute: Subscription = new Subscription();
  params: any = {};
  serviceRegConectividad: boolean = false;
  constructor(
    public registroFormService: RegistroFormService,
    private _registroProspectoService: RegistroProspectoService,
    private _snackBarService: SnackBarService,
    private _activedRoute: ActivatedRoute,
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
    this.subServiceActive.unsubscribe();
    this.subActiRoute.unsubscribe();
  }

  redirectNextStep(stepIndex: number): void {
    if (this.serviceRegConectividad) {
      return;
    }
    if (!this.registroFormService.formValidStep2) {
      this.registroFormService.touchedInputStepTwo();
      this._snackBarService.show({ message: 'Realiza el test' });
      return;
    }
    this.serviceRegConectividad = true;
    const values = this.registroFormService.valuesFormStepTwo;
    this._registroProspectoService.registrarConectividad(values).subscribe(() => {
      this.serviceRegConectividad = false;
      this._localStorageService.set('stepTwo', JSON.stringify(values));
      this._registroProspectoService.redirectStep(stepIndex, this.params);
    }, () => this.serviceRegConectividad = false);
  }

}
