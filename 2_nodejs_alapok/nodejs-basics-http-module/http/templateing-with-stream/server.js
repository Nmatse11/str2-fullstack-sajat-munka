const http = require('http')
const { createReadStream } = require('fs')
const port = 8080

http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  })
  const name = 'John'
  // readableStream létrehozása
  const readableStream = createReadStream('./index.html')
  // feliratkozás a data event-re
  readableStream.on('data', chunck => {
    // kiolvassuk a részeket, stringgé alakítjuk és replace segítségével lecseréljük
    const htmLFragment = chunck.toString().replace(/\{\{name\}\}/g, name)
    res.write(htmLFragment)
  })
  // end event-re való feliratkozás
  readableStream.on('end', () => res.end())
}).listen(port)

console.log(`Server running at http://127.0.0.1:${port}`)
