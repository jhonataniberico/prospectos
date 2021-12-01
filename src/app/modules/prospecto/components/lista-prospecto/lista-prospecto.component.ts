import { Component, Directive, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@app/core/helpers/helper';
import { ExcelHelper } from '@app/core/services/excel.helper';
import { SharedConstants } from '@app/shared/shared.constants';
import { Subscription } from 'rxjs';
import { IProspecto } from '../../models/prospecto';
import { AdminProspectoService } from '../../services/admin-prospecto.service';

export type SortColumn = keyof IProspecto | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { 'asc': 'desc', 'desc': '', '': 'asc' };

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeader {

  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}
@Component({
  selector: 'app-lista-prospecto',
  templateUrl: './lista-prospecto.component.html',
  styleUrls: ['./lista-prospecto.component.css']
})
export class ListaProspectoComponent implements OnInit, OnDestroy {
  prospectos: IProspecto[] = [];
  prospectosBackup: IProspecto[] = [];
  ICON_ARROW_BUTTON = SharedConstants.ICONS.ICON_ARROW_BUTTON;
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  subListProspectos: Subscription = new Subscription();
  ICON_DETALLE = SharedConstants.ICONS.ICON_DETALLE;
  constructor(
    private _adminProspectoService: AdminProspectoService,
    private _router: Router,
    private _excelHelper: ExcelHelper
  ) { }

  ngOnInit(): void {
    this.subListProspectos = this._adminProspectoService.listProspectos$.subscribe(data => {
      this.prospectosBackup = data || [];
      this.prospectos = JSON.parse(JSON.stringify(this.prospectosBackup));
    });
  }

  ngOnDestroy(): void {
    this.subListProspectos.unsubscribe();
  }

  onSort({ column, direction }: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting
    if (direction === '' || column === '') {
      this.prospectos = this.prospectosBackup;
    } else {
      this.prospectos = [...this.prospectosBackup].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }


  loadDetail(prospecto: IProspecto) {
    this._router.navigate([`intranet/prospectos/${prospecto.idPostulante}/detalle`]);
  }

  donwloadExcel(): void {
    const title = { name: 'Lista de prospectos', down: 'Lista_prospectos' };
    const body: any[] = JSON.parse(JSON.stringify(this.prospectos || []));
    const sexoType: any[] = SharedConstants.COMBOS.SEXO;
    body.map(row => {
      row.sexo = ((sexoType.filter(f => f.value == row.sexo))[0] || {}).desc;
      row.fecRegistro = formatDate(row.fecRegistro, 'DD/MM/YYYY HH:mm:ss');
      row.fecNacimiento = row.fecNacimiento ? formatDate(new Date(row.fecNacimiento), 'DD/MM/YYYY') : null;
      row.apto = row.apto === 1 ? 'Si' : 'No';
    });
    const headers = {
      data: [
        'Proyecto',
        'Nombre',
        'Apellido',
        'Tipo Doc.',
        'N° Documento',
        'F. de Nacimiento',
        'Sexo',
        'Telefono',
        'Correo',
        'Pais',
        'Departamento',
        'Provincia',
        'Distrito',
        'Distrito detectado',
        'Direccion',
        'Operador',
        'Descarga',
        'Carga',
        'Auricular',
        'Procesador',
        'Memoria Ram',
        'Disco Duro',
        'Sistema Operativo',
        'Apto',
        'Gclid',
        'Utm Campaign',
        'Utm Content',
        'Utm Medium',
        'Utm Origin',
        'Utm Source',
        'Utm Term',
        'F. registro',
        'Cant. Post'
      ]
    };

    const keys = [
      { key: 'proyecto', width: '32' },
      { key: 'nombreProspecto', width: '32' },
      { key: 'apellidoProspecto', width: '32' },
      { key: 'tipoDocumento', width: '32' },
      { key: 'numeroDocumento', width: '32', alignment: { horizontal: 'center', vertical: 'top' } },
      { key: 'fecNacimiento', width: '32', alignment: { horizontal: 'center', vertical: 'top' } },
      { key: 'sexo', width: '32', alignment: { horizontal: 'center', vertical: 'top' } },
      { key: 'telefono', width: '32' },
      { key: 'correo', width: '32' },
      { key: 'pais', width: '32' },
      { key: 'departamento', width: '32' },
      { key: 'provincia', width: '32' },
      { key: 'distrito', width: '32' },
      { key: 'distritoDetectado', width: '32' },
      { key: 'direccion', width: '32' },
      { key: 'operador', width: '32' },
      { key: 'descarga', width: '18', alignment: { horizontal: 'right', vertical: 'top' } },
      { key: 'carga',  width: '18', alignment: { horizontal: 'right', vertical: 'top' } },
      { key: 'tipoDispositivo', width: '18', alignment: { horizontal: 'center', vertical: 'top' } },
      { key: 'procesador', width: '32' },
      { key: 'memoriaRam', width: '32' },
      { key: 'discoDuro', width: '32' },
      { key: 'sistOperativo', width: '32' },
      { key: 'apto', width: '32', alignment: { horizontal: 'center', vertical: 'top' } },
      { key: 'gclid', width: '32' },
      { key: 'utmCampaign', width: '32' },
      { key: 'utmContent', width: '32' },
      { key: 'utmMedium', width: '32' },
      { key: 'utmOrigin', width: '32' },
      { key: 'utmSource', width: '32' },
      { key: 'utmTerm', width: '32' },
      { key: 'fecRegistro', width: '30', alignment: { horizontal: 'center', vertical: 'top' } },
      { key: 'numPostulacion', width: '18', alignment: { horizontal: 'center', vertical: 'top' } },
    ];
    this._excelHelper.downloadExcel(title, headers, keys, body);
  }
}
