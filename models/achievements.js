const mongoose = require('mongoose');

const achievementsSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  fecha_obtenido: {
    type: Date,
    required: true,
  },
  icono: {
    type: String,
    required: true,
  }
});

module.exports = achievementsSchema;
