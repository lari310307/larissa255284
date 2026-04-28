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
const mongoURL = "mongodb://larissa255284:255284@cluster0-shard-00-00.hpsy3y6.mongodb.net:27017,cluster0-shard-00-01.hpsy3y6.mongodb.net:27017,cluster0-shard-00-02.hpsy3y6.mongodb.net:27017/todo-db?ssl=true&replicaSet=atlas-hpsy3y6-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(mongoURL);
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