import { IMapCoordinates } from './mapa-ubicacion.model';

export function __getPosition(): Promise<IMapCoordinates> {
    return new Promise((resolve, reject) => {
        var posicion;
        if (navigator.geolocation) {
            return navigator.geolocation.getCurrentPosition((position) => {
                posicion = position;
                resolve(posicion.coords);
            }, (error) => {
                if(error.code === 1) resolve(null);
            });
        } else {
            // tu navegador no soporta esto
            resolve(null);
        }
    })
}