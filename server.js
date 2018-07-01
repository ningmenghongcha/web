const http = require('http'),
  fs = require('fs'),
  path = require('path'),
  server = http.createServer();

server.on('request', (req, res) => {
  let index = req.url.lastIndexOf('.');
  let contentType = req.url.substr(index + 1);
  switch (contentType) {
    case '/' :
      contentType = 'text/html';
      break;
    case 'js':
      contentType = 'text/javascript';
      break;
    case 'css':
      contentType = 'text/css';
      break;
    case 'ico':
      contentType = 'image/x-icon';
      break;
    default:
      contentType = '';
      break;
  }
  if ( req.url === '/') {
    req.url = "login.html";
  }
  let filePath = path.join(__dirname, '/', req.url) ;
  res.writeHead(200, {
    'Content-type': contentType
  });
  let readStream = fs.createReadStream(filePath);
  console.dir(readStream);
  readStream.pipe(res);
}).listen(8080);
