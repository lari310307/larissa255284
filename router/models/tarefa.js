const mongoose = require('mongoose');

const tarefaSchema = new mongoose.Schema({
    descricao: {
        required: true,
        type: String
    },
    statusRealizada: {
        required: true,
        type: Boolean
    }
})

module.exports = mongoose.model('Tarefa', tarefaSchema)