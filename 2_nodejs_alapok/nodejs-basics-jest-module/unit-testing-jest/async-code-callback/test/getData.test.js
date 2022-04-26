const getData = require('..//src/getData')

test('getData should ne "DATA"', (done) => {
  const callback = (str) => {
    expect(str).toBe('data')
    done()
  }
  getData(callback)
})
