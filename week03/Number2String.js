// 计算精度倍数
function baseNum(num1, num2, punctuation) {
    var base;
    if (isNaN(num1) || isNaN(num2)) return
    if (Object.prototype.toString.call(num1) === '[object Number]' && Object.prototype.toString.call(num2) === '[object Number]') {
        let _num1 = (num1.toString().split('.')[1] || '').length
        let _num2 = (num2.toString().split('.')[1] || '').length
        base = Math.pow(10, Math.max(_num1, _num2))
    }
    if (punctuation === '-') {
      return (num1 * base - num2 * base) / base
    } else if (punctuation === '+') {
      return (num1 * base + num2 * base) / base
    }
}

function strip(num) {
    return +parseFloat(+num.toPrecision(12))
}

function isPositive(zero) {
	if (1 / zero == 'Infinity') {
		return true
	} else if (1 / zero == '-Infinity') {
		return false
	}
}

function convertNumberToString(digist, x = 10) {
	if (isNaN(digist)) return NaN;
	if (digist === 0) return 0;
	if (digist < 0) {
		return '-' + Math.abs(digist)
	}
	if (digist === '+∞') return Infinity;
	if (x < 2 || x > 36) {
		throw 'radix argument must be between 2 and 36'
	}
	var dint = ~~(digist)
	var portion = baseNum(digist, dint, '-')
	var string = ''
	var codenum;
	var maxPrecision = 0;
	while(dint > 0) {
		let modulo = dint % x
		if (x > 10 && modulo >= 10) {
			// modulo = String.fromCharCode(String(modulo).split('').map(m => m.charCodeAt(0)).reduce((acc, cur) => acc+cur) + 9)
			modulo = String.fromCharCode('a'.codePointAt(0) + modulo - 10)
		}
		string = modulo + string
		dint = ~~(dint / x)
	}
	if (portion > Number.EPSILON) {
		string += string === '' ? '0.' : '.'
	}
	while(portion > 0) {
		if (maxPrecision === 12) return string;
		let temp = strip(portion * x)
		let d = ~~(temp)
		if (x > 10 && d >= 10) {
			string = String.fromCharCode('a'.codePointAt(0) + d - 10)
		} else {
			string = string + d
		}
		portion = strip(temp - d)
		maxPrecision++
	}
	return string
}
