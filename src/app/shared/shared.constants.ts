export class SharedConstants {
    static get PATTERN() {
        return {
            NO_CHARACTER_STRANGE: /^[ a-zA-Z0-9_áéíóúàèìòùÀÈÌÒÙñÁÉÍÓÚÑÜü\'.\s]*$/,
            DOMAIN_VALID: /\b(?:(?:[1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}(?:[1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\b|\blocalhost\b/,
            EMAIL: /[A-Za-z0-9]+@[a-z0-9]+\.[a-z]+/,
            NUMERIC: /^[0-9]{1,100}$/
        };
    }
    static get ICONS() {
        return {
            ICON_ARROW_BUTTON: 'assets/images/iconos/icon-arrow-button.svg',
            ICON_DETALLE: 'assets/images/iconos/icon-detalle.svg',
            ICON_CLOSE: 'assets/images/iconos/icon-close.svg'
        };
    }

    static get COMBOS() {
        return {
            SEXO: [
                { value: '1', desc: 'Masculino' },
                { value: '2', desc: 'Femenino' },
                { value: '3', desc: 'Personalizado' }
            ],
            TIPO_DOCUMENTO: [
                { value: 0, desc: 'DNI' },
                { value: 1, desc: 'CARNET DE EXTRANJERÍA' },
            ],
            TIPO_APTITUD: [
                { value: 0, desc: 'NO APTO' },
                { value: 1, desc: 'APTO' },
            ]
        }
    }

}
