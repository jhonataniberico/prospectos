import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalViewImgComponent } from '@app/shared/components/modal-view-img/modal-view-img.component.';
import { SharedConstants } from '@app/shared/shared.constants';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDetalleProspecto } from '../../models/detalle-prospecto';
import { AdminProspectoService } from '../../services/admin-prospecto.service';

@Component({
  selector: 'app-detalle-prospecto',
  templateUrl: './detalle-prospecto.component.html',
  styleUrls: ['./detalle-prospecto.component.css']
})
export class DetalleProspectoComponent implements OnInit {
  ICON_CLOSE = SharedConstants.ICONS.ICON_CLOSE;
  idProspecto: any;
  prospecto: IDetalleProspecto = {};
  sexos: any[] = SharedConstants.COMBOS.SEXO;
  loadSpinner = true;
  constructor(
    private _activedRoute: ActivatedRoute,
    private _adminProspectoService: AdminProspectoService,
    private _router: Router,
    private modalService: NgbModal
  ) {
    this.idProspecto = this._activedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this._adminProspectoService.detalleProspecto(this.idProspecto).subscribe(data => {
      this.prospecto = data[0] || {};
      this.loadSpinner = false;
    });

  }

  openModal(urlImagen: string): void {
    const modalRef = this.modalService.open(ModalViewImgComponent, {
      centered: true,
      // windowClass: 'class-custom' - Clase personalizada
    });
    modalRef.componentInstance.urlImagen = urlImagen;
  }

  regresarListaProspectos(): void {
    this._router.navigate(['intranet/prospectos']);
  }
}
