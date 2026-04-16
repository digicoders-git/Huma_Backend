const router = require("express").Router();
const { getAll, getById, create, update, remove } = require("../controllers/speciality.controller");
const { protect } = require("../middleware/auth.middleware");
const { upload } = require("../config/cloudinary");

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", protect, upload.single("image"), create);
router.put("/:id", protect, upload.single("image"), update);
router.delete("/:id", protect, remove);

module.exports = router;
