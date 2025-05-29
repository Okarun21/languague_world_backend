const Level = require("../models/level");

const levelService = {
  createLevel: async (data) => {
    const level = new Level(data);
    return await level.save();
  },

  getAllLevels: async () => {
    return await Level.find();
  },

  getLevelById: async (id) => {
    return await Level.findById(id);
  },

  updateLevel: async (id, data) => {
    return await Level.findByIdAndUpdate(id, data, { new: true });
  },

  deleteLevel: async (id) => {
    return await Level.findByIdAndDelete(id);
  },
};

module.exports = levelService;
