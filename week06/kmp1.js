//============非状态机写法=================

/**
 * 计算 模式串中 前后缀交集元素的最大长度
 * @param {*} d 
 */
function calcLen(d) {
	if (d.length === 1 || d.length === 2) {
		return 0
	} else {
		return compareLen(leftPart(d), rightPart(d))
	}
}
/**
 * 前缀
 * @param {} d 
 */
function leftPart(d) {
	let arr = []
	let temp = ''
	for (var k = 0; k < d.length - 1; k++) {
		temp += d[k]
		arr.push(temp)
	}
	return arr
}
/**
 * 后缀
 * @param {} d 
 */
function rightPart(d) {
	let arr = []
	let temp = ''
	for (var k = d.length - 1; k > 0; k--) {
		temp = d[k] + temp
		arr.push(temp)
	}
	return arr
}
function compareLen(d1, d2) {
	// 匹配交集
	let ret = []
	for (let n = 0; n < d1.length; n++) {
		for (let m = 0; m < d2.length; m++) {
			if (d2[m] === d1[n] && !ret.includes(d2[m])) {
				ret.push(d2[m])
			}
		}
	}
	// 获取最大长度
	if (ret.length > 0) {
		ret = ret.map(m => m.split('').length)
		return Math.max(...ret)
	} else {
		return 0
	}
}
/**
 * 
 * @param {*} arr 数组
 * @param {*} offset 正整数，向右移n位，负整数，向左移n位
 * @param {*} pad 补数
 */
function moveElement(arr, offset, pad) {
	if (Math.abs(offset) > arr.length)
		offset = offset % arr.length
	if (pad)
		return [pad].concat(arr.slice(0, -offset))
	else
		return arr.slice(-offset).concat(arr.slice(0, -offset))
}
/**
 * 根据pmt数组得到next数组
 * @param {*} d 
 */
function next(d) {
	let arr = d.split('')
	let char = arr[0]
	let knife = 0;
	let MaxL = []
	let _next;
	while (knife < arr.length) {
		let len = calcLen(char)
		MaxL.push(len)
		knife++
		char = arr.slice(0, knife + 1)
	}
	_next = moveElement(MaxL, 1, -1)
	// 向右移以为,第一位补-1
	return _next
}
function match(s, m) {
	let _next = next(m)
	let j = 0
	for (let i = 0, len = s.length; i < len; i++) {
		while (j > 0 && m[j] !== s[i]) {
			j = _next[j]; // 等价于 m 向右移动了 j - next[j] 位
		}
		if (m[j] === s[i]) {
			j++;
		}
		if (j === m.length) {
			console.log(i + 1 - m.length)
			return i + 1 - m.length;
		}
	}
}

//============状态机实现=================


// /**
//  * 
//  * @param {*} string 主串
//  * @param {*} pattern 模式串
//  * @param {*} _next PMT（字符串的前缀集合与后缀集合的交集中最长元素的长度）数组向右移动一位后得到的数组
//  * @param {*} i 下标
//  * @param {*} j 下标
//  */

// // var string = 'abaabaabbabaaabaabbabaab';
// // var pattern = 'abaabbabaab';

// var flag = false;
// var string = 'abcabcabx';
// var pattern = 'abx';
// var _next = next(pattern);

// console.log(this)
// function match2(string, pattern) {
// 	// for (i; i < string.length; i++) {
// 	// 	for (j; j < pattern.length; j++) {
// 	// 		if (j > 0 && pattern[j] !== string[i]) {
// 	// 			return state(string, pattern, _next, i, j);	
// 	// 		}
// 	// 		if (string[i] === pattern[j]) {
// 	// 			return matchNext(string, pattern, _next, i, j);
// 	// 		}
// 	// 		break;
// 	// 	}
// 	// }
// 	let state = loop;
// 	// void function() {
// 	// 	var i1 = 0;
// 	// 	var j2 = 0;
// 	// 	for (j; j < pattern.length; j++) {
// 	// 		for (i; i < string.length; i++) {
// 	// 			console.log('i=' + i, 'j=' + j)
// 	// 			state = state(string, pattern, _next, i, j);
// 	// 			if (state === fin) {
// 	// 				break;
// 	// 			}
// 	// 		}
// 	// 	}
// 	// }()
// 	return function () {
// 		for (let j = 0; j < pattern.length; j++) {
// 			for (let i = 0; i < string.length; i++) {
// 				state = state(string, pattern, i, j);
// 				j = this.j
// 				if (state === fin) {
// 					break;
// 				}
// 			}
// 		}	
// 	}();
// }
// function matchNext(string, pattern, i, j) {
// 	this.j = j + 1;
// 	if (this.j === pattern.length) {
// 		return alreadyMatched(string, pattern, i, this.j)
// 	}
// 	return loop
// }
// // console.log('global', j)
// /**
//  * 
//  * @param {*} string 
//  * @param {*} pattern 
//  * @param {*} _next 
//  * @param {*} i 
//  * @param {*} j 
//  */
// function alreadyMatched(string, pattern, i, j) {
// 	console.log(i + 1 - pattern.length)
// 	return fin;
// }
// /**
//  * 结束
//  */
// function fin() {
// 	return fin
// }
// function loop(string, pattern, i, j) {
// 	if (j > 0 && pattern[j] !== string[i]) {
// 		return replacePosition(string, pattern, i, j)
// 	}
// 	if (string[i] === pattern[j]) {
// 		return matchNext(string, pattern, i, j);
// 	}
// 	this.j = j;
// 	return loop;
// }
// /**
//  * 将pattern[next[j]]移到pattern[j]位置上, 其他项对应移动同等距离
//  * @param {} string 
//  * @param {*} pattern 
//  * @param {*} next 
//  * @param {*} i 
//  * @param {*} j 
//  */
// function replacePosition(string, pattern, i, j) {
// 	this.j = _next[j];
// 	if (this.j > 0 && pattern[this.j] !== string[i]) {
// 		return replacePosition(string, pattern, i, this.j)
// 	}
// 	if (string[i] === pattern[this.j]) {
// 		return matchNext(string, pattern, i, this.j);
// 	}
// 	return loop
// }
// match2.call(match2, string, pattern);  //5
// // match('abcabcab','cab')
// // match('abcabcabx','abx')
// // match('acabaabaabcaccaabc','abaabcac')
// // match2()