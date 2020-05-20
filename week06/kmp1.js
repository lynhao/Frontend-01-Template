// 非状态机写法

function calcLen(d) {
	if(d.length=== 1 || d.length === 2) {
		return 0
	} else {
		return compareLen(leftPart(d),rightPart(d))
	}
}
function leftPart(d) {
	let arr = []
	let temp = ''
	for (var k = 0; k < d.length - 1; k++) {
		temp += d[k]
		arr.push(temp)
	}
	return arr
}
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
function moveElement(arr, n) {
    if(Math.abs(n)>arr.length) n = n%arr.length
    return arr.slice(-n).concat(arr.slice(0,-n))
}

function next(d) {
    let arr = d.split('')
    let char = arr[0]
    let knife = 0;
    let MaxL = []
    let _next;
    while(knife < arr.length) {
        let len = calcLen(char)
        MaxL.push(len)
        knife++
        char = arr.slice(0, knife+1)
    }
    _next = moveElement(MaxL, 1)
    _next.splice(0,1,-1)
    // 向右移以为,第一位补-1
    return _next
}
function match(s,m) {
    let _next = next(m)
    let j = 0
    for (let i = 0, len = s.length; i < len; i++) {
        while(j > 0 && m[j] !== s[i]) {
            j = _next[j]; // 等价于 m 向右移动了 j - next[j] 位
        }
        if (m[j] === s[i]) {
            j++;
        }
        if (j === m.length) {
        	console.log(i)
        	return i + 1 - m.length;
        }
    }
}
match('abaabaabbabaaabaabbabaab', 'abaabbabaab')  //13
match('acabaabaabcaccaabc', 'abaabcac')  //5