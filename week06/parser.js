const EOF = Symbol("EOF");
let currentToken = null;
let currentAttribute = null;
let currentTextNode = null;
var css = require('css');

let stack = [{type: "document", children: []}];

let rules = [];
function addCSSRules(text) {
	var ast = css.parse(text);
	// console.log(JSON.stringify(ast, null, "    "));
	rules.push(...ast.stylesheet.rules);
	// console.log(rules)
}

function computeCSS(element) {
	// console.log(rules)
	// console.log(element)
	var elements = stack.slice().reverse();
	if (!element.computedStyle) {
		element.computedStyle = {};
	}
	for (let rule of rules) {
		var selectorParts = rule.selectors[0].split(" ").reverse();
		if(!match(element, selectorParts[0])) {
			continue;
		}
		let matched = false;

		var j = 1;
		for (var i = 0; i < elements.length; i++) {
			if (match(elements[i], selectorParts[j])) {
				j++;
			}
		}
		if (j >= selectorParts.length) {
			matched = true;
		}
		if (matched) {
			// 匹配到, 加入
			// console.log("element", element, "matched rule", rule);
			var sp = specificity(rule.selectors[0]);
			var computedStyle = element.computedStyle;
			for (var declaration of rule.declarations) {
				if (!computedStyle[declaration.property]) {
					computedStyle[declaration.property] = {}
				}
				if(!computedStyle[declaration.property].specificity) {
					computedStyle[declaration.property].value = declaration.value;
					computedStyle[declaration.property].specificity = sp;
				} else if (compare(computedStyle[declaration.property].specificity, sp) < 0) {
					computedStyle[declaration.property].value = declaration.value
					computedStyle[declaration.property].specificity = sp
				}
			}
			console.log(element.computedStyle);
		}
	}


}
function compare (sp1, sp2) {
	if (sp1[0] - sp2[0]) {
		return sp1[1] - sp2[0];
	}
	if (sp1[1] -sp2[1]) {
		return sp1[1] -sp2[1];
	}
	if (sp1[2] - sp2[2]) {
		return sp1[2] - sp2[2];
	}
	return sp1[3] - sp2[3];
}

function specificity(selector) {
	var p = [0, 0, 0, 0];
	var selectorParts = selector.split(" ");
	for (var part of selectorParts) {
		if (part.charAt(0) === "#") {
			p[1] += 1;
		} else if (part.charAt(0) === ".") {
			p[2] += 1;
		} else {
			p[3] += 1;
		}
	}
	return p;
}

function match(element, selector) {
	if (!selector || !element.attributes) {
		return false;
	}
	if (selector.charAt(0) === "#") {
		var attr = element.attributes.filter(attr => attr.name === "id")[0];
		if (attr && attr.value === selector.replace("#", '')) {
			return true;
		}
	} else if (selector.charAt(0) === ".") {
		var attr = element.attributes.filter(attr => attr.name === "class")[0];
		if (attr) {
			let _arr = attr.value.split(' ')
			if (_arr.includes(selector.replace(".", ''))) {
				return true;
			}
		}
	} else {
		if (element.tagName === selector) {
			return true;
		}
	}
	return false;
}

function emitToken(token) {
	let top = stack[stack.length - 1];

	if (token.type === "startTag") {
		let element = {
			type: 'Element',
			children: [],
			attributes: []
		}
		element.tagName = token.tagName;
		for (let p in token) {
			if (p !== "type" && p !== "tagName") {
				element.attributes.push({
					name: p,
					value: token[p]
				});
			}
		}
		// 添加调用
		computeCSS(element);

		top.children.push(element);
		// 注意保留父级对象会出现循环引用, 导致 Converting circular structure to JSON
		element.parent = JSON.parse(JSON.stringify(top)); 

		if (!token.isSelfClosing) {
			stack.push(element);
		}
		currentTextNode = null;
	} else if(token.type === "endTag") {
		if (top.tagName !== token.tagName) {
			throw new Error("tag start end doesn't match!")
		} else {
			// 遇到style标签, 执行添加css规则操作
			if (top.tagName === "style") {
				addCSSRules(top.children[0].content);
			}
			stack.pop();
		}
		currentTextNode = null;
	} else if (token.type === "text") {
		if(currentTextNode === null) {
			currentTextNode = {
				type: "text",
				content: ""
			}
			top.children.push(currentTextNode);
		}
		currentTextNode.content += token.content;
		// console.log(currentTextNode.content)
	}
	// if (token.type !== "text") {
	// 	console.log(token)
	// }
	// console.log(JSON.stringify(token))
}

function data(char) {
	if (char === '<') {
		return tagOpen;
	} else if (char === EOF) {
		emitToken({
			type: 'EOF'
		})
		return;
	} else {
		emitToken({
			type: 'text',
			content: char
		})
		return data;
	}
}

