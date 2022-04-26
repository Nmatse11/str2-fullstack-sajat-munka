// lefutási idő tesztelése
// időmérő elindítása - címkével
console.time('run')

const fs = require('fs');

// readline nem jó, mert nem lesz valid a json, ha soronként olvassuk be
// ez így még sima string
const content = fs.readFileSync('./product.json', 'utf8')
// ezt még parse-olni kell
const data = JSON.parse(content)

console.log(
  data.find(item => item.id === 985)
)

const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`Used memory: ${Math.round(used * 100) / 100} MB`)

// az időmérő állítása - címke alapján
console.timeEnd('run')