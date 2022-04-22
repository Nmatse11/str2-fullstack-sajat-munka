const path = require('path')

// Nem kell feltétlenül létező útvonalnak lennie
const filePath = '/This/Is/A/File/Path/file.js'

// Elérési útvonal a fájl név nélkül
console.log(`Dirname: ${path.dirname(filePath)}`)
// Az útvonal utolsó része - fájl név kiterjesztéssel együtt
console.log(`Last part: ${path.basename(filePath)}`)
// A fájl kiterjesztése
console.log(`Extension: ${path.extname(filePath)}`)
// A fájl neve kiterjesztés nélkül
console.log(`Filename: ${path.basename(filePath, path.extname(filePath))}`)
// Abszolút útvonal-e vagy sem?
console.log(`Is an absolute path: ${path.isAbsolute(filePath)}`)
// Felbontja a paraméterként kapott útvonalat és object-ként tér vissza
console.log(path.parse(filePath))

const filePathObject = {
  // dir: 'C:\\Users\User',
  dir: 'C:/Users/User',
  base: 'file.js'
}

// A path.parse ellentéte - összefűzi az objektumból kapott adatokat stringé, elérési útvonalat ad vissza
console.log(path.format(filePathObject))
