const Profile = require("../models/profile");

const profileService = {
  getAllProfiles: async () => {
    try {
      const profiles = await Profile.find();
      return profiles;
    } catch (error) {
      throw error;
    }
  },

  createProfile: async ({ cuenta_id, nombre_usuario }) => {
    const existingUsername = await Profile.findOne({
      nombre_usuario: nombre_usuario.trim(),
    });
    if (existingUsername) {
      throw new Error("El nombre de usuario ya está en uso");
    }
    const existingProfile = await Profile.findOne({ cuenta_id });
    if (existingProfile) {
      throw new Error("Ya tienes un perfil");
    }
    const profile = new Profile({
      cuenta_id,
      nombre_usuario: nombre_usuario.trim(),
      progreso: { es: {}, en: {}, fr: {} },
    });
    await profile.save();
    return profile;
  },

  getProfileByCuentaId: async (cuenta_id) => {
    if (!cuenta_id) {
      throw new Error("El campo cuenta_id es requerido");
    }
    const profile = await Profile.findOne({ cuenta_id });
    if (!profile) {
      throw new Error("Perfil no encontrado");
    }
    return profile;
  },

  updateProfile: async (cuenta_id, updateData) => {
    try {
      if (updateData.nombre_usuario) {
        const existingUsername = await Profile.findOne({
          nombre_usuario: updateData.nombre_usuario.trim(),
          cuenta_id: { $ne: cuenta_id },
        });
        if (existingUsername) {
          throw new Error("El nombre de usuario ya está en uso");
        }
        updateData.nombre_usuario = updateData.nombre_usuario.trim();
      }
      const updatedProfile = await Profile.findOneAndUpdate(
        { cuenta_id },
        updateData,
        { new: true }
      );
      if (!updatedProfile) {
        throw new Error("Perfil no encontrado");
      }
      return updatedProfile;
    } catch (error) {
      throw error;
    }
  },

  deleteProfile: async (cuenta_id) => {
    try {
      const deletedProfile = await Profile.findOneAndDelete({ cuenta_id });
      if (!deletedProfile) {
        throw new Error("Perfil no encontrado");
      }
      return deletedProfile;
    } catch (error) {
      throw error;
    }
  },

  checkUsernameExists: async (nombre_usuario) => {
    try {
      const profile = await Profile.findOne({
        nombre_usuario: nombre_usuario.trim(),
      });
      return !!profile;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = profileService;
