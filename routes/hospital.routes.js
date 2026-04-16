const router = require("express").Router();
const { getAll, getById, create, update, remove, updateStatus } = require("../controllers/hospital.controller");
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

router.get("/all", getAll);
router.get("/:id", getById);
router.post("/create", upload.single("image"), create);
router.put("/update/:id", upload.single("image"), update);
router.patch("/status/:id", updateStatus);
router.delete("/delete/:id", remove);

module.exports = router;
