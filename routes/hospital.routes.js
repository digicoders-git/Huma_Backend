const router = require("express").Router();
const { getAll, getById, create, update, remove, updateStatus } = require("../controllers/hospital.controller");
const { protect } = require("../middleware/auth.middleware");
const localUpload = require("../config/localUpload");

router.get("/all", getAll);
router.get("/:id", getById);
router.post("/create", protect, localUpload.single("image"), create);
router.put("/update/:id", protect, localUpload.single("image"), update);
router.patch("/status/:id", protect, updateStatus);
router.delete("/delete/:id", protect, remove);

module.exports = router;

