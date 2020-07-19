# JSX

使用**plugin-transform-react-jsx** 这个 babel插件, 实现对自定义字符串模板的翻译

```code
let comp = <Cls class="cls"> 
```
经过jsx的翻译变成

```code
React.createElement("Cls", {class: "cls"});
```

另外可以给babel插件加上一个**pragma**参数,自定义创建节点的函数名

# 轮播组件实现思路

- 思路一: 

整体图片一张张移动

缺点: 整体移动会让页面一直transform, 会导致性能问题

- 思路二:

只移动当前需要展示的两张
