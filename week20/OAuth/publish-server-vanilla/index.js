const http = require('http');
const fs = require('fs');
const unzip = require('unzipper');
const https = require('https');

// Create an HTTP tunneling proxy
const server = http.createServer((req, res) => {
    if (req.url.match(/^\/auth/)) {
        return auth(req, res);
    }

    if (!req.url.match(/^\/?/)) {
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.end('not found');
        return;
    }
    const options = { 
        hostname: 'api.github.com',
        port: 443,
        path: `/user`,
        method: 'GET',
        headers: {
            Authorization: "token " + req.headers.token,
            "User-Agent": "toy-publish-server-mine"
        }
    }
    const request = https.request(options, (response) => {
        let body = ""
        response.on('data', d => {
            body += d.toString()
        })
        response.on('end', () => {
            let user = JSON.parse(body);
            console.log(user);
            // 权限检查
            let writeStream = unzip.Extract({ path: '../server/public' })
            req.pipe(writeStream)
            // req.on('data', trunk => {
            //     writeStream.write(trunk);
            // })
            // req.on('end', trunk => {
            //     writeStream.end(trunk);
            // })
            req.on('end', () => {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('okay');
            })
        })
    });
    request.on('error', () => {
        console.log('error');
    })
    request.end();
});

// 取到code, 去获取token
function auth(req, res) {
    let code = req.url.match(/code=([^&]+)/)[1];
    let state= "abc123"
    let client_secret = '95a1058860c57e60b88819864e79590f2bf679d9'
    let client_id = 'Iv1.196c4e788469c56a'
    let redirect_uri = encodeURIComponent("http://localhost:3001/auth")

    let params = `code=${code}&state=${state}&client_secret=${client_secret}&client_id=${client_id}&redirect_uri=${redirect_uri}`
    
    // let url = `https://github.com/login/oauth/access_token?${params}`;
    const options = {
        hostname: 'github.com',
        port: 443,
        path: `/login/oauth/access_token?${params}/`,
        method: 'POST'
    }

    const request = https.request(options, (response) => {
        response.on('data', d => {
            // process.stdout.write(d)
            let result = d.toString().match(/access_token=([^&]+)/)
            if (result) {
                let token = result[1];
                console.log("token", token)
                res.writeHead(200, {
                    "access_token": token,
                    "Content-Type": "text/html"
                })
                // res.end('okay!!!');
                res.end(`<a href="http://localhost:8080/publish?token=${token}">publish</a>`)
            } else {
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                })
                res.end('get error!!!')
            }
        })
    });

    request.on('error', () => {
        console.log('error');
    })
    request.end();
}

server.listen(3001)

