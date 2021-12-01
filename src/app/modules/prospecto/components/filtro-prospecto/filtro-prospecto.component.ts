import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IAuricular } from '@app/modules/registro/entities/combos/auricular';
import { IDepartamento } from '@app/modules/registro/entities/combos/departamento';
import { IDistrito } from '@app/modules/registro/entities/combos/distrito';
import { IDistritoDetectado } from '@app/modules/registro/entities/combos/distrito-detectado';
import { IPais } from '@app/modules/registro/entities/combos/pais';
import { IProvincia } from '@app/modules/registro/entities/combos/provincia';
import { IVelocidadCarga } from '@app/modules/registro/entities/combos/velocidad-carga';
import { IVelocidadDescarga } from '@app/modules/registro/entities/combos/velocidad-descagar';
import { CombosService } from '@app/shared/services/combos.service';
import { SharedConstants } from '@app/shared/shared.constants';
import { IProyecto } from '../../models/proyecto';
import { AdminProspectoFormService } from '../../services/admin-prospecto-form.service';
import { AdminProspectoService } from '../../services/admin-prospecto.service';

@Component({
  selector: 'app-filtro-prospecto',
  templateUrl: './filtro-prospecto.component.html',
  styleUrls: ['./filtro-prospecto.component.css']
})
export class FiltroProspectoComponent implements OnInit {
  formSearch: FormGroup;
  tiposDocumentos: any[] = SharedConstants.COMBOS.TIPO_DOCUMENTO;
  sexos: any[] = SharedConstants.COMBOS.SEXO;
  vCargas: IVelocidadCarga[] = [];
  vDescargas: IVelocidadDescarga[] = [];
  auriculares: IAuricular[] = [];
  proyectos: IProyecto[] = [];
  paises: IPais[] = [];
  departamentos: IDepartamento[] = [];
  provincias: IProvincia[] = [];
  distritos: IDistrito[] = [];
  distritosDetectados: IDistritoDetectado[] = [];
  tiposAptitudes: any[] = SharedConstants.COMBOS.TIPO_APTITUD;
  ICON_ARROW_BUTTON = SharedConstants.ICONS.ICON_ARROW_BUTTON;
  constructor(
    public adminProspectoFormService: AdminProspectoFormService,
    private _comboService: CombosService,
    private _adminProspectoService: AdminProspectoService
  ) {
    this.formSearch = this.adminProspectoFormService.formSearch;
  }

  ngOnInit(): void {
    this._comboService.comboVelocidadDeCarga().subscribe(vCargas => this.vCargas = vCargas);
    this._comboService.comboVelocidadDeDescarga().subscribe(vDescargas => this.vDescargas = vDescargas);
    this._comboService.comboAuricular().subscribe(auriculares => this.auriculares = auriculares);
    this._adminProspectoService.listarProyecto().subscribe(proyectos => this.proyectos = proyectos);
    this._comboService.comboPais().subscribe(paises => this.paises = paises || []);
    this._comboService.comboDistritoDetectado().subscribe(distritosDetectados => this.distritosDetectados = distritosDetectados || []);
    this.filtrarLista();
    if (this.pais.value) {
      this.selectedPais();
    }
  }

  get idProyecto() { return this.formSearch.controls['idProyecto']; }
  get tipoDocumento() { return this.formSearch.controls['tipoDocumento']; }
  get numeroDocumento() { return this.formSearch.controls['numeroDocumento']; }
  get pais() { return this.formSearch.controls['pais']; }
  get departamento() { return this.formSearch.controls['departamento']; }
  get provincia() { return this.formSearch.controls['provincia']; }
  get distrito() { return this.formSearch.controls['distrito']; }
  get distritoDetectado() { return this.formSearch.controls['distritoDetectado']; }
  get descarga() { return this.formSearch.controls['descarga']; }
  get carga() { return this.formSearch.controls['carga']; }
  get auricular() { return this.formSearch.controls['auricular']; }
  get apto() { return this.formSearch.controls['apto']; }
  get fecIniRegistro() { return this.formSearch.controls['fecIniRegistro']; }
  get fecFinRegistro() { return this.formSearch.controls['fecFinRegistro']; }

  selectedPais(): void {
    this.departamento.setValue(null);
    this.loadDepartamentos();
  }

  selectedDepartamento(): void {
    this.loadProvincias();
  }

  selectedProvincia(): void {
    this.loadDistritos();
  }

  loadDepartamentos(): void {
    this._comboService.comboDepartamento(this.pais.value).subscribe(departamentos => {
      this.setDepartamentos(departamentos || []);
    });
    this.departamento.enable();
  }

  setDepartamentos(departamentos: IDepartamento[], provincia?: string, distrito?: string): void {
    this.departamentos = departamentos || [];
    if (this.departamentos.length > 0 && this.pais.value) this.departamento.enable();
    else this.departamento.disable();
    if (!provincia) {
      this.provincia.setValue(null);
      this.provincia.disable();
    }

    if (!distrito) {
      this.distrito.disable();
      this.distrito.setValue(null);
    }
  }

  loadProvincias(): void {
    this._comboService.comboProvincia(this.departamento.value).subscribe(provincias => {
      this.setProvincias(provincias || []);
    });
  }


  setProvincias(provincias: IProvincia[], distrito?: string): void {
    this.provincias = provincias || [];
    if (this.provincias.length > 0 && this.departamento.value) this.provincia.enable();
    else this.provincia.disable();
    if (!distrito) {
      this.distrito.setValue(null);
      this.distrito.disable();
    }
  }

  loadDistritos(): void {
    this._comboService.comboDistrito(this.provincia.value).subscribe(distritos => {
      this.setDistritos(distritos || []);
    });
  }

  setDistritos(distritos: IDistrito[]): void {
    this.distritos = distritos || [];
    if (this.distritos.length > 0 && this.provincia.value) this.distrito.enable();
    else this.distrito.disable();
  }

  filtrarLista(): void {
    this._adminProspectoService.buscarProspecto(this.adminProspectoFormService.valuesFormSearch).subscribe(data => {
      this._adminProspectoService.listProspectos$.next((data || {}).listaProspectos);
    });
  }
}
