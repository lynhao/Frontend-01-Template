const compiler = require('@vue/compiler-sfc');

let output = compiler.compileTemplate({filename: "vue.vue", source: "<div>hello vue</div>"});
console.log(output)