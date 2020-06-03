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
#myid ~ .c1 {
    outline: solid red 1px;
}
#container div {
    font-size: 14px;
}
#container > #myid {
    color: yellow;
}
#myid + .c1 {
    color: red;
}
#container #child1.c1 {
    background: linear-gradient(45deg, red 10%, yellow 90%);
}
</style>
</head>
<body>
    <div id="container">
        <div id="myid"></div>
        <div class="c1" id="child1"></div>
    </div>
</body>
</html>`);
})

server.listen(8088)