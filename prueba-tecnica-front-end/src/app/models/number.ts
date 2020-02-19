export class Number {
	constructor(
		public number: number,
		public quantity: number,
		public firstPosition: number,
		public lastPosition: number
	){}

	incrementQuantity(){
		this.quantity++;
	}
}
