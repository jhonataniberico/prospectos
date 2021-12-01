import * as _moment from "moment";
import * as _rollupMoment from "moment";

const moment = _rollupMoment || _moment;
export function formatDate(value:any, stringFormat: string): any {
    return moment(value).format(stringFormat);
}