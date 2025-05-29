const mongoose = require('mongoose');

const profileImagesSchema = mongoose.Schema({
  images: [
    {
      name: String,
      imageUrl: String
    }
  ]
});

const ProfileImages = mongoose.model('Images', profileImagesSchema);
module.exports = ProfileImages;
