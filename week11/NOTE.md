## 异步函数

1. promise
2. async + await
3. generator function*

## 寻路算法

队列数据结构算法时间复杂度的优化从而提升寻路效率,这块还在吸收中.....

## 正则

**lastIndex**

if lastIndex > 字符串长度, lastIndex = 0
else if lastIndex = 字符串长度, 并且正则匹配空字符串, lastIndex 表示下一次匹配开始的位置
else if lastIndex > 字符串长度, 并且正则不匹配空字符串, lastIndex = 0
else lastIndex 被设置为紧随最近一次匹配成功的下一个位置


## 其他

- 创建一个长度100用0数字填满的数组

```code
 var a = Array(101).join(0).split('').map(m => Number(m))
 var a = Array(100).fill(0)
 ```