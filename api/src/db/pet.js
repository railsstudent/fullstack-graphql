const nanoid = require('nanoid')

const createPetModel = db => {
  return {
    findMany(filter) {
      return db.get('pet')
        .filter(filter)
        .orderBy(['createdAt'], ['desc'])
        .value()
    },

    findOne(filter) {
      return db.get('pet')
        .find(filter)
        .value()
    },

    create(pet) {
      const newPet = {id: nanoid(), createdAt: Date.now(), ...pet}
      
      db.get('pet')
        .push(newPet)
        .write()

      return newPet
    },

    delete(id) {      
      const pet = db.get('pet')
        .find({ id })
        .value()

      db.get('pet')
        .remove({ id })
        .write()

      return pet
    },

    update(pet) {      
      db.get('pet')
        .find({ id: pet.id })
        .assign({ name: pet.name, type: pet.type, vaccinated: pet.vaccinated })
        .value()
        .save()

      const updatedPet = db.get('pet')
          .find({ id: pet.id })
          .value()

      return updatedPet
    }
  }
}

module.exports = createPetModel
