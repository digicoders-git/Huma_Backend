const router = require("express").Router();
const { getAll, create, update, remove } = require("../controllers/department.controller");
const { protect } = require("../middleware/auth.middleware");

router.get("/", getAll);
router.post("/", protect, create);
router.put("/:id", protect, update);
router.delete("/:id", protect, remove);

module.exports = router;
