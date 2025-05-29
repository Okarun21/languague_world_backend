const ProfileImages = require("../models/imagesPerfilModel");

const profileImagesController = {
  // Traer todas las imágenes
  getAllImages: async (req, res) => {
    try {
      const doc = await ProfileImages.findOne();
      if (!doc) {
        return res.status(404).json({ message: "No se encontraron imágenes" });
      }
      res.json(doc.images);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Agregar una imagen
  addImage: async (req, res) => {
    try {
      let doc = await ProfileImages.findOne();
      if (!doc) {
        doc = new ProfileImages({
          images: [{ name: req.body.name, imageUrl: req.body.imageUrl }]
        });
      } else {
        doc.images.push({ name: req.body.name, imageUrl: req.body.imageUrl });
      }
      await doc.save();
      res.status(201).json(doc);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // Eliminar una imagen por nombre
  removeImage: async (req, res) => {
    try {
      const doc = await ProfileImages.findOne();
      if (!doc) {
        return res.status(404).json({ message: "No se encontraron imágenes" });
      }
      doc.images = doc.images.filter(img => img.name !== req.body.name);
      await doc.save();
      res.json(doc);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

module.exports = profileImagesController;
