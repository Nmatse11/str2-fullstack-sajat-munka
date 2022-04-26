const converToUpperCase = require('../src/convertToUpperCase')

describe('converToUpperCase ', () => {
  test('"test" should be "TEST"', () => {
    return converToUpperCase('test')
      .then(str => {
        expect(str).toBe('TEST')
      })
  })
})

test('gives a TypeError if parameter is not a string', () => {
  return converToUpperCase(10)
    .catch(err => {
      expect(err).toEqual(TypeError())
    })
})

test('"test" should be "TEST"', async () => {
  await expect(converToUpperCase('test')).resolves.toBe('TEST')
})

test('gives a TypeError if parameter is not a string', async () => {
  await expect(converToUpperCase(10)).rejects.toEqual(TypeError())
})
