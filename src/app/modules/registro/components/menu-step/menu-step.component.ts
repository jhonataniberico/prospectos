import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { PASOS } from '../../constants/step';
import { RegistroFormService } from '../../services/registro-form.service';

@Component({
  selector: 'app-menu-step',
  templateUrl: './menu-step.component.html',
  styleUrls: ['./menu-step.component.css']
})
export class MenuStepComponent implements OnInit, OnDestroy {
  PASOS = PASOS;
  params: any = {};
  subActiRoute: Subscription = new Subscription();
  constructor(
    private _registroFormService: RegistroFormService,
    private _activedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void  {
    this.subActiRoute = this._activedRoute.queryParamMap
    .pipe(map((data: any) => ({ ...data.params })))
    .subscribe(params => {
      this.params = params;
    })
  }

  ngOnDestroy(): void {
    this.subActiRoute.unsubscribe();
  }

  get validStep1(): boolean {
    return this._registroFormService.formValidStep1;
  }

  get validStep2(): boolean {
    return this._registroFormService.formValidStep2;
  }

  get validStep3(): boolean {
    return this._registroFormService.formValidStep3;
  }

  touchedInput(paso: string): void {
    switch (paso) {
      case PASOS.PASO_1:
        this._registroFormService.touchedInputStepOne();
        break;
      case PASOS.PASO_2:
        this._registroFormService.touchedInputStepTwo();
        break;
      case PASOS.PASO_3:
        this._registroFormService.touchedInputStepThree();
        break;
    }
  }

}
