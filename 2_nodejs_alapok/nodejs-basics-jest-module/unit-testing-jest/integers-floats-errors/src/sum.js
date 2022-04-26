const sum = (a, b) => a + b

const sum2 = (a, b) => {
  if (Number.isFinite(a) && Number.isFinite(b)) {
    return a + b
  }
  throw new Error('One or more parameters are not numbers.')
}

module.exports = {
  sum,
  sum2
}
