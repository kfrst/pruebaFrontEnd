import { Component, OnInit } from '@angular/core';
import { PruebaService } from '../../services/prueba.service';
import { NgxSpinnerService } from 'ngx-spinner';

import { Paragraph } from '../../models/paragraph';

@Component({
  selector: 'dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css'],
  providers: [ PruebaService,
  			   NgxSpinnerService
   ]
})
export class DictionaryComponent implements OnInit {
	public paragraphArray: Paragraph[] = [];
	public success: boolean;
	public error: string;
  
  /* Se crea un un arreglo con el alfabeto para luego utilizarlo en el contador de caracteres por párrafo */

	public alphabet: string[] = [...Array(26).keys()].map(i => String.fromCharCode(i+97));

  /* Array de Arrays de números, encargado de almacenar los contadores de repeticiones de
     letras para cada párrafo */
	public charQuantityByParagraph: Array<Array<number>> = [[]];
  	constructor( private _pruebaService: PruebaService, 
  				 private _spinner: NgxSpinnerService
  	){}

  	ngOnInit() {

  		console.log('Componente ejecutado');
	}

    /* Metodo en donde se consume la API a través del servicio pruebaService.
     Se guardan los datos inicialmente recibidos en los atributos principales de la clase
     (paragraphArray, error, success). En caso de que success sea True, se procede a procesar la data según
     los requerimientos para el proyecto */

	getDict(){
		this._spinner.show();
  		this._pruebaService.getDict().subscribe(
  			response =>{
  				this._spinner.hide();
  				let data = response;
  				this.success = data.success;
  				this.error = data.error;
          if(this.success){
            /* Después de conseguir los párrafos, se realiza un mapeo al arreglo de objetos del modelo Paragraph */
            data = JSON.parse(data.data);
            this.paragraphArray = data.map((paragraph: Paragraph) => {
              return new Paragraph(
              paragraph.paragraph,
              paragraph.number,
              paragraph.hasCopyright
              );
            });
            console.log(this.paragraphArray);
            this.processData(this.paragraphArray);
          }
  			},
  			error =>{
  				this.error = <any>error;
  				console.log(<any>error);
  			}
		);
	}

  /* Se recorre cada párrafo y a cada párrafo se le invoca el metodo counChars, recibiendo el alfabeto
     como parámetro y retornando un arreglo con la cantidad de repeticiones por carácter en un párrafo. */

	processData( paragraphArray: Paragraph[]){
		let dataLength = paragraphArray.length;
		for(let i = 0; i < dataLength; i++){
			this.charQuantityByParagraph[i] = paragraphArray[i].countChars(this.alphabet);
		}

		console.log(this.charQuantityByParagraph);
	}

}
