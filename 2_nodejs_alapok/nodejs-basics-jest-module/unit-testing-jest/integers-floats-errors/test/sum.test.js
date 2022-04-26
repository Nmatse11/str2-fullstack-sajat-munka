const { sum, sum2 } = require('../src/sum')

test('sum 1 + 2 should be 3', () => {
  const actual = sum(1, 2)
  const expected = 3
  // két érték összehasonlítása
  expect(actual).toBe(expected)
})

test('sum 0.1 + .0.2 should be close to 0.3', () => {
  const actual = sum(0.1, 0.2)
  const expected = 0.3
  // két érték összehasonlítása
  expect(actual).toBeCloseTo(expected)
})

test('sum gives an Error if one or more parameters are not finite numbers', () => {
  // dobjon hibát, ha számot és stringet adnánk össze
  expect(() => sum2(1, 'a').toThrow())
})

test('sum gives an Error if one or more parameters are not finite numbers', () => {
  // tömbre is lefuttatható
  const wrongParameters = [null, undefined, NaN, '', Infinity]
  wrongParameters.forEach(parameter =>
    expect(() => sum2(1, parameter).toThrow()))
})
