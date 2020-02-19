export class Paragraph {
	constructor(
		public paragraph: string,
		public number: number,
		public hasCopyright: boolean 
	){}

	 
	countChars( alphabet: string[]): number[]{
		let charCount: number[] = new Array<number>(26).fill(0);
		let paragraphLength = this.paragraph.length;
		let charLowerCase = "";
		let charOcurrence = -1;
		for(let i = 0; i < paragraphLength; i++){
			charLowerCase = this.paragraph[i].toLowerCase();
			charOcurrence = alphabet.indexOf(charLowerCase);
			if(charOcurrence != -1){
				charCount[charOcurrence]++;
			}
		}

		return charCount;
	}

	sumNumbers(){
		let numberString: string = "";
		let numberResult: number = 0;
		let numberOperation: number = 0;

		let paragraphLength = this.paragraph.length;

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
