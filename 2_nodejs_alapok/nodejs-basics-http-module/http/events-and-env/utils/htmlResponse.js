const { createReadStream } = require('fs')
const { join } = require('path')

const htmlRespones = (res, file, statusCode = 200) => {
  res.writeHead(statusCode, {
    'Content-Type': 'text/html'
  })
  createReadStream(join(__dirname, `../views/${file}.html`)).pipe(res)
}

module.exports = htmlRespones
