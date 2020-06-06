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
#container > div {
    color: pink;
}
</style>
</head>
<body>
    <p id="container">
        <div class="c1" id="child1"></div>
        <span class="text">
            <em class="em"></em>
        </span>
        <div class="c1" id="child1">
          <p class="p"></p>
        </div>
        <div class="c1" id="child1"></div>
    </p>
</body>
</html>`);
})

server.listen(8088)