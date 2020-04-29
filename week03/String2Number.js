function convertStringToNumber(string, x) {
	if (arguments.length < 2) {
		x = 10;
	}
	var _x = Number(x)
	var chars = string.split('');
	var number = 0
	var i = 0
	if (chars.some(s => s >= x)) {
		return NaN
	}
	// 八进制的数字
	if (chars[0] === '0') {
		if (x === 2) {
			return NaN
		} else if (x === 8 || x >= 10) {
			x = 8
		}
	}
	// 十六进制的数字
	if (string.indexOf('0x') > -1 || string.indexOf('0X') > -1) {
		chars =chars.slice(2)
		if (x === 2) {
			return NaN
		} else if (x === 8 || x >= 10) {
			x = 16
		}
	}
	while(i < chars.length && chars[i] !== '.') {
		if (chars[i] !== 'e' && chars[i] !== 'E') {
			number = number * x
			number += chars[i].codePointAt(0) - '0'.codePointAt(0)
			i++
		} else {
			let rest = chars.slice(i+1).join('')
			number = number * Math.pow(10, rest)
			i = chars.length 
		}
	}
	if (chars[i] === '.') {
		i++
	}
	var fraction = 1;
	while(i < chars.length) {
		if (chars[i] !== 'e' && chars[i] !== 'E') {
			debugger
			fraction = fraction /  x
			number += (chars[i].codePointAt(0) - '0'.codePointAt(0)) * fraction
			i++
		} else {
			let rest = chars.slice(i+1).join('')
			number = number * Math.pow(10, rest)
			i = chars.length 
		}
	}
	return number;
}