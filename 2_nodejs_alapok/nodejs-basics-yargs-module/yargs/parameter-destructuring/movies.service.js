let movies = require('./database/movies')

const getAllMovies = () => movies

const findMovieById = (id) => movies.find(movie => movie.id === id)

const generateNewMovieId = () => {
  const sortedMovies = [...movies].sort((a, b) => a.id > b.id) // sorbarendezés
  return sortedMovies[sortedMovies.length - 1].id + 1
}

const createMovie = ({ producer, title }) => {
  const movie = {
    id: generateNewMovieId(),
    producer,
    title
  }
  movies = [...movies, movie]
  return movie
}

const editMovie = ({ id, producer, title }) => {
  movies = movies.map(movie => movie.id === id ? { id, title, producer } : movie)
  return findMovieById(id)
}

const removeMovie = (id) => {
  movies = movies.filter(movie => movie.id !== id)
}

module.exports = Object.freeze({
  getAllMovies,
  findMovieById,
  createMovie,
  editMovie,
  removeMovie
})
