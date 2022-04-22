const { createReadStream, createWriteStream } = require('fs')
const { createGzip } = require('zlib')

const readableStream = createReadStream('./szamarmese.txt', {
  encoding: 'utf8',
  highWaterMark: 11
})

const writeableStream = createWriteStream('./szamarmeseCopy.txt')
// ennek a végén gz fájl fog létrejönni
const createCompressesFile = createWriteStream('./szamarmese.txt.gz')

readableStream.pipe(writeableStream)
// ez nem lehet hozzá pipe-olni, mert ez writeable

readableStream
  // létrejön az objektum, benne az adatokkal
  .pipe(createGzip())
  // kimenetel hozzáfűzése - beleírjuk a tömörített fájlba
  .pipe(createCompressesFile)
