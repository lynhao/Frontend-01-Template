# 周总结

### InputElement

- InputElement
	- WhiteSpace
	- LineTerminator
	- Comment
	- Token
		- Punctuator
		- Keywords	
		- IdentifierName
			- Identifier
				- 变量名
				- 属性名
			- Keywords
			- Future reserved Keywords: enum (剩下这个了)
		- Literal
			- Number
			- String
			- Boolean
			- Object
			- Null
			- Undefined
			- Symbol

#### LineTerminator(行终止符)

|  代码单元值  | 名称 |  正式名称 |
| ---------- | ---- | --- |
| \u000A |  换行符 | \<LF\> |
| \u000D | 回车符	 | \<CR\> |
| \u2028 |  行分隔符 | \<LS\> |
| \u2029 |  段落分割符 | \<PS\> |

> \s匹配的空白字符集中包含行终止符


#### 格式控制字符

|  代码单元值	  |   名称   |  正式名称 | 用法 |
| ---------- | ---------- | ----  | --- |
| \u200C |    零宽度非连接器   | \<ZWNJ\> |  IdentifierStar UnicodeCombiningMark UnicodeDigit UnicodeConnectorPunctuation \<ZWNJ\> \<ZWJ\> |
| \u200D |  零宽度连接器   | \<ZWJ\> | 如上 |
| \uFEFF | 字节顺序标记	 | \<BOM\>	| WhiteSpace |

#### 空白字符

|  代码单元值  | 名称 |  正式名称 |
| ---------- | ---- | --- |
| \u0009 |  制表符 | \<TAB\> |
| \u000B |  垂直制表符 | \<VT\> |
| \u000C |  换页符 | \<FF\> |
| \u0020 |  空格符 | \<SP\> |
| \u00A0 |  非中断空格符 | \<NBSP\> |
| \uFEFF |  字节顺序标记 / 其它 Unicode 空白分隔符 | \<BOM\>  \<USP\>|

> NBSP => no break space 顾名思义, 让词不断开, 不仅仅一个空格

#### String Literals

-  字符串单字符转义序列
  
|  转义序列	  | 代码单元值	 |  名称 | 符号 |
| ---------- | -------  | ----  | --- |
| \b |  \u0008 | 退格符 | \<BS\> |
| \t | \u0009	 | 水平制表符 |\<HT\> |
| \n | \u000A	 | 换行符	| \<LF\> |
| \v | \u000B	 | 垂直制表符	| \<VT\> |
| \f | \u000C	 | 换页符	| \<FF\> |
| \" | \u0022	 | 双引号	| " |
| \' | \u0027	 | 单引号	| ' |
| \\ | \u005C	 | 反斜杠	| \ |



#### 分号自动插入

规则还在研究中....