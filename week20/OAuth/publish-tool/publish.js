const http = require('http');
const querystring = require('querystring');
const fs = require('fs');
var archiver = require('archiver');
const child_process = require("child_process");

let filename = "./package/blue.png"
let packname = "./package";

//唤起登录
let redirect_uri = encodeURIComponent("http://localhost:3001/auth");
child_process.exec(`open https://github.com/login/oauth/authorize?client_id=Iv1.196c4e788469c56a&redirect_uri=${redirect_uri}&scope=read%3Auser&state=123abc`)

// 接收到publish按钮传过来的token
const server = http.createServer((request, res) => {
    console.log('publish real');
    console.log(request.url)
    let token = request.url.match(/token=([^&]+)/)[1]
    const options = {
        host: 'localhost',
        port: 3001,
        path: '/?filename=' + "package.zip",
        method: 'POST',
        headers: {
            "token": token,
            'Content-Type': 'application/octet-stream'
        }
    }
    const req = http.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    });

    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });

    var archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
    });
    archive.directory(packname, false);

    // archive.pipe(fs.createWriteStream("./package.zip"));
    archive.finalize();

    archive.pipe(req);
    archive.on('end', (data) => {
        console.log('publish success!!!')
        res.end('publish success!!!')
        server.close();
    })
    // console.log("real publish!!")
    // let token = req.url.match(/token=([^&]+)/)[1];
    // const options = {
    //     host: 'localhost',
    //     port: 3001,
    //     path: '/?filename=' + "package.zip",
    //     method: 'POST',
    //     headers: {
    //         token: token,
    //         'Content-Type': 'application/octet-stream'
    //     }
    // }
});
server.listen(8080)
// fs.stat(filename, (error, stat) => {
  /* const options = {
        host: 'localhost',
        port: 3001,
        path: '/?filename=' + "package.zip",
        method: 'POST',
        headers: {
            'Content-Type': 'application/octet-stream'
            // 'Content-Length': 0
            // Buffer.byteLength(postData)
            // 'Content-Length': stat.size
            
        }
    }
    const req = http.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    });

    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });

    var archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
    });
    archive.directory(packname, false);

    // archive.pipe(fs.createWriteStream("./package.zip"));
    archive.finalize();

    archive.pipe(req);

    archive.on('end', (data) => {
        req.end();
        let redirect_uri = encodeURIComponent("http://localhost:3001/auth");
        child_process.exec(`open https://github.com/login/oauth/authorize?client_id=Iv1.196c4e788469c56a&redirect_uri=${redirect_uri}&scope=read%3Auser&state=123abc`)
    })

const postData = querystring.stringify({
    'content': 'Hello World 123'
});
*/