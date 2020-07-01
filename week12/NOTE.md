## 总结

这周跟着老师学习了**字典树算法**,**括号匹配**, 还是几个星期前的**KMP算法**,因为都是算法题,就这么口说话总结吧, 因为上次**KMP**是的optional作业, 对比了老师的思路, 老师抽象出了一个table列表去回溯匹配串应该回溯的位置, 我觉得这是整个**KMP**的核心代码

```code
var k = 0;
for (var j = 1; j < pattern.length; j++) {
    if (pattern[j] === pattern[k]) {
        k++;
    } else {
        k--;
    }
    table[j] = k;
}
```