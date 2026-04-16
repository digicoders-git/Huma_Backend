const router = require("express").Router();
const { getAll, getById, create, update, remove } = require("../controllers/testimonial.controller");
const { protect } = require("../middleware/auth.middleware");
const localUpload = require("../config/localUpload");

router.get("/all", getAll);
router.get("/:id", getById);
router.post("/create", protect, localUpload.single("image"), create);
router.put("/:id", protect, localUpload.single("image"), update);
router.delete("/delete/:id", protect, remove);

module.exports = router;
