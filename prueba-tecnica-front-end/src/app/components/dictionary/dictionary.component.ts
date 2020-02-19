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
	public alphabet: string[] = [...Array(26).keys()].map(i => String.fromCharCode(i+97));
	public charQuantityByParagraph: Array<Array<number>> = [[]];
  	constructor( private _pruebaService: PruebaService, 
  				 private _spinner: NgxSpinnerService
  	){}

  	ngOnInit() {

  		console.log('Componente ejecutado');
	}

	getDict(){
		this._spinner.show();
  		this._pruebaService.getDict().subscribe(
  			response =>{
  				this._spinner.hide();
  				let data = response;
  				this.success = data.success;
  				this.error = data.error;
  				data = JSON.parse(data.data);
  				this.paragraphArray = data.map((paragraph: Paragraph) => {
  					return new Paragraph(
  						paragraph.paragraph,
  						paragraph.number,
  						paragraph.hasCopyright
  						);
  					});
  				console.log(data);
  				console.log(this.paragraphArray);
  				this.processData(this.paragraphArray);
  			},
  			error =>{
  				console.log('me mori');
  				console.log(<any>error);
  			}
		);
	}

	processData( paragraphArray: Paragraph[]){
		let dataLength = paragraphArray.length;
		for(let i = 0; i < dataLength; i++){
			this.charQuantityByParagraph[i] = paragraphArray[i].countChars(this.alphabet);
			//paragraphArray[i].sumNumbers();
		}

		console.log(this.charQuantityByParagraph);
	}

}
