const router = require("express").Router();
const { getAll, getById, create, update, remove } = require("../controllers/doctor.controller");
const { protect } = require("../middleware/auth.middleware");
const localUpload = require("../config/localUpload");

const cpUpload = localUpload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'certifications', maxCount: 5 }
]);

// You can use standard REST or keep existing names. I'll use standard REST, but since older code might use `/all` I'll map `/` to getAll and `/all` to getAll to not break anything.
router.get("/", getAll);
router.get("/all", getAll);
router.get("/:id", getById);
router.post("/", protect, cpUpload, create);
router.post("/create", protect, cpUpload, create);
router.put("/:id", protect, cpUpload, update);
router.put("/update/:id", protect, cpUpload, update);
router.delete("/:id", protect, remove);
router.delete("/delete/:id", protect, remove);

module.exports = router;
