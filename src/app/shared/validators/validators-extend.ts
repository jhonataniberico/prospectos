import { AbstractControl, ValidatorFn } from '@angular/forms';
import { SharedConstants } from '@app/shared/shared.constants';

export class ValidatorsExtend {
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        const config = {
            required: 'Campo obligatorio.',
            minlength: `La longitud mínima (${validatorValue.requiredLength} caracteres)`,
            maxlength: `Excede longitud máxima (${validatorValue.requiredLength} caracteres)`,
            requireobject: '* Debe seleccionar un item.',
            number: 'Campo admite números y/o símbolos válidos',
            isNumeric: 'Campo admite solo números',
            email: 'Formato de correo no es válido',
            isEmail: 'Formato de correo no es válido',
            isInvalidDate: 'Formato de fecha incorrecto.',
            isInvalidHour: 'Formato de hora incorrecto.',
            isPhoneNumber: 'El numero ingresado no es válido.',
            isInvalidCharacter: `Caracteres inválidos`,
            isURL: 'La URL de la página ingresada no es correcta.',
            max: `Excede el valor maximo a ${validatorValue.max}`,
            min: `El valor minimo es de ${validatorValue.min}`,
            matDatepickerParse: 'Fecha inválida',
            requireMatch : 'Opción inválida'
        };
        return config[validatorName];
    }

    static isAlphanumeric(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (isEmptyInputValue(control.value)) {
                return null;  // don't validate empty values to allow optional controls
            }
            const regex = new RegExp('^[0-9a-zA-Z]+$');
            const value: string = control.value;
            return regex.test(value) ?
                null : { isMultiAlphanumeric: { requiredPattern: 'solo permite letras y números', actualValue: value } };
        };
    }

    static isNumeric(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (isEmptyInputValue(control.value)) {
                return null;  // don't validate empty values to allow optional controls
            }
            const regex = new RegExp('^([0-9])*$');
            const value: string = control.value;
            return regex.test(value) ?
                null : { isNumeric: { requiredPattern: 'only allow numbers', actualValue: value } };
        };
    }

    static requireObject(control: AbstractControl): { [key: string]: boolean } {
        return !control.value || typeof control.value === 'object' ?
            null : { requireobject: true };
    }

    static isValidDate(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (isEmptyInputValue(control.value)) {
                return null;
            }
            const unixTimeZero = Date.parse(control.value);
            const javaScriptRelease = Date.parse(control.value);
            if (unixTimeZero > 0 && javaScriptRelease > 0) {
                return null;
            } else {
                return { isInvalidDate: true };
            }
        };
    }

    static isValidRangeDate(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (isEmptyInputValue(control.value)) {
                return null;
            }
            const firstDate = control.value[0];
            const secondDate = control.value[1];
            const unixTimeZeroFirst = Date.parse(firstDate);
            const javaScriptReleaseFirst = Date.parse(firstDate);
            const unixTimeZeroSecond = Date.parse(secondDate);
            const javaScriptReleaseSecond = Date.parse(secondDate);
            if (unixTimeZeroFirst > 0 && javaScriptReleaseFirst > 0 && unixTimeZeroSecond && javaScriptReleaseSecond > 0) {
                return null;
            } else {
                return { isInvalidDate: true };
            }
        };
    }

    static isValidHour(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (isEmptyInputValue(control.value)) {
                return null;
            }
            const regex = new RegExp('^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$');
            const value: string = control.value;
            const valid = regex.test(value) ?
                null : { isInvalidHour: true };
            return valid;
        };
    }

    /**
     * Permite validar correo electronico.
     */
    static isOptionalEmail(control: AbstractControl): { [key: string]: any; } {
        const value: string = control.value;
        // tslint:disable-next-line: max-line-length
        const regex = /[a-zA-Z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/g;
        if (isEmptyInputValue(value)) {
            return null;  // don't validate empty values to allow optional controls
        }
        return regex.test(value) ?
            null : { isEmail: 'Formato de correo no es válido.' };
    }
    /**
     * Permite validar solo url www.angular.io
     */
    static isURL(control: AbstractControl): { [key: string]: any; } {
        const regex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        const value: string = control.value;
        if (isEmptyInputValue(value)) {
            return null;  // don't validate empty values to allow optional controls
        }
        return regex.test(value) ? null : { isURL: 'the URL is incorrect' };
    }

    /**
     * Permitir que ingrese letras y números sin caracteres especiales
     */
    static isInvalidCharacter(control: AbstractControl): { [key: string]: any; } {
        const regex = SharedConstants.PATTERN.NO_CHARACTER_STRANGE;
        const value: string = control.value;
        if (isEmptyInputValue(value)) {
            return null;  // don't validate empty values to allow optional controls
        }
        return regex.test(value) ? null : { isInvalidCharacter: true };
    }

    static requireMatch(control: AbstractControl) {
        const selection: any = control.value;
        if (typeof selection === 'string' && !selection.includes('_SELECT_')) {
            return { requireMatch: true };
        }
        return null;
    }
}

function isEmptyInputValue(value: any) {
    return value == null || typeof value === 'string' && value.length === 0;
}
