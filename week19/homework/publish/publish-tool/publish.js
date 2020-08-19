const http = require('http');
const querystring = require('querystring');
const fs = require('fs');
var archiver = require('archiver');

let filename = "./package/blue.png"
let packname = "./package";

// fs.stat(filename, (error, stat) => {
    const options = {
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
        console.log(data)
        req.end();
    })
    // Make a request
    // let readStream = fs.createReadStream("./" + filename);
    // readStream.pipe(req)
    // readStream.on('end', () => {
    //     req.end();
    // })
    // req.write(postData);
    // req.end();
    
// })

const postData = querystring.stringify({
    'content': 'Hello World 123'
});
