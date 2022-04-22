const { writeFile, appendFile } = require('fs')
const { fileHandlerWapper } = require('./utils')

// Fontos, hogy a paramétereket object-ként kell megadni
fileHandlerWapper({
  method: writeFile,
  path: './szamarmese.txt',
  data: 'SZAMÁRMESE'
})

fileHandlerWapper({
  method: appendFile,
  path: './poets.txt',
  data: 'Romhányi a Rímhányó'
})
