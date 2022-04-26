const SiteController = require('../controller/site.controller')

// inkább objecten keresztül érjük el őket, mert lehet sok azonos nevű controller fv is
const SiteRouter = {
  '/': res => SiteController.index(res),
  '/about': res => SiteController.about(res),
  '/contact': res => SiteController.contact(res),
  '/404': res => SiteController.error404(res)
}

module.exports = Object.freeze(SiteRouter)
