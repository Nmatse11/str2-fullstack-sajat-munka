console.time('run')

const StreamArray = require('stream-json/streamers/StreamArray')
const fs = require('fs')
const id = process.argv[2] ? Number(process.argv[2]) : 0;

const jsonStream = StreamArray.withParser();
fs.createReadStream('./product.json').pipe(jsonStream.input)
jsonStream.on('data', ({key, value}) => {
  if (id && value && value.id && value.id === id) {
    console.log(key, value);
  }
});
jsonStream.on('end', () => {
  console.log('All Done')
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log(`Used memory: ${Math.round(used * 100) / 100} MB`)
  console.timeEnd('run')
})
