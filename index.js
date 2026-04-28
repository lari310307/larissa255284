require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Configuração de CORS para o Frontend (Angular) conseguir acessar
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'HEAD, GET, POST, PATCH, DELETE');
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// Middleware para entender JSON (obrigatório para o Postman funcionar)
app.use(express.json());

// Importação das Rotas (Verifique se a pasta é 'router' e o arquivo 'router.js')
const routes = require('./router/router');
app.use('/api', routes);

// Configuração da conexão com o Banco de Dados (MongoDB Atlas)
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

// Monitoramento da Conexão
db.on('error', (error) => {
    console.log("Erro na conexão com o banco:", error);
});

db.once('connected', () => {
    console.log('Database Connected');
});

// Porta do Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
});