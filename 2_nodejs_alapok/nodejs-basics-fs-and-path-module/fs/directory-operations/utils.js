const { access, mkdir, writeFile, readdir, rmdir, rename } = require('fs').promises

const capitalizeFirstLetter = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1)

const createStarterTemplate = () => {
  // van-e hozzáférésünk egy adott folder-hez
  access('views')
    // ha nincsen akkor létrehozzuk
    .catch(() => mkdir('views'))
    // ha ez meg van, akkor elhelyezünk benn egy fájlt és még egyet
    .then(() => writeFile('./views/index.html', 'INDEX'))
    .then(() => writeFile('./views/about.html', 'ABOUT'))
    // kiolvassuk a mappa tartalmát
    .then(() => readdir('views'))
    // kiíratjuk
    .then(console.log)
    // töröljük a tmp mappát
    .then(() => rmdir('tmp'))
    .then(() => {
      const folder = 'controllers'
      // mappa átnevezése
      rename(folder, capitalizeFirstLetter(folder))
    })
    .catch((err) => console.log('\x1b[31m', err.message))
}

module.exports = createStarterTemplate
