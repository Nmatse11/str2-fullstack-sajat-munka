const { readFile } = require('fs').promises

// Nem feltétlenül kell a try-catch megoldás, mert nem végzünk igazi hibakezelést
// const readFileWrapper = async (file, options) => {
//   try {
//     // A visszatérési értéke egy promise lesz, a paraméterek teljesen ugyanazok
//     // Nem kell callback
//     const result = await readFile(file, options)
//     console.log(result)
//   } catch (err) {
//     console.log(err)
//   }
// }

const readFileWrapper = async (file, options) => {
  // A visszatérési értéke egy promise lesz, a paraméterek teljesen ugyanazok
  // Nem kell callback
  const result = await readFile(file, options)
  console.log(result)
}

module.exports = readFileWrapper
