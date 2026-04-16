const router = require("express").Router();
const { getAll, getById, create, update, remove } = require("../controllers/speciality.controller");
const { protect } = require("../middleware/auth.middleware");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", upload.single("image"), create);
router.put("/:id", upload.single("image"), update);
router.delete("/:id", remove);

module.exports = router;
