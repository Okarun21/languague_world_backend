const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

router.get("/check-username", profileController.checkUsernameExists);
router.put("/:cuenta_id/progreso", profileController.updateProgreso);
router.put("/:cuenta_id/nivel", profileController.updateNivel);
router.put("/:cuenta_id/icon", profileController.updateProfileIcon);
router.put("/:cuenta_id", profileController.updateProfile);
router.get("/:cuenta_id", profileController.getProfile);
router.delete("/:cuenta_id", profileController.deleteProfile);
router.post("/", profileController.createProfile);

module.exports = router;