function tagOpen(char) {
	if (char === "/") {
		return endTagOpen;
	} else if (char.match(/^[a-zA-Z]$/)) {
		currentToken = {
			type: "startTag",
			tagName: ""
		}
		return tagName(char);
	} else {
		return;
	}
}

function endTagOpen(char) {
	if (char.match(/^[a-zA-Z]$/)) {
		currentToken = {
			type: "endTag",
			tagName: ""
		}
		return tagName(char);
	} else if (char === ">") {
		// currentToken = {
		// 	type: "endTag",
		// 	tagName: ""
		// }
		// return data;
	} else if (c === EOF) {

	} else {

	}
}

function tagName(char) {
	if (char.match(/^[\t\n\f ]$/)) {
		return beforeAttributeName;
	} else if (char === "/") {
		return selfClosingStartTag;
	} else if(char.match(/^[a-zA-Z]$/)) {
		currentToken.tagName += char;
		return tagName;
	}else if(char === ">"){
		emitToken(currentToken);
		return data;
	}else {
		return tagName;
	}
}

function beforeAttributeName(char) {
	if (char.match(/^[\t\n\f ]$/)) {
		return beforeAttributeName;
	} else if (char === "/" || char === ">" || char === EOF) {
		return afterAttributeName(char);
	} else if(char === "=") {
		// return beforeAttributeName;
	} else {
		currentAttribute = {
			name: '',
			value: ''
		}
		return attributeName(char);
	}
}

function attributeName(char) {
	if (char.match(/^[\t\n\f ]$/) || char === "/" || char === ">" || char === EOF) {
		return afterAttributeName(char)
	} else if (char === "=") {
		return beforeAttributeValue;
	} else if (char === "\u0000") {

	} else if (char === "\"" || char === "'" || char === "<" ) {

	} else {
		currentAttribute.name += char;
		return attributeName;
	}
}

function selfClosingStartTag(char) {
	if (char === ">") {
		currentToken.isSelfClosing = true;
		emitToken(currentToken);
		return data;
	} else if (char === EOF) {

	} else {

	}
}

function afterAttributeName(char) {
	if (char.match(/^[\t\n\f ]$/)) {
		return beforeAttributeName;
	} else if (char === "/") {
		return selfClosingStartTag;
	} else if (char === ">") {
		currentToken[currentAttribute.name] = currentAttribute.value;
		emitToken(currentToken);
		return data;
	} else if (char === EOF) {

	} else {
		currentAttribute.value += char;
		return doubleQuotedAttributeValue;
	}
}

function beforeAttributeValue(char) {
	if (char.match(/^[\t\n\f ]$/) || char === "/" || char === ">" || char === EOF) {
		return beforeAttributeValue;
	} else if (char === "\"") {
		return doubleQuotedAttributeValue;
	} else if (char === "\'") {
		return singleQuotedAttributeValue;
	} else if (char === ">") {

	} else {
		return UnquotedAttributeValue(char)
	}
}

function doubleQuotedAttributeValue(char) {
	if (char === "\"") {
		currentToken[currentAttribute.name] = currentAttribute.value;
		return afterQuotedAttributeValue;
	} else if (char === "\u0000") {

	} else if (char === EOF) {

	} else {
		currentAttribute.value += char;
		return doubleQuotedAttributeValue;
	}
}

function singleQuotedAttributeValue(char) {
	if (char === "\'") {
		currentToken[currentAttribute.name] = currentAttribute.value;
		return afterQuotedAttributeValue;
	} else if (char === "\u0000") {

	} else if (char === "EOF") {

	} else {
		currentAttribute.value += char
		return singleQuotedAttributeValue;
	}
}

function afterQuotedAttributeValue(char) {
	if (char.match(/^[\t\n\f ]$/)) {
		return beforeAttributeName;
	} else if (char === "/") {
		return selfClosingStartTag;
	} else if (char === ">") {
		currentToken[currentAttribute.name] = currentAttribute.value;
		emitToken(currentToken);
		return data;
	} else if (char === EOF) {

	} else {
		// currentAttribute.value += c;
		// return doubleQuotedAttributeValue
	}
}

function UnquotedAttributeValue(char) {
	if (char.match(/^[\t\n\f ]$/)) {
		currentToken[currentAttribute.name] = currentAttribute.value;
		return beforeAttributeName;
	} else if(char === "/") {
		currentToken[currentAttribute.name] = currentAttribute.value;
		return selfClosingStartTag;
	} else if(char === ">") {
		currentToken[currentAttribute.name] = currentAttribute.value;
		emitToken(currentToken);
		return data;
	} else if (char === "\u0000") {

	} else if (char === "\"" || char === "'" || char === "<" || char === "=" || char === "`"){

	} else if (char === EOF) {

	} else {
		currentAttribute.value += char
		return UnquotedAttributeValue;
	}
}

module.exports.parseHTML = function(html) {
	let state= data;
	for(let char of html) {
		state = state(char);
	}
	state = state(EOF);
	let domtree = stack[0];
	// console.log(domtree);
	return stack[0];
}