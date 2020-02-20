import { Component, OnInit } from '@angular/core';
import { PruebaService } from '../../services/prueba.service';
import { Number } from '../../models/number';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'array',
  templateUrl: './array.component.html',
  styleUrls: ['./array.component.css'],
  providers: [ PruebaService,
  			   NgxSpinnerService
  ]
})
export class ArrayComponent implements OnInit {
  public dataArray: number[]= [];
  public numbers: Number[] = [];
  public error: string = '';
  public success: boolean;
  public sortedData: string;
  constructor( private _pruebaService: PruebaService,
  			   private _spinner: NgxSpinnerService
  	) { 
  }
  
  ngOnInit() {
  	console.log('Componente ejecutado');
  }
  /* Metodo en donde se consume la API a través del servicio pruebaService.
     Se guardan los datos inicialmente recibidos en los atributos principales de la clase
     (dataArray, error, success). En caso de que success sea True, se procede a procesar la data según
     los requerimientos para el proyecto */

  getArray(){
  	this._spinner.show(); /* Se muestra el evento de loading hasta que se reciben los datos*/
  	this.numbers = [];
  	this._pruebaService.getArray().subscribe(
  			response =>{
  				this._spinner.hide();
  				let data = response;
          if(data){
              this.dataArray = data.data;
              this.error = data.error;
              this.success = data.success;
              if(this.success){
                this.processData();
                this.sortData(this.dataArray);
              }
          }
          else{
            this.error += ' No llegaron datos para procesar desde la API';
          }
  			},
  			error =>{
          this.error = <any> error;
  				console.log(<any>error);
  			}
		);
  }

  /* processData se encarga de crear un Array de objetos correspondientes al modelo Number, para esto
     se verifica si ya existe el número a procesar en el Array. Si existe, se incrementa la cantidad 
     de ocurrencias, en caso contrario, se crea un nuevo Number y se añade al Array */

  processData(): void{
  	for(let numberIndex = 0; numberIndex < this.dataArray.length; numberIndex++){
  		let numberObject = this.hasThisNumber(this.dataArray[numberIndex]);
  		let lastIndex = this.dataArray.lastIndexOf(this.dataArray[numberIndex]);;
  		if(numberObject){
  			this.updateNumber(this.numbers.indexOf(numberObject)); 
  		}
  		else{
        /* Se invoca al metodo para crear un nuevo numero y agregarlo al array, para esto se envían
          los datos necesarios para una nueva instancia de Number (el número, el indice de su primera aparicion
          y su última aparición obtenida gracias al metodo lastIndexOf */
  			this.createNumber(this.dataArray[numberIndex], numberIndex, lastIndex);
  		}
  	}
  }

  hasThisNumber(numberElement: number): Number{
  	for(let numberObject of this.numbers){
  		if (numberObject.number == numberElement){
  			return numberObject;
  		}
  	}

  	return null;

  }
  createNumber(numberElement: number, firstPosition: number, lastPosition: number): void{
  	this.numbers.push(new Number(numberElement, 1, firstPosition, lastPosition));	
  }

  updateNumber(elementPosition: number): void{
  	let newNumber: Number = this.numbers[elementPosition];
  	newNumber.incrementQuantity();
  	this.numbers[elementPosition] = newNumber;
  }


  /* sortData aplica un bubble sort a un arreglo auxiliar que contiene únicamente los números para ordenarlos
      de menor a mayor  */

  sortData( data : number[]){
  	let dataToSort: number[] = [...data];
  	let dataLength: number = dataToSort.length;
  	let tempNumber: number;
  	for(let i = 1; i < dataLength; i++){
  		for(let j = 0; j < (dataLength - i); j++){
  			if(dataToSort[j] > dataToSort[j + 1]){
  				tempNumber = dataToSort[j];
  				dataToSort[j] = dataToSort[j+1];
  				dataToSort[j+1] = tempNumber;
  			}
  		}
  	}

    /* Dejo ambos console.log en caso de que quieran comparar el resultado final con los datos pre-procesados */
  	console.log("Sin ordenar: ", data);   
  	console.log("Ordenado: ", dataToSort);
  	this.concatDataNumber(dataToSort);
  }

  /* Se concatenan los números ordenados para luego ser mostrados en la vista */

  concatDataNumber( data: number[]){
  	let dataLength: number = data.length;
  	let str: string = "";

  	for(let i = 0; i < dataLength; i++){
  		str += data[i] + " ";
  	}

  	this.sortedData = str;
  }
}
