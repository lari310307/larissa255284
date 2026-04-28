const express = require('express');
const router = express.Router();

// CUIDADO AQUI: O '../' sai da pasta 'router' e procura a pasta 'models'
const modeloTarefa = require('./models/tarefa');

// Rota para Salvar
router.post('/post', async (req, res) => {
    const objetoTarefa = new modeloTarefa({
        descricao: req.body.descricao,
        statusRealizada: req.body.statusRealizada
    });

    try {
        const tarefaSalva = await objetoTarefa.save();
        res.status(200).json(tarefaSalva);
    }
    catch (error) {
        // Se der erro aqui, o Postman vai te mostrar exatamente o que o MongoDB reclamou
        res.status(400).json({ message: error.message });
    }
});

// Rota para Listar (bom para testar depois no Postman com GET)
router.get('/getAll', async (req, res) => {
    try {
        const dados = await modeloTarefa.find();
        res.json(dados);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        // O Mongoose usa findByIdAndDelete
        const dados = await modeloTarefa.findByIdAndDelete(id);
        res.send(`Documento com o nome ${dados.descricao} foi deletado.`);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;