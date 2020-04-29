function convertNumberToString(number, x = 10) {
	var interger = Math.floor(number);
	var fraction = number  - interger;
	var _fraction = 0;
	var fractionArr = [];
	var string = '';
	var i = 0;
	var ratio = 1;
	var dot;
	while(interger > 0) {
		string = String(interger % x) + string;
		interger = Math.floor(interger / x);
	}
	if (fraction > 0) {
		dot = String(number).split('').findIndex(f => f === '.')
		fractionArr = String(fraction).substring(dot + 1).split('')

		while(i < fractionArr.length) {
			ratio = ratio / x
			_fraction += (fractionArr[i].charCodeAt(0) - '0'.charCodeAt(0))*ratio
			i++
		}

	}
	return (+string + _fraction).toString()
}