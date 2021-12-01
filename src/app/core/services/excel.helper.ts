import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs/dist/exceljs.min.js';
import * as FileSaver from 'file-saver';
import * as _moment from 'moment';
import * as _rollupMoment from 'moment';
const moment    = _rollupMoment || _moment;
moment.locale('es');
const now_date      = moment(new Date()).format('LL');
const now_date_hour = moment(new Date()).format('DD/MM/YYYY hh:mm a');
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

declare const ExcelJS: any;

@Injectable({
    providedIn: 'root'
})
// let title  = {name: this.name_report, down: this.name_down}
export class ExcelHelper {
    alg_deft_c = { vertical: 'middle', horizontal: 'center' , wrapText: true};
    alg_deft_v = { vertical: 'top'   , horizontal: 'left'   , wrapText: true};
    fill_deft  = {
                    type    : 'pattern',
                   pattern : 'solid',
                   fgColor : { argb : 'D8D8D8D8' }
                };
    bor_deft_t = {
                    top:    {style : 'thin', color: {argb : '1E1E1E00'}},
                    left:   {style : 'thin', color: {argb : '1E1E1E00'}},
                    bottom: {style : 'thin', color: {argb : '1E1E1E00'}},
                    right:  {style : 'thin', color: {argb : '1E1E1E00'}}
                };
    workbook: ExcelJS.Workbook;
    worksheet: any;
    constructor() {}

    async downloadExcel(nameDoc, prmCabecera, prmKeys, valores, image = null) {
        const cabecera = JSON.parse(JSON.stringify(prmCabecera));
        const keys = JSON.parse(JSON.stringify(prmKeys));
        try {
            this.workbook = new ExcelJS.Workbook();
            // Donde se inicia la configuración
            const cellStartCabecera = 8;
            this.worksheet = this.workbook.addWorksheet(nameDoc.name , { pageSetup : { paperSize: 9, orientation: 'landscape'},
                                                                         properties : { tabColor: { argb: '17418C' }}
                                                                       });
            // Obtenemos el logo
            // const logo_img = await _base64.imgUrlToBase64();

            // Configurar la imagen
            // const logo = this.workbook.addImage({
            //     base64    : logo_img,
            //     extension : 'png',
            // });

            // const img = {
            //     tl: { col: 1.8, row: 1.5, colOff: 2, rowOff: 1},
            //     br: { col: 2.3, row: 6.3, colOff: 2, rowOff: 1},
            //     editAs : 'oneCell'
            // };

            // const image_work = image ? image.position : img;

            // Agregar a la hoja el logo
            // this.worksheet.addImage(logo, image_work);

            // Colocamos al inicio la posición
            cabecera.data.unshift('#');
            const json_lenght      = cabecera.data.length,
                fecha              = new Array(json_lenght);
                fecha[json_lenght] = `Fecha: ${now_date}`;

            // Insertamos en la fila 2 la fecha
            this.worksheet.getRow(2).values         = fecha;
            const rowFecha                          = this.worksheet.lastRow;
            rowFecha.getCell(json_lenght).alignment = {horizontal : 'right'};

            // Insertamos en la fila 4 el nombre del reporte
            const nombre_repo               = new Array(json_lenght);
            nombre_repo[0]                  = nameDoc.name;
            this.worksheet.getRow(4).values = nombre_repo;

            // Colocar estilos al título
            this.worksheet.lastRow.getCell(1).alignment = this.alg_deft_c;
            this.worksheet.lastRow.getCell(1).font = {
                name      : 'Arial',
                family    : 4,
                size      : 12,
                underline : false,
                bold      : true
            };

            this.worksheet.mergeCells(
                this.worksheet.lastRow.getCell(1)._address,
                this.worksheet.lastRow.getCell(cabecera.data.length)._address
            );

            keys.unshift( { key : 'number', width: 5, alignment: { horizontal: 'left'  , vertical: 'top', wrapText: true } });
            this.worksheet.columns = keys;
            this.worksheet.getRow(cellStartCabecera).values = cabecera.data;

            const lastCell = this.worksheet.lastRow;
            // tslint:disable-next-line: forin
            for (const b in cabecera.data) {
                const index = +b + 1;
                // Estilos de Cabecera
                lastCell.getCell(index).border    = cabecera.bor_deft  ? cabecera.bor_deft   : this.bor_deft_t;
                lastCell.getCell(index).alignment = cabecera.alignment ? cabecera.alignment  : this.alg_deft_c;
                lastCell.getCell(index).fill      = cabecera.fill      ? cabecera.fill       : this.fill_deft;
                lastCell.getCell(index).height    = cabecera.height    ? cabecera.height     : 40;
            }
            // Agregar el cuerpo con la infomación enviada
            let count = 1;
            for (const i of valores) {
                i.number = count;
                this.worksheet.addRow(i);
                const row = this.worksheet.lastRow;
                for (const a of keys) {
                    // '#.00'
                    row.getCell(a.key).alignment = a.alignment ? a.alignment : this.alg_deft_v;
                    row.getCell(a.key).border    = a.border    ? a.border    : this.bor_deft_t;
                    row.getCell(a.key).fill      = a.fill      ? a.fill      : null;
                    row.getCell(a.key).numFmt    = a.numFmt    ? a.numFmt    : null;
                    row.getCell(a.key).font      = { bold: true };
                }
                count++;
            }
            // Ajustar la configuración de la página de configuración después
            this.worksheet.pageSetup.margins = {
                left   : 0.5,
                right  : 0.5,
                top    : 0.70,
                bottom : 0.70,
                header : 1.3,
                footer : 1.3
            };

            // Inicar la descargar en el browser
            this.workbook.xlsx.writeBuffer().then(data => {
                const blob = new Blob([data], { type: EXCEL_TYPE });
                FileSaver.saveAs(blob, nameDoc.down + EXCEL_EXTENSION);
            }).catch(err => {
                console.log(err);
                // this.notifyService.notify('error', 'Hubo un error al descargar');
            });
        } catch (err) {
            console.log(err);
            // this.notifyService.notify('error', 'Hubo un error al descargar');
        }
    }
}
