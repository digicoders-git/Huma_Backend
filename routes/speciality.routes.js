const router = require("express").Router();
const { getAll, getById, create, update, remove } = require("../controllers/speciality.controller");
const { protect } = require("../middleware/auth.middleware");
const localUpload = require("../config/localUpload");

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", protect, localUpload.single("image"), create);
router.put("/:id", protect, localUpload.single("image"), update);
router.delete("/:id", protect, remove);

module.exports = router;

