const http = require('http')

const server = http.createServer((req, res) => {
	console.log("request received");
	console.log(req.headers);
	res.setHeader('Content-Type', 'text/html')
	res.setHeader('X-Foo', 'bar')
	res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end(`<html>
<head>
<style>
#container span {
    color: pink;
}
</style>
</head>
<body>
    <div id="container">
        <div id="myid">
            <span class="text"></span>
        </div>
        <div class="c1" id="child1"></div>
        <div class="c1" id="child1"></div>
    </div>
</body>
</html>`);
})

server.listen(8088)