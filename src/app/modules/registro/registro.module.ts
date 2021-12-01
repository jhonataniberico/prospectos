import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerI18n, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistroProspectoComponent } from './pages/registro-prospecto/registro-prospecto.component';
import { RegistroRoutingModule } from './registro-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { InformacionPersonalComponent } from './components/informacion-personal/informacion-personal.component';
import { InformacionContactoComponent } from './components/informacion-contacto/informacion-contacto.component';
import { InformacionConectividadComponent } from './components/informacion-conectividad/informacion-conectividad.component';
import { InformacionMapaComponent } from './components/informacion-mapa/informacion-mapa.component';
import { InformacionAudioComponent } from './components/informacion-audio/informacion-audio.component';
import { InformacionEnvioCorreoComponent } from './components/informacion-envio-correo/informacion-envio-correo.component';
import { InformacionPcComponent } from './components/informacion-pc/informacion-pc.component';
import { RegistroFormService } from './services/registro-form.service';
import { StepOneComponent } from './components/step-one/step-one.component';
import { StepTwoComponent } from './components/step-two/step-two.component';
import { StepThreeComponent } from './components/step-three/step-three.component';
import { StepFourComponent } from './components/step-four/step-four.component';
import { CustomAdapter } from 'src/app/core/providers/datepicker/custom-adapter';
import { CustomDateParserFormatter } from 'src/app/core/providers/datepicker/custom-date-parser-formatter';
import { CustomDatepickerI18n, I18n } from 'src/app/core/providers/datepicker/datepicker-spanish';
import { CombosService } from '../../shared/services/combos.service';
import { RegistroProspectoService } from './services/registro-prospecto.service';
import { RegistroLeadService } from './services/registro-lead.service';
import { MenuStepComponent } from './components/menu-step/menu-step.component';


@NgModule({
  declarations: [
    RegistroProspectoComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    StepFourComponent,
    InformacionPersonalComponent,
    InformacionContactoComponent,
    InformacionConectividadComponent,
    InformacionMapaComponent,
    InformacionAudioComponent,
    InformacionEnvioCorreoComponent,
    InformacionPcComponent,
    MenuStepComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RegistroRoutingModule,
    SharedModule
  ],
  providers: [
    RegistroFormService,
    RegistroProspectoService,
    RegistroLeadService,
    { provide: LOCALE_ID, useValue: 'es-PR' } ,
    [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }], // define custom NgbDatepickerI18n provider
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class RegistroModule { }
