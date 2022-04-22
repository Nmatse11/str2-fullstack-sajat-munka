const fs = require('fs')

const truncateAndPrintFile = (file, length, bufferSize) => {
  // Fájl megnyitása
  fs.open(file, 'r+', (err, fd) => {
    if (err) throw err
    // Megnyitás után levágunk egy darabot a fájlból
    fs.ftruncate(fd, length, (err) => {
      if (err) throw err
      // meghatározott méretű blokkokra bontás
      const buffer = Buffer.alloc(bufferSize)
      // beolvassuk a fájl az elejétől a végig az adott blokkokra vágva, és a callback error vagy az adat
      fs.read(fd, buffer, 0, buffer.length, 0, (err, bytes) => {
        if (err) throw err
        // ha még nincs vége a fájlnak, akkor kiíratjuk a console-re
        // a buffer-t felvágjuk 0-tól a bytes-ig és átalakítjuk string-é
        if (bytes > 0) console.log(buffer.slice(0, bytes).toString())
        // A fájl bezárása
        fs.close(fd, (err) => {
          if (err) throw err
        })
      })
    })
  })
}

module.exports = truncateAndPrintFile
