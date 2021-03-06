const MoviesService = require('./movies.service')
// mock-ot készítünk belőle
const moviesApi = jest.createMockFromModule('./movies.api.js')
const movies = [{ id: 1, title: 'Title', producer: 'Producer' }]
moviesApi.get = jest.fn(() => movies)
moviesApi.save = jest.fn()
const { findMovieById, createMovie, editMovie, removeMovie } = MoviesService(moviesApi)

describe('MoviesService', () => {
  test('findMovieById() should return a movie', () => {
    expect(findMovieById(1)).toEqual(movies[0])
  })

  test('createMovie() should return a new movie', () => {
    const payload = { title: 'New Title', producer: 'New Producer' }
    // mivel az id-t nem ismerem, azt tesztelem, hogy a kulcs-érték párok rendben vannak-e
    expect(createMovie(payload)).toMatchObject(payload)
    expect(moviesApi.save).toBeCalled()
  })

  test('editMovie() should return the modified movie', () => {
    const payload = { id: 1, title: 'New Title', producer: 'New Producer' }
    expect(editMovie(payload)).toEqual(payload)
    expect(moviesApi.save).toBeCalled()
  })

  test('removeMovie() should return undefined', () => {
    // nem létezik
    expect(removeMovie(1)).toBeUndefined()
    expect(moviesApi.save).toBeCalled()
  })
})
