// Ezzel a modullal tudunk olvasható stream-eket létrehozni
const { createReadStream } = require('fs')

const readableStream = createReadStream('./szamarmese.txt', {
  encoding: 'utf8',
  highWaterMark: 11
  // mekkora méretű bufferekkel dolgozzon a stream
})

// Egy adott esemény bekövetkeztekor mi történjen
readableStream.on('data', (chunk) => {
  // console.log(chunk)
  // A beolvasott fájlból egy részletet írassunk ki

  // A console.log is a process.stdout-ot használja, de a console.log formázza is az adatot, vagyis sortöréseket tesz bele
  // Ha ezt el akarjuk kerülni, akkor használjuk a process.stdout-ot
  // write() metódussal ki tudunk iratni a stanfard kimenetre
  process.stdout.write(chunk)
})
