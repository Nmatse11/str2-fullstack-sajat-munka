const events = require('events');
const fs = require('fs');
// readline beépített modul - sorról sorra olvassuk be az adatokat
const readline = require('readline');

// aszinkron - try...catch megoldással
(async function () {
  try {
    // ez egy interface
    const rl = readline.createInterface({
      // input innen szedi az adatot - fájl beolvasása
      input: fs.createReadStream('./broadband.sql', {
        // default-ban 64kb a beolvasási méret, 16kb-nál nem lehet kisebb
        // 5 MB
        // ha nagyobb darabokban olvasom be a fájlt, akkor nagyobb a memóriahasználat
        // de gyorsabb lesz
        highWaterMark: 5 * 1024 * 1024
      }),
      // késleltetés
      crlfDelay: Infinity
    });

    // line esemény - amikor kapunk egy sort a fájlból
    rl.on('line', (line) => {
      // kiíratjuk a console-ra
      // A console-ra kiírás nagyon lassítja a programot
      // csak akkor ha muszáj
      //console.log('Line content: ', line);
    });

    // egyszer fut le a close - amikor a fájl bezáródott
    await events.once(rl, 'close');

    // stream-mel már sokkal jobb a memóriahasználat
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`Used memory: ${Math.round(used * 100) / 100} MB`)
  }
  catch (err) {
    console.error(err)
  }
})();