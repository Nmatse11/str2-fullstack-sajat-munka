const fs = require('fs');

const allFileContents = fs.readFileSync('broadband.sql', 'utf-8');
allFileContents.split(/\r?\n/).forEach(line => {
  // console.log(`Line from file: ${line}`);
});

// memóriahasználat - heapUsed - plafon, amikor a legtöbbet használta - max MB felhasználás kiíratása
// elég komolyan használj a memóriát
const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
