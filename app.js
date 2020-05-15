const http = require('http');

const server = http.createServer((request, response) => {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello Azure World from VS Code with some updates!!!");
});

const port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at port %d", port);
