const mongoose = require('mongoose');

const progressNivelSchema = mongoose.Schema({
  nivel_id: {
    type: String,
    required: true
  },
  fecha_completado: {
    type: Date,
    required: true
  },
  puntuacion: {
    type: Number,
    required: true
  },
  tiempo_segundos: {
    type: Number,
    required: true
  }
});

const progressSchema = mongoose.Schema({
  es: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  en: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  fr: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
});

module.exports = progressSchema;
