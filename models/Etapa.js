const { Schema, model } = require('mongoose');

const EtapaSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    fechaCreacion: {
        type: Date,
        requred: true,
    },
    fechaActualizacion: {
        type: Date,
        required: true,
    }
});

module.exports = model('Etapa', EtapaSchema);