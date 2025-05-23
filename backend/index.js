const express = require('express');
const cors = require('cors');

const app = express();

// CONFIG JSON RESPONSE.
app.use(express.json());

// SOLVE CORS.
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// PASTA PUBLIC DAS IMAGENS.
app.use(express.static('public'));

// ROTAS
const UserRoutes = require('./routes/UserRoutes');
app.use('/users', UserRoutes);

const PetsRoutes = require('./routes/PetRoutes');
app.use('/pets', PetsRoutes);

app.listen(5000, () => console.log("Servidor rodando com sucesso!!"));