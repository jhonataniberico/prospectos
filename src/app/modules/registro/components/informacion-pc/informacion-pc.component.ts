import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDisco } from '../../entities/combos/disco';
import { IProcesador } from '../../entities/combos/procesador';
import { IRam } from '../../entities/combos/ram';
import { ISistema } from '../../entities/combos/sistema';
import { CombosService } from '../../../../shared/services/combos.service';
import { RegistroFormService } from '../../services/registro-form.service';
import { SnackBarService } from '@app/core/services/snackbar.service';

@Component({
  selector: 'app-informacion-pc',
  templateUrl: './informacion-pc.component.html',
  styleUrls: ['./informacion-pc.component.css']
})
export class InformacionPcComponent implements OnInit {
  infoPcForm: FormGroup;
  procesadores: IProcesador[] = [];
  memoriasRam: IRam[] = [];
  discos: IDisco[] = [];
  sistemas: ISistema[] = [];
  @ViewChild('fileTxt') fileTxt: ElementRef;
  @ViewChild('inputText') inputText: ElementRef;
  filesToUpload: Array<File>;
  constructor(
    private _registroFormService: RegistroFormService,
    private _combosService: CombosService,
    private _snackBarService: SnackBarService
  ) {
    this.infoPcForm = this._registroFormService.formInfoPc;
  }

  ngOnInit(): void {
    this.procesadores = JSON.parse(localStorage.getItem('procesadores') || '[]');
    this.memoriasRam = JSON.parse(localStorage.getItem('memoriasRam') || '[]');
    this.discos = JSON.parse(localStorage.getItem('discos') || '[]');
    this.sistemas = JSON.parse(localStorage.getItem('sistemas') || '[]');

    this.loadProcesadores();
    this.loadMemoriasRam();
    this.loadDiscos();
    this.loadSistemas();

  }

  get procesador() { return this.infoPcForm.controls['procesador']; }
  get memoriaRam() { return this.infoPcForm.controls['memoriaRam']; }
  get discoDuro() { return this.infoPcForm.controls['discoDuro']; }
  get sistOperativo() { return this.infoPcForm.controls['sistOperativo']; }
  get file() { return this.infoPcForm.controls['file']; }
  get extensionFile() { return this.infoPcForm.controls['extensionFile']; }
  get imagen() { return this.infoPcForm.controls['imagen']; }

  loadProcesadores(): void {
    this._combosService.comboProcesador().subscribe(procesadores => {
      this.procesadores = procesadores;
      localStorage.setItem('procesadores', JSON.stringify(this.procesadores));
    });
  }

  loadMemoriasRam(): void {
    this._combosService.comboRam().subscribe(memoriasRam => {
      this.memoriasRam = memoriasRam;
      localStorage.setItem('memoriasRam', JSON.stringify(this.memoriasRam));
    });
  }

  loadDiscos(): void {
    this._combosService.comboDisco().subscribe(discos => {
      this.discos = discos;
      localStorage.setItem('discos', JSON.stringify(this.discos));
    });
  }

  loadSistemas(): void {
    this._combosService.comboSistema().subscribe(sistemas => {
      this.sistemas = sistemas;
      localStorage.setItem('sistemas', JSON.stringify(this.sistemas));
    });
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

    // Disparar el evento click al input file
    this.fileTxt.nativeElement.dispatchEvent(event);

  }

  fileChangeEvent(fileInput: any): void {
    //Obtener el objeto del input file
    this.filesToUpload = <Array<File>>fileInput.target.files;

    /*************** VALIDACIONES ***************/
    if (this.filesToUpload.length == 0) {
      // this.fileTxt.nativeElement.value = "";
      this.imagen.setValue('');
      this._snackBarService.show({message: 'Seleccione una imagen'});
      return;
    }

    // Obtener el nombre del archivo subido
    let imagen: string = this.filesToUpload[0].name;
    if (imagen.split('.')[1] == undefined) {
      // this.fileTxt.nativeElement.value = "";
      this.imagen.setValue('');
      this._snackBarService.show({message: 'Archivo incorrecto sin extensión'});
      return;
    }

    // if (['pdf'].indexOf(this.filesToUpload[0].type.split('/')[1].toLowerCase()) < 0) {
    //   this.fileTxt.nativeElement.value = "";
    //   return;
    // }

    if (this.filesToUpload[0].size / 1024 / 1024 >= 2) {
      // this.fileTxt.nativeElement.value = "";
      this.imagen.setValue('');
      this._snackBarService.show({message: 'Seleccione un archivo menor a 2MB'});
      return;
    }
    /*******************************************************/

    // this.inputText.nativeElement.value = imagen;
    this.imagen.setValue(imagen);
    this.file.setValue(this.filesToUpload[0]);
    this.extensionFile.setValue(imagen.split('.')[1]);
    // Renderizar el archivo subido para obtener el base64
    // let render = new FileReader();
    // render.readAsDataURL(this.filesToUpload[0]);
    // render.onload = (event) => {
    // };
  }

}
