const fileHandlerCallback = (err) => {
  if (err) throw err
  console.log('file process successful')
}

// 3 paraméter object-ként, hogy ne kelljen figyelni a sorrendiségre
const fileHandlerWapper = ({ method, path, data, callback = fileHandlerCallback } = {}) => {
  method(path, data, callback)
}

module.exports = Object.freeze({
  fileHandlerWapper
})
