import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsExtend } from '@app/shared/validators/validators-extend';
import { Subject } from 'rxjs';
import { IProject } from '../entities/project/project';

@Injectable()
export class RegistroFormService {
  private _formInfoPersonal: FormGroup;
  private _formInfoContacto: FormGroup;
  private _formInfoConectividad: FormGroup;
  private _formInfoAudio: FormGroup;
  private _formInfoPc: FormGroup;
  private _proyecto: IProject = {};
  public serviceActive$: Subject<any> = new Subject();
  constructor(
    private _fb: FormBuilder
  ) { }

  initForm(): void {
    this._formInfoPersonal = this._buildInfoPersonalForm();
    this._formInfoContacto = this._buildInfoContactoForm();
    this._formInfoConectividad = this._buildInfoConectividad();
    this._formInfoAudio = this._buildInfoAudio();
    this._formInfoPc = this._buildInfoPc();
  }

  get project(): IProject {
    return this._proyecto;
  }

  set project(values: IProject) {
    this._proyecto = values;
  }


  get formInfoPersonal(): FormGroup {
    return this._formInfoPersonal;
  }

  set formInfoPersonal(value: FormGroup) {
    this._formInfoPersonal = value;
  }

  get formInfoContacto(): FormGroup {
    return this._formInfoContacto;
  }

  set formInfoContacto(value: FormGroup) {
    this._formInfoContacto = value;
  }

  get formInfoConectividad(): FormGroup {
    return this._formInfoConectividad;
  }

  set formInfoConectividad(value: FormGroup) {
    this._formInfoConectividad = value;
  }

  get formInfoAudio(): FormGroup {
    return this._formInfoAudio;
  }

  set formInfoAudio(value: FormGroup) {
    this._formInfoAudio = value;
  }

  get formInfoPc(): FormGroup {
    return this._formInfoPc;
  }

  set formInfoPc(value: FormGroup) {
    this._formInfoPc = value;
  }

