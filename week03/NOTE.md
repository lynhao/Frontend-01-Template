# Object

### 1. Host Objects 宿主对象

由 JavaScript [宿主]()环境提供的对象，它们的行为完全由宿主环境决定。


### 2. Build-in Objects

-  Intrinsic Objects(ecma 6.1.7.4)

	固有对象是内置对象的其中一种, 标准规定, 固有对象是随着	runtime创建而自动创建的对象实例
- Native Objects

	原生对象用户可以通过Array,Regexp等[内置构造器]()或特殊语法	创建的对象
- Oridinary Objects

	普通对象由{}, Object 构造器或者class关键字定义的对象,能够
	被原型继承


![](https://static001.geekbang.org/resource/image/6c/d0/6cb1df319bbc7c7f948acfdb9ffd99d0.png)

> 哪些对象无法实现出来? 上面那些? 还是指new操作?那应该就是Symbol了


### 3.Exotic Objects (ecma 9.4)

除以上的对象外,还有一类特殊对象, 与常见的下标运算（就是使用中括号或者点来做属性访问）或者设置原型跟普通对象不同

- Array：Array 的 length 属性根据最大的下标自动发生变化。
- Object.prototype：作为所有正常对象的默认原型，不能再给它设置原型了。
- String：为了支持下标运算，String 的正整数属性访问会去字符串里查找。
- Arguments：arguments 的非负整数型下标属性跟对应的变量联动。模块的 
- namespace 对象：特殊的地方非常多，跟一般对象完全不一样，尽量只用于 import 吧。类型数组和数组缓冲区：跟内存块相关联，下标运算比较特殊。
- bind 后的 function：跟原来的函数相关联。


> 找出javascript中的所有代码, 其实也是老师的代码 学习了就是我的了[调皮]

```bash
var globalValue = [Infinity, NaN, undefined]
var nineFunction = [
	"eval",
	"isFinite",
	"isNaN",
	"parseFloat",
	"parseInt",
	"decodeURI",
	"decodeURIComponent",
	"encodeURI",
	"encodeURIComponent"]
var constructorObjects = [
	"Array",
	"Date",
	"RegExp",
	"Promise",
	"Proxy",
	"Map",
	"WeakMap",
	"Set",
	"WeakSet",
	"Function",
	"Boolean",
	"String",
	"Number",
	"Symbol",
	"Object",
	"Error",
	"EvalError",
	"RangeError",
	"ReferenceError",
	"SyntaxError",
	"TypeError",
	"URIError",
	"ArrayBuffer",
	"SharedArrayBuffer",
	"DataView",
	"Float32Array",
	"Float64Array",
	"Int8Array",
	"Int16Array",
	"Int32Array",
	"Uint8Array",
	"Uint16Array",
	"Uint32Array",
	"Uint8ClampedArray",
	"Atomics",
	"JSON",
	"Math",
	"Reflect"]
var ret = constructorObjects.concat(nineFunction)
var set = new Set()
ret.forEach(list => set.add(list))
for (var i = 0, len = ret.length; i < len; i++) {
	var o = ret[i]
	for (var p of Object.getOwnPropertyNames(o)) {
		var d = Object.getOwnPropertyDescriptor(o,p)
		if ((d.value !== null && typeof d.value === 'object') || typeof d.value === 'function') {
			if (!set.has(d.value)) {
				set.add(d.value)
				ret.push(d.value)
			}
		}
		if (d.get) {
				if (!set.has(d.get)) {
					set.add(d.get)
					ret.push(d.get)
				}
			}
		if (d.set) {
			if (!set.has(d.set)) {
				set.add(d.set)
				ret.push(d.set)
			}
		}
	}

}
```