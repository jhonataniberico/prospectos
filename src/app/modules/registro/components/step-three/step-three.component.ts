import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedConstants } from '@app/shared/shared.constants';
import { Subscription } from 'rxjs/internal/Subscription';
import { map } from 'rxjs/operators';
import { IProject } from '../../entities/project/project';
import { RegistroFormService } from '../../services/registro-form.service';
import { RegistroProspectoService } from '../../services/registro-prospecto.service';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.css']
})
export class StepThreeComponent implements OnInit {
  ICON_ARROW_BUTTON = SharedConstants.ICONS.ICON_ARROW_BUTTON;
  project: IProject = {};
  subActiRoute: Subscription = new Subscription();
  params: any = {};
  serviceRegDispositivo: boolean = false
  constructor(
    public registroFormService: RegistroFormService,
    private _route: Router,
    private _registroProspectoService: RegistroProspectoService,
    private _activedRoute: ActivatedRoute,
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

  redirectNextStep(stepIndex: number): void {
    if (this.serviceRegDispositivo) {
      return;
    }

    if (!this.registroFormService.formValidStep3) {
      this.registroFormService.touchedInputStepThree();
      return;
    }

    this.serviceRegDispositivo = true;
    const values = this.registroFormService.valuesFormStepThree;
    this._registroProspectoService.registrarDispositivos(values).subscribe(() => {
      this.serviceRegDispositivo = false;
      this._route.navigate([`${stepIndex}`], {queryParams: this.params});
    }, () => this.serviceRegDispositivo = false);
  }

}
 