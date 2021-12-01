import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class SnackBarService {
    constructor(private _snackBar: MatSnackBar) {}

    public show(config: {message: string, duration?: number}) {
        if (!config.duration) {
            config.duration = 2000;
        }
        this._snackBar.open(config.message, 'Cerrar', { duration: config.duration , horizontalPosition: 'start'});
    }
}