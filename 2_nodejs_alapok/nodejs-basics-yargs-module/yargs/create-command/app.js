const yargs = require('yargs')
let movies = require('./database/movies')

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
  .command({
    command: 'create',
    describe: 'Create new movie.',
    builder: {
      producer: {
        alias: 'p',
        describe: 'Film producer',
        type: 'string',
        demandOption: true
      },
      title: {
        alias: 't',
        describe: 'Movie title',
        type: 'string',
        demandOption: true
      }
    },
    handler: ({
      title,
      producer
    }) => {
      const sortedMovies = [...movies].sort((a, b) => a.id > b.id) // sorbarendezés
      const id = sortedMovies[sortedMovies.length - 1].id + 1
      const movie = {
        id,
        title,
        producer
      }
      movies = [...movies, movie]
      console.log(movies.find(movie => movie.id === id))
    }
  })
  .locale('en') // Alapértelmezett az en - beállíthathjuk a helpek szövegének nyelvét
  .strict() // Strict mód használata
  .help() // Globálisan elérhető help parancs
  // eslint-disable-next-line eol-last
  .parse() // process.argv - elérhetőek az argumentumok - ne kelljen ezt mindig kiírni