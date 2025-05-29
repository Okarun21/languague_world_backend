const mongoose = require("mongoose");
const avatarSchema = require("./avatar");
const progressSchema = require("./progress");
const achievementsSchema = require("./achievements");

const profileSchema = new mongoose.Schema({
  cuenta_id: {
    type: String,
    required: true,
  },
  nombre_usuario: {
    type: String,
    required: true,
  },
  fotoPerfil: {
    type: String,
    default: "",
  },
  fecha_creacion: {
    type: Date,
    required: true,
    default: Date.now,
  },
  nivel_usuario: {
    type: Number,
    default: 1,
  },
  avatar: { type: avatarSchema, default: {} },
  progreso: {
    type: progressSchema,
    default: { es: {}, en: {}, fr: {} },
  },
  logros: { type: [achievementsSchema], default: [] },
});

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
