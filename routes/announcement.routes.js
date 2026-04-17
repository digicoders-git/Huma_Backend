const router = require("express").Router();
const { getAll, create, update, remove } = require("../controllers/announcement.controller");
const { protect } = require("../middleware/auth.middleware");

router.get("/all", getAll);
router.post("/create", protect, create);
router.put("/update/:id", protect, update);
router.delete("/delete/:id", protect, remove);

module.exports = router;
