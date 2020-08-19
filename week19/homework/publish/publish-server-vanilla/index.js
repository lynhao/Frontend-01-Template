const http = require('http');
const fs = require('fs');
const unzip = require('unzipper');

// Create an HTTP tunneling proxy
const server = http.createServer((req, res) => {
    // let matched = req.url.match(/filename=([^&]+)/);
    // let filename = matched && matched[1];
    // console.log(filename);
    // if (!filename) {
    //     return;
    // }
    // let writeStream = fs.createWriteStream("../server/public/" + filename);
    // let writeStream = fs.createWriteStream("../server/packages/package");
    // req.pipe(writeStream);
    let writeStream = unzip.Extract({path: '../server/public'})
    req.pipe(writeStream)
    /*req.on('data', trunk => {
        writeStream.write(trunk);
    })
    req.on('end', trunk => {
        writeStream.end(trunk);
    })*/
    req.on('end', () => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('okay');
    })
});

server.listen(3001)

