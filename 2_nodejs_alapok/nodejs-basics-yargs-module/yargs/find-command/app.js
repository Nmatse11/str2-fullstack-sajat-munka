const yargs = require('yargs')
const movies = require('./database/movies')

yargs
  .version('1.0.0') // Az alkalmazás verzió száma
  .usage('Usage: <command> [options]') // Help parancs
  // .command('get', 'Get all movies.', () => console.log(movies))
  .command({
    command: 'get',
    describe: 'Get all movies.',
    handler: () => console.log(movies)
  })
  .command({
    command: 'find',
    describe: 'Find a movie by id',
    builder: {
      id: {
        alias: 'i',
        describe: 'Movie ID',
        type: 'number',
        demandOption: true
      }
    },
    handler: ({
      id
    }) => console.log(movies.find(movie => movie.id === id))
  })
  .locale('en') // Alapértelmezett az en - beállíthathjuk a helpek szövegének nyelvét
  .strict() // Strict mód használata
  .help() // Globálisan elérhető help parancs
  // eslint-disable-next-line eol-last
  .parse() // process.argv - elérhetőek az argumentumok - ne kelljen ezt mindig kiírni