import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DateProvider {

	constructor(public http: HttpClient) {
		console.log('Hello DateProvider Provider');
	}

	toDateTime(secs: number) {
	    var date = new Date(1970, 0, 1);
	    date.setSeconds(secs);
	    let d = date.getDate()
	    let m = date.getMonth() + 1
	    let y = date.getFullYear()
	    let offset = date.getTimezoneOffset()
	    let h = date.getHours() - (offset/60)
	    let mins = date.getMinutes()
	    let xM = h > 12 ? 'PM' : 'AM'
	    return `${d}/${m}/${y} ${h%12}:${mins} ${xM}`;
	}
}
