module.exports = (model) => {
  return {
    // lekéri az adatbázisból az összes adatot
    findAll: () => model.find({})
  }
};