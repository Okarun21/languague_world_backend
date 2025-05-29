const mongoose = require("mongoose");

const avatarSchema = mongoose.Schema({
    base: {
        type: String,
    },
    color_piel: {
        type: String,
    },
    peinado: {
        type: String,
    },
    sombrero: {
        type: String,
    },
    camisa: {
        type: String,
    },
    pantalon: {
        type: String,
    },
    zapatos: {
        type: String,
    },
    accesorios: {
        type: [String],
    },
    fecha_actualizacion: {
        type: Date,
    },
});

module.exports = avatarSchema;
