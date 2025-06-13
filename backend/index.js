const express = require('express');
const cors = require('cors');

const app = express();

// CONFIG JSON RESPONSE.
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// SOLVE CORS.
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// PASTA PUBLIC DAS IMAGENS.
app.use(express.static('public'));

// ROTAS
const PetsRoutes = require('./routes/PetRoutes');
const UserRoutes = require('./routes/UserRoutes');

app.use('/pets', PetsRoutes);
app.use('/users', UserRoutes);

app.listen(5000, () => console.log("Servidor rodando com sucesso!!"));