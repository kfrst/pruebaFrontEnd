import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class PruebaService {
	public url:string;
  	constructor(private _http: HttpClient){
  		this.url = "http://patovega.com/prueba_frontend/"
 	}

 	getArray(): Observable <any>{
		return this._http.get(this.url+'array.php');
 	}

 	getDict(): Observable <any>{
		return this._http.get(this.url+'dict.php');
 	}
}
