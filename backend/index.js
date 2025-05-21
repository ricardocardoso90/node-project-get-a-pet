const express = require('express');
const cors = require('cors');

const app = express();

app.get('/', (req, res) => {
  // res.send("Olá mundão!!");
  res.json({ message: "Deu tudo certo, Ricardo!!" });
});

app.listen(3000, () => console.log("Servidor rodando..."));