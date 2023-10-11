const http = require('http');
const url = require('url');
const fs = require('fs');

const port = 3000;

const getQuery = search => {
    const searchParams = new URLSearchParams(search);
    const params = {};
    for (const [key, value] of searchParams.entries()) {
        params[key] = value;
    }
    return params;
}

const server = http.createServer((req, res) => {
    const parseUrl = url.parse(req.url);
    const {pathname, search} = parseUrl;
    if (pathname === '/favicon.ico') {
        res.writeHead(200);
        return res.end();
    }

    if (pathname === '/') {
        fs.createReadStream(__dirname + '/index.html').pipe(res);
    }

    if (pathname === '/api/game') {
        console.log(getQuery(search));
    }
});

server.listen(port, () => {
    console.log(`HTTP server is running on port ${port}, http://localhost:${port}`)
});