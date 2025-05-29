const express = require('express');
const router = express.Router();
const profileImagesController = require('../controllers/imagePerfilController');

router.get('/', profileImagesController.getAllImages);
router.post('/', profileImagesController.addImage);
router.delete('/', profileImagesController.removeImage);

module.exports = router;
