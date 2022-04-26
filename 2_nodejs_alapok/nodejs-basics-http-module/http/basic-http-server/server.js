const http = require('http')
const port = 8080

http.createServer((req, res) => {
  // elküldeni kívánt adat
  res.write('Hellooooooo! Holy Node!')
  // válasz lezárása
  res.end()
}).listen(port)

console.log(`Server is running at http://127.0.0.1:${port}`)
