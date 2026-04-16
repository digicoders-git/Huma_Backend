const router = require("express").Router();
const { getProfile, updateProfile, changePassword, getDashboardStats } = require("../controllers/admin.controller");
const { protect } = require("../middleware/auth.middleware");
const localUpload = require("../config/localUpload"); // Updated to use localUpload

// Statistics & Profile Routes
router.get("/get", protect, getProfile);
router.get("/stats", protect, getDashboardStats);
router.put("/change-password", protect, changePassword);
router.put("/update/:id", protect, localUpload.single("profilePhoto"), updateProfile);

module.exports = router;


