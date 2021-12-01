import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IAuricular } from '../../entities/combos/auricular';
import { CombosService } from '../../../../shared/services/combos.service';
import { RegistroFormService } from '../../services/registro-form.service';
import { SnackBarService } from '@app/core/services/snackbar.service';

@Component({
  selector: 'app-informacion-audio',
  templateUrl: './informacion-audio.component.html',
  styleUrls: ['./informacion-audio.component.css']
})
export class InformacionAudioComponent implements OnInit {
  infoAudioForm: FormGroup;
  auriculares: IAuricular[] = [];
  @ViewChild('fileTxt') fileTxt: ElementRef;
  @ViewChild('inputText') inputText: ElementRef;
  filesToUpload: Array<File>;
  public readonly submittedValue: EventEmitter<void>;
  constructor(
    private _registroFormService: RegistroFormService,
    private _comboService: CombosService,
    private _snackBarService: SnackBarService
  ) {
    this.infoAudioForm = this._registroFormService.formInfoAudio;
  }

  ngOnInit(): void {
    this._comboService.comboAuricular().subscribe(auriculares => this.auriculares = auriculares || []);
  }

  get tipoDispositivo() { return this.infoAudioForm.controls['tipoDispositivo']; }
  get file() { return this.infoAudioForm.controls['file']; }
  get extension() { return this.infoAudioForm.controls['extension']; }
  get nameFile() { return this.infoAudioForm.controls['nameFile']; }

  public submitValue(): void {
    this.submittedValue.emit();
  }

  /**
   * @author jmeza
   */
  adjuntarImagen(): void {
    // Seleccionar el objeto

    // Crear el evento de click
    let event = new MouseEvent('click', { bubbles: true });

    // Setear el input file
    this.fileTxt.nativeElement.value = null;
    this.file.setValue(null);

    // Disparar el evento click al input file
    this.fileTxt.nativeElement.dispatchEvent(event);
  }

  fileChangeEvent(fileInput: any): void {
    //Obtener el objeto del input file
    this.filesToUpload = <Array<File>>fileInput.target.files;

    /*************** VALIDACIONES ***************/
    if (this.filesToUpload.length == 0) {
      // this.fileTxt.nativeElement.value = "";
      this.nameFile.setValue('');
      this._snackBarService.show({ message: 'Seleccione una imagen' });
      return;
    }

    // Obtener el nombre del archivo subido
    let nameFile: string = this.filesToUpload[0].name;
    if (nameFile.split('.')[1] == undefined) {
      // this.fileTxt.nativeElement.value = "";
      this.nameFile.setValue('');
      this._snackBarService.show({ message: 'Archivo incorrecto sin extensión' });
      return;
    }

    // if (['pdf'].indexOf(this.filesToUpload[0].type.split('/')[1].toLowerCase()) < 0) {
    // this.fileTxt.nativeElement.value = "";
    // this.nameFile.setValue('');
    //   return;
    // }

    if (this.filesToUpload[0].size / 1024 / 1024 >= 2) {
      // this.fileTxt.nativeElement.value = "";
      this.nameFile.setValue('');
      this._snackBarService.show({message: 'Seleccione un archivo menor a 2MB'});
      return;
    }
    /*******************************************************/

    // this.inputText.nativeElement.value = nameFile;
    this.nameFile.setValue(nameFile);
    this.file.setValue(this.filesToUpload[0]);
    this.extension.setValue(nameFile.split('.')[1]);
    // Renderizar el archivo subido para obtener el base64
    // let render = new FileReader();
    // render.readAsDataURL(this.filesToUpload[0]);
    // render.onload = (event) => {
    // };
  }

  get urlImg() {
    const objAuricular: IAuricular = this.auriculares.find(a => a.tipoAuricular == this.tipoDispositivo.value) || {};
    return objAuricular.urlImagen || 'assets/images/fondo/fondo-auriculares.png';
  }

}
