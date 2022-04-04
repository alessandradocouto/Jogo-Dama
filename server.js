const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

let html;
let css;
let js;

fs.readFile('./index.html', function (err, data) {
  if (err) {
    throw err;
  }
  html = data;
});

fs.readFile('./main.css', function (err, data) {
  if (err) {
    throw err;
  }
  css = data;
});

fs.readFile('./main.js', function (err, data) {
  if (err) {
    throw err;
  }
  js = data;
});


http.createServer((req, res) => {
    res.statusCode = 200;

    if(req.url.indexOf('.css') != -1){
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.write(css);
        res.end();
        return;
    }

    if(req.url.indexOf('main.js') != -1){
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        res.write(js);
        res.end();
        return;
    }

    res.writeHeader(200, {"Content-Type": "text/html"});
    res.write(html);
    res.end();
}).listen(port, hostname, function() {
    console.log('Server running at http://'+ hostname + ':' + port + '/');
  });