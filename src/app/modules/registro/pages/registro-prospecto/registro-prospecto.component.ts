import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalConfirmComponent } from '@app/shared/components/modal-confirm/modal-confirm.component';
import { ModalMobileComponent } from '@app/shared/components/modal-mobile/modal-mobile.component';
import { TechCheckService } from '@app/shared/services/tech-check.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';
import { PASOS } from '../../constants/step';
import { RegistroFormService } from '../../services/registro-form.service';
import { RegistroProspectoService } from '../../services/registro-prospecto.service';

@Component({
  selector: 'app-registro-prospecto',
  templateUrl: './registro-prospecto.component.html',
  styleUrls: ['./registro-prospecto.component.css'],
})
export class RegistroProspectoComponent implements OnInit {
  PASOS = PASOS;
  pasoSeleccionado = PASOS.PASO_1;
  constructor(
    private _registroFormService: RegistroFormService,
    private modalService: NgbModal,
    private _techCheckService: TechCheckService,
  ) {
    this._registroFormService.initForm();
  }

  ngOnInit(): void {
    const agent = navigator.userAgent;
    const confirmar_condiciones = localStorage.getItem('confirmar_condiciones');
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(agent)){
      this.openMobile();
    } else {
      if (!confirmar_condiciones) {
        this.open();
      }
    }
    this._techCheckService.getIp().subscribe(() => { });
  }

  get imageForStep(): string {
    return `assets/images/fondo/fondo-home${this.pasoSeleccionado}.png`;
  }


  // get validStep1(): boolean {
  //   return this._registroFormService.formValidStep1;
  // }

  // get validStep2(): boolean {
  //   return this._registroFormService.formValidStep2;
  // }

  // get validStep3(): boolean {
  //   return this._registroFormService.formValidStep3;
  // }

  open() {
    const modalRef = this.modalService.open(ModalConfirmComponent, {
      centered: true,
      keyboard: false,
      backdrop: 'static'
    });
    modalRef.componentInstance.name = 'World';
  }

  openMobile() {
    const modalRef = this.modalService.open(ModalMobileComponent, {
      centered: true,
      keyboard: false,
      backdrop: 'static'
    });
    modalRef.componentInstance.name = 'WorldMobile';
  }
}
