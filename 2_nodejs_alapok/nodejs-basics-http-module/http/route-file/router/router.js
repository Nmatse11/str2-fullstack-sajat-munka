const htmlRespones = require('../utils/htmlResponse')

const router = {
  '/': res => htmlRespones(res, 'index'),
  '/about': res => htmlRespones(res, 'about'),
  '/contact': res => htmlRespones(res, 'contact'),
  '/404': res => htmlRespones(res, '404', 404)
}

module.exports = Object.freeze(router)
