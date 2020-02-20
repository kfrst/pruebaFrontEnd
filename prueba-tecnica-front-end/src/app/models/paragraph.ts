export class Paragraph {
	constructor(
		public paragraph: string,
		public number: number,
		public hasCopyright: boolean 
	){}

	/* Método para contar las repeticiones de caracteres en un párrafo */

	countChars( alphabet: string[]): number[]{
		let charCount: number[] = new Array<number>(26).fill(0);
		let paragraphLength = this.paragraph.length;
		let charLowerCase = "";
		let charOcurrence = -1;
		/* Si el caracter analizado pertenece al alfabeto, se incrementa el valor del arreglo
		   en la misma posición a la que le corresponde en el alfabeto */
		for(let i = 0; i < paragraphLength; i++){
			charLowerCase = this.paragraph[i].toLowerCase();
			charOcurrence = alphabet.indexOf(charLowerCase);
			if(charOcurrence != -1){
				charCount[charOcurrence]++;
			}
		}

		return charCount;
	}

	/* Metodo que realiza la suma de los números encontrados en un párrafo */
	sumNumbers(){
		let numberString: string = "";
		let numberResult: number = 0;
		let numberOperation: number = 0;

		let paragraphLength = this.paragraph.length;

		/*	Analiza carácter por carácter, si el carácter encontrado es un número, se almacena en un string.
			Si el siguiente carácter es otro número, el string lo concatena, si no es número, el string se transforma
			en númerico y se suma en una variable que irá almacenando el resultado total de la suma de números encontrados
			en el párrafo. */
		for(let i = 0; i < paragraphLength; i++){
			numberResult = Number.parseInt(this.paragraph[i], 10);
			//console.log(numberResult);
			if(!isNaN(numberResult)){
				numberString += numberResult;
				//console.log(numberString);
			}
			else{
				if(numberString != ""){
					numberOperation += Number.parseInt(numberString, 10);
					numberString = "";
				}
			}
		}
		//console.log(numberOperation);
		return numberOperation;
	}

	
}
