function unicode_utf8(str) {
  // 将unicode字符转为16进制
  var s16 = str.codePointAt(0).toString(16);
  var s2 =  str.codePointAt(0);
  var binary = s2.toString(2); // 获得字符的二进制
  var n; // n个字符
  // 一个字符
  if (s2 >= 0 && s2 <= 127) {
    debugger
    n = 1;
    var fullBinary = binary.padStart(8, '0')
    return parseInt(fullBinary, 2).toString(16)
  }
  // 两个字符
  if (s2 >= 128 && s2 <= 2047 ) {
    n = 2;
    var s1 = '110'.padEnd(8, 'x')
    var s2 = '10'.padEnd(8, 'x')
    var bit2 = binary.split('').reverse().join('').substring(0, 6).split('').reverse().join('')
    s2 = s2.replace(/x+/, bit2)
    var bit1 = binary.split('').reverse().join('').substring(6).split('').reverse().join('').padStart(5,'0')
    s1 = s1.replace(/x+/, bit1)
    return parseInt(s1, 2).toString(16) + parseInt(s2, 2).toString(16)
  }
  // 三个字符
  if (s2 >= 2048 && s2 <= 65535) {
    n = 3;
    var s1 = '1110'.padEnd(8, 'x')
    var s2 = '10'.padEnd(8, 'x')
    var s3 = '10'.padEnd(8, 'x')
    var bit3 = binary.split('').reverse().join('').substring(0, 6).split('').reverse().join('')
    s3 = s3.replace(/x+/, bit3)
    var bit2 = binary.split('').reverse().join('').substring(6, 12).split('').reverse().join('')
    s2 = s2.replace(/x+/, bit2)
    var bit1 = binary.split('').reverse().join('').substring(12).split('').reverse().join('').padStart(4,'0')
    s1 = s1.replace(/x+/, bit1)
    return parseInt(s1, 2).toString(16) + parseInt(s2, 2).toString(16) + parseInt(s3, 2).toString(16)
  }
  // 四个字符
  if (s2 >= 65536 && s2 <= 1114111) {
    n = 4;
    var s1 = '11110'.padEnd(8, 'x')
    var s2 = '10'.padEnd(8, 'x')
    var s3 = '10'.padEnd(8, 'x')
    var s4 = '10'.padEnd(8, 'x')
    var bit4 = binary.split('').reverse().join('').substring(0, 6).split('').reverse().join('')
    s4 = s4.replace(/x+/, bit4)
    var bit3 = binary.split('').reverse().join('').substring(6, 12).split('').reverse().join('')
    s3 = s3.replace(/x+/, bit3)
    var bit2 = binary.split('').reverse().join('').substring(12, 18).split('').reverse().join('').padStart(6,'0')
    s2 = s2.replace(/x+/, bit2)
    var bit1 = binary.split('').reverse().join('').substring(18).split('').reverse().join('').padStart(3,'0')
    s1 = s1.replace(/x+/, bit1)
    return parseInt(s1, 2).toString(16) + parseInt(s2, 2).toString(16) + parseInt(s3, 2).toString(16) + parseInt(s4, 2).toString(16)
  }
}





