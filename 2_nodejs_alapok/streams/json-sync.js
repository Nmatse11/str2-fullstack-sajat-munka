console.time('run')

const fs = require('fs');

const content = fs.readFileSync('./product.json', 'utf8')
const data = JSON.parse(content)

console.log(
  data.find( item => item.id === 985 )
)

const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`Used memory: ${Math.round(used * 100) / 100} MB`)

console.timeEnd('run')