const fs = require('fs')

// Fájl beolvasása szinkron művelettel
// const data = fs.readFileSync('./fs/read-file-methods/szamarmese.txt')
const data = fs.readFileSync('./szamarmese.txt', { encoding: 'utf-8' })
console.log(data)

// Fájl beolvasása aszinkon művelettel
fs.readFile('./szamarmese.txt', { encoding: 'utf-8' },
  (err, data) => {
    if (err) throw err
    console.log(data)
  }
)
