const generatelItems = require('../src/generatelItems')

test('generateItems calls callback count of items times', () => {
  const mockCallback = jest.fn(x => x * 2)
  const arr = [1, 2]
  const actual = generatelItems(arr, mockCallback)
  const expected = [2, 4]
  expect(actual).toEqual(expected)
  expect(mockCallback).toHaveBeenCalled()
  expect(mockCallback).toHaveBeenCalledTimes(2)
})

test('generateItems calls callback count of items times', () => {
  const mockCallback = jest.fn(x => x * 2)
  const arr = [1, 2]
  generatelItems(arr, mockCallback)
  expect(mockCallback).toHaveBeenCalledTimes(2)
  // 0. elem vagyis az első hívás eredménye
  expect(mockCallback.mock.results[0].value).toBe(2)
  expect(mockCallback.mock.results[1].value).toBe(4)
})
