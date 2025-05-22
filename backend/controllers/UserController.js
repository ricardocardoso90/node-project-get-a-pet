const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = class UserController {
  static async register(req, res) {

    const { name, email, password, confirmpassword, image, phone } = req.body;

    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório!!" });
      return;
    };

    if (!email) {
      res.status(422).json({ message: "O email é obrigatório!!" });
      return;
    };

    if (!password) {
      res.status(422).json({ message: "A senha é obrigatório!!" });
      return;
    };

    if (!confirmpassword) {
      res.status(422).json({ message: "A confirmação de senha é obrigatório!!" });
      return;
    };

    if (!image) {
      res.status(422).json({ message: "A imagem é obrigatório!!" });
      return;
    };

    if (!phone) {
      res.status(422).json({ message: "O Telefone é obrigatório!!" });
      return;
    };

    if (password !== confirmpassword) {
      res.status(422).json({ message: "As senhas não são iguais!!" });
      return;
    };

    const userExists = await User.findOne({ email: email });
    if (userExists) {
      res.status(422).json({ message: "Email já cadastrado por outro usuário!!" });
      return;
    };

    //CRIAÇÃO DA SENHA.
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    //CRIAÇÃO DO USUÁRIO.
    try {
      await new User({
        name,
        email,
        password: passwordHash,
        confirmpassword,
        image,
        phone
      })
        .save();
      res.status(200).json({
        message: "Dados cadastrados com sucesso!!"
      });
    } catch (error) {
      res.status(500).json({ message: error });
    };

  };
};