const router = require("express").Router();
const { create, getAll, updateStatus, remove, bulkRemove, bulkUpdateStatus } = require("../controllers/enquiry.controller");

router.post("/create", create);
router.get("/all", getAll);
router.patch("/status/:id", updateStatus);
router.delete("/delete/:id", remove);
router.post("/bulk-delete", bulkRemove);
router.post("/bulk-status", bulkUpdateStatus);

module.exports = router;
