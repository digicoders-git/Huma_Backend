const router = require("express").Router();
const { getAll, getById, create, update, remove } = require("../controllers/hospital.controller");
const { protect } = require("../middleware/auth.middleware");
const { upload } = require("../config/cloudinary");

router.get("/all", getAll);
router.get("/:id", getById);
router.post("/create", protect, upload.single("image"), create);
router.put("/update/:id", protect, upload.single("image"), update);
router.delete("/delete/:id", protect, remove);

module.exports = router;
