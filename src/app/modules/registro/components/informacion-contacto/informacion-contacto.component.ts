import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MapaUbicacionService } from '@app/shared/components/mapa-ubicacion/mapa-ubicacion.service';
import { filter } from 'rxjs/operators';
import { IDepartamento } from '../../entities/combos/departamento';
import { IDistrito } from '../../entities/combos/distrito';
import { IPais } from '../../entities/combos/pais';
import { IProvincia } from '../../entities/combos/provincia';
import { CombosService } from '../../../../shared/services/combos.service';
import { RegistroFormService } from '../../services/registro-form.service';

@Component({
  selector: 'app-informacion-contacto',
  templateUrl: './informacion-contacto.component.html',
  styleUrls: ['./informacion-contacto.component.css']
})
export class InformacionContactoComponent implements OnInit {
  paises: IPais[] = [];
  departamentos: IDepartamento[] = [];
  provincias: IProvincia[] = [];
  distritos: IDistrito[] = [];
  // departamentos
  infoContactoForm: FormGroup;
  constructor(
    private _registroFormService: RegistroFormService,
    private _comboService: CombosService,
    private mapaUbicacionSrv: MapaUbicacionService
  ) {
    this.infoContactoForm = this._registroFormService.formInfoContacto;
  }

  ngOnInit(): void {
    if (this.direccion.value) {
      setTimeout(() => {
        this.pintarMapa();
        this.mapaUbicacionSrv.disabled$.next(true);
      }, 200);
    }
    this._comboService.comboPais().subscribe(paises => this.paises = paises || []);
    this.setDepartamentos(JSON.parse(localStorage.getItem('departamentos') || '[]'), this.departamento.value, this.provincia.value);
    this.setProvincias(JSON.parse(localStorage.getItem('provincias') || '[]'), this.distrito.value);
    this.setDistritos(JSON.parse(localStorage.getItem('distritos') || '[]'));
    this.mapReading({});
    this.mapaUbicacionSrv.direccionState.pipe(filter(a => a != null)).subscribe(a => {
      // this.direccion.setValue(a.direccion);
      this.distritoDetectado.setValue(a.locality);
      this.latitud.setValue(a.lat);
      this.longitud.setValue(a.lng);
      // if (a.disabledInput) {
      //   this.direccion.disable();
      // }
    });

    if (this.pais.value) {
      setTimeout(() => {
        this.selectedPais();
      }, 1000);
    }
  }

  get telefono() { return this.infoContactoForm.controls['telefono']; }
  get correo() { return this.infoContactoForm.controls['correo']; }
  get pais() { return this.infoContactoForm.controls['pais']; }
  get departamento() { return this.infoContactoForm.controls['departamento']; }
  get provincia() { return this.infoContactoForm.controls['provincia']; }
  get distrito() { return this.infoContactoForm.controls['distrito']; }
  get direccion() { return this.infoContactoForm.controls['direccion']; }
  get latitud() { return this.infoContactoForm.controls['latitud']; }
  get longitud() { return this.infoContactoForm.controls['longitud']; }
  get distritoDetectado() { return this.infoContactoForm.controls['distritoDetectado']; }

  selectedPais(): void {
    this.departamento.setValue('');
    this.loadDepartamentos();
  }

  selectedDepartamento(): void {
    this.loadProvincias();
  }

  selectedProvincia(): void {
    this.loadDistritos();
  }

  loadDepartamentos(): void {
    const objPaisSelected = this.paises.find(f => f.nombrePais == this.pais.value);
    if (!objPaisSelected) {
      this.setDepartamentos([]);
      return;
    }
    this._comboService.comboDepartamento(objPaisSelected.idPais).subscribe(departamentos => {
      localStorage.setItem('departamentos', JSON.stringify(departamentos || []));
      this.setDepartamentos(departamentos);
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
    const objDepartamentoSelected = this.departamentos.find(f => f.nombreDepartamento == this.departamento.value);
    if (!objDepartamentoSelected) {
      this.setProvincias([]);
      return;
    }
    this._comboService.comboProvincia(objDepartamentoSelected.idDepartamento).subscribe(provincias => {
      localStorage.setItem('provincias', JSON.stringify(provincias || []));
      this.setProvincias(provincias);
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
    const objProvinciaSelected = this.provincias.find(f => f.nombreProvincia == this.provincia.value);
    if (!objProvinciaSelected) {
      this.setDistritos([]);
      return;
    }
    this._comboService.comboDistrito(objProvinciaSelected.idProvincia).subscribe(distritos => {
      localStorage.setItem('distritos', JSON.stringify(distritos || []));
      this.setDistritos(distritos);
    });
    if (!objProvinciaSelected) {
      this.setProvincias([]);
    }
  }

  setDistritos(distritos: IDistrito[]): void {
    this.distritos = distritos || [];
    if (this.distritos.length > 0 && this.provincia.value) this.distrito.enable();
    else this.distrito.disable();
  }

  onKeypressEvent(event) {
    if (event.code == 'Enter') {
      this.mapaUbicacionSrv.direccionCoordenates.next(this.direccion.value);
    }
  }

  pintarMapa(): void {
    if (this.direccion.invalid) return;
    this.mapaUbicacionSrv.direccionCoordenates.next(this.direccion.value);
  }

  activarInputDisabled(): void {
    if (this.direccion.disabled) {
      this.direccion.enable();
      this.mapaUbicacionSrv.disabled$.next(false);
    } else {
      this.direccion.disable();
      this.mapaUbicacionSrv.disabled$.next(true);
      // this.pintarMapa();
    }

  }

  mapReading(event) {
    setTimeout(() => {
      if (!navigator.geolocation) {
        return;
      }
      let success = async (position) => {
        try {
          console.log('entre getCurrentPosition success');
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;
          let GeoCodeDireccion = await this.mapaUbicacionSrv.GeoCodeDireccion(+latitude, +longitude);
          let [direccion] = GeoCodeDireccion.results;
          let locality = this.getLocality(direccion);
          this.mapaUbicacionSrv.direccionState.next({
            direccion: direccion.formatted_address,
            lat: latitude,
            lng: longitude,
            disabledInput: true,
            locality
          });
        } catch (error) {
          console.log(error);
        }
      };

      function error(err) {
        console.log('error', err);
      };
      navigator.geolocation.getCurrentPosition(success, error);
    }, 1);
  }

  getLocality(direccion): string {
    return ((direccion.address_components || []).filter(fil => (fil.types || [])[0] == 'locality')[0] || {}).long_name;
  }
}
