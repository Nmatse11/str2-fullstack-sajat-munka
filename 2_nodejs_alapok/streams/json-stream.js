// lefutási idő tesztelése
// időmérő elindítása - címkével
console.time('run')

// npm i stream-json package telepítése után
const StreamArray = require('stream-json/streamers/StreamArray')
const fs = require('fs')
// harmadik argumentum a parancs kiadásakor - lekérdezése id alapján - ha nincs harmadik, akkor 0
// node json-stream.js 950
// így a 950-es id elemet keresi meg
const id = process.argv[2] ? Number(process.argv[2]) : 0;

// withParser() - nemcsak egyszerűen beolvassa, hanem parse-olja is a fájlt
const jsonStream = StreamArray.withParser();
// pipe a kapott adatot beleírja a createReadStream által létrehozott fájlba
// nem kell az egész adatot tárolni a memóriában
fs.createReadStream('./product.json').pipe(jsonStream.input)
// az adat szétszedése kulcs-érték párokra
jsonStream.on('data', ({ key, value }) => {
  // if (id && value && value.id && value.id === id) {
  if (id && value?.id === id) {
    console.log(key, value);
  }
});
// end esemény, amikor végig ért a fájlon
jsonStream.on('end', () => {
  console.log('All Done')
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log(`Used memory: ${Math.round(used * 100) / 100} MB`)
  // az időmérő állítása - címke alapján
  console.timeEnd('run')
})
