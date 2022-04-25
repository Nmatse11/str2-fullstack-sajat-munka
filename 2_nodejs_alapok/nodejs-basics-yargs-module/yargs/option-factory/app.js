const yargs = require('yargs')
const {
  getAllMovies,
  findMovieById,
  createMovie,
  editMovie,
  removeMovie
} = require('./movies.service')
const {
  id,
  producer,
  title
} = require('./option')

yargs
  .version('1.0.0') // Az alkalmazás verzió száma
  .usage('Usage: <command> [options]') // Help parancs
  // .command('get', 'Get all movies.', () => console.log(movies))
  .command({
    command: 'get',
    describe: 'Get all movies.',
    handler: () => console.log(getAllMovies())
  })
  .command({
    command: 'find',
    describe: 'Find a movie by id',
    builder: {
      id
    },
    handler: ({
      id
    }) => console.log(findMovieById(id))
  })
  .command({
    command: 'create',
    describe: 'Create new movie.',
    builder: {
      producer,
      title
    },
    handler: ({
      producer,
      title
    }) => {
      console.log(createMovie(producer, title))
    }
  })
  .command({
    command: 'edit',
    describe: 'Edit a movie',
    builder: {
      id,
      producer,
      title
    },
    handler: ({
      id,
      producer,
      title
    }) => {
      console.log(editMovie(id, producer, title))
    }
  })
  .command({
    command: 'remove',
    describe: 'Remove a movie by id.',
    builder: {
      id
    },
    handler: ({
      id
    }) => {
      removeMovie(id)
      console.log('deleted')
    }
  })
  .locale('en') // Alapértelmezett az en - beállíthathjuk a helpek szövegének nyelvét
  .strict() // Strict mód használata
  .help() // Globálisan elérhető help parancs
  // eslint-disable-next-line eol-last
  .parse() // process.argv - elérhetőek az argumentumok - ne kelljen ezt mindig kiírni