import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable()
export class AdminProspectoFormService {
    private _formSearch: FormGroup;
    constructor(
        private _fb: FormBuilder
    ) { }

    initForm(): void {
        this._formSearch = this._buildFormSearch();
    }

    get formSearch(): FormGroup {
        return this._formSearch;
    }

    set formSearch(value: FormGroup) {
        this._formSearch = value;
    }
    private _buildFormSearch(): FormGroup {
        return this._fb.group({
            idProyecto: null,
            tipoDocumento: null,
            numeroDocumento: null,
            pais: 139,
            departamento: null,
            provincia: null,
            distrito: null,
            distritoDetectado: null,
            descarga: null,
            carga: null,
            auricular: null,
            apto: null,
            fecIniRegistro: null,
            fecFinRegistro: null
        });
    }

    get valuesFormSearch(): any {
        return {
            ...this.formSearch.value
        }
    }
}