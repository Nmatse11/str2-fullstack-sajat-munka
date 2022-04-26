const htmlRespones = require('../utils/htmlResponse')

// controller függvények
const index = res => htmlRespones(res, 'index')
const about = res => htmlRespones(res, 'about')
const contact = res => htmlRespones(res, 'contact')
const error404 = res => htmlRespones(res, '404', 404)

module.exports = Object.freeze({
  index, about, contact, error404
})
