const utils = require('./utils')

const priceList = [345, 67, 234, 57, 236, 456]

utils.even = 2
utils.odd = 1

console.log(utils)
// TypeError-t kapunk, mert az even már egy primitív
console.log(utils.even(priceList))

utils.users.age = 18

// módosult az age 30-ról, 18-ra
console.log(utils.users)
