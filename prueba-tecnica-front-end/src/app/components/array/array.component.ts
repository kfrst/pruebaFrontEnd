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
  public error: string;
  public success: boolean;
  public sortedData: string;
  constructor( private _pruebaService: PruebaService,
  			   private _spinner: NgxSpinnerService
  	) { 
  }
  
  ngOnInit() {
  	console.log('Componente ejecutado');
  	//this.getArray();
  }

  getArray(){
  	this._spinner.show();
  	this.numbers = [];
  	this._pruebaService.getArray().subscribe(
  			response =>{
  				this._spinner.hide();
  				let data = response;
  				console.log(data);
  				this.dataArray = data.data;
  				this.error = data.error;
  				this.success = data.success;
  				if(this.success){
  					this.processData();
  					this.sortData(this.dataArray);
  				}
  			},
  			error =>{
  				console.log(<any>error);
  			}
		);
  }

  processData(): void{
  	for(let numberIndex = 0; numberIndex < this.dataArray.length; numberIndex++){
  		let numberObject = this.hasThisNumber(this.dataArray[numberIndex]);
  		let lastIndex = this.dataArray.lastIndexOf(this.dataArray[numberIndex]);;
  		if(numberObject){
  			this.updateNumber(this.numbers.indexOf(numberObject));
  		}
  		else{
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
  	console.log("Sin ordenar: ", data);
  	console.log("Ordenado: ", dataToSort);
  	this.concatDataNumber(dataToSort);
  	console.log(this.sortedData);
  }

  concatDataNumber( data: number[]){
  	let dataLength: number = data.length;
  	let str: string = "";

  	for(let i = 0; i < dataLength; i++){
  		str += data[i] + " ";
  	}

  	this.sortedData = str;
  }
}
