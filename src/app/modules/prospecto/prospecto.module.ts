import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FiltroBusquedaComponent } from './pages/filtro-busqueda/filtro-busqueda.component';
import { ProspectoRoutingModule } from './prospecto-routing.module';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerI18n, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetalleProspectoComponent } from './pages/detalle-prospecto/detalle-prospecto.component';
import { FiltroProspectoComponent } from './components/filtro-prospecto/filtro-prospecto.component';
import { ListaProspectoComponent, NgbdSortableHeader } from './components/lista-prospecto/lista-prospecto.component';
import { CustomAdapter } from 'src/app/core/providers/datepicker/custom-adapter';
import { CustomDateParserFormatter } from 'src/app/core/providers/datepicker/custom-date-parser-formatter';
import { CustomDatepickerI18n, I18n } from 'src/app/core/providers/datepicker/datepicker-spanish';
import { SharedModule } from '@app/shared/shared.module';
import { AdminProspectoService } from './services/admin-prospecto.service';
import { AdminProspectoFormService } from './services/admin-prospecto-form.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import localePR from '@angular/common/locales/es-PR';
registerLocaleData(localePR);

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    ProspectoRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    FiltroBusquedaComponent,
    DetalleProspectoComponent,
    FiltroProspectoComponent,
    NgbdSortableHeader,
    ListaProspectoComponent
  ],
  providers: [
    AdminProspectoFormService,
    AdminProspectoService,
    { provide: LOCALE_ID, useValue: 'es-PR' } ,
    [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }], // define custom NgbDatepickerI18n provider
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class ProspectoModule { }
