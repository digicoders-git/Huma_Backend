const router = require("express").Router();
const { create, getAll, updateStatus } = require("../controllers/enquiry.controller");
const { protect } = require("../middleware/auth.middleware");

router.post("/create", create);                          // public
router.get("/all", protect, getAll);                     // admin only
router.patch("/status/:id", protect, updateStatus);      // admin only

module.exports = router;
