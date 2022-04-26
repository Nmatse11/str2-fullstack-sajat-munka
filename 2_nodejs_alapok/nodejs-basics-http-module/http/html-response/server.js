const http = require('http')
const { readFileSync } = require('fs')
const port = 8080

http.createServer((req, res) => {
  // státuszkód beállítása statusCode() helyett writeHead()
  res.writeHead(200, {
    'Content-Type': 'text/html'
  })
  // egyenlőre szinkron módon
  const html = readFileSync('./index.html', 'utf-8')
  res.end(html)
}).listen(port)

console.log(`Server running at http://127.0.0.1:${port}`)
