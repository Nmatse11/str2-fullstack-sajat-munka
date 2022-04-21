const events = require('events');
const fs = require('fs');
const readline = require('readline');

(async function() {
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream('./broadband.sql', {
        highWaterMark: 5 * 1024 * 1024
      }), 
      crlfDelay: Infinity
    });

    rl.on('line', (line)=> {
      //console.log('Line content: ', line);
    });

    await events.once(rl, 'close');

    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`Used memory: ${Math.round(used * 100) / 100} MB`)
  }
  catch(err) {
    console.error(err)
  }
})();