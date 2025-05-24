const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const createUserToken = require('../helpers/create-user-token');
const getToken = require('../helpers/get-token');

module.exports = class UserController {
  static async register(req, res) {

    //BUSCANDO DADOS DO BODY.
    const { name, email, password, confirmpassword, image, phone } = req.body;

    //VALIDANDO USUÁRIOS.
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

    //VERIFICAÇÃO SE O EMAIL JÁ FOI CADASTRADO.
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      res.status(422).json(
        { message: "Email já cadastrado por outro usuário!!" });
      return;
    };

    //CRIAÇÃO DA SENHA.
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    //CRIAÇÃO DO USUÁRIO.
    const user = new User({
      name,
      email,
      password: passwordHash,
      confirmpassword,
      image,
      phone
    });

    try {

      const newUser = await user.save();
      await createUserToken(newUser, req, res);

    } catch (error) {
      res.status(500).json({ message: error });
    };
  };

  static async login(req, res) {

    //BUSCANDO DADOS DO BODY.
    const { email, password } = req.body;

    //VALIDANDO USUÁRIOS.
    if (!email) {
      res.status(422).json({ message: "O email é obrigatório!!" });
      return;
    };

    if (!password) {
      res.status(422).json({ message: "A senha é obrigatório!!" });
      return;
    };

    //VERIFICAÇÃO SE O EMAIL JÁ FOI CADASTRADO.
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(422).json({ message: "Não há usuário cadastrado com esse e-mail!!" });
      return;
    };

    //VERIFICAÇÃO SE AS SENHAS SÃO IGUAIS AS JÁ CADASTRADAS.
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      res.status(422).json({ message: "As senhas não são iguais!!" });
      return;
    };

    await createUserToken(user, req, res);
  };

  static async checkUser(req, res) {
    let currentUser;

    console.log(req.headers.authorization);

    if (req.headers.authorization) {
      const token = getToken(req);
      const decoded = jwt.verify(token, 'nossosecret');

      currentUser = await User.findById(decoded.id);
      currentUser.password = undefined;

    } else {
      currentUser = null;
    };

    res.status(200).send(currentUser);
  };

  static async getUserById(req, res) {
    const id = req.params.id;
    const user = await User.findById(id).select('-password');

    if (!user) {
      res.status(422).json({
        message: "Usuário não encontrado!!"
      });
      return;
    };

    res.status(200).json({ user });
  };

  static async editUser(req, res) {
    res.status(200).json({ message: "Usuário atualizado com sucesso!!" });
    return;
  };
};