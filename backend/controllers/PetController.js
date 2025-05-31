const Pet = require('../models/Pet');

module.exports = class PetController {
  static async create(req, res) {

    const name = req.body.name;
    const age = req.body.age;
    const weight = req.body.weight;
    const color = req.body.color;
    const imagens = req.body.imagens;

    const data = new Pet({ name, age, weight, color, imagens });
    await data.save();

    res.json({ message: "Dados cadastrados com sucesso!!" });
  };
};