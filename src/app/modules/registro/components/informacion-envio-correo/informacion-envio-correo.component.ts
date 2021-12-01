import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedConstants } from '@app/shared/shared.constants';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-informacion-envio-correo',
  templateUrl: './informacion-envio-correo.component.html',
  styleUrls: ['./informacion-envio-correo.component.css']
})
export class InformacionEnvioCorreoComponent implements OnInit, OnDestroy {
  ICON_ARROW_BUTTON = SharedConstants.ICONS.ICON_ARROW_BUTTON;
  subActiRoute: Subscription = new Subscription();
  params: any = {};
  constructor(
    private _router: Router,
    private _activedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.subActiRoute = this._activedRoute.queryParamMap
      .pipe(map((data: any) => ({ ...data.params })))
      .subscribe(params => {
        this.params = params;
      });
  }

  ngOnDestroy(): void {
    this.subActiRoute.unsubscribe();
  }

  cerrarRegistro(): void {
    console.log('CERRAR REGISTRO');
    this._router.navigate([`/1`], {queryParams: this.params});
  }
}
