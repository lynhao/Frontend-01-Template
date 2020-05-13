# 每周总结可以写在这里

## Realm

- realm是JsContext中的一部分, 它包括一组完整的内置对象(Global Object)
- 浏览器中 只有通过创建一个Iframe 才能产生一个新的realm, 例如

```bash
var iframe = document.createElement('iframe')
document.documentElement.appendChild(iframe)
iframe.src="javascript:var b = {};"

var b1 = iframe.contentWindow.b;
var b2 = {};

console.log(typeof b1, typeof b2); //object object

console.log(b1 instanceof Object, b2 instanceof Object); //false true
```

## http 通讯

通过模拟浏览器处理http请求,可知道它的其中一个过程

服务响应 -> buffer流 转为 字符流 -> 状态机 -> ......

在状态机阶段 将每个字符按顺序解析出来, 最后在客户端和服务端通讯过程中分别整合后进行传输