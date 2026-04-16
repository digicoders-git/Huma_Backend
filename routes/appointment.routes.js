const router = require("express").Router();
const {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  updateAppointmentStatus,
  deleteAppointment,
  bulkUpdateStatus,
  bulkDeleteAppointments
} = require("../controllers/appointment.controller");

// Optionally use protect middleware if you want to secure these endpoints for admin only
// const { protect } = require("../middleware/auth.middleware");

router.post("/", createAppointment);
router.get("/", getAllAppointments);
router.post("/bulk-status", bulkUpdateStatus);
router.post("/bulk-delete", bulkDeleteAppointments);
router.get("/:id", getAppointmentById);
router.put("/:id", updateAppointment);
router.patch("/:id/status", updateAppointmentStatus);
router.delete("/:id", deleteAppointment);

module.exports = router;
