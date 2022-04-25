const yargs = require('yargs')
const {
  getAllMovies,
  findMovieById,
  createMovie,
  editMovie,
  removeMovie
} = require('./movies.service')

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
      id: {
        alias: 'i',
        describe: 'Movie ID',
        type: 'number',
        demandOption: true
      }
    },
    handler: (args) =>
      console.log(findMovieById(args.id))
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
    handler: (args) => {
      console.log(createMovie(args.producer, args.title))
    }
  })
  .command({
    command: 'edit',
    describe: 'Edit a movie',
    builder: {
      id: {
        alias: 'i',
        describe: 'Movie ID',
        type: 'number',
        demandOption: true
      },
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
      id: {
        alias: 'i',
        describe: 'Movie ID',
        type: 'number',
        demandOption: true
      }
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