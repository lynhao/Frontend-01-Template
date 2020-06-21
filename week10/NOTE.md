# Window API

分别来自![w3c](http://w3c.org/),![ecma](https://www.ecma-international.org/ecma-262/10.0/index.html#Title),![whatwg](https://spec.whatwg.org/),以及其他未被纳入标准的API,具体在脑图中(脑图还在补充中...)

> 以下是在一些标准中爬取的API接口的具体代码,可能会随着网页的更新而出现细微差别

- RTC

```code
var els = document.getElementsByClassName('idlInterface')
var nodes = Array.from(els)
var result = new Set()
for (let node of nodes) {
    let _node = Array.from(node.childNodes)
    for (let textNode of _node) {
        console.log(textNode)
        if (textNode.nodeName === "A" && textNode.className === "internalDFN idlID") {
            result.add(textNode.childNodes[0].innerText)
        }
    }
}
```

- Streams

```code
var ol = document.getElementsByClassName('toc')
var ols = Array.prototype.slice.call(ol)
let collections = new Set()

for (var item of ols) {
  var loop1 = function(ol)  {
    Array.from(ol).forEach((list,index) => {
      // if (list.childNodes.length === 0) return;
      if (list.childNodes.length === 0) return;
      // console.log(list.children,index, list.children[index])
      if (list.nodeName === 'A' && list.innerText.endsWith('class')) {
        collections.add(list.innerText.match(/(?<=The\b\s)[a-zA-Z]*(?=\s)/)[0])
        return;
      } else {
        return loop1(Array.from(list.childNodes))
      }
    })
  }
  loop1(Array.from(item.childNodes))
}
```

-  Web Audio

```code
var ol = document.getElementsByClassName('toc')[3].childNodes

var ols = Array.prototype.slice.call(ol).filter(item => item.nodeName === 'LI')
var collections = []
for (var i = 0; i < ols.length; i++) {
  collections.push(ols[i].children[0].children[1].innerText.match(/(?<=\s)[a-zA-Z]*(?=\s)/)[0])
}
```

- MediaStream Image Capture

```code
var ele = document.querySelectorAll('.nv.dfn-paneled.idl-code')
var nodes = Array.from(ele)
var result = nodes.filter(item => item.dataset.dfnType === "interface").map(f => f.innerText)
```