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
.c1 + .c1 {
    color: pink;
}
</style>
</head>
<body>
    <div id="container">
        <div class="c1" id="child1"></div>
        <div class="c1" id="child1"></div>
    </div>
</body>
</html>`);
})

server.listen(8088)