const router = require("express").Router();
const { getAll, getById, create, update, remove } = require("../controllers/video.controller");
const { protect } = require("../middleware/auth.middleware");
const { upload } = require("../config/cloudinary");

router.get("/all", getAll);
router.get("/:id", getById);
router.post("/create", protect, upload.single("thumbnail"), create);
router.put("/update/:id", protect, upload.single("thumbnail"), update);
router.delete("/delete/:id", protect, remove);

module.exports = router;