  private _buildInfoPersonalForm(): FormGroup {
    let nomPattern = /^[ a-zA-Z_áéíóúàèìòùÀÈÌÒÙñÁÉÍÓÚÑÜü\'.\s]*$/;
    const values = JSON.parse(localStorage.getItem('stepOne') || '{"postulante": {}}').postulante;
    return this._fb.group({
      nombresPostulante: [values.nombresPostulante, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(75),
        Validators.pattern(nomPattern)
      ]],
      apellidosPostulante: [values.apellidosPostulante, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(75),
        Validators.pattern(nomPattern)
      ]],
      fecNacimiento: [values.fecNacimiento, [Validators.required]],
      sexo: [values.sexo, Validators.required],
      tipoDocumento: [values.tipoDocumento, [Validators.required]],
      numeroDocumento: [values.numeroDocumento, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(18),
        Validators.pattern(/^[0-9]{1,18}$/)
      ]],
    });
  }

  private _buildInfoContactoForm(): FormGroup {
    const values = JSON.parse(localStorage.getItem('stepOne') || '{"datosPersonales": {}}').datosPersonales;
    return this._fb.group({
      telefono: [values.telefono, [
        Validators.required,
        ValidatorsExtend.isNumeric,
        Validators.minLength(7),
        Validators.maxLength(12)
      ]],
      correo: [values.correo, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(75),
        ValidatorsExtend.isOptionalEmail
      ]],
      pais: [values.pais || 'Perú', [Validators.required]],
      departamento: [{ value: values.departamento, disabled: !values.departamento }, [Validators.required]],
      provincia: [{ value: values.provincia, disabled: !values.provincia }, [Validators.required]],
      distrito: [{ value: values.distrito, disabled: !values.distrito }, [Validators.required]],
      // direccion: [{ value: values.direccion, disabled: values.dirección ? true : false }, [
      //   Validators.required,
      //   Validators.maxLength(75)
      // ]],
      direccion: [values.direccion, [
        Validators.required,
        Validators.maxLength(75)
      ]],
      distritoDetectado: [values.distritoDetectado],
      latitud: [values.latitud],
      longitud: [values.longitud]
      // latitud: [values.latitud, [Validators.required]],
      // longitud: [values.longitud, [Validators.required]]
    });
  }

  private _buildInfoConectividad(): FormGroup {
    let values = JSON.parse(localStorage.getItem('stepTwo') || '{}');
    return this._fb.group({
      operador: [values.operador, [Validators.required]],
      carga: [values.carga, [Validators.required]],
      descarga: [values.descarga, [Validators.required]],
      ping: [values.ping, [Validators.required]],
      latencia: [values.latencia, [Validators.required]],
      ip: [values.ip, [Validators.required]],
      isp: [values.isp, [Validators.required]]
    });
  }

  private _buildInfoAudio(): FormGroup {
    // const values = JSON.parse(localStorage.getItem('stepThree') || '{}');
    const values: any = {};
    return this._fb.group({
      tipoDispositivo: [values.tipoDispositivo, [Validators.required]],
      file: [values.file, [Validators.required]],
      extension: [values.extension, [Validators.required]],
      nameFile: [values.nameFile, [Validators.required]],
    });
  }


  private _buildInfoPc(): FormGroup {
    return this._fb.group({
      procesador: ['', [Validators.required]],
      memoriaRam: ['', [Validators.required]],
      discoDuro: ['', [Validators.required]],
      sistOperativo: ['', [Validators.required]],
      extensionFile: [null, [Validators.required]],
      file: [null, [Validators.required]],
      imagen: [null, [Validators.required]],
    });
  }



  get formValidStep1(): boolean {
    return this.formInfoPersonal.valid && this.formInfoContacto.valid;
  }

  get formValidStep2(): boolean {
    return this.formValidStep1 && this.formInfoConectividad.valid;
  }

  get formValidStep3(): boolean {
    return this.formValidStep2 && this.formInfoAudio.valid;
  }

  get formValidStepConfirm(): boolean {
    return this.formValidStep3 && this.formInfoPc.valid;
  }

  get valuesFormStepOne(): any {
    const fecha_hora_post = new Date().toISOString();
    return {
      postulante: {
        ...this._formInfoPersonal.getRawValue(),
        tipoDocumento: parseInt(this._formInfoPersonal.controls['tipoDocumento'].value, 10),
        fecha_hora_post
      },
      datosPersonales: {
        ...this.formInfoContacto.getRawValue(),
        fec_hora_datos: fecha_hora_post,
        postulante: {}
      },
      proyecto: this._proyecto.nombreProyecto
    }
  }

  get valuesFormStepTwo(): any {
    return {
      ...this.formInfoConectividad.value
    }
  }

  get valuesFormStepThree(): any {
    return {
      ...this.formInfoAudio.value
    }
  }

  get valuesFormStepFour(): any {
    return {
      ...this.formInfoPc.value
    }
  }

  touchedInputStepOne(): void {
    this.formInfoPersonal.markAllAsTouched();
    this.formInfoPersonal.controls['nombresPostulante'].markAsDirty();
    this.formInfoPersonal.controls['apellidosPostulante'].markAsDirty();
    this.formInfoPersonal.controls['fecNacimiento'].markAsDirty();
    this.formInfoPersonal.controls['sexo'].markAsDirty();
    this.formInfoPersonal.controls['tipoDocumento'].markAsDirty();
    this.formInfoPersonal.controls['numeroDocumento'].markAsDirty();

    this.formInfoContacto.markAllAsTouched();
    this.formInfoContacto.controls['telefono'].markAsDirty();
    this.formInfoContacto.controls['correo'].markAsDirty();
    this.formInfoContacto.controls['pais'].markAsDirty();
    this.formInfoContacto.controls['departamento'].markAsDirty();
    this.formInfoContacto.controls['provincia'].markAsDirty();
    this.formInfoContacto.controls['distrito'].markAsDirty();
    this.formInfoContacto.controls['direccion'].markAsDirty();
  }

  touchedInputStepTwo(): void {
    // this.formInfoConectividad
  }

  touchedInputStepThree(): void {
    this.formInfoAudio.markAllAsTouched();
    this.formInfoAudio.controls['tipoDispositivo'].markAsDirty();
    this.formInfoAudio.controls['file'].markAsDirty();
    this.formInfoAudio.controls['extension'].markAsDirty();
    this.formInfoAudio.controls['nameFile'].markAsDirty();
  }

  touchedInputStepFour(): void {
    this.formInfoPc.markAllAsTouched();
    this.formInfoPc.controls['procesador'].markAsDirty();
    this.formInfoPc.controls['memoriaRam'].markAsDirty();
    this.formInfoPc.controls['discoDuro'].markAsDirty();
    this.formInfoPc.controls['sistOperativo'].markAsDirty();
    this.formInfoPc.controls['extensionFile'].markAsDirty();
    this.formInfoPc.controls['file'].markAsDirty();
    this.formInfoPc.controls['imagen'].markAsDirty();
  }

  resetForms(): void {
    this.formInfoPersonal.reset();
    this.formInfoContacto.reset();
    this._formInfoConectividad.reset();
    this._formInfoAudio.reset();
    this._formInfoPc.reset();
    this.formInfoPc.reset();

  }
}
