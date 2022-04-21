const even = arr => arr.filter(item => item % 2 === 0)

const odd = arr => arr.filter(item => item % 2 !== 0)

// Külön függvénybe kiszervezzük a randomszám generálást
const generateRandom = (to) => Math.floor(Math.random() * to) + 1

// A tömb értékeit megszorzom egy random számmal
const multipliedByRandom = (arr, to) => arr.map(item => item * generateRandom(to))

module.exports = {
  even,
  odd,
  multipliedByRandom
  // A generateRandom-ot nem exportáljuk, így azt nem érjük el semmilyen másik fájlban - privát maradt
}
