const fsp = require('fs').promises;
const ProductModel = require('../model/product.model');
const { join } = require('path');

(async () => {
  const productJson = await fsp.readFile(
    join(__dirname, 'products.json'),
    'utf-8'
  );
  const products = JSON.parse(productJson);
  /*products.forEach(async product => {
    const model = new ProductModel(product);
    model.validate();
    await model.save()
  })*/
  await ProductModel.insertMany(products)
})();