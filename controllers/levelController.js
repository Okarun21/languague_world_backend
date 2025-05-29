const levelService = require("../services/levelService");

const levelController = {
  createLevel: async (req, res) => {
    try {
      const level = await levelService.createLevel(req.body);
      res.status(201).json(level);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllLevels: async (req, res) => {
    try {
      const levels = await levelService.getAllLevels();
      res.json(levels);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getLevelById: async (req, res) => {
    try {
      const level = await levelService.getLevelById(req.params.id);
      if (!level) {
        return res.status(404).json({ error: "Nivel no encontrado" });
      }
      res.json(level);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateLevel: async (req, res) => {
    try {
      const level = await levelService.updateLevel(req.params.id, req.body);
      if (!level) {
        return res.status(404).json({ error: "Nivel no encontrado" });
      }
      res.json(level);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteLevel: async (req, res) => {
    try {
      const level = await levelService.deleteLevel(req.params.id);
      if (!level) {
        return res.status(404).json({ error: "Nivel no encontrado" });
      }
      res.json({ message: "Nivel eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = levelController;
