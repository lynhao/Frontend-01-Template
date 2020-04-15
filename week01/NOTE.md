## 第一周学习总结

- 跟随winter老师对整个前端体系做了梳理, 说起来惭愧, 我知道dtd是干什么的, 但还真就没去看里面有什么内容, 所以跟随老师的脚步, 更加深入了解整个html 整个超文本标记语言他的一步步演化路程, 最后面是我读取HTML 4.0.1 <code>strict</code> 模式规范中 嵌套的三个ent 文件, 并遍历出它的实体和code

- 相信后面会跟随winter老师脚步对课程的持续深入 会对整个javascript的执行流程和机制 会有更深入的理解

```bash

const fs = require('fs')
const path = require('path')
const readline = require('readline')

const fileName = path.join(__dirname, '../', '../', 'logger', 'access3.log')

const readStream = fs.createReadStream(fileName)

const rl = readline.createInterface({
	input: readStream
})

let k = 1
let ret = ''
rl.on('line', (data) => {
	if (!data) {
	 return
	}
	let reg = /^<!ENTITY(.*);"/
	let t = data.match(reg)
	if (t) {
		let temp = t[1].replace(/[\s"]+/g, ' ')
		// console.log(temp, t[1])
		// console.log(temp.trim().split('CDATA').join('CDATA:'))
		console.log(temp.trim().split(' ').join(':'))
	}
	k++

})
})
```
> 结果

```bash
nbsp:&#160
iexcl:&#161
cent:&#162
pound:&#163
curren:&#164
yen:&#165
brvbar:&#166
sect:&#167
uml:&#168
copy:&#169
ordf:&#170
laquo:&#171
not:&#172
shy:&#173
reg:&#174
macr:&#175
deg:&#176
plusmn:&#177
sup2:&#178
sup3:&#179
acute:&#180
micro:&#181
para:&#182
middot:&#183
cedil:&#184
sup1:&#185
ordm:&#186
raquo:&#187
frac14:&#188
frac12:&#189
frac34:&#190
iquest:&#191
Agrave:&#192
Aacute:&#193
Acirc:&#194
Atilde:&#195
Auml:&#196
Aring:&#197
AElig:&#198
Ccedil:&#199
Egrave:&#200
Eacute:&#201
Ecirc:&#202
Euml:&#203
Igrave:&#204
Iacute:&#205
Icirc:&#206
Iuml:&#207
ETH:&#208
Ntilde:&#209
Ograve:&#210
Oacute:&#211
Ocirc:&#212
Otilde:&#213
Ouml:&#214
times:&#215
Oslash:&#216
Ugrave:&#217
Uacute:&#218
Ucirc:&#219
Uuml:&#220
Yacute:&#221
THORN:&#222
szlig:&#223
agrave:&#224
aacute:&#225
acirc:&#226
atilde:&#227
auml:&#228
aring:&#229
aelig:&#230
ccedil:&#231
egrave:&#232
eacute:&#233
ecirc:&#234
euml:&#235
igrave:&#236
iacute:&#237
icirc:&#238
iuml:&#239
eth:&#240
ntilde:&#241
ograve:&#242
oacute:&#243
ocirc:&#244
otilde:&#245
ouml:&#246
divide:&#247
oslash:&#248
ugrave:&#249
uacute:&#250
ucirc:&#251
uuml:&#252
yacute:&#253
thorn:&#254
yuml:&#255
quot CDATA: &#34
amp CDATA: &#38
lt CDATA: &#60
gt CDATA: &#62
OElig CDATA: &#338
oelig CDATA: &#339
Scaron CDATA: &#352
scaron CDATA: &#353
Yuml CDATA: &#376
circ CDATA: &#710
tilde CDATA: &#732
ensp CDATA: &#8194
emsp CDATA: &#8195
thinsp CDATA: &#8201
zwnj CDATA: &#8204
zwj CDATA: &#8205
lrm CDATA: &#8206
rlm CDATA: &#8207
ndash CDATA: &#8211
mdash CDATA: &#8212
lsquo CDATA: &#8216
rsquo CDATA: &#8217
sbquo CDATA: &#8218
ldquo CDATA: &#8220
rdquo CDATA: &#8221
bdquo CDATA: &#8222
dagger CDATA: &#8224
Dagger CDATA: &#8225
permil CDATA: &#8240
lsaquo CDATA: &#8249
rsaquo CDATA: &#8250
euro CDATA: &#8364
fnof:&#402
Alpha:&#913
Beta:&#914
Gamma:&#915
Delta:&#916
Epsilon:&#917
Zeta:&#918
Eta:&#919
Theta:&#920
Iota:&#921
Kappa:&#922
Lambda:&#923
Mu:&#924
Nu:&#925
Xi:&#926
Omicron:&#927
Pi:&#928
Rho:&#929
Sigma:&#931
Tau:&#932
Upsilon:&#933
Phi:&#934
Chi:&#935
Psi:&#936
Omega:&#937
alpha:&#945
beta:&#946
gamma:&#947
delta:&#948
epsilon:&#949
zeta:&#950
eta:&#951
theta:&#952
iota:&#953
kappa:&#954
lambda:&#955
mu:&#956
nu:&#957
xi:&#958
omicron:&#959
pi:&#960
rho:&#961
sigmaf:&#962
sigma:&#963
tau:&#964
upsilon:&#965
phi:&#966
chi:&#967
psi:&#968
omega:&#969
thetasym:&#977
upsih:&#978
piv:&#982
bull:&#8226
hellip:&#8230
prime:&#8242
Prime:&#8243
oline:&#8254
frasl:&#8260
weierp:&#8472
image:&#8465
real:&#8476
trade:&#8482
alefsym:&#8501
larr:&#8592
uarr:&#8593
rarr:&#8594
darr:&#8595
harr:&#8596
crarr:&#8629
lArr:&#8656
uArr:&#8657
rArr:&#8658
dArr:&#8659
hArr:&#8660
forall:&#8704
part:&#8706
exist:&#8707
empty:&#8709
nabla:&#8711
isin:&#8712
notin:&#8713
ni:&#8715
prod:&#8719
sum:&#8721
minus:&#8722
lowast:&#8727
radic:&#8730
prop:&#8733
infin:&#8734
ang:&#8736
and:&#8743
or:&#8744
cap:&#8745
cup:&#8746
int:&#8747
there4:&#8756
sim:&#8764
cong:&#8773
asymp:&#8776
ne:&#8800
equiv:&#8801
le:&#8804
ge:&#8805
sub:&#8834
sup:&#8835
nsub:&#8836
sube:&#8838
supe:&#8839
oplus:&#8853
otimes:&#8855
perp:&#8869
sdot:&#8901
lceil:&#8968
rceil:&#8969
lfloor:&#8970
rfloor:&#8971
lang:&#9001
rang:&#9002
loz:&#9674
spades:&#9824
clubs:&#9827
hearts:&#9829
diams:&#9830
```