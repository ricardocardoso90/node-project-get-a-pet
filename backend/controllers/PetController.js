const Pet = require('../models/Pet');

const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');

module.exports = class PetController {
  static async create(req, res) {

    const name = req.body.name;
    const age = req.body.age;
    const weight = req.body.weight;
    const color = req.body.color;
    const images = req.body.images;

    const available = true;

    //VALIDAÇÕES.
    if (!name) { res.status(422).json({ message: "O nome é obrigatório!!" }); return; }
    if (!age) { res.status(422).json({ message: "A idade é obrigatória!!" }); return; }

    if (!weight) { res.status(422).json({ message: "O peso é obrigatório!!" }); return; }
    if (!color) { res.status(422).json({ message: "A cor é obrigatória!!" }); return; }
    if (!images) { res.status(422).json({ message: "Adicione uma imgem!!" }); return; }

    //USUÁRIO DONO DO PET.
    const token = getToken(req);
    const user = await getUserByToken(token);

    //CRIAÇÃO E SALVAMENTO DE PETS.
    const data = new Pet({
      name, age, weight, color, available, images: [], user: {
        _id: user._id,
        name: user.name,
        image: user.image,
        phone: user.phone,
      }
    });

    try {
      const newPet = await data.save();
      res.status(201).json({ message: "Pet cadastrado com sucesso!!", newPet });
    } catch (error) {
      res.status(500).json({ message: error });
    };
  };
};