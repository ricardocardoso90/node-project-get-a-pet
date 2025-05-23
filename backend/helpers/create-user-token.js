const jwt = require('jsonwebtoken');

async function createUserToken(user, req, res) {
  const token = jwt.sign({
    id: user._id,
    name: user.name,
  }, "nossosecret");

  res.status(200).json({
    message: "Você está autenticado!!",
    token: token,
    userId: user._id
  });
};

module.exports = createUserToken;