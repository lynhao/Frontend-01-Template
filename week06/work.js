function match(string) {
	let state = start
	for (let c of string) {
		state = state(c)
	}
	return state === end
}

function end(char) {
	return end
}

function start(char) {
	if (char === 'a') {
		return fa;
	} else {
		return start
	}
}

function fa(char) {
	if (char === 'b') {
		return fb;
	} else {
		return start(char);
	}
}

function fb(char) {
	if (char === 'a') {
		return fa2;
	} else {
		return start(char);
	}
}

function fa2(char) {
	if (char === 'b') {
		return fb2;
	} else {
		return start(char);
	}
}

function fb2(char) {
	if (char === 'x') {
		return end
	} else {
		return fb(char);
	}
}
console.log(match('ababababx'))