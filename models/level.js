const mongoose = require("mongoose");
const cartaSchema = require("../models/cartas");

const levelSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    idioma: {
        type: String,
        required: true,
    },
    dificultad: {
        type: String,
        required: true,
    },
    tematica: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        default: [],
    },
    creador: {
        type: String,
        required: true,
    },
    fecha_creacion: {
        type: Date,
        required: true,
        default: Date.now,
    },
    fecha_modificacion: {
        type: Date,
        required: true,
        default: Date.now,
    },
    publico: {
        type: Boolean,
        required: true,
        default: true,
    },
    puntuacion_maxima: {
        type: Number,
        required: true,
    },
    tiempo_recomendado_segundos: {
        type: Number,
        required: true,
    },
    cartas: {
        type: [cartaSchema],
        required: true,
    },
});

const Level = mongoose.model("Level", levelSchema);

module.exports = Level;
