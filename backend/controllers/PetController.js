const Pet = require('../models/Pet');

const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = class PetController {

  static async getAll(req, res) {
    const pets = await Pet.find().sort('-createdAt');
    res.status(200).json({ pets: pets });
  };

  static async getAllUserPets(req, res) {
    //PEGAR O USUÁRIO PELO TOKEN.
    const token = getToken(req);
    const user = await getUserByToken(token);

    const pets = await Pet.find({ 'user._id': user._id }).sort('-createdAt');
    res.status(200).json({ pets: pets });
  };

  static async myUserAdoptions(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token);

    const pets = await Pet.find({ 'adopter._id': user._id }).sort('-createdAt');
    res.status(200).json({ pets: pets });
  };

  static async getPetById(req, res) {
    const id = req.params.id;

    //CHEGAR SE ID É VÁLIDO.
    if (!ObjectId.isValid(id)) { res.status(422).json({ message: "ID Inválido!!" }); return; };

    //CHECAR SE PET EXISTE.
    const pet = await Pet.findOne({ _id: id });

    if (!pet) { res.status(404).json({ message: "Pet não encontrado!!" }) };
    res.status(200).json({ pet: pet });
  };

  static async removePetById(req, res) {
    const id = req.params.id;

    //CHEGAR SE ID É VÁLIDO.
    if (!ObjectId.isValid(id)) { res.status(422).json({ message: "ID Inválido!!" }); return; };

    //CHECAR SE PET EXISTE.
    const pet = await Pet.findOne({ _id: id });

    if (!pet) { res.status(404).json({ message: "Pet não encontrado!!" }) };

    //CHECAR SE USUÁRIO LOGADO REGISTROU O PET.
    const token = getToken(req);
    const user = await getUserByToken(token);

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