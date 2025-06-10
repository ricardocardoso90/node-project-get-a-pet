const Pet = require('../models/Pet');

const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');

module.exports = class PetController {

  static async getAll(req, res) {
    const pets = await Pet.find().sort('-createdAt');
    res.status(200).json({ pets: pets });
  };

  static async create(req, res) {

    const { name, age, description, weight, color } = req.body;
    const images = req.files;
    const available = true;

    // const name = req.body.name;
    // const age = req.body.age;
    // const description = req.body.description;
    // const weight = req.body.weight;
    // const color = req.body.color;

    //VALIDAÇÕES.
    if (!name) { res.status(422).json({ message: "O nome é obrigatório!!" }); return; }
    if (!age) { res.status(422).json({ message: "A idade é obrigatória!!" }); return; }

    if (!weight) { res.status(422).json({ message: "O peso é obrigatório!!" }); return; }
    if (!color) { res.status(422).json({ message: "A cor é obrigatória!!" }); return; }
    if (images.length === 0) { res.status(422).json({ message: "A imagem é obrigatória!!" }); return; }

    //USUÁRIO DONO DO PET.
    const token = getToken(req);
    const user = await getUserByToken(token);

    //CRIAÇÃO E SALVAMENTO DE PETS.
    const pet = new Pet({
      name: name,
      age: age,
      weight: weight,
      color: color,
      available: available,
      images: [],
      user: {
        _id: user._id,
        name: user.name,
        image: user.image,
        phone: user.phone,
      }
    });

    images.map((image) => {
      pet.images.push(image.filename)
    });

    try {
      const newPet = await pet.save();
      res.status(201).json({ message: "Pet cadastrado com sucesso!!", newPet: newPet });
    } catch (error) {
      res.status(500).json({ message: error });
    };
  };
};