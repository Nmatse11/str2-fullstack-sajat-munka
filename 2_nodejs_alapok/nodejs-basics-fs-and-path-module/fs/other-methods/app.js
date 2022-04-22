const {
  // unlinkWrapper,
  // renameWrapper,
  // copyFileWrapper,
  // statWrapper,
  chmodWrapper
} = require('./utils')

// Kitörli a fájl, de ha nem létezik, akkor hibát fog dobni
// unlinkWrapper({ path: './szamarmese.txt' })

// Átnevezi a fájl (meg kell adni a régi elérési útvonalat és az újat is)
// renameWrapper({
//   oldPath: './poets.txt',
//   newPath: './POETS.txt'
// })

// Átmásolja a fájl a megadott helyre
// copyFileWrapper({
//   src: './halaltanc-ballada.txt',
//   dest: './books/halaltanc-ballada.txt'
// })

// Lekérdezi az adott fálj adatait
// statWrapper({
//   path: './halaltanc-ballada.txt',
//   callback (err, stats) {
//     if (err) throw err
//     console.log(stats)
//   }
// })

// Jogosultságok módosítása
// A 744 egy nagyon gyakori parancs
chmodWrapper({
  path: './halaltanc-ballada.txt',
  mode: 744
})
