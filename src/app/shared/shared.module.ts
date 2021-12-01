import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapaUbicacionComponent } from './components/mapa-ubicacion/mapa-ubicacion.component';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';
import { ControlMessagesComponent } from './components/control-messages/control-messages.component';
import { AgmCoreModule } from '@agm/core';
import { CsNumberDirective } from './directives/cs-number.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { CsLetterDirective } from './directives/cs-letter.directive';
import { BlurOnDirective } from './directives/cs-blur.directive';
import { ModalViewImgComponent } from './components/modal-view-img/modal-view-img.component.';
import { LogoutComponent } from './components/logout/logout.component';

import { SpeedTestModule } from 'ng-speed-test';
import { ModalMobileComponent } from './components/modal-mobile/modal-mobile.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    AgmCoreModule.forRoot({
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyBG7wY_OKvdf_bsw3HyKnnK7vlFotNEKxk'
  }),
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatRadioModule,
  MatCheckboxModule,
  MatButtonModule,
  MatSnackBarModule,
  MatIconModule,
  MatProgressSpinnerModule,
  SpeedTestModule
  ],
  declarations: [
    MapaUbicacionComponent,
    ModalConfirmComponent,
    ModalMobileComponent,
    ModalViewImgComponent,
    ControlMessagesComponent,
    CsNumberDirective,
    CsLetterDirective,
    BlurOnDirective,
    LogoutComponent,
  ],
  exports: [
    MapaUbicacionComponent,
    ModalViewImgComponent,
    ModalConfirmComponent,
    ModalMobileComponent,
    ControlMessagesComponent,
    CsNumberDirective,
    CsLetterDirective,
    BlurOnDirective,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    SpeedTestModule,
    LogoutComponent
  ],
  entryComponents: [
    ModalConfirmComponent
  ]
})
export class SharedModule { }
