const router = require("express").Router();
const { getProfile, updateProfile } = require("../controllers/admin.controller");
const { protect } = require("../middleware/auth.middleware");
const localUpload = require("../config/localUpload"); // Updated to use localUpload

// POST /api/admin/login is handled in auth.routes.js
router.get("/get", protect, getProfile);
router.put("/update/:id", protect, localUpload.single("profilePhoto"), updateProfile);

module.exports = router;
