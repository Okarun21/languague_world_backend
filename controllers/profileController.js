  const profileService = require("../services/profileService");
  const Profile = require("../models/profile"); 

  const profileController = {
    createProfile: async (req, res) => {
      try {
        // Validación básica de campos requeridos
        console.log('Body recibido:', req.body);
        if (!req.body.cuenta_id || !req.body.nombre_usuario) {
          return res.status(400).json({ error: "Los campos cuenta_id y nombre_usuario son requeridos" });
        }
        const profile = await profileService.createProfile(req.body);
        res.status(201).json(profile);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    },

    getProfile: async (req, res) => {
      try {
        const { cuenta_id } = req.params;
        const profile = await profileService.getProfileByCuentaId(cuenta_id);
        res.json(profile);
      } catch (error) {
        res
          .status(error.message === "Perfil no encontrado" ? 404 : 400)
          .json({ error: error.message });
      }
    },

    updateProfile: async (req, res) => {
      try {
        const { cuenta_id } = req.params;
        const profile = await profileService.updateProfile(cuenta_id, req.body);
        res.json(profile);
      } catch (error) {
        res
          .status(error.message === "Perfil no encontrado" ? 404 : 400)
          .json({ error: error.message });
      }
    },

    deleteProfile: async (req, res) => {
      try {
        const { cuenta_id } = req.params;
        await profileService.deleteProfile(cuenta_id);
        res.json({ message: "Perfil eliminado correctamente" });
      } catch (error) {
        res
          .status(error.message === "Perfil no encontrado" ? 404 : 400)
          .json({ error: error.message });
      }
    },

    checkUsernameExists: async (req, res) => {
      try {
        const { nombre_usuario } = req.query;
        if (!nombre_usuario) {
          return res.status(400).json({ error: "El campo nombre_usuario es requerido" });
        }
        const exists = await profileService.checkUsernameExists(nombre_usuario);
        res.json({ exists });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    },

    updateProfileIcon: async (req, res) => {
      try {
        const { cuenta_id } = req.params;
        const { iconUrl } = req.body;
        const updatedProfile = await Profile.findOneAndUpdate(
          { cuenta_id },
          { fotoPerfil: iconUrl },
          { new: true }
        );
        if (!updatedProfile) {
          return res.status(404).json({ error: "Perfil no encontrado" });
        }
        res.json(updatedProfile);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  };

  module.exports = profileController;
