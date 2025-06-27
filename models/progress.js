const mongoose = require("mongoose");

const progressNivelSchema = new mongoose.Schema(
  {
    nivel_id: {
      type: String,
      required: true,
    },
    fecha_completado: {
      type: Date,
      required: true,
    },
    puntuacion: {
      type: Number,
      required: true,
    },
    tiempo_segundos: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const progressSchema = new mongoose.Schema(
  {
    es: {
      type: [progressNivelSchema],
      default: [],
    },
    en: {
      type: [progressNivelSchema],
      default: [],
    },
    fr: {
      type: [progressNivelSchema],
      default: [],
    },
  },
  { _id: false }
);

module.exports = progressSchema;
