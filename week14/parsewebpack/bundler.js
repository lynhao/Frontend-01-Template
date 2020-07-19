const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const path = require('path');
const transform = require('@babel/core');
const { debug } = require('console');

const analyze = (filename) => {
    const content = fs.readFileSync(filename, 'utf-8');
    // 创建AST
    // https://babeljs.io/docs/en/babel-parser#babelparserparsecode-options
    const ast = parser.parse(content, {sourceType: 'module' });
    // console.log(ast);
    // 遍历AST, 对ImportDeclaration节点进行处理
    // https://babeljs.io/docs/en/babel-traverse#docsNav
    // console.log(ast.program.body)
    const dependencies = {};
    traverse(ast, {
        ImportDeclaration({node}) {
           // 保存各个文件中的依赖
           let filePath = './' + path.join(path.dirname(filename), node.source.value);
           dependencies[node.source.value] = filePath;
        }
    })
    // console.log(dependencies);
    // 解析ast
    // https://babeljs.io/docs/en/babel-core#transformfromast
    const { code, map } = transform.transformFromAst(ast, "", {presets: ["@babel/preset-env"]});
    return {
        filename,
        dependencies,
        code
    }
}

const iteratorDependencies = (entry) => {
    let moduleArray = [analyze(entry)];
    for (let i = 0; i < moduleArray.length; i++) {
        const {dependencies} = moduleArray[i];
        if (Object.keys(dependencies).length > 0) {
            for (let item in dependencies) {
                moduleArray.push(analyze(dependencies[item]));
            }
        }
    }
    let module = {}
    for (let item of moduleArray) {
        module[item.filename] = {
            dependencies: item.dependencies,
            code: item.code
        }
    }
    console.log(module);
    return module;
}

const outputCode = (entry) => {
    var chaosCode = JSON.stringify(iteratorDependencies(entry));
    return `
        (function(modules){
            function _require(path) {
                var exports = {};
                function getRelativePath(relativePath) {
                    return _require(modules[path].dependencies[relativePath]);
                }
                (function(require, exports, code){
                    eval(code)
                })(getRelativePath, exports, modules[path].code);
                return exports;
            }
            _require('${entry}')
        })(${chaosCode})
    `
}

const code = outputCode('./src/index.js');
// console.log(code);