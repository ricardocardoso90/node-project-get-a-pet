const User = require('../models/User');

module.exports = class UserController {
  static async register(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const image = req.body.image;
    const phone = req.body.phone;

    const data = new User({ name, email, password, image, phone });
    await data.save();

    res.json({message: "Dados cadastrados com sucesso!!"});
  };
};