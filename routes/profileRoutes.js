const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.get('/check-username', profileController.checkUsernameExists);
router.post('/', profileController.createProfile);
router.put('/:cuenta_id/icon', profileController.updateProfileIcon);
router.get('/:cuenta_id', profileController.getProfile);
router.put('/:cuenta_id', profileController.updateProfile);
router.delete('/:cuenta_id', profileController.deleteProfile);

module.exports = router;
