const next = require('./kmp1')
/**
 * 
 * @param {*} string 主串
 * @param {*} pattern 模式串
 * @param {*} _next PMT（字符串的前缀集合与后缀集合的交集中最长元素的长度）数组向右移动一位后得到的数组
 * @param {*} i 下标
 * @param {*} j 下标
 */

function match(string, pattern) {
	let state = loop;
	return function () {
		outer: for (let j = 0; j < pattern.length; j++) {
			for (let i = 0; i < string.length; i++) {
				state = state(string, pattern, i, j);
				j = this.j
				if (state === fin) {
					break;
				}
				if (state === kill) {
					break outer;
				}
			}
		}
	}();
}
function matchNext(string, pattern, i, j) {
	this.j = j + 1;
	if (this.j === pattern.length) {
		return alreadyMatched(string, pattern, i, this.j)
	}
	return loop;
}
function loop(string, pattern, i, j) {
	if (j > 0 && pattern[j] !== string[i]) {
		return replacePosition(string, pattern, i, j)
	}
	if (string[i] === pattern[j]) {
		return matchNext(string, pattern, i, j);
	}
	this.j = j;
	return loop;
}
/**
 * 将pattern[next[j]]移到pattern[j]位置上, 其他项对应移动同等距离
 * @param {} string 
 * @param {*} pattern 
 * @param {*} next 
 * @param {*} i 
 * @param {*} j 
 */
function replacePosition(string, pattern, i, j) {
	this.j = _next[j];
	/**
 * 1. 当模式串和主串的匹配到最后一位，发现匹配不了, 心想坑爹啊，真是浪费表情
 * 2. 当主串匹配到一半，发现后面不可能再也不可能跟模式串匹配成功，想起第一种情况，就及时止损出局了
 */
	if ((i === string.length - 1 && j < pattern.length) || (string.length - i < pattern.length)) {
		console.log(`匹配结束，未能匹配成功！`)
		return kill
	}
	if (this.j > 0 && pattern[this.j] !== string[i]) {
		return replacePosition(string, pattern, i, this.j)
	}
	if (string[i] === pattern[this.j]) {
		return matchNext(string, pattern, i, this.j);
	}

	return loop;
}
/**
 * 
 * @param {*} string 
 * @param {*} pattern 
 * @param {*} _next 
 * @param {*} i 
 * @param {*} j 
 */
function alreadyMatched(string, pattern, i, j) {
	console.log(`匹配到了, 位置在区间 [${i - pattern.length + 1}, ${i + 1}]`)
	return fin;
}

function fin() {
	return fin
}
function kill() {
	return kill
}
var string = 'abaabaabbabaaabaabbabaab';
var pattern = 'abaabbabaab';
// var string = 'abcabcab';
// var pattern = 'cab';
// var string = 'abcabcabx';
// var pattern = 'abx';
// var string = 'acabaabaabcaccaabc';
// var pattern = 'abaabcac';
// var string = 'abcabc'
// var pattern = 'acx'
// var string = 'abcabc'
// var pattern = 'abx'
var _next = next(pattern);
match(string, pattern);
