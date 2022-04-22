const Promise = require('bluebird')
// A teljes fs modult, minden egyes metódust átalakít promise-os verzióra
// Minden egyes függvény elérhető
const fs = Promise.promisifyAll(require('fs'))

// Ugyanaz lesz a kimenet, de sokkal szebb és átláthatóbb
// Itt sincs hibakezelés
const truncateAndPrintFile = async (file, length, bufferSize) => {
  const fd = await fs.openAsync(file, 'r+')
  await fs.ftruncateAsync(fd, length)
  const buffer = Buffer.alloc(bufferSize)
  const bytes = await fs.readAsync(fd, buffer, 0, buffer.length, 0)
  if (bytes > 0) console.log(buffer.slice(0, bytes).toString())
  await fs.closeAsync(fd)
}

module.exports = truncateAndPrintFile
