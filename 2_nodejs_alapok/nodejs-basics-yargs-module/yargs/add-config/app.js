const yargs = require('yargs')
const MoviesApi = require('./movies.api')
const MoviesService = require('./movies.service')
const { dbFilePath, propName } = require('./config')

const moviesApi = MoviesApi(dbFilePath, propName)
const {
  getAllMovies,
  findMovieById,
  createMovie,
  editMovie,
  removeMovie
} = MoviesService(moviesApi)
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
    handler: (args) => {
      console.log(createMovie(args))
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
    handler: (args) => {
      console.log(editMovie(args))
    }
  })
  .command({
    command: 'remove',
    describe: 'Remove a movie by id.',
    builder: {
      id
    },
    handler: (args) => {
      removeMovie(args.id)
      console.log('deleted')
    }
  })
  .locale('en') // Alapértelmezett az en - beállíthathjuk a helpek szövegének nyelvét
  .strict() // Strict mód használata
  .help() // Globálisan elérhető help parancs
  // eslint-disable-next-line eol-last
  .parse() // process.argv - elérhetőek az argumentumok - ne kelljen ezt mindig kiírni