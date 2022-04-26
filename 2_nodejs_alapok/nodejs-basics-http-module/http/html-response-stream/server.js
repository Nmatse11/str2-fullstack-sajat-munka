const http = require('http')
const { createReadStream } = require('fs')
const port = 8080

http.createServer((req, res) => {
  // státuszkód beállítása statusCode() helyett writeHead()
  res.writeHead(200, {
    'Content-Type': 'text/html'
  })
  createReadStream('./index.html').pipe(res)
}).listen(port)

console.log(`Server running at http://127.0.0.1:${port}`)
