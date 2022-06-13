module.exports = (model) => {
  return {
    // lekéri az adatbázisból az összes adatot
    findAll: () => model.find({}),
    findOne: (id) => model.findById(id),
    updateOne: async (id, body) => {
      // új elem a bodyból
      const newEntity = new model(body);
      // model-ben lévő validáció futtatása
      const error = newEntity.validateSync();
      if (!error) {
        /*
        await newEntity.save();
        const updateEntitiy = await model.findById(id);
        return updateEntitiy;
        */
        // id alapján frissítés
        return model.findByIdAndUpdate(id, body, { new: true });
      }
      throw new Error(error);
    }
  }
};