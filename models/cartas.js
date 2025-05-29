const mongoose = require("mongoose");

const cartaSchema = new mongoose.Schema({
  id_carta: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    enum: ['imagen', 'texto'],
    required: true,
  },
  valor: {
    type: String,
    required: true,
  },
  posicion: {
    type: Number,
    required: true,
  },
  pareja_id: {
    type: String,
    required: true,
  },
});
